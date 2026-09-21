/**
 * Widget registry.
 *
 * Maps a stable `widget-id` to a custom-element tag name and its `fromConfig`
 * factory. `<lesson-widget>` uses this map to build a widget from JSON
 * configuration. Keep the id stable: lessons and learning records reference it.
 */

const registry = new Map();

/**
 * Register a widget type.
 *
 * @param {string} id Stable widget id, for example `multiple-choice`.
 * @param {{tag: string, factory: Function, action: string, evidence: string}} entry
 */
export function registerWidget(id, entry) {
	if (registry.has(id)) {
		console.warn(`[deep-teaching] widget id "${id}" was registered twice. The later registration wins.`);
	}
	registry.set(id, entry);
}

/** @returns {object|undefined} The registry entry, or undefined when the id is unknown. */
export function getWidget(id) {
	return registry.get(id);
}

/** @returns {string[]} Every registered widget id, sorted. */
export function listWidgets() {
	return [...registry.keys()].sort();
}

/**
 * Describe the registered widgets by learner action.
 * Use this when selecting a widget for an objective.
 *
 * @returns {Array<{id: string, action: string, evidence: string}>}
 */
export function describeWidgets() {
	return listWidgets().map((id) => {
		const entry = registry.get(id);
		return { id, action: entry.action, evidence: entry.evidence };
	});
}
