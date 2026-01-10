# Gemini Context: JavierMatasPose.github.io

## Project Overview
This repository contains the source code for the personal portfolio website of **Javier Matas Pose**, hosted on GitHub Pages.
It serves as a professional resume and portfolio, showcasing skills, education, work experience, and personal projects (e.g., AI in financial markets, DQNTicTacToe).

**Tech Stack:**
*   **Static Site Generator:** Hugo (Version 0.142.0+ Extended)
*   **Theme:** `blowfish` (Modified with custom CSS)
*   **Hosting:** GitHub Pages (via GitHub Actions)
*   **Aesthetic:** "Vintage Synthwave Poster" (Custom CSS overriding theme defaults)

## Key Files & Structure
*   **`hugo.toml`**: Main configuration file. Sets site title, author, menu structure, and forces the "light" theme (which is overridden by custom CSS).
*   **`content/`**: Contains the site's pages written in Markdown/HTML.
    *   `_index.md`: The Landing Page (Hero section).
    *   `about.md`: "About Me" section with an interactive accordion layout.
    *   `projects/_index.md`: "Projects" section with a grid of professional cards.
*   **`assets/css/custom.css`**: **CRITICAL FILE.** Contains all the styles for the "Vintage Poster" look. It defines the color palette (`--bg-red-vintage`, `--paper-yellow`, etc.) and component styles (cards, headers, buttons).
*   **`static/`**: Static assets copied to the root of the site.
    *   `ResumeJavierMatas.pdf`: The CV file.
    *   `JMLinkedin.jpeg`: Profile picture.
*   **`.github/workflows/hugo.yml`**: GitHub Actions workflow for automatic deployment.

## Design System: "Vintage Synthwave"
The site uses a custom design system built on top of Blowfish.

**Palette:**
*   **Red (Background):** `#c9303e` (`--bg-red-vintage`)
*   **Cream/Mint (Cards):** `#fff59e` / `#b5d1cc` (Mapped to `--paper-yellow`)
*   **Mauve (Accents):** `#b08699` (`--accent-mauve`)
*   **Blue (Shadows/Highlights):** `#7a82f8` / `#4f8fe6` (`--shadow-blue`)
*   **Black (Ink/Borders):** `#1a1a1a` (`--ink-dark`)

**Typography:**
*   **Headings:** `Anton`, `Bungee` (Google Fonts) - Poster/Comic style.
*   **Body:** `Roboto Slab`, `Libre Baskerville` (Google Fonts) - Typewriter/Print style.

## Building & Deployment

### Local Development
To preview the site locally:
1.  Ensure **Hugo Extended** is installed (v0.142.0+).
2.  Run the server: `hugo server -D`
3.  Access at `http://localhost:1313`.

### Deployment
Deployment is automated via **GitHub Actions**.
1.  **Commit** and **Push** changes to the `main` branch.
2.  The workflow `.github/workflows/hugo.yml` will automatically build the site and deploy it to the `gh-pages` branch.

## Development Conventions
*   **Content Updates:** Edit the files in `content/`.
    *   **IMPORTANT:** When writing HTML inside Markdown files (e.g., `_index.md`, `about.md`), **DO NOT INDENT** the HTML tags at the start of the line. Indentation causes Hugo to treat the block as a code snippet (rendering a white box with code text).
*   **Styling:** modifying `assets/css/custom.css` is preferred over changing theme files. The CSS uses standard variables to maintain consistency.
*   **Images:** Place images in `static/` (referenced as `/image.jpg`) or `assets/` (processed by Hugo pipes). Current convention prefers `static/` for simplicity in HTML blocks.