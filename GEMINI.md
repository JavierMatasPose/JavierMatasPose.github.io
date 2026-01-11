# Gemini Context: JavierMatasPose.github.io

## Project Overview

This repository hosts the personal portfolio website of **Javier Matas Pose**, a Medior AI Engineer specializing in Generative AI, LLMs, and Quantitative Finance.

The site is a **static website** built with **Hugo**, featuring a unique **"Vintage Synthwave Poster"** aesthetic inspired by 80s/90s magazine layouts. It is designed to be visually striking, high-contrast, and interactive without relying on heavy JavaScript frameworks.

**Key Characteristics:**
*   **Role:** Medior AI Engineer | Generative AI & LLMs.
*   **Aesthetic:** High contrast (Deep Red, Cream, Ink Black), bold typography (`Bungee`, `Roboto Slab`), and retro styling.
*   **Architecture:** Single-page scrollable layout defined primarily in `content/_index.md`.

## Tech Stack

*   **Engine:** [Hugo](https://gohugo.io/) (Static Site Generator).
*   **Theme:** [Blowfish](https://blowfish.page/) (Used as a base, but heavily overridden).
*   **Styling:** Custom CSS3 (`assets/css/custom.css`).
    *   Uses CSS Variables for theming.
    *   Flexbox and Grid for layouts.
    *   **No-JS Interactivity:** Uses the "Checkbox Hack" for accordions, tabs, and reveal effects.
*   **Deployment:** GitHub Actions -> GitHub Pages.

## Directory Structure

*   **`content/`**: Contains the site content.
    *   `_index.md`: **The Main Page.** This file contains the HTML structure for the entire single-page layout (Hero, About, Tech Stack, Projects, Experience).
*   **`assets/css/custom.css`**: **The Design System.** This is the most critical file for styling. It contains all the CSS variables, layout rules, animations, and theme overrides.
*   **`static/`**: Static assets.
    *   `JMLinkedin.jpg`: Profile picture.
    *   `ResumeJavierMatas.pdf`: CV.
*   **`hugo.toml`**: Main configuration file (site title, params, menu structure).
*   **`.github/workflows/`**: CI/CD configuration for deploying to GitHub Pages.

## Building and Running

### Local Development
To start the local development server with live reloading:
```bash
hugo server -D
```
Access the site at `http://localhost:1313`.

### Production Build
To build the static site for production (outputs to `public/`):
```bash
hugo --minify
```

## Development Conventions

### 1. Content Management
*   **Single Page Focus:** The site effectively functions as a single-page application. Most content edits should happen in `content/_index.md`.
*   **HTML in Markdown:** The project extensively uses raw HTML within the Markdown files to achieve complex, poster-like layouts. **Do not indent HTML tags** inside Markdown files, as Hugo's parser can misinterpret them as code blocks.

### 2. Styling (CSS)
*   **Global Variables:** Always use the defined CSS variables in `assets/css/custom.css` for colors and spacing:
    *   `--bg-red`: #c9303e
    *   `--paper-yellow`: #fff59e
    *   `--ink-black`: #1a1a1a
    *   `--shadow-blue`: #7a82f8
*   **Interactivity:** Prefer CSS-only solutions (hover states, checkbox hacks) over adding JavaScript.
*   **Responsiveness:** Use Flexbox/Grid and media queries to ensure the poster layout adapts to mobile screens.

### 3. Workflow
1.  **Edit:** Modify `content/_index.md` for text/structure or `assets/css/custom.css` for style.
2.  **Preview:** Run `hugo server -D`.
3.  **Commit:** Standard Git workflow.
4.  **Deploy:** Pushing to `main` (or `develop` -> merge) triggers the GitHub Action.
