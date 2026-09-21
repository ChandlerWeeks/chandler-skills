/**
 * prediction-reveal
 *
 * Learner action: commit a prediction in writing, then compare it against the
 * model answer and rate the match.
 * Evidence: a written prediction made before the answer was visible, plus the
 * learner's own judgment of the difference.
 *
 * The answer stays hidden until the learner commits. When scripting is
 * unavailable the authored `[data-answer]` block keeps its `hidden` attribute,
 * so the answer never leaks.
 *
 * Markup form:
 *   <prediction-reveal objective-id="obj-1" data-config='{"prompt":"…"}'>
 *     <div data-answer hidden>…model answer…</div>
 *   </prediction-reveal>
 *
 * Config form:
 *   { prompt, answer, inputLabel, hints: [], selfRating: true }
 */

import { WidgetBase, BUTTON_QUIET } from './widget-base.js';
import { registerWidget } from './registry.js';

class PredictionReveal extends WidgetBase {
	captureAuthored() {
		const authored = this.querySelector('[data-answer]');
		this._authoredAnswer = authored ? authored.cloneNode(true) : null;
	}

	buildBody(body, config) {
		if (config.prompt) {
			const prompt = document.createElement('p');
			prompt.className = 'leading-7';
			prompt.textContent = config.prompt;
			body.append(prompt);
		}

		const fieldId = `prediction-${Math.random().toString(36).slice(2, 9)}`;

		const label = document.createElement('label');
		label.className = 'mt-4 block font-semibold';
		label.setAttribute('for', fieldId);
		label.textContent = config.inputLabel || 'Your prediction';

		this._input = document.createElement('textarea');
		this._input.id = fieldId;
		this._input.className =
			'mt-2 min-h-28 w-full rounded-lg border border-slate-400 bg-white p-3 text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600';
		this._input.setAttribute('aria-describedby', `${fieldId}-help`);

		const help = document.createElement('p');
		help.id = `${fieldId}-help`;
		help.className = 'mt-2 text-sm text-slate-600';
		help.textContent = 'Write your prediction first. The answer stays hidden until you do.';

		body.append(label, this._input, help);

		// Built here, revealed only by check().
		this._answerBlock = document.createElement('div');
		this._answerBlock.className = 'mt-4 rounded-lg border border-slate-300 bg-white p-4';
		this._answerBlock.hidden = true;
		this._answerBlock.tabIndex = -1;

		const answerHeading = document.createElement('h4');
		answerHeading.className = 'font-semibold';
		answerHeading.textContent = 'What actually happens';
		this._answerBlock.append(answerHeading);

		if (this._authoredAnswer) {
			this._authoredAnswer.hidden = false;
			this._answerBlock.append(this._authoredAnswer);
		} else {
			const answerText = document.createElement('p');
			answerText.className = 'mt-2 leading-7';
			answerText.textContent = config.answer || 'No model answer was supplied for this prediction.';
			this._answerBlock.append(answerText);
		}

		if (config.selfRating !== false) {
			this._answerBlock.append(this.buildSelfRating());
		}

		body.append(this._answerBlock);
	}

	buildSelfRating() {
		const name = `self-rating-${Math.random().toString(36).slice(2, 9)}`;
		const fieldset = document.createElement('fieldset');
		fieldset.className = 'mt-5 border-t border-slate-200 pt-4';
		fieldset.dataset.selfRating = '';

		const legend = document.createElement('legend');
		legend.className = 'font-semibold';
		legend.textContent = 'How close was your prediction?';
		fieldset.append(legend);

		const options = [
			['matched', 'It matched. I can explain why.'],
			['partial', 'Partly. I missed one step.'],
			['missed', 'I predicted something different.']
		];

		const group = document.createElement('div');
		group.className = 'mt-3 space-y-2';
		for (const [value, text] of options) {
			const label = document.createElement('label');
			label.className = 'flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3';
			const input = document.createElement('input');
			input.type = 'radio';
			input.name = name;
			input.value = value;
			input.className = 'mt-1 size-4';
			input.addEventListener('change', () => this.recordSelfRating(value));
			const span = document.createElement('span');
			span.textContent = text;
			label.append(input, span);
			group.append(label);
		}
		fieldset.append(group);
		return fieldset;
	}

	recordSelfRating(value) {
		this.outcome = value === 'matched' ? 'correct' : value === 'partial' ? 'partial' : 'incorrect';
		this.dataset.state = this.outcome;
		this.announce('Self-rating recorded.');
		this.save();
		this.dispatchEvent(
			new CustomEvent('lesson-widget-result', {
				bubbles: true,
				detail: {
					widgetId: this.widgetId,
					objectiveId: this.objectiveId,
					outcome: this.outcome,
					selfRated: true,
					attempts: this.attempts,
					hintsUsed: this.hintsUsed
				}
			})
		);
	}

	render(config) {
		super.render(config);
		this._checkButton.textContent = config.checkLabel || 'Commit and reveal';
		this._resetButton.className = BUTTON_QUIET;
	}

	readResponse() {
		const text = this._input.value.trim();
		return text === '' ? null : text;
	}

	/** Overridden: a prediction is committed and compared, not graded. */
	check() {
		const response = this.readResponse();
		if (response === null) {
			this.renderFeedback({
				outcome: 'incomplete',
				summary: 'Write your prediction before revealing the answer.',
				nextAction: 'A wrong prediction is still useful. Commit to one, then compare.'
			});
			return;
		}

		this.attempts += 1;
		this._answerBlock.hidden = false;
		this._checkButton.disabled = true;
		this._checkButton.classList.add('opacity-50');
		this._input.readOnly = true;
		this.announce('The answer is now visible. Compare it against your prediction.');
		this._answerBlock.focus();
		this.save();
	}

	evaluate() {
		return { outcome: 'revealed' };
	}

	resetBody() {
		this._input.value = '';
		this._input.readOnly = false;
		this._answerBlock.hidden = true;
		this._checkButton.disabled = false;
		this._checkButton.classList.remove('opacity-50');
		const rating = this.querySelector('[data-self-rating]');
		if (rating) {
			rating.querySelectorAll('input[type="radio"]').forEach((input) => {
				input.checked = false;
			});
		}
	}

	static fromConfig(config, attributes = {}) {
		const element = document.createElement('prediction-reveal');
		for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
		element.config = config;
		return element;
	}
}

customElements.define('prediction-reveal', PredictionReveal);

registerWidget('prediction-reveal', {
	tag: 'prediction-reveal',
	factory: PredictionReveal.fromConfig,
	action: 'Commit a written prediction before seeing the outcome, then rate the match.',
	evidence: 'A prediction recorded before the reveal, and a self-assessment of the difference.'
});

export { PredictionReveal };
