# Accessibility

Use this reference for every standalone lesson, reference page, exercise, figure, and widget.

Target WCAG 2.2 Level AA unless the project states a different requirement. WCAG 2.2 organizes accessibility under four principles: perceivable, operable, understandable, and robust.[^1]

Do not claim conformance from this checklist alone. Conformance applies to the complete page or process and requires evaluation of all applicable success criteria.[^1]

## Use semantic HTML first

Prefer native HTML elements because they provide established keyboard and accessibility behavior.

Use:

- `button` for actions.
- `a` with `href` for navigation.
- `input`, `select`, and `textarea` for form entry.
- `fieldset` and `legend` for grouped choices.
- `details` and `summary` for ordinary disclosure when their behavior fits.
- Headings for document structure.
- Lists for actual lists.
- Tables for tabular data.
- `figure` and `figcaption` for figures.

Do not create a custom control from a `div` when a native element supports the required behavior. W3C guidance recommends preserving native control behavior where possible and providing functional fallbacks for scripted controls.[^2]

Use ARIA to expose missing semantics, not to replace correct HTML.

## Build a logical document structure

Every page must have:

- A descriptive page title.
- One `h1`.
- Headings in a logical hierarchy.
- Semantic landmarks such as `header`, `nav`, `main`, and `footer` when present.
- A skip link when repeated content precedes the main content.
- A reading order that matches the visual order.
- Descriptive link text.
- A declared document language.

Do not skip heading levels only for visual size. Style the correct heading level with Tailwind classes.

## Provide text alternatives

Provide a text alternative for meaningful non-text content. Hide purely decorative content from assistive technology.[^1]

For a simple image, write alt text that conveys its purpose in context.

For a complex figure:

- Give it a short accessible name.
- Add a nearby explanation, table, or long description.
- State the pattern or relationship that the learner must inspect.
- Preserve the underlying values when exact data matters.

Do not start alt text with `image of` unless the fact that it is an image is meaningful. Do not repeat an adjacent caption word for word.

## Do not rely on one sense

Instructions must not depend only on color, shape, position, orientation, or sound.[^1]

Replace:

> Select the green item on the right.

With:

> Select **Valid request**, shown in green with a check icon.

Use at least two indicators for important states, such as text plus color or icon plus text.

## Maintain contrast

At Level AA, normal text requires a contrast ratio of at least 4.5:1, and large text requires at least 3:1, subject to WCAG exceptions.[^1]

User-interface components, states, focus indicators that are required at Level AA, and meaningful graphical objects also need sufficient non-text contrast under the applicable criteria.[^1]

Check:

- Body text.
- Muted text.
- Links.
- Buttons.
- Input borders.
- Error and success states.
- Focus indicators.
- Chart marks and diagram edges.
- Text over gradients or images.

Do not assume a Tailwind color name guarantees compliant contrast. Test the actual foreground and background pair.

## Support keyboard operation

All functionality must be available through a keyboard interface unless the underlying function is inherently path dependent.[^1]

For every interactive element, verify:

- `Tab` reaches it in a logical order.
- `Shift+Tab` moves backward.
- `Enter` or `Space` activates it according to the native pattern.
- Arrow keys work where the established component pattern requires them.
- Focus remains visible.
- Focus is not trapped.
- Focus does not move unexpectedly.
- Focus returns to a sensible location after a dialog or temporary layer closes.

Do not require hover. Anything available on hover must also be available through keyboard focus or another persistent control.

## Make focus visible and unobscured

Use a visible focus indicator for keyboard-operable controls. Do not remove the browser outline without a clear replacement.

Ensure sticky headers, dialogs, banners, and floating controls do not fully hide the focused component. WCAG 2.2 adds requirements for focus not being obscured.[^1]

Use Tailwind `focus-visible` styles that remain visible against every component state.

## Provide alternatives to dragging

If a widget supports drag-and-drop, provide a single-pointer method that does not require dragging.[^1]

Examples include:

- Move up and move down buttons.
- Select an item, then select its destination.
- A listbox with keyboard reordering.
- Numeric or text entry for position.

The alternative must complete the same task and produce the same evidence.

## Use adequate target sizes

WCAG 2.2 Level AA defines a minimum target-size requirement of 24 by 24 CSS pixels, subject to stated exceptions.[^1]

Prefer larger targets for lesson controls, especially on touch devices. Provide enough spacing to prevent accidental activation.

Do not make a small icon the only activation target when the visible label can be included in the same button.

## Label controls and inputs

Every form control must have a programmatically associated label or accessible name.

Use visible labels for learner input. Placeholder text is not a label.

For each input:

- State the expected response.
- State formatting or range constraints before submission.
- Identify required fields in text and markup.
- Associate help and error text programmatically.
- Keep the visible label in the accessible name.

Group related radio buttons and checkboxes with `fieldset` and `legend`.

## Report errors clearly

When validation detects an error:

- Identify the field or response.
- Describe the problem in text.
- Provide a correction suggestion when known.
- Keep the learner’s valid input.
- Move focus only when the move helps and does not surprise the learner.
- Announce the error programmatically when needed.

Do not use color alone. Do [118;1:3unot clear the entire activity after one error.

## Announce status without stealing focus

Use `role="status"`, `aria-live="polite"`, or another appropriate mechanism for feedback that appears without a context change. WCAG 2.2 requires status messages to be programmatically determinable so assistive technology can present them without receiving focus.[^1]

Use live regions for:

- Submission results.
- Updated score or progress when meaningful.
- Validation feedback.
- Simulation state changes that are not otherwise apparent.

Do not announce every pointer movement, slider tick, animation frame, or decorative update.

## Expose custom-widget semantics

A custom widget must expose accurate:

- Name.
- Role.
- Value.
- State.
- Properties.
- Changes to those values and states.

Use established interaction patterns. If the widget resembles a standard control, it should behave like that control.

For a new widget, document:

- Keyboard commands.
- Pointer and touch behavior.
- Screen-reader expectations.
- Focus movement.
- State model.
- Error behavior.
- Reset behavior.
- Static fallback.

Do not create an ARIA role without implementing the expected behavior.

## Make feedback accessible

Feedback must be available visually and programmatically.

For correct, partial, and incorrect responses:

- Use text that names the state.
- Explain the result.
- Do not rely on green, amber, or red alone.
- Preserve the learner’s response when comparison helps.
- Place feedback near the relevant activity.
- Announce meaningful updates.

A check icon alone does not communicate `correct` to every learner.

## Control time

Avoid time limits unless time is part of the authentic objective.

If a time limit is required and not covered by an exception, provide the warning and adjustment, extension, or disable mechanisms required by WCAG.[^1]

Do not use a timer only to create pressure or engagement. Do not treat slow operation of an inaccessible control as lack of knowledge.

## Control motion and updates

Avoid automatic motion. Respect `prefers-reduced-motion`.

For moving, blinking, scrolling, or auto-updating content:

- Provide pause, stop, hide, or frequency controls when required.
- Keep essential state available without animation.
- Avoid flashing content.
- Do not move the learner’s focus automatically.
- Avoid parallax and large motion that do not support the lesson.

A step-through control is usually better than an automatic animation for an instructional process.

## Support reflow and zoom

The page must remain usable at narrow widths and increased zoom.

Verify:

- Text reflows without horizontal scrolling at the applicable width.
- Controls do not overlap.
- Feedback remains adjacent to the activity.
- Tables and diagrams use contained scrolling only when their two-dimensional layout requires it.
- No content or function disappears at 200 percent text resize.
- The page does not lock orientation unless orientation is essential.

Use responsive Tailwind utilities. Do not encode meaning through desktop-only placement.

## Make diagrams accessible

For Mermaid diagrams, include `accTitle` and `accDescr`. Mermaid uses those fields to add title and description elements and associated ARIA attributes to the generated SVG.[^3]

For every complex diagram:

- Add a concise name.
- Add a useful description.
- Provide a prose, list, or table equivalent.
- Preserve labels as text.
- Avoid color-only relationships.
- Check reading order.

An accessible description should explain the relationship that the learner needs, not list every decorative property.

## Make media accessible

For audio and video, provide the alternatives required by the media type and lesson purpose.

Depending on the content, this can include:

- Captions.
- A transcript.
- Audio description.
- A descriptive transcript.
- Speaker identification.
- Descriptions of meaningful sound.
- Keyboard-accessible playback controls.

Do not autoplay audio. If audio starts automatically for more than three seconds, WCAG requires a pause, stop, or independent volume mechanism.[^1]

## Support non-JavaScript or failure states

When practical, provide a static fallback for a widget:

- The prompt.
- A response method that does not require the script.
- The answer or explanation in a separate key.
- A textual representation of the demonstration.

At minimum, script failure must not hide the lesson instructions, source content, or essential explanation.

Do not record a learner failure when the widget failed to load or execute.

## Protect privacy

Keep learner responses local by default.

If a page stores or transmits responses:

- State what data is collected.
- State where it is stored or sent.
- State why it is needed.
- Avoid collecting unnecessary identity information.
- Do not include secrets in client-side code.
- Provide deletion or reset behavior when practical.

Accessibility data and learner records can contain sensitive information. Do not infer a diagnosis or disability from interaction behavior.

## Test every widget state

Test:

- Initial state.
- Empty submission.
- Partial response.
- Correct response.
- Incorrect response.
- Repeated submission.
- Hint progression.
- Reset.
- Keyboard-only operation.
- Touch and pointer operation.
- Screen-reader announcements.
- High zoom and narrow viewport.
- Reduced motion.
- Script or asset failure.

For ordering, sliders, and other complex widgets, also test minimum, maximum, duplicate, invalid, and boundary states.

## Manual accessibility review

Complete this review before delivery:

1. Navigate the full page with the keyboard.
2. Confirm a visible and unobscured focus indicator.
3. Activate every control without a pointer.
4. Check headings, landmarks, labels, and reading order with accessibility tools.
5. Verify names, roles, values, and states for custom widgets.
6. Trigger every feedback and error state.
7. Confirm that status messages are announced without unnecessary focus movement.
8. Check contrast for text, controls, states, and graphics.
9. Zoom and test a narrow viewport.
10. Enable reduced motion.
11. Confirm text alternatives and complex-visual equivalents.
12. Disable or break JavaScript and inspect the fallback.
13. Confirm that technical failure cannot become negative learner evidence.

Automated tools can help locate issues, but they do not replace keyboard, screen-reader, visual, and task-based review.

## Accessibility completion checklist

Before delivery, verify:

- The page has a title, language, one `h1`, and logical headings.
- Semantic HTML is used before ARIA.
- All meaningful non-text content has an equivalent.
- Color, position, shape, motion, or sound is never the only instruction.
- Text and non-text contrast meet the target.
- Every function works from the keyboard.
- Focus is visible, logical, and unobscured.
- Dragging has a non-drag alternative.
- Targets are large and separated enough.
- Controls have visible labels and programmatic names.
- Errors identify the problem and suggest correction when known.
- Status messages are announced appropriately.
- Timers and motion are avoidable or controllable.
- The page reflows and supports zoom.
- Media has the required alternatives.
- Widgets have documented semantics and fallbacks.
- Learner data remains local unless transmission is explicit.
- Manual testing covers the complete learner task.

## Sources

[^1]: World Wide Web Consortium, *Web Content Accessibility Guidelines 2.2*, W3C Recommendation, 12 December 2024. https://www.w3.org/TR/WCAG22/

[^2]: World Wide Web Consortium, “Custom Controls,” Web Accessibility Initiative Forms Tutorial. https://www.w3.org/WAI/tutorials/forms/custom-controls/

[^3]: Mermaid, “Accessibility Options.” https://mermaid.ai/open-source/config/accessibility.html

