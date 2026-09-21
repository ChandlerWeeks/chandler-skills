/**
 * Shared behavior for every deep-teaching widget.
 *
 * Responsibilities kept here so each widget only describes its own learner
 * action and evaluation rule:
 *
 * - Deterministic initial state and a reset action.
 * - Staged hints, revealed one at a time.
 * - Structured feedback: what was correct, the first consequential error, why
 *   it changes the result, where to look, and the next action.
 * - A polite live region for status changes, and focus moved to new feedback.
 * - Attempt and hint counts, reported through the `lesson-widget-result` event.
 * - Optional local-only persistence. Nothing is ever sent over the network.
 *
 * Subclasses implement: buildBody, readResponse, evaluate, resetBody.
 */

export const WIDGET_EVENT = 'lesson-widget-result';

/** Parse JSON that an author may have left as an unreplaced template placeholder. */
export function parseConfig(raw) {
	if (typeof raw !== 'string' || raw.trim() === '') return { ok: true, value: {} };
	if (raw.includes('{{') && raw.includes('}}')) {
		return { ok: false, reason: 'placeholder', value: {} };
	}
	try {
		const value = JSON.parse(raw);
		if (value === null || typeof value !== 'object') {
			return { ok: false, reason: 'not-an-object', value: {} };
		}
		return { ok: true, value };
	} catch (error) {
		return { ok: false, reason: `invalid JSON: ${error.message}`, value: {} };
	}
}

const BUTTON = 'rounded-lg border px-4 py-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
const BUTTON_PRIMARY = `${BUTTON} border-transparent bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900`;
const BUTTON_QUIET = `${BUTTON} border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-slate-600`;

export class WidgetBase extends HTMLElement {
	constructor() {
		super();
		this._upgraded = false;
		this._config = null;
		this.attempts = 0;
		this.hintsUsed = 0;
		this.outcome = 'unanswered';
	}

	/** Stable registry id. Falls back to the tag name. */
	get widgetId() {
		return this.getAttribute('widget-id') || this.tagName.toLowerCase();
	}

	/** The objective this widget produces evidence for. */
	get objectiveId() {
		return this.getAttribute('objective-id') || '';
	}

	get config() {
		if (this._config) return this._config;
		const parsed = parseConfig(this.getAttribute('data-config'));
		if (!parsed.ok) {
			this._configError = parsed.reason;
		}
		this._config = parsed.value;
		return this._config;
	}

	set config(value) {
		this._config = value && typeof value === 'object' ? value : {};
	}

	get hints() {
		return Array.isArray(this.config.hints) ? this.config.hints : [];
	}

	/** Local-only persistence, opt in with the `persist` attribute. */
	get persists() {
		return this.hasAttribute('persist');
	}

	get storageKey() {
		return `deep-teaching:${document.documentElement.dataset.lessonId || location.pathname}:${this.widgetId}:${this.objectiveId}`;
	}

	connectedCallback() {
		if (this._upgraded) return;

		// An unreplaced placeholder or malformed config is an authoring error.
		// Leave the static fallback in place instead of rendering a broken widget.
		const config = this.config;
		if (this._configError) {
			console.warn(
				`[deep-teaching] <${this.tagName.toLowerCase()}> kept its static fallback: data-config is ${this._configError}.`
			);
			this.dataset.state = 'fallback';
			return;
		}

		this._upgraded = true;
		// Authored markup is the static fallback. Capture anything the widget
		// needs to keep before the fallback is replaced.
		this.captureAuthored();
		this.innerHTML = '';
		this.dataset.state = 'unanswered';
		this.render(config);
		this.restore();
	}

	/**
	 * Read authored light-DOM content before it is replaced.
	 * Override when a widget accepts its content from markup as well as config.
	 */
	captureAuthored() {}

	render(config) {
		this.classList.add('block');

		const body = document.createElement('div');
		body.dataset.widgetBody = '';
		this.append(body);
		this.buildBody(body, config);

		const controls = document.createElement('div');
		controls.className = 'mt-5 flex flex-wrap items-center gap-3';
		controls.dataset.widgetControls = '';

		this._checkButton = document.createElement('button');
		this._checkButton.type = 'button';
		this._checkButton.className = BUTTON_PRIMARY;
		this._checkButton.textContent = config.checkLabel || 'Check my answer';
		this._checkButton.addEventListener('click', () => this.check());
		controls.append(this._checkButton);

		if (this.hints.length > 0) {
			this._hintButton = document.createElement('button');
			this._hintButton.type = 'button';
			this._hintButton.className = BUTTON_QUIET;
			this._hintButton.addEventListener('click', () => this.showNextHint());
			controls.append(this._hintButton);
			this.updateHintButton();
		}

		this._resetButton = document.createElement('button');
		this._resetButton.type = 'button';
		this._resetButton.className = BUTTON_QUIET;
		this._resetButton.textContent = 'Reset';
		this._resetButton.addEventListener('click', () => this.reset({ focus: true }));
		controls.append(this._resetButton);

		this.append(controls);

		this._hintRegion = document.createElement('div');
		this._hintRegion.className = 'mt-4 space-y-2';
		this._hintRegion.dataset.widgetHints = '';
		this.append(this._hintRegion);

		this._feedback = document.createElement('div');
		this._feedback.className = 'mt-4 hidden rounded-lg border p-4';
		this._feedback.tabIndex = -1;
		this._feedback.dataset.widgetFeedback = '';
		this.append(this._feedback);

		// Status changes that do not deserve focus are announced here.
		this._status = document.createElement('p');
		this._status.className = 'sr-only';
		this._status.setAttribute('role', 'status');
		this._status.setAttribute('aria-live', 'polite');
		this.append(this._status);
	}

	announce(message) {
		if (!this._status) return;
		// Re-assigning identical text does not always re-announce. Clear first.
		this._status.textContent = '';
		window.requestAnimationFrame(() => {
			this._status.textContent = message;
		});
	}

	updateHintButton() {
		if (!this._hintButton) return;
		const remaining = this.hints.length - this.hintsUsed;
		this._hintButton.textContent = remaining > 0 ? `Show a hint (${remaining} left)` : 'No hints left';
		this._hintButton.disabled = remaining === 0;
		this._hintButton.classList.toggle('opacity-50', remaining === 0);
	}

	showNextHint() {
		if (this.hintsUsed >= this.hints.length) return;
		const hint = this.hints[this.hintsUsed];
		this.hintsUsed += 1;

		const item = document.createElement('p');
		item.className = 'rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-950';
		item.innerHTML = `<strong>Hint ${this.hintsUsed}:</strong> `;
		item.append(document.createTextNode(hint));
		this._hintRegion.append(item);

		this.updateHintButton();
		this.announce(`Hint ${this.hintsUsed} shown.`);
		this.save();
	}

	check() {
		const response = this.readResponse();
		if (response === null || response === undefined) {
			this.renderFeedback({
				outcome: 'incomplete',
				summary: this.config.emptyResponseMessage || 'Answer the question before you check it.'
			});
			return;
		}

		this.attempts += 1;
		const result = this.evaluate(response) || { outcome: 'incorrect' };
		this.outcome = result.outcome;
		this.dataset.state = result.outcome;
		this.renderFeedback(result);
		this.save();

		this.dispatchEvent(
			new CustomEvent(WIDGET_EVENT, {
				bubbles: true,
				detail: {
					widgetId: this.widgetId,
					objectiveId: this.objectiveId,
					outcome: result.outcome,
					attempts: this.attempts,
					hintsUsed: this.hintsUsed
				}
			})
		);
	}

	/**
	 * Feedback order: what is correct, the first consequential error, why it
	 * changes the result, where to look, and the next action.
	 */
	renderFeedback(result) {
		const tone = {
			correct: 'border-emerald-200 bg-emerald-50 text-emerald-950',
			partial: 'border-amber-200 bg-amber-50 text-amber-950',
			incorrect: 'border-rose-200 bg-rose-50 text-rose-950',
			incomplete: 'border-slate-300 bg-slate-50 text-slate-900'
		}[result.outcome] || 'border-slate-300 bg-slate-50 text-slate-900';

		this._feedback.className = `mt-4 rounded-lg border p-4 ${tone}`;
		this._feedback.innerHTML = '';

		const heading = document.createElement('p');
		heading.className = 'font-semibold';
		heading.textContent =
			result.summary ||
			{
				correct: 'Correct.',
				partial: 'Partly correct.',
				incorrect: 'Not yet.',
				incomplete: 'Incomplete.'
			}[result.outcome];
		this._feedback.append(heading);

		const lines = [
			['What is right', result.correctPart],
			['First consequential error', result.error],
			['Why that changes the result', result.why],
			['Where to look', result.pointer],
			['Next', result.nextAction]
		];

		const list = document.createElement('dl');
		list.className = 'mt-3 space-y-2 text-sm';
		let wrote = false;
		for (const [label, value] of lines) {
			if (!value) continue;
			wrote = true;
			const dt = document.createElement('dt');
			dt.className = 'font-semibold';
			dt.textContent = label;
			const dd = document.createElement('dd');
			dd.textContent = value;
			list.append(dt, dd);
		}
		if (wrote) this._feedback.append(list);

		if (Array.isArray(result.detail) && result.detail.length > 0) {
			const ul = document.createElement('ul');
			ul.className = 'mt-3 list-disc space-y-1 pl-5 text-sm';
			for (const line of result.detail) {
				const li = document.createElement('li');
				li.textContent = line;
				ul.append(li);
			}
			this._feedback.append(ul);
		}

		this._feedback.focus();
	}

	reset({ focus = false } = {}) {
		this.attempts = 0;
		this.hintsUsed = 0;
		this.outcome = 'unanswered';
		this.dataset.state = 'unanswered';
		this._hintRegion.innerHTML = '';
		this._feedback.className = 'mt-4 hidden rounded-lg border p-4';
		this._feedback.innerHTML = '';
		this.updateHintButton();
		this.resetBody();
		this.clear();
		this.announce('Widget reset. The question is ready for another attempt.');
		if (focus) {
			const first = this.querySelector('[data-widget-body] input, [data-widget-body] select, [data-widget-body] textarea, [data-widget-body] button');
			if (first) first.focus();
		}
	}

	// --- Local-only persistence. No response is ever transmitted. ---

	save() {
		if (!this.persists) return;
		try {
			localStorage.setItem(
				this.storageKey,
				JSON.stringify({ attempts: this.attempts, hintsUsed: this.hintsUsed, outcome: this.outcome })
			);
		} catch {
			// Private browsing or blocked storage. Progress is simply not remembered.
		}
	}

	restore() {
		if (!this.persists) return;
		try {
			const saved = JSON.parse(localStorage.getItem(this.storageKey) || 'null');
			if (!saved) return;
			this.attempts = saved.attempts || 0;
			this.hintsUsed = 0;
			this.outcome = saved.outcome || 'unanswered';
			this.dataset.state = this.outcome;
			this.updateHintButton();
		} catch {
			// Ignore unreadable storage.
		}
	}

	clear() {
		if (!this.persists) return;
		try {
			localStorage.removeItem(this.storageKey);
		} catch {
			// Ignore.
		}
	}

	// --- Subclass contract ---

	/** Render the interactive content. */
	buildBody() {
		throw new Error('buildBody must be implemented by the widget.');
	}

	/** @returns The learner response, or null when nothing was answered. */
	readResponse() {
		throw new Error('readResponse must be implemented by the widget.');
	}

	/** @returns {{outcome: string}} The evaluation result. */
	evaluate() {
		throw new Error('evaluate must be implemented by the widget.');
	}

	/** Return the interactive content to its initial state. */
	resetBody() {}
}

export { BUTTON_PRIMARY, BUTTON_QUIET };
