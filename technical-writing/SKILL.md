---
name: technical-writing
description: "Use when writing or reviewing technical documentation, RFCs, READMEs, PR descriptions, commit messages, prompts, tool descriptions, error messages, status reports, or other technical prose. Combines Diátaxis, Google developer style, ASD-STE100 structural rules, and Global English syntax."
version: 1.0.0
---

# Technical writing

Write technical text that a tired engineer, a non-native English reader, a translator, or an AI agent understands on the first read.

Apply four layers. Each layer answers one question:

1. What type of document is this?
2. How does each sentence address the reader?
3. How much does each sentence carry?
4. Can a reader parse the sentence in more than one way?

Use Diátaxis to select the document mode. Use Google developer style to address the reader. Use ASD-STE100 principles to control sentence load. Use Global English to remove structural ambiguity.

This skill also defines stricter rules for text that another system must parse. Examples include prompts, tool descriptions, errors, and inter-agent instructions.

## Rules above all layers

Apply these rules before the rules in any individual layer.

- Cut every word that does no work. Replace "in order to" with "to". Delete "it is important to note that".
- Use the short, common word unless a longer word adds precision. Use "use", not "utilize". Use "help", not "facilitate".
- Preserve every fact, condition, exception, number, scope limit, and confidence marker.
- Do not add a cause, mechanism, frequency, or guarantee that the source does not state.
- When a rule makes a sentence worse, revise the sentence another way. Leave the sentence unchanged when no revision preserves its meaning.
- Stop shortening when the text becomes unambiguous. Compression is not the goal.
- Use the exact symbol, file, flag, command, path, field, class, method, or UI label from the product.
- Treat the codebase as the word list. Do not replace a real name with a synonym.
- Call each thing by one name throughout the document set.
- Do not invent jargon or abstract metaphors. Use words that a developer would say aloud.
- Define a necessary domain term the first time that you use it.
- Do not claim certified ASD-STE100 compliance without the official standard and dictionary.

## Select the document mode

Use Diátaxis for documentation that serves a human reader. Select one mode for each document.

Ask two questions:

1. Does the document support action or understanding?
2. Does the document support learning or work?

The answers select the mode:

| Purpose | Learning | Work |
|---|---|---|
| Action | Tutorial | How-to guide |
| Understanding | Explanation | Reference |

Do not mix modes in one document. Split the content and link the documents when the reader needs more than one mode.

This skill file is an instruction specification, not a product document. Its sections define rules and a required process. The one-mode rule applies to the documents that this skill produces or reviews.

### Tutorial

A tutorial teaches through a successful, guided task.

The learner's success is the writer's responsibility. Open with the thing that the learner will build or run. Do not open with a list of concepts that the learner will study.

Use these rules:

- Write as a teacher guiding a learner.
- Use "we" when shared action helps the lesson.
- Write steps as commands.
- Give the learner a visible result early.
- State what the learner sees after each important step.
- Include the expected output, prompt change, UI state, file, or log line.
- Keep explanation to a short clause when the learner needs it to continue.
- Link to a separate explanation when the reason needs more space.
- Keep the path concrete and complete.
- Do not interrupt the lesson with reference tables or design debates.
- Do not assume that the learner can recover from an omitted step.

A tutorial heading names the result. For example, use "Build a local webhook receiver", not "Webhook concepts".

### How-to guide

A how-to guide helps a competent reader complete a real task.

Assume that the reader knows the product and the surrounding concepts. Give the shortest safe path to the goal.

Use these rules:

- Name the guide after the reader's goal.
- Write direct commands.
- Put each condition before the instruction that depends on it.
- Include decisions and useful forks.
- Use "If you want X, do Y" when the task has valid options.
- Omit background, teaching exercises, and completeness for its own sake.
- Link to reference material for option details.
- Link to explanation material for design reasons.
- Include warnings before the step that creates the risk.
- State the expected result when the reader must verify success.

Use "Calibrate the radar array", not "Radar array calibration".

### Reference

Reference documentation provides facts for lookup.

Describe the product. Do not instruct, persuade, teach, or argue.

Use these rules:

- State facts, options, defaults, limits, errors, and return values.
- Mirror the structure of the product or code.
- Use stable headings that match symbols and interfaces.
- Put each fact where a reader expects to find it.
- Keep the tone dry and certain.
- Do not include opinions or recommendations.
- Do not include tutorial steps.
- Generate reference text from code or schemas when practical.
- State version limits and platform limits.
- Include complete parameter and error information.

A reference page can contain examples when the examples clarify facts. The examples must not turn the page into a guided lesson.

### Explanation

Explanation documentation helps the reader understand one bounded topic.

Start from a real "why" question. Give the context that makes the design understandable.

Use these rules:

- Cover one bounded topic.
- Explain constraints, history, trade-offs, alternatives, and consequences.
- State the writer's view when the evidence supports a judgment.
- Connect details that appear in separate parts of the system.
- Keep procedural steps in a separate how-to guide.
- Keep exhaustive option lists in reference documentation.
- Make the page readable without access to the product.

A concept heading is a noun phrase. It must work after an implied "About". For example, "Import budgets" works as "About import budgets".

## Select the language enforcement mode

After you select the document mode, select the language enforcement mode.

The document mode controls the document's purpose. The language enforcement mode controls how strictly you constrain its sentences.

Use one of these enforcement modes:

- **Strict:** Use for procedures, safety text, prompts, errors, tool descriptions, function descriptions, status reports, and inter-agent instructions. Use every structural rule. Enforce consistent word meanings within the text.
- **STE-flavored:** Use for tutorials, how-to guides, READMEs, RFCs, PR descriptions, changelogs, and explanations. Apply all structural rules. Treat the lexical rules as guidance because this skill does not include the official ASD dictionary.

Infer the enforcement mode when the user does not specify it. Do not announce the mode unless the user asks for the analysis or rule table.

Reference documentation can use either enforcement mode. Use Strict when software or another system consumes the text. Use STE-flavored when humans use the reference for lookup.

## Write to the reader

Use Google developer style for reader address and sentence construction.

### Use direct address and present tense

Talk to the reader as "you" when the reader performs an action. Use the present tense for facts and current behavior.

Use "will" only for an event that occurs later. Do not use "will" as a general future-sounding substitute for the present tense.

Write:

> The compiler checks the schema.

Do not write:

> The schema will be checked by the compiler.

### Name the actor

State who or what performs each action.

Write:

> The worker deletes the temporary file.

Use passive voice only when the actor is unknown or irrelevant.

Passive voice can be correct in a result description:

> The request is rejected when the signature is invalid.

Use the active form when the actor matters:

> The gateway rejects a request with an invalid signature.

### Write instructions as commands

Use the imperative form for instructions.

Write:

> Click **Submit**.

Do not write:

> You should click **Submit**.

Do not write:

> **Submit** should be clicked.

### Put the condition first

Put a condition, purpose, warning, or scope limit before the instruction that it controls.

Write:

> To delete the document, click **Delete**.

Write:

> If the database is in recovery mode, wait for recovery to finish.

This order lets the reader skip instructions that do not apply.

### Put the common case first

Describe the normal path before exceptions. Put rare cases after the common case.

Do not force the reader to process an exception before the reader knows the main behavior.

### Use a knowledgeable, direct tone

Sound like a knowledgeable colleague.

- Do not use buzzwords.
- Do not use figurative language.
- Do not write "please" in an instruction.
- Do not call a procedure "simple", "easy", or "quick".
- Do not pre-announce unsupported work.
- Do not start several consecutive sentences with the same phrase.
- Do not use marketing adjectives when a fact or measurement can replace them.

Delete words such as "seamless", "robust", "powerful", "cutting-edge", "effortless", and "blazing-fast". Replace each claim with a measurement when one exists.

### Write useful links

Use link text that names the destination or its purpose.

Write:

> See [Configure request signing](...).

Do not write:

> [Click here](...).

Prefer enough local context for the reader to continue. Use a link when the linked material belongs in another document mode or would interrupt the current task.

### Write headings that carry the point

Use one level-one heading per page. Do not skip heading levels.

Use sentence case.

- A task heading is a bare verb phrase, such as "Create an instance".
- A concept heading is a noun phrase, such as "Instance lifecycle".
- A reference heading matches the interface or product structure.

Use "Pick the mode first", not "Modes", when the heading introduces a decision.

### Use lists for structure

Use numbered lists for ordered steps. Use bullets for unordered items.

Introduce each list with a complete sentence. Keep list items grammatically parallel.

Use a list for three or more steps, conditions, or alternatives. Do not bury a sequence in one sentence.

### Format names accurately

Put code symbols, commands, flags, paths, filenames, and literal values in code font.

Put UI labels in bold.

Use the serial comma. Do not use "etc.". State that a list contains examples when the list is not complete.

## Control sentence load

Use ASD-STE100 structural principles to make each statement load one unit at a time.

### Keep one instruction per sentence

Each procedural sentence contains one instruction.

Write:

> Open the file. Read line 3. Compare the value with `MAX_RETRIES`.

Do not write:

> Open the file and read line 3, then check whether it matches `MAX_RETRIES`.

A command can include one condition or purpose. The sentence must still direct one action.

### Keep one thought per descriptive sentence

Each descriptive sentence carries one main thought.

One thought does not require one short sentence. Keep a longer sentence when its condition or consequence belongs to the same thought.

Split a sentence when two claims can be true independently.

### Use sentence length limits

Use these limits as hard checks in Strict mode:

- An instruction contains no more than 20 words.
- A descriptive sentence contains no more than 25 words.

Use the same limits as strong defaults in STE-flavored mode.

Do not delete precision to meet a limit. Split the sentence instead. Keep a longer sentence only when splitting it would change or obscure the meaning.

### Use short paragraphs

Each paragraph covers one topic. A paragraph contains no more than six sentences.

Start a new paragraph when the actor, subject, task, or purpose changes.

### Keep articles and structural words

Keep "a", "an", "the", and "that" when they prevent ambiguity.

Write:

> Remove the backup file.

Do not write:

> Remove backup file.

Write:

> Ensure that the switch is off.

Do not remove "that" when its absence creates a second parse.

### Use one word for one action

Pick one verb for each action and use that verb throughout the document.

If "check" means "inspect", do not use "check" to mean "restrain". Do not rotate between "check", "verify", and "confirm" for the same operation.

The official ASD dictionary assigns one approved meaning and one part of speech to each approved word. This skill does not reproduce that dictionary. It can enforce consistency within a document, but it cannot verify the official approved word.

### Prefer verbs to action nouns

Use a verb to state an action.

Write:

> Analyze the log.

Do not write:

> Perform an analysis of the log.

Write:

> The tool validates the schema.

Do not write:

> The tool performs schema validation.

Keep the noun when it names a real product object or established domain concept.

### Avoid phrasal verbs

Use a single plain verb when a two-word verb has a meaning that its parts do not predict.

Use "start", not "spin up". Use "contact", not "reach out". Use "read", not "dive into". Use "begin", not "kick off".

Keep a phrasal verb only when it is the exact product term or when no plain replacement preserves the meaning.

### Avoid ambiguous `-ing` forms

An `-ing` word can act as a noun, adjective, or verb. Replace it when its grammatical role is unclear.

Write:

> The service that processes requests writes the log.

Do not write:

> The request processing service writes the log.

Keep an `-ing` form when its role is clear and the alternative is worse.

### Use simple tenses

Prefer the infinitive, imperative, simple present, simple past, and simple future.

Write:

> We received the report.

Do not write:

> We have received the report.

Keep a compound form when it carries information that a simple tense cannot preserve.

For example, keep "may have failed" when the phrase states both uncertainty and a possible past event. Do not replace it with "failed".

When the user asks for rule analysis, report each deliberate compound-tense exception.

### Preserve modality

Words such as "may", "might", "could", "sometimes", and "likely" state confidence or frequency. They are part of the meaning.

Do not convert:

> The request may have failed.

Into:

> The request failed.

Do not convert:

> The delay could be caused by lock contention.

Into:

> Lock contention causes the delay.

Remove a hedge only when it adds no information. For example, delete both qualifiers from "may potentially fail" only if "may fail" preserves the source claim.

### Do not use semicolons

Split clauses into separate sentences. ASD-STE100 Rule 8.1 bans semicolons.

Do not use an em dash to join thoughts. Use a period.

### Break long noun clusters

Do not stack more than three words as one noun phrase.

Write:

> the handler that sets task-queue priority

Do not write:

> the agent task queue priority handler

Write:

> the script that checks the proto-import budget

Do not write:

> the proto import budget check script

Keep an exact symbol unchanged, even when the symbol contains a long noun cluster.

### Keep complete grammar

Do not omit a subject, verb, article, or repeated word when the omission creates ambiguity.

Write:

> Phase 1 moves the converters. Phase 2 moves the runtime.

Do not write:

> Phase 1 moves the converters and Phase 2 the runtime.

Write:

> Files that are not backed up will be lost.

Use the fuller form when "Files not backed up will be lost" could describe either a condition or a completed action.

## Remove structural ambiguity

Use Global English syntax so that each sentence has one likely parse.

### Place modifiers next to their targets

Put "only", "not", and other limiting words next to the word or phrase that they modify.

These sentences have different meanings:

- "The check only fails on growth" limits the action.
- "The check fails only on growth" limits the condition.

Choose the sentence that states the intended meaning.

### Give each pronoun one clear antecedent

Every "it", "they", "this", "that", and "which" must point to one clear noun.

Repeat the noun when two antecedents are possible.

Do not use "this" or "which" to refer to an entire previous clause. Name the result, condition, or action.

Write:

> The cache rejects the key. This rejection increments `cache_rejections_total`.

Do not write:

> The cache rejects the key, which increments the metric.

The second sentence can make either the cache or the rejection the actor.

### Make coordination explicit

State which words "and" or "or" joins.

Use "both X and Y", "either X or Y", or "X, Y, or both" when grouping could be unclear.

Do not use "and/or".

Do not use a slash to combine alternatives in prose. A slash is valid inside a URL, path, command option, unit, or exact product string.

Repeat articles when the items are separate things.

Write:

> the client and the host

Use "the client and host" only when one thing has both roles.

### Use periods for separate thoughts

Use a period instead of a semicolon or em dash.

Put parenthetical text in a complete grammatical unit. Move the text into its own sentence when the parenthesis interrupts the main sentence.

Do not form plurals with "(s)". Use a plural or write both forms.

### Avoid idioms and metaphors

Do not use idioms, colloquialisms, Latin abbreviations, or abstract metaphors.

Use "for example", not "e.g.". Use "that is", not "i.e.".

Use "a budget that can only decrease", not "a ratchet". Use "move", not "evacuate". Use "finish", not "endgame".

A named pattern is acceptable when the document defines the pattern the first time.

### Keep names stable

Do not rename an unchanged concept for variety.

If "the budget check" names a component, do not also call it "the gate" or "the ratchet".

Do not reword unchanged text during an edit unless the rewording fixes a defined problem. Unnecessary wording changes increase review cost.

## Vary the rhythm without adding ambiguity

Correct technical text can still sound generated when every sentence has the same length and shape.

Vary sentence length on purpose.

- Use a short sentence to land a key point.
- Use a longer sentence for one fact with its condition or consequence.
- Split a sentence that contains two independent thoughts.
- Keep a long sentence when it contains one thought and remains easy to parse.
- Use specific failures and results instead of sterile generalities.

Write:

> A column rename fails the build.

Do not write:

> Schema changes can cause issues.

Explanation documents can state a supported judgment. Reference documents must remain factual. Tutorials and how-to guides must keep attention on the task.

## Apply repository and product rules

Use these rules when the text belongs to a code repository or software product.

### Use the codebase as the vocabulary

Use real symbols, paths, flags, commands, and filenames.

Do not invent a friendly synonym for an existing symbol. Do not normalize the spelling of a product name unless the codebase uses that spelling.

### Keep claims reproducible

Every count, tree, generated list, or repository-wide claim must be true at the commit that lands the text.

Include the command that regenerates the value when the value can change.

For example, include the command that counts imports when the document states the current import count.

### Format code snippets consistently

Indent code snippets with tabs when the repository requires tabs.

Do not alter a code sample only to satisfy a prose rule. Code follows the language and repository conventions.

### Separate product UI copy

Product UI strings are not documentation. Apply the product's copy guidelines to UI strings.

Use this skill for prose that explains the UI. Preserve exact UI labels in bold.

### Apply the unslop catalog

Apply the repository's `unslop` skill to every document that this skill writes or reviews.

The `unslop` skill owns the catalog of filler, AI vocabulary, hedging patterns, formatting tells, and abstract metaphors. Do not duplicate or edit that catalog from this skill.

When you find a new abstract metaphor, propose an addition to the `unslop` abstract-metaphor rule. Include the offender, the plain replacement, and a minimal diff in the response.

## Write specific repository text

PR descriptions and commit messages are technical writing. Apply every relevant layer except the Diátaxis document classification.

### PR descriptions

Write a PR body that a reviewer can read in less than one minute.

Include:

- The problem.
- The change.
- The important implementation choice.
- The test or verification result.
- A risk or follow-up only when one exists.

Do not paste swarm logs, SHA lists, long metric tables, or generated output. Link to those records.

Do not describe every changed file. Connect the changes that a reviewer must evaluate together.

### Commit messages

Use an imperative summary. Name the behavior or component that changes.

Use the body only when the reason, constraint, or non-obvious consequence matters.

Do not restate the diff. Explain why the change exists or why the implementation uses this approach.

### RFCs

An RFC usually contains several distinct document purposes. Keep each section in one mode, and make the transitions explicit.

Use explanation for context, constraints, options, and decisions. Use reference for the final interface. Put operational steps in a linked how-to guide.

Do not hide a decision inside background prose. State the decision and its consequences.

### READMEs

Choose the README's main purpose before writing it.

A project landing README can route readers to separate documents. Keep the landing content brief. Link to a tutorial, how-to guides, reference pages, and explanations.

Do not turn one README into the complete documentation set.

## Use controlled language for system-consumed text

Use Strict mode when an AI agent, parser, translation system, or automation consumes the text.

Apply all structural rules. Also apply these requirements:

- Name the actor and the action.
- State the input and the required output.
- State ordering requirements with numbered steps.
- State conditions before actions.
- Give each term one meaning.
- Use the same term in every instruction.
- State whether a requirement is mandatory, permitted, or prohibited.
- Keep scope words next to the requirement that they limit.
- Do not rely on implication, humor, politeness, or conversational context.
- Do not use a pronoun when a noun is safer.
- Preserve uncertainty and confidence markers.
- State the failure behavior when a wrong reading has a cost.

For a tool description, state what the tool does, when to use it, what inputs it accepts, and what it returns.

For an error, state what failed, why it failed when known, and what the user can do next. Do not invent a cause.

For an inter-agent instruction, state the required action and the completion condition. Separate each action into its own sentence.

## Respect ASD-STE100 scope and licensing

ASD-STE100 is a controlled-language standard from the AeroSpace, Security and Defence Industries Association of Europe.

Issue 9, dated January 2025, contains 53 writing rules across nine sections. It also contains an approved dictionary with approximately 900 words and approximately 1,200 words to avoid.

The official standard restricts reproduction of the dictionary. This skill does not reproduce the dictionary.

This skill applies the transferable structural rules with confidence. It treats lexical rules as plain-word guidance unless the writer has the official dictionary.

For aircraft maintenance documentation or another regulated use, obtain Issue 9 from the [official ASD-STE100 downloads page](https://www.asd-ste100.org/STE_downloads.html). Check every word against the official dictionary and the organization's approved terminology.

Do not describe output from this skill as certified or aerospace-grade ASD-STE100.

## Scan for common failures

Perform this scan before you rewrite.

### Synonym rotation

Find cases where one thing has several names.

Example:

> the user, the customer, and the client

If the words name one role, select one word and use it throughout.

### Hedge stacking

Find helper phrases and qualifiers that make a sentence assert nothing.

Rewrite:

> It is important to note that this may potentially help to improve performance.

As:

> This change may improve performance.

Keep "may" because it states uncertainty. Delete the other qualifiers because they add no information.

### Nominalization

Find actions written as nouns.

Replace "perform an analysis" with "analyze". Replace "provides assistance" with "helps".

### Marketing adjectives

Find quality claims that have no evidence.

Delete the adjective or replace it with a measurement.

### Run-on sentences

Find sentences that join several thoughts with commas, semicolons, conjunctions, or em dashes.

Split each independent thought into a sentence.

### Soft phrasal verbs

Find phrases such as "spin up", "reach out", "dive into", and "kick off".

Replace them with "start", "contact", "read", and "begin" when those words preserve the meaning.

### Ambiguous modifiers

Find "only", "not", "also", "almost", and similar words. Move each word next to its target.

### Unclear pronouns

Find every "it", "they", "this", "that", and "which". Confirm that each word has one clear antecedent.

### Long noun clusters

Find noun phrases with four or more stacked words. Rewrite them as clauses or prepositional phrases.

### Missing grammar

Find coordinated clauses that omit a subject, verb, or article. Restore the missing words.

### Mixed document modes

Find teaching inside reference, reference tables inside tutorials, arguments inside how-to guides, and procedures inside explanations.

Move each section to the correct document and link it.

## Follow the rewrite process

Use this process for every writing or review task.

1. Identify the reader, the task, and the cost of a wrong reading.
2. Select one Diátaxis mode for each document. Skip this step for PR descriptions and commit messages.
3. Select Strict or STE-flavored language enforcement.
4. Read the complete input once. Identify the meaning that the revision must preserve.
5. Record exact symbols, paths, commands, flags, UI labels, counts, and product terms.
6. Identify every fact, condition, exception, scope limit, warning, and confidence marker.
7. Check the document structure against the selected Diátaxis mode.
8. Scan each sentence for structural and lexical failures.
9. Run the available linter for a mechanical first pass when the repository contains it.
10. Rewrite each flagged sentence. Preserve the original meaning and confidence.
11. Split instructions that contain more than one action.
12. Split descriptive sentences that contain more than one independent thought.
13. Move each condition or warning before the instruction that it controls.
14. Replace passive voice when the actor matters.
15. Replace nominalizations and phrasal verbs when a plain verb preserves the meaning.
16. Replace long noun clusters with clauses or shorter phrases.
17. Make pronouns, modifiers, conjunctions, and articles unambiguous.
18. Check sentence and paragraph length.
19. Vary sentence rhythm without combining separate thoughts.
20. Verify every symbol, path, count, tree, and command against the current codebase.
21. Apply the repository's `unslop` skill.
22. Compare the revision with the source. Confirm that no fact or qualifier changed.
23. Check the output format that the user requested.
24. Return the rewritten text without process commentary unless the user asks for analysis.

If the input already complies, say so. Do not change compliant text only to create a revision.

## Use the linter when available

The companion linter is `scripts/ste-lint.py` when the repository provides that file.

The linter accepts standard input or file arguments. Use `--json` for structured output.

The linter checks these patterns:

- Semicolons.
- Sentence length.
- Phrasal verbs.
- Nominalizations.
- Marketing adjectives.
- Synonym rotation within a file.
- Dangling conjunctions in supported list items.
- Passive voice.
- Compound tenses.

The linter does not flag hedges or modality. Confidence is content, not style.

Use `--baseline N` to tolerate `N` existing hard violations during adoption. Use `--disable rule1,rule2` to silence named rules.

The linter exits with status 1 when hard violations exceed the baseline. Advisory findings, including passive voice and compound tenses, do not fail the run.

Use `--selftest` to verify the linter. The self-test confirms that "may have failed" passes without a modality error.

A linter finding is evidence, not a command to change meaning. Keep a sentence when the proposed revision would remove precision.

## Return the correct output

### Default output

Return the rewritten text and nothing else.

Do not add:

- A preamble.
- A mode announcement.
- A violation count.
- A summary of changes.
- A closing offer.

When a necessary phrase remains longer than the limit, add one line after the text:

> Kept as-is: `<phrase>` preserves `<required precision>`.

Omit this line when no exception exists.

### Rule analysis output

When the user asks for a diff, before-and-after comparison, rule list, or explanation, return a rule table.

Use this format:

| Rule violated | Original | Revised |
|---|---|---|
| Present perfect tense | "We have received your request." | "We received your request." |
| Noun cluster with four or more words | "the agent task queue priority handler" | "the handler that sets task-queue priority" |

After the table, state the language enforcement mode and the violation count.

Use this form:

> Mode: Strict. 7 violations found.

Add one line for a deliberate exception when a revision would lose required precision.

### New document output

When the user asks for a new document, return the document in its selected mode.

Do not add the rule analysis unless the user requests it.

### Review output

When the user asks for a review instead of a rewrite, lead with the most important finding.

Group findings by reader impact. Cite the exact sentence or section. Provide a corrected form for each actionable finding.

Do not force changes on compliant text.

### Artifact output

When the environment provides a file or artifact tool, use it for requested documents, code, or other long text.

Use a meaningful filename and title. Do not repeat the full artifact in the chat response.

When updating an existing artifact, create a new version. Do not overwrite the original file.

## Review the completed text

Use this checklist after the rewrite.

1. Does each document use one Diátaxis mode?
2. Does each instruction use a command?
3. Does each condition appear before the instruction that it controls?
4. Does each sentence contain one instruction or one main thought?
5. Does each instruction contain no more than 20 words in Strict mode?
6. Does each descriptive sentence contain no more than 25 words in Strict mode?
7. Does each paragraph contain one topic and no more than six sentences?
8. Can you remove any word without changing the meaning?
9. Does each actor perform an explicit action?
10. Does each pronoun have one clear antecedent?
11. Is "only" next to the word or phrase that it modifies?
12. Does every coordinated clause have the required subject and verb?
13. Does each separate item have the required article?
14. Does each thing have one name throughout the document set?
15. Does each action use one consistent verb?
16. Did the revision preserve every hedge and confidence marker?
17. Did the revision preserve every warning, condition, exception, and scope limit?
18. Did the revision avoid semicolons and thought-joining em dashes?
19. Did the revision replace ambiguous slashes in prose?
20. Did the revision break long noun clusters?
21. Did the revision remove unnecessary phrasal verbs and nominalizations?
22. Did the revision remove unsupported marketing adjectives?
23. Would a developer say these words aloud?
24. Are all symbols, paths, commands, UI labels, counts, and trees exact?
25. Does each changing count or generated claim include a regeneration command?
26. Does the text follow the repository's `unslop` rules?
27. Does the output match the format that the user requested?
28. Did the revision avoid changes to compliant, unchanged text?

## Boundaries

This skill can:

- Write and rewrite technical documentation in a selected Diátaxis mode.
- Remove ambiguity from prompts, errors, tool descriptions, and agent instructions.
- Preserve facts, conditions, scope, and confidence while simplifying sentence structure.
- Provide a rule table when the user requests an explanation.
- Suggest a one-line glossary entry for a necessary domain term.
- Identify weak content that style changes cannot repair.

This skill cannot:

- Reproduce the official ASD approved dictionary.
- Guarantee certified ASD-STE100 compliance.
- Make an unsupported claim true.
- Infer a missing cause, number, mechanism, or requirement.
- Remove a hedge when the source states uncertainty.
- Apply flat controlled language to creative or marketing copy where voice is the purpose.
- Shorten text past the point of clarity.
- Replace exact code or product terms with preferred prose terms.

When the content has no useful claim, say so. A clear rewrite of empty content remains empty content.

## Worked example

Before:

> Configuration of the proto import ratchet budget script parameters is performed via budget.json. Note that it's important to remember that running with --write, which updates the committed budget to reflect the current count, should only be done when lowering it. If exceeded, CI fails.

After:

> `budget.mjs` reads the committed budget from `budget.json` and counts the files that import protos. If the count exceeds the budget, CI fails. Run `budget.mjs --write` only to lower the budget.

The revision names the actor, uses the real symbols, removes filler, puts the condition first, and places "only" next to its target.

## Sources and companion resources

The method combines these sources:

- [Diátaxis](https://diataxis.fr/), fetched July 18, 2026.
- [Google developer documentation style guide](https://developers.google.com/style), fetched July 18, 2026.
- [ASD-STE100](https://www.asd-ste100.org/), Issue 9, January 2025.
- John R. Kohl, *The Global English Style Guide*, SAS Press.

A repository can provide these companion files:

- `references/writing-rules.md` for a detailed ASD-STE100 rule summary and citations.
- `examples/before-after.md` for official and project-specific examples.
- `scripts/ste-lint.py` for deterministic structural checks.

Treat the official ASD-STE100 standard as the source of truth for approved vocabulary.
