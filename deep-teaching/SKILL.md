---
name: deep-teaching
description: "Teach concepts and skills through sourced explanations, interactive tutorials, figures, exercises, quizzes, and adaptive assessment. Use when a learner asks for an explanation, guided lesson, tutorial, practice session, quiz, reference, or multi-session course."
argument-hint: "What do you want to learn or become able to do?"
version: 1.0.0
---

# Teach

Create lessons that help a learner explain, apply, and retain a concept. Use real sources, observable objectives, purposeful figures, meaningful interaction, and assessment evidence.

Do not mistake presentation for teaching. A polished page is incomplete unless the learner must think, act, receive useful feedback, and apply the concept.

Apply the `technical-writing` skill to all prose. Use its tutorial mode for guided lessons, explanation mode for conceptual background, reference mode for lookup pages, and how-to mode for task-focused procedures. Keep each output focused on its primary mode. Link to separate material when another mode needs substantial space.

## Route to the reference files

`SKILL.md` carries the working rules. The `references/` files carry the detail behind them. Read a reference file before the work it governs, not after the output exists.

| Read this | Before you |
|---|---|
| `references/pedagogy.md` | Sequence a lesson or course, set difficulty, or judge whether an objective is demonstrated |
| `references/lesson-format.md` | Select the output mode, or assemble a lesson, course, or reference page |
| `references/assessment-design.md` | Write an exercise, quiz, diagnostic, project, rubric, or feedback |
| `references/source-policy.md` | Make a factual claim, cite a source, or teach version-specific behavior |
| `references/visual-design.md` | Design a figure, diagram, plot, animation, simulation, trace, or table |
| `references/accessibility.md` | Deliver any HTML output, or build or modify a widget |
| `references/widget-design.md` | Specify a new widget: learner action, state model, evaluation rules, feedback states, focus, and fallback |
| `assets/widgets/README.md` | Select or configure a supplied widget, or register a new one |

Read only the files the request touches. A one-paragraph conversational answer needs `source-policy.md` and nothing else. A standalone interactive lesson needs most of them.

## Produce the output workspace

The skill's own files stay in the skill. Never copy `SKILL.md`, `references/`, or `templates/` into the learner's workspace.

Write output into the directory the user names, or into the current working directory.

A bounded lesson or reference page writes:

```text
lessons/
reference/
assets/
```

A multi-session course adds persistent state:

```text
MISSION.md
LEARNER.md
COURSE.md
RESOURCES.md
GLOSSARY.md
PROGRESS.md
lessons/
reference/
learning-records/
assets/
```

Copy `assets/` from the skill into the workspace the first time you produce an HTML lesson. The lesson template loads the widget library from `../assets/widgets.js`, relative to `lessons/`. Copying it keeps the workspace self-contained and able to run offline.

Do not create an `examples/` directory unless the user asks for one.

Use Tailwind CSS for lesson and reference-page styling. Do not maintain a separate lesson stylesheet. For prototypes, the HTML can load Tailwind through its browser script. For production or offline delivery, compile the used Tailwind classes into a local CSS file and remove the network dependency.

## Select the teaching mode

Select one primary mode before producing content.

Read `references/lesson-format.md` for the full contract of each mode and for the rules on splitting mixed-mode material.

| Mode | Learner request | Default result |
|---|---|---|
| Explain | “What is X?” or “Why does X happen?” | A concise explanation with one useful example or figure |
| Guided lesson | “Teach me X” | A bounded lesson with explanation, practice, and feedback |
| Tutorial | “Teach me X by building Y” | A complete guided project with visible results |
| Practice | “Help me practice X” | Exercises, staged hints, feedback, and correction |
| Assess | “Test me on X” | A diagnostic or summative assessment with evidence by objective |
| Course | “Help me learn X over time” | A course plan, lessons, learning records, and scheduled retrieval |
| Reference | “Make a cheat sheet for X” | A factual lookup page organized around the subject |

If the request combines modes, select the mode that serves the immediate goal. Split substantial supporting material into linked outputs. A guided lesson can contain short explanations and formative checks without becoming a mixed-mode document.

## Determine the learning context

Before designing the lesson, determine:

- The capability the learner wants to gain.
- The learner’s current knowledge and relevant experience.
- Required prerequisites.
- The available time and desired depth.
- The tools, language, platform, or environment involved.
- Whether the goal is conceptual, procedural, or both.
- Constraints such as accessibility, offline use, grading, or classroom delivery.

Infer this information from the conversation when the evidence is sufficient. Ask only questions whose answers materially change the lesson. Do not block a small lesson with a long intake interview. State reasonable assumptions when proceeding without an answer.

For a course, write the learner’s purpose as a mission:

> Become able to [observable capability] so that [real purpose or context].

Use the mission to select examples, exercises, sources, and later lessons.

## Define observable objectives

Define between one and three objectives for a bounded lesson. Start each objective with an observable action.

Read `references/pedagogy.md` before you write objectives for a course, or when a single lesson has to carry more than three.

Use verbs such as:

- Identify.
- Classify.
- Trace.
- Predict.
- Compare.
- Explain.
- Debug.
- Design.
- Implement.
- Evaluate.

Do not use vague objectives such as “understand,” “learn,” “know,” or “be familiar with.”

Each objective must identify:

- The action the learner performs.
- The content or system involved.
- Any important condition or constraint.
- The evidence that demonstrates success.

Keep an alignment chain for every objective:

```text
learner goal
→ observable objective
→ explanation or demonstration
→ guided practice
→ independent exercise
→ assessment evidence
→ next learning decision
```

Remove an activity that does not support an objective. Revise an objective that has no assessment evidence.

## Research before teaching

Read `references/source-policy.md` before citing anything. It defines what counts as verification, how to record a source, and what to do when sources disagree.

Research claims that depend on external facts, current behavior, disputed interpretations, standards, APIs, or product versions. Prefer sources in this order:

1. Official standards, specifications, documentation, and primary research.
2. Material written by maintainers or recognized subject experts.
3. Textbooks and university material.
4. Reputable secondary sources.
5. Community material used for examples, practical experience, or competing views.

Use current sources when the topic can change. Confirm version-specific behavior against the relevant version of the official documentation.

For each source, record:

- Title.
- Author or organization.
- URL or stable identifier.
- Publication or update date when available.
- Access date when relevant.
- The claim or lesson element that the source supports.

Place citations near important claims. End each lesson with a short source list that states what each source contributes. Do not create citations, quotations, dates, or source details that you did not verify.

Distinguish these forms of content:

- **Established fact:** State the fact and cite its source.
- **Interpretation:** Identify the interpretation and cite the evidence behind it.
- **Teaching simplification:** State that the model is simplified and name the omitted detail when it could affect the learner’s later reasoning.
- **Author judgment:** State the basis for the recommendation. Do not present judgment as a universal rule.

## Set scope and difficulty

Teach the smallest complete unit that advances the learner’s goal. Do not compress a complex idea until it becomes misleading.

Read `references/pedagogy.md` for the rules on spacing, interleaving, and difficulty adjustment.

Choose difficulty from evidence:

- Use prerequisite checks to find missing foundations.
- Start below the point where terminology prevents progress.
- Increase difficulty after the learner succeeds without excessive hints.
- Reduce complexity or add scaffolding after repeated conceptual errors.
- Do not treat a formatting mistake as a conceptual failure.

For a multi-session course, revisit important material after a delay. Mix related concepts only after teaching each concept clearly on its own.

## Construct a bounded lesson

Use this sequence unless the subject requires a different order:

1. **Purpose.** Connect the lesson to the learner’s mission or practical goal.
2. **Objectives.** State what the learner will be able to do.
3. **Prerequisite check.** Use one or two brief prompts to confirm necessary knowledge.
4. **Plain explanation.** Give the smallest complete explanation in ordinary language.
5. **Concrete model.** Demonstrate the mechanism with an example, trace, figure, or simulation.
6. **Prediction.** Ask the learner to predict an outcome before revealing it.
7. **Worked example.** Solve one representative problem and expose the important reasoning.
8. **Guided practice.** Provide scaffolding, staged hints, and immediate explanatory feedback.
9. **Independent exercise.** Remove most scaffolding and require the target performance.
10. **Retrieval check.** Test recall without copying the lesson’s wording.
11. **Transfer exercise.** Apply the concept in a different context or representation.
12. **Corrections.** Explain correct answers, wrong answers, and likely misconceptions.
13. **Summary.** Restate only the ideas needed for the objectives.
14. **Sources.** List the verified sources and their contribution.
15. **Next step.** Select the next action from the learner’s evidence.

A short explanation does not need every section. A complete guided lesson does.

Do not reveal an exercise solution before the learner has a meaningful chance to answer. Provide hints in stages. Make the first hint point to the relevant idea. Make the second hint narrow the procedure. Reveal the full solution only after an attempt, an explicit request, or exhausted hints.

## Design explanations

Start with a plain, accurate definition. Then connect the concept to something the learner can inspect, predict, or use.

Use these rules:

- Introduce one necessary term at a time.
- Define a domain term when it first appears.
- Use one name for each concept throughout the lesson.
- Separate the core model from exceptions.
- State where an analogy stops matching the real system.
- Prefer a mechanism over a slogan.
- Use a concrete example before an abstract generalization when the learner lacks context.
- Show intermediate states when a result depends on a process.
- Name common misconceptions before they become habits.
- Preserve uncertainty and scope limits from the sources.

When a system has three or more interacting parts, reveal the visual model progressively. Start with the first meaningful relationship. Add one component, state, or edge at a time. Explain what changed after each step.

## Design figures and demonstrations

Every figure must support an objective. Do not add a visual only to decorate the page.

Read `references/visual-design.md` before building any figure. It covers representation choice, progressive reveal, labelling, colour, and the accessible-alternative requirement.

Select the representation that best matches the content:

- Use Mermaid for flows, states, hierarchies, sequences, and relationships.
- Use SVG for accessible, scalable, interactive diagrams.
- Use Canvas for dense animation or simulation when SVG is impractical.
- Use plots for relationships among quantities.
- Use tables for exact comparisons.
- Use annotated code and execution traces for program behavior.
- Use generated illustrations for spatial or physical ideas that a diagram cannot communicate well.

Every figure must include:

- A learning purpose.
- A descriptive caption.
- Short, consistent labels.
- Consistent colors and symbols.
- Sufficient color contrast.
- Alt text or a nearby textual equivalent.
- A non-color cue for distinctions conveyed by color.
- The source of data or borrowed structure, when applicable.

For interactive figures, provide controls that change a meaningful property. State what the learner should observe. Include a reset action and a stable initial state.

## Design meaningful interaction

An interaction is meaningful only when it requires the learner to reason or perform the target skill.

A widget should ask the learner to do at least one of these actions:

- Predict an outcome.
- Manipulate a meaningful variable.
- Arrange steps or components.
- Classify examples.
- Construct an answer.
- Trace a process.
- Detect and correct an error.
- Compare alternatives.
- Explain a decision.

A control that only reveals hidden prose does not count as practice. Disclosure controls can support navigation, but they do not replace an exercise.

Each widget must define:

- The objective it supports.
- The learner action.
- The initial state.
- All valid interaction states.
- The evaluation rule.
- Feedback for correct, partially correct, and incorrect responses.
- At least one useful hint when the task can block progress.
- A reset action.
- Keyboard behavior.
- Focus behavior.
- Screen-reader labels and status announcements.
- A textual or static fallback when practical.
- Whether learner data persists and where it is stored.

Do not transmit learner responses unless the user explicitly requests remote persistence or analytics.

## Reuse or create widgets

Inspect the available widgets before creating a new one. Reuse an existing widget when its learner action, feedback model, and accessibility behavior fit the objective. Do not force a novel learning activity into an unsuitable widget merely to avoid implementation work.

The skill supplies these widgets in `assets/widgets/`. Read `assets/widgets/README.md` for each config schema, event, and accessibility guarantee. Read `references/widget-design.md` before specifying a new one.

| Widget | Learner action | Evidence it produces |
|---|---|---|
| `prediction-reveal` | Commit a prediction in writing, then compare it against the model answer and rate the match | A prediction made before the answer was visible, and the learner's judgment of the difference |
| `multiple-choice` | Select the option or options that satisfy the question, single or multi-select | A discrimination judgment among plausible alternatives |
| `ordering-exercise` | Arrange steps or components into the correct sequence | Whether the learner holds the causal or procedural order |
| `classification-sort` | Assign each example to the category it belongs to | Whether the learner applies the defining rule or matches surface features |

`lesson-widget` is the host element. It builds any registered widget from JSON configuration and keeps the authored static fallback when the widget cannot load.

All four handle hints, reset, structured feedback, announcements, and result events through a shared base class. Extend `WidgetBase` rather than reimplementing that behavior.

When no existing widget fits, create a new widget from the pedagogical need:

1. Name the learner action without naming a UI control. For example, use “order the request lifecycle,” not “use drag and drop.”
2. Define the evidence of success.
3. Define the smallest state model that can capture the learner’s attempt.
4. Select controls that work with pointer, keyboard, touch, and assistive technology.
5. Define evaluation rules before writing the interface.
6. Write feedback for expected misconceptions, not only a generic error state.
7. Provide staged hints.
8. Implement a reset action and deterministic initial state.
9. Add a static fallback or equivalent text exercise when practical.
10. Test all states, including empty, partial, correct, incorrect, reset, and repeated submission.
11. Save the reusable implementation in `assets/widgets/`, extending `WidgetBase`.
12. Register it with `registerWidget` and import the module from `assets/widgets.js`.
13. Document its public attributes, config schema, events, expected markup, and accessibility behavior in `assets/widgets/README.md`.

Prefer framework-free Web Components or small ES modules for reusable widgets. Use semantic HTML before custom ARIA. Keep assessment state separate from visual presentation. Tailwind CSS can style the component, but class names must not encode the evaluation logic.

A newly invented widget must remain understandable without instructions that describe every click. If the interaction needs extensive UI explanation, simplify the interaction.

## Build common widget types

Read `references/widget-design.md` for a worked specification of each type below.

Use or create these widget types when they match the objective:

- Prediction and reveal.
- Single-answer multiple choice.
- Multiple-select classification.
- Ordering and sequencing.
- Matching.
- Parameter control with a live figure.
- Step-through process simulation.
- Fill-in code or text.
- Debugging exercise.
- Confidence rating.
- Free response with a rubric or model answer.
- Diagram labeling.
- State-machine exploration.
- Data interpretation.
- Construct-and-test sandbox.

Do not select a widget because it is visually impressive. Select it because its learner action matches the objective.

## Create exercises and assessments

Use formative checks during instruction and summative assessment after a coherent lesson group.

Read `references/assessment-design.md` before writing items. It defines validity, distractor construction, rubric design, and the evidence each objective verb requires.

Formative checks can include:

- Predictions.
- One-question retrieval prompts.
- Guided corrections.
- Confidence ratings.
- Small debugging tasks.
- Explanation prompts.

Summative assessment can include:

- Mixed-topic questions.
- Unfamiliar applications.
- Longer exercises.
- Projects.
- Explanations evaluated with a rubric.

Match the assessment to the objective. A recognition question does not prove that a learner can implement, debug, design, or explain.

For each assessment item, define:

```text
Question or task
Objective tested
Difficulty
Expected answer or performance
Evaluation criteria
Why the answer is correct
Why each distractor or common wrong approach fails
Likely misconception
Hint 1
Hint 2
Full explanation or model solution
```

Use plausible distractors based on real misconceptions. Keep answer choices grammatically parallel. Do not make the correct option conspicuous through length, specificity, formatting, or vocabulary.

Do not test a concept only seconds after presenting it. Include later retrieval for durable learning. After separate instruction, interleave related concepts so the learner must choose the correct method.

## Give feedback

Feedback must help the learner revise a mental model or procedure.

Read `references/assessment-design.md` for rubric wording and for feedback patterns keyed to specific misconceptions.

Use this order:

1. State what part of the response is correct.
2. Identify the first consequential error.
3. Explain why that error changes the result.
4. Point to the relevant concept or step.
5. Give a focused next action or hint.
6. Ask for another attempt when practice remains useful.

Do not return only “correct” or “incorrect.” Do not praise effort with generic language in place of information. Do not list every minor error before addressing the main misconception.

For free responses, use a visible rubric. Separate conceptual accuracy, reasoning, execution, and communication when those dimensions matter.

## Adapt from learner evidence

Use observed performance, not assumed ability, to choose the next step.

Read `references/pedagogy.md` for the evidence thresholds behind each of these decisions.

Record:

- Objectives attempted.
- Evidence produced.
- Hints used.
- Misconceptions.
- Confidence.
- Successful transfer.
- Topics that need delayed retrieval.

Choose among these next actions:

- Continue when the learner demonstrates the objective independently.
- Add another representation when the learner repeats the same conceptual error.
- Return to a prerequisite when the learner lacks a required foundation.
- Increase difficulty when the learner succeeds without hints.
- Schedule retrieval when immediate performance is strong but retention is untested.
- Ask the learner to explain the idea when correct answers may result from guessing.

Do not mark an objective as mastered from one multiple-choice answer. Require evidence that matches the objective.

## Maintain course state

For a multi-session course, maintain these files:

```text
MISSION.md
LEARNER.md
COURSE.md
RESOURCES.md
GLOSSARY.md
PROGRESS.md
learning-records/
lessons/
reference/
assets/
```

Use `templates/course-plan.md` for `COURSE.md`, and `templates/learning-record.md` for each completed or paused lesson in `learning-records/`.

Track objective status with these stages:

- Not introduced.
- Introduced.
- Practiced with support.
- Demonstrated independently.
- Demonstrated in transfer.
- Due for retrieval.
- Retained after delay.

Do not rewrite the entire course after each lesson. Update only the plan, records, and resources affected by new evidence.

## Produce conversational explanations

For a narrow question:

1. Answer directly.
2. Give the smallest complete explanation.
3. Add one concrete example, figure, or check when it improves understanding.
4. Identify an important limitation or exception when omitting it would mislead.
5. Cite claims that require external verification.
6. Stop at a natural boundary.

Do not force a quiz into every explanation. Offer or include practice when the learner asked to be taught, practice, or assess understanding.

## Produce standalone lessons

Use `templates/lesson.html` for a bounded interactive lesson. Copy the skill's `assets/` directory into the workspace so the page can load `../assets/widgets.js`.

A standalone lesson must:

- Work without the chat transcript.
- State its objectives and prerequisites.
- Include explanation, demonstration, practice, and feedback.
- Cite verified sources.
- Use Tailwind CSS for presentation.
- Use semantic HTML.
- Support keyboard navigation and visible focus.
- Include static alternatives for essential interactive content when practical.
- Avoid remote data transmission by default.
- Keep source and widget code readable enough to maintain.

For a prototype, Tailwind’s browser script is acceptable. For deployment, compile Tailwind locally. If the lesson must work offline, package all scripts, fonts, images, compiled styles, and data locally.

## Produce reference pages

Use `templates/reference.html` for factual lookup material. Organize the page around the structure of the subject. State definitions, syntax, parameters, limits, examples, errors, and version constraints without tutorial narration.

A lesson can link to a reference page. Do not embed a large reference manual inside the lesson flow.

## Verify accessibility

Read `references/accessibility.md` for the full checklist and the WCAG criteria behind each item. The list below is the short form.

Before delivery, verify:

- The heading hierarchy has no skipped levels.
- Every control has an accessible name.
- Every interaction works with a keyboard.
- Focus order follows the visual and logical order.
- Focus is visible.
- Dynamic feedback uses an appropriate live region.
- Color is not the only carrier of meaning.
- Text and essential controls meet contrast requirements.
- Images and figures have useful alternatives.
- Motion can be paused or reduced when it is not essential.
- Touch targets are usable.
- Error messages identify the problem and the correction.
- The page remains understandable at increased zoom.

Do not add ARIA when native HTML provides the required behavior.

## Verify the lesson before delivery

Run this review in order.

### Content

- Are all important factual claims accurate and sourced?
- Are version and scope limits explicit?
- Are simplifications identified where they could mislead?
- Does terminology remain consistent?
- Does the lesson preserve uncertainty from its sources?

### Alignment

- Does every activity support an objective?
- Does every objective have matching assessment evidence?
- Does the assessment require the stated action?
- Does the transfer task use a meaningfully different context?

### Teaching sequence

- Does the lesson activate prerequisites before adding complexity?
- Does the learner predict or attempt before seeing the answer?
- Does the worked example expose the important reasoning?
- Do hints become progressively more specific?
- Does feedback address likely misconceptions?

### Interaction

- Does each widget require meaningful thought or action?
- Do all widget states work?
- Can the learner reset and try again?
- Does the widget work with keyboard and assistive technology?
- Is there an equivalent path when the interaction is unavailable?

### Writing

- Does the lesson follow the `technical-writing` skill?
- Are instructions commands with conditions first?
- Does each sentence carry one clear thought?
- Are symbols, labels, paths, and commands exact?
- Are headings specific and useful?

### Delivery

- Does the output open without errors?
- Are required assets present?
- Are citations and links valid?
- Is learner data local unless the user requested otherwise?
- Is the deployment model clear: prototype, production, or offline?

Fix failures before delivery. Do not describe a lesson as complete when an objective lacks evidence or an essential widget is untested.

## Output contract

For a conversational request, return the teaching content directly.

For a file-based request, create or update the relevant files. State briefly:

- What files were created or changed.
- The primary teaching mode.
- Any assumptions, source limitations, accessibility limits, or unsupported widget behavior.
- The next file or asset needed, only when the current output depends on it.

Do not include internal planning notes, hidden answer keys, unverified claims, or fabricated learner evidence in the learner-facing lesson.

## Boundaries

This skill can:

- Explain concepts at an appropriate level.
- Build sourced tutorials and interactive lessons.
- Create figures, exercises, quizzes, rubrics, and feedback.
- Reuse supplied widgets.
- Design and implement new widgets when existing widgets do not fit.
- Maintain a multi-session course and learning record.

This skill must not:

- Claim that a learner mastered an objective without matching evidence.
- Use interaction as decoration.
- invent sources, citations, learner history, results, or confidence.
- Hide important uncertainty or scope limits.
- send learner responses to a remote service without explicit approval.
- Make an essential task depend only on pointer input, color, animation, or sound.
- Present a teaching simplification as the complete model.
- Replace professional instruction or supervision where mistakes create medical, legal, financial, or physical risk.
