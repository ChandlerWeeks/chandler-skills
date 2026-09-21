# Third-party notices

Most skills in this repository are copied or adapted from two MIT-licensed projects. The full license text for each appears below, as MIT requires.

- **pstack** by Lauren Tan: https://github.com/cursor/plugins (`pstack/skills`), commit `6ed0f7a`
- **Matt Pocock's skills**: https://github.com/mattpocock/skills (`skills`), commit `c55ee46`

## Where each skill comes from

"Copied" means byte-identical to upstream apart from any change listed. "Ported" means the dispatch parameters were changed from Cursor's to Claude Code's, and the instructions are otherwise upstream's.

| Skill | Upstream | Changes here |
|---|---|---|
| `how` | pstack `how` | Ported. Removed `disable-model-invocation`. |
| `why` | pstack `why` | Ported. Removed `disable-model-invocation`. |
| `interrogate` | pstack `interrogate` | Ported. Reviewers are now `fable`, `opus`, `sonnet`. Removed `disable-model-invocation`. |
| `architect` | pstack `architect` | Ported. Removed `disable-model-invocation`. |
| `arena` | pstack `arena` | Ported. Runners are now `fable`, `opus`, `sonnet`. Removed `disable-model-invocation`. |
| `show-me-your-work` | pstack `show-me-your-work` | Ported. Transcript path and cross-model review changed for Claude Code. Removed `disable-model-invocation`. |
| `principle-prove-it-works` | pstack `principle-prove-it-works` | Removed `disable-model-invocation`. |
| `principle-test-behavior-not-implementation` | pstack `principle-test-behavior-not-implementation` | Removed `disable-model-invocation`. |
| `principle-divide-the-work` | pstack `principle-guard-the-context-window` | Rewritten around task decomposition. |
| `unslop` | pstack `unslop` | Same rule set. Description and scope rewritten, and `disable-model-invocation` removed. |
| `technical-writing` | pstack `technical-writing` (same name and method) | Expanded well beyond upstream. |
| `writing-for-agents` | Matt Pocock `productivity/writing-for-agents` | Copied. |
| `codebase-design` | Matt Pocock `engineering/codebase-design` | Copied. |
| `diagnosing-bugs` | Matt Pocock `engineering/diagnosing-bugs` | Copied. |
| `code-review` | Matt Pocock `engineering/code-review` | Issue tracker made optional. |
| `grilling` | Matt Pocock `productivity/grilling` | Reworded to follow the `unslop` rules. |
| `deep-teaching` | Related to Matt Pocock `productivity/teach` (same workspace model) | Substantially extended: references, templates, and a widget library. |

## pstack license

MIT License

Copyright (c) 2026 Lauren Tan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Matt Pocock skills license

MIT License

Copyright (c) 2026 Matt Pocock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
