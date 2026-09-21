/**
 * lesson-widget
 *
 * Host element. It builds a registered widget from JSON configuration so a
 * lesson page does not have to hand-write widget markup.
 *
 * Markup form:
 *   <lesson-widget
 *     widget-id="ordering-exercise"
 *     objective-id="obj-2"
 *     data-config='{ … }'>
 *     <div data-fallback>An equivalent exercise in plain text.</div>
 *   </lesson-widget>
 *
 * Failure behavior is deliberate. When `widget-id` is unknown, the config is
 * missing, or the config is still an unreplaced template placeholder, the host
 * leaves the authored fallback visible and warns in the console. A learner
 * never sees a broken control, and never sees an answer that leaked because
 * scripting failed.
 */

import { getWidget, listWidgets } from './registry.js';
import { parseConfig, WIDGET_EVENT } from './widget-base.js';

class LessonWidget extends HTMLElement {
	connectedCallback() {
		if (this._upgraded) return;
		this._upgraded = true;

		const widgetId = this.getAttribute('widget-id') || '';
		const objectiveId = this.getAttribute('objective-id') || '';
		const parsed = parseConfig(this.getAttribute('data-config'));

		if (!widgetId || widgetId.includes('{{')) {
			return this.keepFallback('widget-id is missing or is an unreplaced placeholder.');
		}

		const entry = getWidget(widgetId);
		if (!entry) {
			return this.keepFallback(
				`widget-id "${widgetId}" is not registered. Registered widgets: ${listWidgets().join(', ') || 'none'}.`
			);
		}

		if (!parsed.ok) {
			return this.keepFallback(`data-config is ${parsed.reason}.`);
		}

		if (!objectiveId) {
			// Not fatal, but every widget should produce evidence for an objective.
			console.warn(`[deep-teaching] <lesson-widget widget-id="${widgetId}"> has no objective-id.`);
		}

		const widget = entry.factory(parsed.value, {
			'widget-id': widgetId,
			...(objectiveId ? { 'objective-id': objectiveId } : {}),
			...(this.hasAttribute('persist') ? { persist: '' } : {})
		});

		this.innerHTML = '';
		this.append(widget);
		this.dataset.state = 'ready';

		this.addEventListener(WIDGET_EVENT, (event) => {
			this.dataset.outcome = event.detail.outcome;
		});
	}

	keepFallback(reason) {
		this.dataset.state = 'fallback';
		console.warn(`[deep-teaching] <lesson-widget> kept its static fallback: ${reason}`);
	}
}

customElements.define('lesson-widget', LessonWidget);

export { LessonWidget };
