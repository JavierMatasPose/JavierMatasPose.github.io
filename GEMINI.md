# Gemini Context: JavierMatasPose.github.io

## Project Overview
This repository hosts the personal portfolio of **Javier Matas Pose**, a Senior AI Engineer.
The site showcases his expertise in Generative AI, LLMs, and Quantitative Finance through a unique **"Vintage Synthwave Poster"** aesthetic.

**Tech Stack:**
*   **Engine:** Hugo (Static Site Generator)
*   **Theme:** Blowfish (heavily customized)
*   **Styling:** CSS variables, Flexbox/Grid layouts, "Checkbox Hack" for interactivity (no JS required for core UI).
*   **Hosting:** GitHub Pages via GitHub Actions.

## Key Files & Structure
*   **`hugo.toml`**: Main configuration.
*   **`assets/css/custom.css`**: **The Design System.** Contains all style overrides, color palette (`--bg-red`, `--paper-yellow`, etc.), and layout logic.
*   **`content/`**:
    *   `_index.md`: **Landing Page**. Hero section + "Poster" bio.
    *   `about.md`: **About Me**. Accordion-style experience cards.
    *   `projects/_index.md`: **Projects**. Grid of professional project cards with ASCII art.
*   **`static/`**:
    *   `JMLinkedin.jpeg`: Profile picture.
    *   `ResumeJavierMatas.pdf`: CV.
*   **`.github/workflows/hugo.yml`**: Deployment automation.

## Design Philosophy
*   **Aesthetic:** 1980s Magazine/Poster. High contrast (Red/Cream/Black).
*   **Interaction:** Tactile feel using CSS transforms and hidden checkboxes for "reveal" effects.
*   **Typography:** `Bungee` (Headlines) & `Roboto Slab` (Body).

## Development Workflow
1.  **Edit Content:** Modify Markdown files in `content/`.
    *   *Note:* Do not indent HTML tags in Markdown to avoid rendering issues.
2.  **Edit Styles:** Modify `assets/css/custom.css`.
3.  **Preview:** `hugo server -D`
4.  **Deploy:** Commit and push to `main`. GitHub Actions handles the rest.
