# Source policy

Use this reference whenever a lesson, course, exercise, figure, reference page, or widget depends on external facts.

## Core rule

Verify before teaching. Do not create a citation from memory, infer publication details, or cite a source that you did not inspect.

A source must support the claim for which it is cited. A nearby citation is not sufficient when the source discusses only the general topic.

## Research when facts can change or be disputed

Research claims that depend on:

- Current product behavior.
- Software versions, APIs, commands, flags, or defaults.
- Standards or regulations.
- Prices, policies, dates, events, or organizational facts.
- Scientific or historical claims.
- Disputed interpretations.
- Quantitative values.
- Safety, medical, legal, or financial guidance.
- Third-party compatibility.
- Accessibility support.
- A quotation or attributed position.

Use current sources when behavior can change. Confirm version-specific behavior against documentation for the relevant version.

## Prefer sources in this order

1. Official standards, specifications, documentation, datasets, and primary research.
2. Maintainer-authored documentation, release notes, design notes, or technical explanations.
3. Peer-reviewed reviews, textbooks, and university material.
4. Reputable secondary reporting and professional guidance.
5. Community material for practical examples, implementation experience, or competing interpretations.

A lower-ranked source can be the best source for a specific claim. For example, an issue discussion can document a known implementation problem that the formal manual does not describe. State the source’s role and limits.

## Use multiple sources when needed

Use more than one source when:

- The topic is disputed.
- A source has a commercial interest.
- The claim has safety, legal, medical, or financial consequences.
- Documentation and observed behavior may differ.
- The topic has changed across versions.
- A secondary source summarizes primary research.
- The lesson compares interpretations or alternatives.

Do not create false balance. When a strong primary source establishes the fact, do not present an unsupported contrary view as equivalent.

## Classify lesson claims

Treat each consequential statement as one of these types.

### Established fact

State the fact directly and cite the source.

> WCAG 2.2 requires keyboard-operable functionality for content, subject to its stated exception for path-dependent input.[^1]

### Interpretation

Identify the interpretation and cite the evidence behind it.

> This design likely reduces visual search because the labels sit next to the elements they describe.

Do not present an interpretation as a universal fact.

### Teaching simplification

State that the model is simplified. Name the omitted detail when it could affect later reasoning.

> This model treats the queue as first-in, first-out. The runtime also applies rules that determine which queue runs next.

A simplification must preserve the target mechanism. Do not simplify into a false rule.

### Author judgment

State the basis for a recommendation.

> Prefer a native button here because it provides standard keyboard and accessibility behavior with less custom code.[^2]

Do not describe judgment as a requirement unless a standard or project rule makes it one.

### Learner-provided fact

Attribute the information to the learner when it affects lesson design.

> The learner reports using Python 3.12 in a local notebook.

Do not convert learner-provided context into a verified external fact.

## Record each source

For every source used, record:

- Title.
- Author or organization.
- URL, DOI, standard identifier, or stable repository location.
- Publication or update date when available.
- Access date when the page c[118;1:3uan change.
- Version, release, branch, or commit when relevant.
- The claim, figure, activity, or lesson element it supports.
- Any limitation, conflict, or uncertainty.

A course can keep this information in a resource index. A single lesson can keep a concise source list at the end.

## Put citations near claims

Place a citation:

- At the end of the sentence or paragraph that uses the source.
- In a figure caption when the figure adapts or reproduces source material.
- In a table row or note when only part of the table comes from a source.
- Next to a version-specific behavior.
- Next to a quotation.

Do not place one source list at the end and leave the reader to guess which claim each source supports.

## Write source annotations

At the end of a lesson, add a short annotation for each source.

Example:

```markdown
## Sources

- **Web Content Accessibility Guidelines 2.2**, W3C. Defines the accessibility requirements used to review keyboard operation, focus, alternatives, and status messages.
- **The science of effective learning with spacing and retrieval practice**, Carpenter, Pan, and Butler. Supports the use of delayed retrieval and spaced review while describing important boundary conditions.
```

Do not use a bare link list when the learner needs to know why each source matters.

## Cite software and APIs

For software behavior, record:

- Product or library name.
- Exact version or version range.
- Platform when behavior differs.
- Relevant symbol, command, configuration key, or page.
- Date accessed for living documentation.

Prefer documentation that matches the version used in the lesson. If only current documentation is available, state that the behavior was not verified for older versions.

When code behavior is consequential, test it in the stated environment when tools permit. A successful test supports the example but does not replace documentation for a public contract.

## Cite standards

Distinguish normative requirements from informative guidance.

A standard can contain:

- Normative requirements that define conformance.
- Informative explanations.
- Techniques that show possible implementations.
- Examples and notes that do not create requirements.

Do not turn an informative example into a universal requirement. Cite the exact section or success criterion when practical.

WCAG 2.2, for example, identifies its success criteria as testable statements and separates them from supporting techniques and understanding documents.[^1]

## Cite research

Prefer systematic reviews, meta-analyses, and primary studies that match the learner population and task.

Record:

- The population.
- The learning task or domain.
- The comparison.
- The measured outcome.
- The delay before measurement.
- Important moderators or boundary conditions.

Do not convert an average effect into a guarantee for every learner. Preserve uncertainty and scope.

For example, reviews support spacing and retrieval practice across many settings, but the effects depend on factors such as task design, prior knowledge, feedback, and schedule.[^3]

## Use quotations sparingly

Quote only when the exact wording matters. Verify the wording against the source.

For every quotation:

- Preserve the original words and punctuation.
- Mark omissions or additions clearly.
- Provide a nearby citation.
- Avoid a quotation that removes a qualifying condition.
- Keep the amount within copyright and fair-use constraints.

Prefer a precise paraphrase when the wording itself is not important.

## Source figures and data

For a figure based on external data or a published model:

- Cite the source in the caption.
- State whether the figure is reproduced, adapted, or newly calculated.
- Preserve units, labels, and uncertainty.
- Describe transformations or filters.
- Provide the underlying data or a textual equivalent when practical.
- Check the source license before redistributing a copied image.

Do not redraw a published figure and present it as original. Redrawing can still be an adaptation that requires attribution and license review.

## Use generated illustrations carefully

A generated illustration is not evidence for a factual claim. Use it to explain a verified model, not to establish facts.

For scientific, historical, medical, or technical subjects:

- Verify the represented structure against sources.
- Label the image as schematic when it is not to scale.
- Avoid fabricated labels, measurements, quotations, interfaces, or historical details.
- Provide a textual explanation of the important information.

## Handle disagreement

When reliable sources conflict:

1. Identify the exact point of disagreement.
2. Check version, date, population, definitions, and methods.
3. Prefer the source with the closest authority over the claim.
4. State the conflict when it affects the learner’s decision.
5. Avoid resolving the conflict with unsupported certainty.

Example:

> The specification defines the public contract, while browser implementations differ in this edge case. This lesson follows the specification and notes the tested browser behavior separately.

## Handle missing evidence

If you cannot verify a claim:

- Remove it when it is not necessary.
- Mark it as unverified when the uncertainty is itself relevant.
- Ask for the missing source or environment.
- Replace it with a verified, narrower claim.

Do not invent a source, date, author, result, quotation, DOI, standard number, or URL.

## Maintain source freshness

Mark sources for review when they concern:

- Living documentation.
- Active standards drafts.
- Frequently released software.
- Security guidance.
- Laws or regulations.
- Prices or policies.
- Product screenshots or interfaces.

For a course, store a review date and affected lessons. When a source changes, inspect every dependent claim, example, exercise, figure, and answer key.

## Privacy and learner data

Do not send learner responses, code, files, or personal information to a third-party source or service unless the learner requested or accepted that behavior.

When an external service is required:

- State what data leaves the local environment.
- State why the service is needed.
- Minimize the transmitted data.
- Avoid secrets and personal information.
- Provide a local alternative when practical.

## Source verification checklist

Before delivery, verify:

- Every consequential external claim has support.
- Each citation supports the nearby claim.
- Version-specific behavior uses the correct version.
- Dates, names, titles, and identifiers are accurate.
- Quotations match the source.
- Interpretations are labeled.
- Teaching simplifications are labeled when needed.
- Conflicts and uncertainty are preserved.
- Figures and data include attribution and transformation notes.
- Licenses permit the intended reuse.
- The source list explains what each source contributes.
- No citation was fabricated or copied without inspection.

## Sources

[^1]: World Wide Web Consortium, *Web Content Accessibility Guidelines 2.2*, W3C Recommendation, 12 December 2024. https://www.w3.org/TR/WCAG22/

[^2]: World Wide Web Consortium, “Custom Controls,” Web Accessibility Initiative Forms Tutorial. https://www.w3.org/WAI/tutorials/forms/custom-controls/

[^3]: Shana K. Carpenter, Steven C. Pan, and Andrew C. Butler, “The science of effective learning with spacing and retrieval practice,” *Nature Reviews Psychology* 1 (2022): 496–511. https://doi.org/10.1038/s44159-022-00089-1

