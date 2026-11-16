# Javier Matas Pose

A small personal site built with Hugo 0.164.0, without a theme, Node or a CSS/JavaScript framework. The layout is Margen (design B), with Sanzo Wada palette 214.

## Edit the site

Edit `data/site.yaml` for the name, search description, colours, navigation, About sections, Writing and Misc titles, and footer links. Section text is Markdown; a section title is optional. Keep YAML indentation. Add, delete or move whole list items to change sections or links. Comments in the file give examples.

## Add a post

Create `content/writing/my-post.md`. Its filename sets `/writing/my-post/`. Use YAML front matter, then Markdown:

```markdown
---
title: My Post
date: 2026-11-15
---

The post text goes here.
```

Writing lists posts newest first (equal dates use reverse title order).

## Preview

Install Hugo 0.164.0, then run `hugo server` from the repository root. Open the address it prints. `hugo --minify` builds `public/`; the existing GitHub Pages workflow builds and deploys on pushes to `main`.
