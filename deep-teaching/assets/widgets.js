/**
 * deep-teaching widget library.
 *
 * Load once per lesson page:
 *   <script type="module" src="../assets/widgets.js"></script>
 *
 * Importing this file defines every widget custom element and fills the
 * registry that `<lesson-widget>` reads. Widgets are framework-free custom
 * elements. They keep learner responses in memory, and write to localStorage
 * only when a widget carries the `persist` attribute. No widget sends a
 * learner response anywhere.
 *
 * See `assets/widgets/README.md` for each widget's attributes, config schema,
 * events, and accessibility behavior.
 */

import { registerWidget, getWidget, listWidgets, describeWidgets } from './widgets/registry.js';
import { WidgetBase, WIDGET_EVENT } from './widgets/widget-base.js';

import './widgets/prediction-reveal.js';
import './widgets/multiple-choice.js';
import './widgets/ordering-exercise.js';
import './widgets/classification-sort.js';
import './widgets/lesson-widget.js';

export { registerWidget, getWidget, listWidgets, describeWidgets, WidgetBase, WIDGET_EVENT };
