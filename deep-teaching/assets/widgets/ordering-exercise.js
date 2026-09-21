/**
 * ordering-exercise
 *
 * Learner action: arrange steps or components into the correct sequence.
 * Evidence: a sequencing judgment that shows whether the learner holds the
 * causal or procedural order, not only the vocabulary.
 *
 * Ordering is done with Move up and Move down buttons. The task never depends
 * on pointer input, drag gestures, or colour. Each move is announced, and
 * focus stays on the control the learner pressed.
 *
 * Config form:
 *   {
 *     question: string,
 *     items: [{ id, text, rationale }],
 *     correctOrder: string[],
 *     initialOrder: string[],   // default: correctOrder rotated left by one
 *     hints: string[]
 *   }
 */

import { WidgetBase } from './widget-base.js';
import { registerWidget } from './registry.js';

class OrderingExercise extends WidgetBase {
	get items() {
		return Array.isArray(this.config.items) ? this.config.items : [];
	}

	get correctOrder() {
		return Array.isArray(this.config.correctOrder) ? this.config.correctOrder : this.items.map((item) => item.id);
	}

	/** Deterministic starting order. The same lesson always opens the same way. */
	initialOrder() {
		if (Array.isArray(this.config.initialOrder) && this.config.initialOrder.length > 0) {
			return [...this.config.initialOrder];
		}
		const correct = this.correctOrder;
		if (correct.length < 2) return [...correct];
		return [...correct.slice(1), correct[0]];
	}

	buildBody(body, config) {
		const heading = document.createElement('p');
		heading.className = 'text-lg font-semibold';
		heading.textContent = config.question || 'Put these in the correct order.';
		body.append(heading);

		const help = document.createElement('p');
		help.className = 'mt-1 text-sm text-slate-600';
		help.textContent = 'Use the Move up and Move down buttons, or press them with the keyboard.';
		body.append(help);

		this._order = this.initialOrder();
		this._list = document.createElement('ol');
		this._list.className = 'mt-4 space-y-2';
		body.append(this._list);
		this.paint();
	}

	itemById(id) {
		return this.items.find((item) => item.id === id) || { id, text: id };
	}

	paint(focusRequest = null) {
		this._list.innerHTML = '';

		this._order.forEach((id, index) => {
			const item = this.itemById(id);

			const li = document.createElement('li');
			li.className = 'flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3';
			li.dataset.itemId = id;

			const position = document.createElement('span');
			position.className = 'w-6 shrink-0 text-sm font-semibold text-slate-500';
			position.textContent = `${index + 1}.`;

			const text = document.createElement('span');
			text.className = 'grow';
			text.textContent = item.text;

			const marker = document.createElement('span');
			marker.className = 'text-sm font-semibold';
			marker.dataset.itemMarker = id;

			const controls = document.createElement('span');
			controls.className = 'flex shrink-0 gap-1';
			controls.append(
				this.moveButton(id, index, -1, `Move ${item.text} up`),
				this.moveButton(id, index, 1, `Move ${item.text} down`)
			);

			li.append(position, text, marker, controls);
			this._list.append(li);
		});

		if (focusRequest) {
			const selector = `[data-move="${focusRequest.direction}"][data-item="${focusRequest.id}"]`;
			const button = this._list.querySelector(selector);
			// The item may have reached an end, where that button is now disabled.
			const fallback = this._list.querySelector(`[data-item="${focusRequest.id}"]:not([disabled])`);
			(button && !button.disabled ? button : fallback)?.focus();
		}
	}

	moveButton(id, index, delta, label) {
		const button = document.createElement('button');
		button.type = 'button';
		button.className =
			'rounded-md border border-slate-300 px-2 py-1 text-sm font-semibold hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:opacity-40';
		button.textContent = delta < 0 ? 'Up' : 'Down';
		button.dataset.move = delta < 0 ? 'up' : 'down';
		button.dataset.item = id;
		button.setAttribute('aria-label', label);
		button.disabled = delta < 0 ? index === 0 : index === this._order.length - 1;
		button.addEventListener('click', () => this.move(id, delta));
		return button;
	}

	move(id, delta) {
		const from = this._order.indexOf(id);
		const to = from + delta;
		if (to < 0 || to >= this._order.length) return;

		this._order.splice(to, 0, this._order.splice(from, 1)[0]);
		this.paint({ id, direction: delta < 0 ? 'up' : 'down' });
		this.announce(`${this.itemById(id).text} moved to position ${to + 1} of ${this._order.length}.`);
	}

	readResponse() {
		return [...this._order];
	}

	evaluate(order) {
		const correct = this.correctOrder;
		const placed = order.filter((id, index) => id === correct[index]);

		for (const id of order) {
			const marker = this._list.querySelector(`[data-item-marker="${id}"]`);
			if (!marker) continue;
			marker.textContent = order.indexOf(id) === correct.indexOf(id) ? 'In place' : 'Out of place';
		}

		if (placed.length === correct.length) {
			return {
				outcome: 'correct',
				summary: 'Correct order.',
				correctPart: 'Every step is in the right position.',
				nextAction: this.config.nextAction || 'Explain why the order cannot be rearranged.'
			};
		}

		// The first consequential error is the earliest position that is wrong.
		const firstWrongIndex = order.findIndex((id, index) => id !== correct[index]);
		const expected = this.itemById(correct[firstWrongIndex]);
		const found = this.itemById(order[firstWrongIndex]);

		return {
			outcome: placed.length > 0 ? 'partial' : 'incorrect',
			summary: `${placed.length} of ${correct.length} steps are in the right position.`,
			correctPart:
				placed.length > 0
					? `Correctly placed: ${placed.map((id) => this.itemById(id).text).join(', ')}.`
					: '',
			error: `Position ${firstWrongIndex + 1} holds "${found.text}".`,
			why:
				expected.rationale ||
				`"${expected.text}" has to happen at position ${firstWrongIndex + 1}, because every later step depends on its result.`,
			pointer: this.config.pointer || '',
			nextAction: 'Fix the earliest position first. The later steps often fall into place.'
		};
	}

	resetBody() {
		this._order = this.initialOrder();
		this.paint();
	}

	static fromConfig(config, attributes = {}) {
		const element = document.createElement('ordering-exercise');
		for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
		element.config = config;
		return element;
	}
}

customElements.define('ordering-exercise', OrderingExercise);

registerWidget('ordering-exercise', {
	tag: 'ordering-exercise',
	factory: OrderingExercise.fromConfig,
	action: 'Arrange steps or components into the correct sequence.',
	evidence: 'A sequencing judgment showing the learner holds the causal or procedural order.'
});

export { OrderingExercise };
