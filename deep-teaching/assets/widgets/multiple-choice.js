/**
 * multiple-choice
 *
 * Learner action: select the option or options that satisfy the question.
 * Evidence: a discrimination judgment among plausible alternatives.
 *
 * Recognition is weak evidence. Use this widget for discrimination between
 * near-miss alternatives, not as proof that a learner can implement, debug, or
 * design. Every distractor carries its own rationale.
 *
 * Config form:
 *   {
 *     question: string,
 *     multiple: boolean,
 *     options: [{ id, text, correct, feedback }],
 *     pointer: string,
 *     misconception: string,
 *     revealAfterAttempts: number,   // default 2
 *     hints: string[]
 *   }
 */

import { WidgetBase } from './widget-base.js';
import { registerWidget } from './registry.js';

class MultipleChoice extends WidgetBase {
	get options() {
		return Array.isArray(this.config.options) ? this.config.options : [];
	}

	get correctIds() {
		return this.options.filter((option) => option.correct).map((option) => option.id);
	}

	buildBody(body, config) {
		const multiple = config.multiple === true;
		const name = `choice-${Math.random().toString(36).slice(2, 9)}`;

		const fieldset = document.createElement('fieldset');
		const legend = document.createElement('legend');
		legend.className = 'text-lg font-semibold';
		legend.textContent = config.question || 'Select the best answer.';
		fieldset.append(legend);

		if (multiple) {
			const note = document.createElement('p');
			note.className = 'mt-1 text-sm text-slate-600';
			note.textContent = 'Select every option that applies.';
			fieldset.append(note);
		}

		const group = document.createElement('div');
		group.className = 'mt-4 space-y-3';

		for (const option of this.options) {
			const label = document.createElement('label');
			label.className =
				'flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-slate-600';

			const input = document.createElement('input');
			input.type = multiple ? 'checkbox' : 'radio';
			input.name = name;
			input.value = option.id;
			input.className = 'mt-1 size-4';

			const text = document.createElement('span');
			text.textContent = option.text;

			// Per-option result marker. Text, not colour alone.
			const marker = document.createElement('span');
			marker.className = 'ml-auto text-sm font-semibold';
			marker.dataset.optionMarker = option.id;

			label.append(input, text, marker);
			group.append(label);
		}

		fieldset.append(group);
		body.append(fieldset);
		this._group = group;
	}

	readResponse() {
		const selected = [...this._group.querySelectorAll('input:checked')].map((input) => input.value);
		return selected.length === 0 ? null : selected;
	}

	evaluate(selected) {
		const correct = this.correctIds;
		const chosenCorrect = selected.filter((id) => correct.includes(id));
		const chosenWrong = selected.filter((id) => !correct.includes(id));
		const missed = correct.filter((id) => !selected.includes(id));

		this.markOptions(selected, correct);

		let outcome = 'incorrect';
		if (chosenWrong.length === 0 && missed.length === 0) outcome = 'correct';
		else if (chosenCorrect.length > 0 && chosenWrong.length === 0) outcome = 'partial';

		const optionById = new Map(this.options.map((option) => [option.id, option]));
		const detail = [];

		// The first consequential error is the first wrong selection, then the
		// first correct option the learner failed to select.
		let error = '';
		let why = '';
		const firstWrong = chosenWrong[0];
		if (firstWrong) {
			const option = optionById.get(firstWrong);
			error = `You selected "${option.text}".`;
			why = option.feedback || 'That option does not satisfy the question.';
		} else if (missed.length > 0) {
			const option = optionById.get(missed[0]);
			error = `You did not select "${option.text}".`;
			why = option.feedback || 'That option is part of the correct answer.';
		}

		for (const id of chosenWrong.slice(1)) {
			const option = optionById.get(id);
			if (option?.feedback) detail.push(`"${option.text}" — ${option.feedback}`);
		}

		const shouldReveal =
			outcome === 'correct' || this.attempts >= (this.config.revealAfterAttempts || 2);
		if (shouldReveal) {
			for (const id of correct) {
				const option = optionById.get(id);
				if (option?.feedback) detail.push(`Correct — "${option.text}": ${option.feedback}`);
			}
		}

		return {
			outcome,
			correctPart:
				chosenCorrect.length > 0
					? `You identified ${chosenCorrect.map((id) => `"${optionById.get(id).text}"`).join(', ')}.`
					: '',
			error,
			why,
			pointer: outcome === 'correct' ? '' : this.config.pointer || '',
			nextAction:
				outcome === 'correct'
					? this.config.nextAction || 'Move on to the independent exercise.'
					: shouldReveal
						? this.config.misconception || 'Read the rationale above, then explain the answer in your own words.'
						: 'Try again. Use a hint if the distinction is not clear.',
			detail
		};
	}

	markOptions(selected, correct) {
		for (const option of this.options) {
			const marker = this._group.querySelector(`[data-option-marker="${option.id}"]`);
			if (!marker) continue;
			const wasSelected = selected.includes(option.id);
			const isCorrect = correct.includes(option.id);
			if (wasSelected && isCorrect) marker.textContent = 'Correct';
			else if (wasSelected && !isCorrect) marker.textContent = 'Not this one';
			else marker.textContent = '';
		}
	}

	resetBody() {
		this._group.querySelectorAll('input').forEach((input) => {
			input.checked = false;
		});
		this._group.querySelectorAll('[data-option-marker]').forEach((marker) => {
			marker.textContent = '';
		});
	}

	static fromConfig(config, attributes = {}) {
		const element = document.createElement('multiple-choice');
		for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
		element.config = config;
		return element;
	}
}

customElements.define('multiple-choice', MultipleChoice);

registerWidget('multiple-choice', {
	tag: 'multiple-choice',
	factory: MultipleChoice.fromConfig,
	action: 'Discriminate between plausible alternatives, single or multi-select.',
	evidence: 'A recognition judgment with a rationale for each rejected distractor.'
});

export { MultipleChoice };
