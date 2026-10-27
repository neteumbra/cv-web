# CV Format

This document is **the single source of truth** for the format `cv-web`
understands, in English. The Spanish version lives in
[`docs/formato-cv.md`](formato-cv.md). Both files sit at the root of the repo so
they are visible on GitHub and are rendered on the site as
[`/docs`](https://neteumbra.github.io/cv-web/docs/), which shows whichever
language you have selected in the top bar.

A whole CV lives in a single Markdown file. The editor parses it
(`markdownToCv`), renders it live as a PDF (`CvDocument`) and rewrites it
normalized with the **⌘ Format** button (`cvToMarkdown`).

---

## 1. Frontmatter (optional)

```markdown
---
title: Sample CV
year: 2026
tags:
  - CV
  - Example
---
```

If there is no frontmatter the parser does not fail: there are simply no
metadata.

## 2. Name and contact

The name goes in a first-level heading and, right below it, the contact list in
`key: value` format (one line per field):

```markdown
# Alex García Rivera
- title: Full-Stack Software Developer
- Phone: +34 600 000 000
- Email: alex.garcia@example.com
- Location: Madrid, Spain
- LinkedIn: linkedin.com/in/alex-garcia-example
- GitHub: github.com/alexgarcia-example
- Portfolio: alexgarcia.dev
```

| Accepted key (case- and accent-insensitive) | What it does in the PDF |
| --- | --- |
| `title` | Job title, bold under the name |
| `Phone`, `Teléfono`, `Tel`, `Móvil` | `tel:` link |
| `Email`, `Correo`, `Mail` | `mailto:` link |
| `Location`, `Ubicación`, `City`, `Ciudad`, `País` | Location text |
| `LinkedIn`, `GitHub`, `Portfolio`, `Portafolio`, `Web`, `Blog`, `Twitter`… | Blue underlined link in the header |
| any other key | Shown in the header and rewritten verbatim (never lost) |

Original labels are respected: if you write `Teléfono`, the PDF shows
`Teléfono`; nothing is translated automatically.

Fields with no value are not printed: no `Phone:` in the header means no
`Phone:` in the PDF, and the same goes for `title`, `Email`, `Location` and the
header links (same rule as the formatter, which skips empty fields).

URLs are normalized when rendering (`normalizeUrl`): `github.com/…`,
`https://github.com/…` and `https://https://github.com/…` all end up pointing to
the same place.

## 3. Sections

```markdown
## WORK EXPERIENCE
```

- Every `##` opens a section whose title is drawn in the page header.
- To force a **page break** before a section, append ` \break` to the title:

  ```markdown
  ## CERTIFICATIONS \break
  ```

## 4. Content inside a section

| Syntax | Meaning |
| --- | --- |
| plain text anywhere | paragraph with **no** bullet: after the `##`, before the first entry, inside a `###` or after a list |
| `### Company \| Place` | main entry (the right part goes after the `\|`) |
| `#### Role \| Date` | sub-entry (period, role, etc.) |
| `- achievement`, `* achievement`, `+ achievement` | bulleted detail (the original marker is kept) |
| `1. achievement` / `2) achievement` | numbered list: the PDF prints **the number you wrote** |
| `- key: value` | regular detail (not read as contact) |

Rules for plain text and lists:

- Consecutive text lines form **a single paragraph**. If you paste a bullet
  after a paragraph, the list **opens a new entry**: the bullet never sneaks
  into the paragraph, never renders inside the summary and is never lost when
  formatting.
- Inside an entry (`###`/`####`), a line without a bullet is stored as a detail
  of that same entry and rendered without a bullet.
- Text you write **before the first `##`** (careful: after the contact block)
  is rendered as an entry-level paragraph with no section header.
- Markers are kept letter by letter: `-`, `*` and `+` are never converted into
  each other, and `1. 2. 3.` stays `1. 2. 3.` in the PDF too.

`###` titles also accept ` \break` to split an entry across two pages (in `####`
and in bullets it has no effect).

## 5. Links, bold and italic

Inside any detail or paragraph:

```markdown
- I built [the project on GitHub](github.com/user/repo) with React and Node.js
- I led the **payments** team, with *special attention* to accessibility
```

- **Links** `[text](url)`: they render blue and underlined (`#1155cc`) and are
  clickable in the PDF. URLs without a scheme get `https://` automatically.
- **Bold** `**text**` and **italic** `*text*` (also `_text_`, but only when the
  pair is not glued to a word: `my_file` does not become italic).
- Emphasis and links work **in details and paragraphs**, not in `##`, `###` and
  `####` headings (the heading already carries the weight).
- They combine: `**bold with [a link](url)**` renders bold and the link at once.
- An unclosed pair (`**unclosed`) is printed literally: no closing asterisk, no
  emphasis.

## 6. Format button

The **⌘ Format** button rewrites the Markdown following these rules:

- keeps the original labels (`Teléfono`, `Ubicación`…);
- skips empty contact fields;
- respects unbulleted paragraphs (for example the summary) anywhere they appear;
- keeps the marker of every list line as-is (`-`, `*`, `1.`, `2)`…);
- does not rewrite inline syntax: `**bold**`, `*italic*` and links come out
  literally as you wrote them;
- returns unknown contact keys exactly as they arrived;
- normalizes spacing, indentation and blank lines.

It never drops content: if the output is identical you get the notice "the
Markdown is already formatted", and if formatting *would* lose a line it **does
not apply the changes** and warns you ("Formatting cancelled…").

## 7. Complete example

```markdown
---
title: Sample CV
year: 2026
tags:
  - CV
  - Example
---

# Alex García Rivera
- title: Full-Stack Software Developer
- Phone: +34 600 000 000
- Email: alex.garcia@example.com
- Location: Madrid, Spain
- LinkedIn: linkedin.com/in/alex-garcia-example
- GitHub: github.com/alexgarcia-example
- Portfolio: alexgarcia.dev
- Available: freelance and remote

## PROFESSIONAL SUMMARY
Developer with more than eight years of experience building web applications and
cloud services. See [the sample project](github.com/alexgarcia-example).

## WORK EXPERIENCE
### Nordata Solutions | Remote \break
#### Senior Full-Stack Developer | 2021 - Present
- Designed an analytics SaaS platform serving 200+ customers
- Migrated a legacy monolith to Node.js services on AWS

## TECHNICAL SKILLS
- Languages: TypeScript, JavaScript, Python, SQL
- Frontend: React, Astro, modern CSS
- Backend and cloud: Node.js, PostgreSQL, Docker, AWS

## LANGUAGES
1. Spanish: native
2. English: professional working proficiency (C1)

## CERTIFICATIONS \break
- AWS Certified Developer – Associate (2024)
```
