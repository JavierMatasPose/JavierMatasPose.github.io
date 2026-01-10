# Gemini Context: JavierMatasPose.github.io

## Project Overview
This repository contains the source code for the personal portfolio website of **Javier Matas Pose**, hosted on GitHub Pages.
It serves as a professional resume and portfolio, showcasing skills, education, work experience, and personal projects (e.g., AI in financial markets, DQNTicTacToe).

**Tech Stack:**
*   **Static Site Generator:** Jekyll
*   **Theme:** `jekyll-theme-minimal`
*   **Hosting:** GitHub Pages

## Key Files & Structure
*   **`README.md`**: The core content file. In this minimal Jekyll setup, the `README.md` content is rendered as the main page (`index.html`) of the website. Edit this file to update the text on the site.
*   **`_config.yml`**: The main configuration file for Jekyll. It sets the site title, logo, and theme.
*   **`assets/`**: Directory containing static assets like images (e.g., profile pictures `javi_base.jpg`, `JavierMatas.jpeg`).
*   **`ResumeJavierMatas.pdf`**: The PDF version of the resume/CV.

## Building & Deployment
This project relies on **GitHub Pages** for building and deployment.

### Local Development (Optional)
To preview the site locally, you would typically need Ruby and Jekyll installed.
1.  Install dependencies: `bundle install` (if a Gemfile is added in the future).
2.  Run the server: `bundle exec jekyll serve`.

*Note: As this repo currently lacks a `Gemfile`, it relies on the standard GitHub Pages dependency environment automatically.*

### Deployment
Deployment is automated via GitHub Pages.
1.  **Edit** content in `README.md` or configuration in `_config.yml`.
2.  **Commit** and **Push** changes to the remote repository.
3.  GitHub will automatically rebuild and publish the site.

## Development Conventions
*   **Content Updates:** Primarily done by editing `README.md`. Markdown formatting is used for headers, lists, and links.
*   **Theme:** The site uses the "minimal" theme. Structural layout changes would require overriding theme defaults (not currently implemented).
