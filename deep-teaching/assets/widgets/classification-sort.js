/**
 * classification-sort
 *
 * Learner action: assign each example to the category it belongs to.
 * Evidence: whether the learner applies the defining rule of each category
 * rather than matching surface features.
 *
 * Each item uses a native select, so the task works with keyboard, touch,
 * pointer, and assistive technology without custom ARIA.
 *
 * Config form:
 *   {
 *     question: string,
 *     categories: [{ id, label }],
 *     items: [{ id, text, category, rationale }],
 *     hints: string[]
 *   }
 */

import { WidgetBase } from './widget-base.js';
import { registerWidget } from './registry.js';

class ClassificationSort extends WidgetBase {
	get categories() {
		return Array.isArray(this.config.categories) ? this.config.categories : [];
	}

	get items() {
		return Array.isArray(this.config.items) ? this.config.items : [];
	}

	buildBody(body, config) {
		const heading = document.createElement('p');
		heading.className = 'text-lg font-semibold';
		heading.textContent = config.question || 'Assign each example to a category.';
		body.append(heading);

		const list = document.createElement('ul');
		list.className = 'mt-4 space-y-3';

		for (const item of this.items) {
			const id = `classify-${item.id}-${Math.random().toString(36).slice(2, 7)}`;

			const li = document.createElement('li');
			li.className = 'rounded-lg border border-slate-200 bg-white p-3 sm:flex sm:items-center sm:gap-4';

			const label = document.createElement('label');
			label.className = 'grow';
			label.setAttribute('for', id);
			label.textContent = item.text;

			const select = document.createElement('select');
			select.id = id;
			select.dataset.itemId = item.id;
			select.className =
				'mt-2 w-full rounded-md border border-slate-300 bg-white p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 sm:mt-0 sm:w-56';

			const placeholder = document.createElement('option');
			placeholder.value = '';
			placeholder.textContent = 'Not yet assigned';
			select.append(placeholder);

			for (const category of this.categories) {
				const option = document.createElement('option');
				option.value = category.id;
				option.textContent = category.label;
				select.append(option);
			}

			const marker = document.createElement('span');
			marker.className = 'mt-2 block text-sm font-semibold sm:mt-0 sm:w-28';
			marker.dataset.itemMarker = item.id;

			li.append(label, select, marker);
			list.append(li);
		}

		body.append(list);
		this._list = list;
	}

	readResponse() {
		const assignments = {};
		let assigned = 0;
		this._list.querySelectorAll('select').forEach((select) => {
			assignments[select.dataset.itemId] = select.value;
			if (select.value !== '') assigned += 1;
		});
		return assigned === 0 ? null : assignments;
	}

	evaluate(assignments) {
		const categoryLabel = new Map(this.categories.map((category) => [category.id, category.label]));
		const wrong = [];
		const unassigned = [];
		let correctCount = 0;

		for (const item of this.items) {
			const chosen = assignments[item.id] || '';
			const marker = this._list.querySelector(`[data-item-marker="${item.id}"]`);

			if (chosen === '') {
				unassigned.push(item);
				if (marker) marker.textContent = 'Not assigned';
				continue;
			}
			if (chosen === item.category) {
				correctCount += 1;
				if (marker) marker.textContent = 'Correct';
			} else {
				wrong.push({ item, chosen });
				if (marker) marker.textContent = 'Recheck';
			}
		}

		if (unassigned.length > 0) {
			return {
				outcome: 'incomplete',
				summary: `Assign every example before checking. ${unassigned.length} remaining.`,
				nextAction: 'Choose a category for each example, then check again.'
			};
		}

		const total = this.items.length;
		if (correctCount === total) {
			return {
				outcome: 'correct',
				summary: 'Every example is in the right category.',
				correctPart: 'You applied the defining rule, not the surface features.',
				nextAction: this.config.nextAction || 'Try the transfer exercise with unfamiliar examples.'
			};
		}

		const first = wrong[0];
		return {
			outcome: correctCount > 0 ? 'partial' : 'incorrect',
			summary: `${correctCount} of ${total} examples are in the right category.`,
			correctPart: correctCount > 0 ? `${correctCount} classifications are correct.` : '',
			error: `You placed "${first.item.text}" in ${categoryLabel.get(first.chosen) || first.chosen}.`,
			why:
				first.item.rationale ||
				`It belongs in ${categoryLabel.get(first.item.category) || first.item.category}.`,
			pointer: this.config.pointer || '',
			nextAction: 'Restate the rule that separates the two categories, then recheck the items marked Recheck.',
			detail: wrong.slice(1).map(
				(entry) =>
					`"${entry.item.text}" — ${entry.item.rationale || `belongs in ${categoryLabel.get(entry.item.category) || entry.item.category}.`}`
			)
		};
	}

	resetBody() {
		this._list.querySelectorAll('select').forEach((select) => {
			select.value = '';
		});
		this._list.querySelectorAll('[data-item-marker]').forEach((marker) => {
			marker.textContent = '';
		});
	}

	static fromConfig(config, attributes = {}) {
		const element = document.createElement('classification-sort');
		for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
		element.config = config;
		return element;
	}
}

customElements.define('classification-sort', ClassificationSort);

registerWidget('classification-sort', {
	tag: 'classification-sort',
	factory: ClassificationSort.fromConfig,
	action: 'Assign each example to the category defined by a rule.',
	evidence: 'Whether the learner applies the defining rule or matches surface features.'
});

export { ClassificationSort };
