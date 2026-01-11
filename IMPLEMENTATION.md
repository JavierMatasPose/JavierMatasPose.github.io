# 📋 Plan de Implementación — Mejoras de Diseño Portfolio

> **Basado en:** [SUGGESTIONS.md](file:///mnt/c/Users/javie/Programacion/GitHub/JavierMatasPose.github.io/SUGGESTIONS.md)  
> **Referencia técnica:** [GEMINI.md](file:///mnt/c/Users/javie/Programacion/GitHub/JavierMatasPose.github.io/GEMINI.md)  
> **Fecha:** 2026-01-11

---

## Objetivo

Implementar todas las mejoras de diseño sugeridas manteniendo la estética "Vintage Synthwave Poster" americana de los años 80-90. Este plan detalla cambios específicos en archivos CSS y Markdown.

> [!IMPORTANT]
> **Reglas de implementación:**
> - Usar **siempre** variables CSS (no valores hexadecimales hardcoded)
> - HTML en Markdown debe estar **sin indentar** (crítico para Hugo)
> - Seguir la organización por secciones de `custom.css`
> - Testear con `hugo server -D` antes de cada commit

---

## Resumen de Cambios Propuestos

| # | Mejora | Archivos Afectados | Prioridad |
|---|--------|-------------------|-----------|
| 1 | Quick Navigation Cards en Homepage | `_index.md`, `custom.css` | Alta |
| 2 | Tech Stack Visual Grid | `_index.md`, `custom.css` | Media |
| 3 | Eliminar/Mejorar sección Press duplicada | `about.md`, `custom.css` | Alta |
| 4 | Footer con Hook Phrase mejorado | `_index.md`, `custom.css` | Baja |
| 5 | Filtros de categoría en Projects | `projects/_index.md`, `custom.css` | Media |
| 6 | Micro-interacciones mejoradas | `custom.css` | Baja |
| 7 | Eliminar contenido redundante | `about.md` | Alta |
| 8 | Timeline "The Journey" | `about.md`, `custom.css` | Opcional |

---

## Cambios Detallados por Archivo

### [MODIFY] [custom.css](file:///mnt/c/Users/javie/Programacion/GitHub/JavierMatasPose.github.io/assets/css/custom.css)

#### Sección 12: QUICK NAVIGATION CARDS (Líneas ~786+)

**Descripción:** Añadir nuevo bloque de estilos para las tarjetas de navegación rápida tipo "sticker".

```css
/* =========================================
   12. QUICK NAVIGATION CARDS (Homepage)
   ========================================= */

/* Container para las 3 tarjetas de navegación */
.quick-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin: 3rem auto;
    padding: 2rem 0;
    max-width: 1000px;
    width: 100%;
}

/* Tarjeta individual estilo sticker */
.nav-card {
    background: var(--paper-yellow);
    border: 4px solid var(--ink-black);
    box-shadow: 8px 8px 0 var(--ink-black);
    padding: 1.5rem 2rem;
    text-align: center;
    text-decoration: none;
    color: var(--ink-black);
    min-width: 200px;
    max-width: 280px;
    flex: 1 1 200px;
    transition: all 0.2s ease;
    position: relative;
}

/* Rotaciones alternadas para efecto "sticker pegado" */
.nav-card:nth-child(1) { transform: rotate(-2deg); }
.nav-card:nth-child(2) { transform: rotate(1deg); }
.nav-card:nth-child(3) { transform: rotate(-1.5deg); }

/* Icono/decoración superior */
.nav-card-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 0.5rem;
}

/* Título de la tarjeta */
.nav-card-title {
    font-family: 'Bungee', cursive;
    font-size: 1.4rem;
    text-transform: uppercase;
    margin: 0.5rem 0;
    text-shadow: 2px 2px 0 var(--shadow-blue);
}

/* Subtítulo descriptivo */
.nav-card-subtitle {
    font-family: 'Roboto Slab', serif;
    font-size: 0.85rem;
    color: var(--bg-red);
    font-weight: bold;
}

/* Hover: wiggle + elevación */
.nav-card:hover {
    animation: wiggle 0.3s ease-in-out;
    box-shadow: 12px 12px 0 var(--shadow-blue);
    transform: rotate(0deg) translateY(-5px);
}

/* Badge decorativo "sticker label" */
.nav-card::after {
    content: "★";
    position: absolute;
    top: -10px;
    right: -10px;
    background: var(--bg-red);
    color: var(--paper-yellow);
    padding: 5px 10px;
    font-family: 'Bungee', cursive;
    font-size: 0.8rem;
    border: 2px solid var(--ink-black);
    box-shadow: 2px 2px 0 var(--ink-black);
}

/* Tagline bajo las tarjetas */
.quick-nav-tagline {
    text-align: center;
    font-family: 'Permanent Marker', cursive;
    color: var(--paper-yellow);
    font-size: 1.2rem;
    text-shadow: 2px 2px 0 var(--ink-black);
    margin: 1rem 0 2rem 0;
}
```

---

#### Sección 13: TECH STACK SHOWCASE (Líneas ~860+)

**Descripción:** Grid visual de tecnologías con badges estilo sticker.

```css
/* =========================================
   13. TECH STACK SHOWCASE (Homepage)
   ========================================= */

/* Contenedor con bordes dashed */
.tech-showcase {
    width: 100%;
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem 1rem;
    border-top: 3px dashed var(--ink-black);
    border-bottom: 3px dashed var(--ink-black);
    text-align: center;
}

/* Título de la sección */
.tech-showcase-title {
    font-family: 'Bungee', cursive;
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: var(--paper-yellow);
    text-shadow: 3px 3px 0 var(--ink-black);
    margin-bottom: 1.5rem;
    text-transform: uppercase;
}

/* Grid de badges */
.tech-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}

/* Badge individual */
.tech-badge {
    background: var(--paper-yellow);
    border: 3px solid var(--ink-black);
    box-shadow: 4px 4px 0 var(--shadow-blue);
    padding: 0.8rem 1.2rem;
    font-family: 'Roboto Slab', serif;
    font-weight: bold;
    font-size: 0.9rem;
    color: var(--ink-black);
    transition: all 0.2s ease;
}

/* Rotaciones alternadas */
.tech-badge:nth-child(odd) { transform: rotate(-1deg); }
.tech-badge:nth-child(even) { transform: rotate(1deg); }

/* Variantes de color por categoría */
.tech-badge--ai {
    background: linear-gradient(135deg, var(--accent-mauve) 0%, var(--paper-yellow) 100%);
}
.tech-badge--backend {
    background: linear-gradient(135deg, var(--accent-blue-light) 0%, var(--paper-yellow) 100%);
}
.tech-badge--frontend {
    background: linear-gradient(135deg, var(--accent-orange) 0%, var(--paper-yellow) 100%);
}
.tech-badge--fintech {
    background: linear-gradient(135deg, var(--shadow-blue) 0%, var(--paper-yellow) 100%);
}

/* Hover: wiggle */
.tech-badge:hover {
    animation: wiggle 0.3s ease-in-out;
    transform: scale(1.1) rotate(0deg);
    z-index: 10;
}

/* Separador visual entre categorías */
.tech-divider {
    width: 3px;
    height: 40px;
    background: var(--ink-black);
    margin: 0 1rem;
    align-self: center;
}

/* Responsive: ocultar dividers en mobile */
@media (max-width: 768px) {
    .tech-divider { display: none; }
}
```

---

#### Sección 14: PRESS/FEATURED SECTION ENHANCED (Líneas ~930+)

**Descripción:** Rediseño de la sección "As Seen In" con marquee horizontal y gradientes.

```css
/* =========================================
   14. PRESS/FEATURED SECTION ENHANCED
   ========================================= */

/* Contenedor principal con scroll horizontal opcional */
.press-section-enhanced {
    width: 100%;
    margin: 3rem 0;
    padding: 2rem 0;
    border-top: 4px solid var(--ink-black);
    border-bottom: 4px solid var(--ink-black);
    background: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 10px,
        rgba(0,0,0,0.03) 10px,
        rgba(0,0,0,0.03) 20px
    );
}

/* Título estilo cartel de cine */
.press-title {
    font-family: 'Bungee', cursive;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    color: var(--paper-yellow);
    text-shadow: 4px 4px 0 var(--ink-black);
    text-align: center;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
}

/* Grid de items (scroll horizontal en mobile) */
.press-marquee {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    padding: 0 1rem;
}

/* Item individual estilo ticket/entrada */
.press-item-enhanced {
    background: var(--paper-yellow);
    border: 4px solid var(--ink-black);
    box-shadow: 6px 6px 0 var(--shadow-blue);
    padding: 1.5rem;
    min-width: 220px;
    max-width: 300px;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.2s ease;
    position: relative;
}

/* Rotaciones tipo sticker */
.press-item-enhanced:nth-child(1) { transform: rotate(-1deg); }
.press-item-enhanced:nth-child(2) { transform: rotate(1.5deg); }
.press-item-enhanced:nth-child(3) { transform: rotate(-0.5deg); }

/* Icono grande a la izquierda */
.press-icon-large {
    font-size: 2.5rem;
    flex-shrink: 0;
}

/* Contenido textual */
.press-content {
    display: flex;
    flex-direction: column;
}

.press-content strong {
    font-family: 'Bungee', cursive;
    font-size: 1rem;
    color: var(--ink-black);
    text-transform: uppercase;
}

.press-detail {
    font-family: 'Roboto Slab', serif;
    font-size: 0.85rem;
    color: var(--bg-red);
    font-weight: bold;
    margin-top: 0.3rem;
}

/* Variantes de color */
.press-item-enhanced--gold {
    border-left: 8px solid #FFD700;
}
.press-item-enhanced--blue {
    border-left: 8px solid var(--accent-blue-light);
}
.press-item-enhanced--mauve {
    border-left: 8px solid var(--accent-mauve);
}

/* Hover: elevación */
.press-item-enhanced:hover {
    transform: rotate(0deg) translateY(-5px);
    box-shadow: 10px 10px 0 var(--shadow-deep);
}

/* Decoración "ticket stub" */
.press-item-enhanced::before {
    content: "";
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background: var(--bg-red);
    border-radius: 50%;
}
```

---

#### Sección 15: FOOTER ENHANCED (Líneas ~1010+)

**Descripción:** Mejoras al footer con hook phrase dividido y animación.

```css
/* =========================================
   15. FOOTER ENHANCED
   ========================================= */

/* Hook phrase con efecto de dos líneas */
.footer-hook {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
}

.footer-hook h3 {
    font-family: 'Roboto Slab', serif;
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    color: var(--ink-black);
    margin: 0;
    font-weight: normal;
}

.hook-highlight {
    font-family: 'Bungee', cursive !important;
    font-size: clamp(2rem, 4vw, 3rem) !important;
    color: var(--bg-red) !important;
    text-shadow: 3px 3px 0 var(--shadow-blue);
    margin: 0 !important;
}

/* Tagline descriptivo */
.footer-tagline {
    font-family: 'Permanent Marker', cursive;
    font-size: 1rem;
    color: var(--ink-black);
    opacity: 0.8;
    margin-bottom: 1.5rem;
}

/* Mejora del CTA button con micro-bounce */
.footer-cta:hover {
    animation: micro-bounce 0.4s ease;
}

@keyframes micro-bounce {
    0%, 100% { transform: translate(-2px, -2px); }
    50% { transform: translate(-4px, -4px); }
}
```

---

#### Sección 16: PROJECT CATEGORY FILTERS (Líneas ~1060+)

**Descripción:** Filtros de categoría usando CSS checkbox hack (sin JavaScript).

```css
/* =========================================
   16. PROJECT CATEGORY FILTERS
   ========================================= */

/* Contenedor de filtros */
.project-filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
}

/* Input oculto para filtros */
.filter-input { display: none; }

/* Label como "sticker tab" */
.filter-label {
    background: var(--paper-yellow);
    border: 3px solid var(--ink-black);
    box-shadow: 4px 4px 0 var(--ink-black);
    padding: 0.6rem 1.2rem;
    font-family: 'Bungee', cursive;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
}

.filter-label:hover {
    transform: translateY(-2px);
    box-shadow: 6px 6px 0 var(--shadow-blue);
}

/* Estado activo del filtro */
.filter-input:checked + .filter-label {
    background: var(--bg-red);
    color: var(--paper-yellow);
    transform: rotate(0deg) scale(1.05);
    box-shadow: 6px 6px 0 var(--shadow-blue);
}

/* Decoración de estrella para filtro activo */
.filter-input:checked + .filter-label::before {
    content: "★ ";
}
```

> [!NOTE]
> El filtrado real de proyectos requiere JavaScript o categorías separadas en Hugo. La implementación CSS solo provee la interfaz visual. Para un filtrado real, se debería usar JavaScript o crear páginas separadas por categoría.

---

#### Sección 17: MICRO-INTERACTIONS ENHANCED (Líneas ~1110+)

**Descripción:** Mejoras de micro-interacciones para experiencia táctil.

```css
/* =========================================
   17. MICRO-INTERACTIONS ENHANCED
   ========================================= */

/* Underline animado para links de menú */
.main-menu nav a {
    position: relative;
    overflow: hidden;
}

.main-menu nav a::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -100%;
    width: 100%;
    height: 3px;
    background: var(--paper-yellow);
    transition: left 0.3s ease;
}

.main-menu nav a:hover::after {
    left: 0;
}

/* Sombra más profunda en cards expandidas */
.toggle-input:checked + .paper-card {
    box-shadow: 15px 15px 0 var(--accent-mauve) !important;
}

/* Micro-bounce para botones de proyecto */
.project-button {
    position: relative;
    overflow: hidden;
}

.project-button::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
}

.project-button:active::after {
    width: 200px;
    height: 200px;
}

/* Enhanced focus states for accessibility */
.nav-card:focus,
.tech-badge:focus,
.press-item-enhanced:focus,
.project-button:focus,
.filter-label:focus {
    outline: 4px dashed var(--paper-yellow);
    outline-offset: 4px;
}
```

---

#### Sección 18: TIMELINE "THE JOURNEY" (Líneas ~1160+)

**Descripción:** Timeline horizontal con puntos de carrera.

```css
/* =========================================
   18. TIMELINE "THE JOURNEY"
   ========================================= */

/* Contenedor del timeline */
.journey-section {
    width: 100%;
    max-width: 1000px;
    margin: 3rem auto;
    padding: 2rem 1rem;
    text-align: center;
}

/* Título del journey */
.journey-title {
    font-family: 'Bungee', cursive;
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    color: var(--paper-yellow);
    text-shadow: 4px 4px 0 var(--ink-black);
    margin-bottom: 2rem;
}

/* Línea del timeline */
.journey-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 2rem 0;
}

/* Línea conectora horizontal */
.journey-line::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 5%;
    right: 5%;
    height: 4px;
    background: var(--ink-black);
    transform: translateY(-50%);
    z-index: 0;
}

/* Punto individual del timeline */
.journey-point {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

/* Círculo del punto */
.journey-dot {
    width: 60px;
    height: 60px;
    background: var(--paper-yellow);
    border: 4px solid var(--ink-black);
    border-radius: 50%;
    box-shadow: 4px 4px 0 var(--shadow-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Bungee', cursive;
    font-size: 0.9rem;
    color: var(--ink-black);
    transition: all 0.2s ease;
}

/* Año debajo del punto */
.journey-year {
    font-family: 'Bungee', cursive;
    font-size: 1rem;
    color: var(--paper-yellow);
    text-shadow: 2px 2px 0 var(--ink-black);
    margin-top: 0.5rem;
}

/* Label de la empresa/etapa */
.journey-label {
    font-family: 'Roboto Slab', serif;
    font-size: 0.85rem;
    color: var(--paper-yellow);
    margin-top: 0.3rem;
    max-width: 100px;
}

/* Hover: elevación del punto */
.journey-point:hover .journey-dot {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 6px 6px 0 var(--shadow-deep);
}

/* Variantes de color por etapa */
.journey-point:nth-child(1) .journey-dot { background: var(--accent-orange); }
.journey-point:nth-child(2) .journey-dot { background: var(--accent-blue-light); }
.journey-point:nth-child(3) .journey-dot { background: var(--accent-mauve); }
.journey-point:nth-child(4) .journey-dot { background: var(--paper-yellow); }

/* Tagline final del journey */
.journey-tagline {
    font-family: 'Permanent Marker', cursive;
    font-size: 1.1rem;
    color: var(--paper-yellow);
    text-shadow: 2px 2px 0 var(--ink-black);
    margin-top: 2rem;
    font-style: italic;
}

/* Responsive: stack vertical en mobile */
@media (max-width: 768px) {
    .journey-line {
        flex-direction: column;
        gap: 2rem;
    }
    
    .journey-line::before {
        top: 5%;
        bottom: 5%;
        left: 50%;
        right: auto;
        width: 4px;
        height: auto;
        transform: translateX(-50%);
    }
    
    .journey-point {
        flex-direction: row;
        gap: 1rem;
    }
    
    .journey-label {
        text-align: left;
        max-width: none;
    }
}
```

---

### [MODIFY] [_index.md](file:///mnt/c/Users/javie/Programacion/GitHub/JavierMatasPose.github.io/content/_index.md)

**Estado actual (18 líneas):**
```html
<div class="hero-container">...</div>
<footer class="vintage-footer">...</footer>
```

**Nuevo contenido propuesto:**

```html
---
title: "Javier Matas - AI Revolution"
description: "High-Performance AI Engineering"
---
<div class="hero-container">
<h1 class="poster-text home-title">
THE FUTURE <br> IS 
<span class="glue-word">TOD<span class="highlight-ai">AI!</span></span>
</h1>
<span class="since-tag">Engineering Intelligence since 2020</span>
</div>
<nav class="quick-nav">
<a href="/about/" class="nav-card">
<span class="nav-card-icon">👨‍💻</span>
<h3 class="nav-card-title">About Me</h3>
<span class="nav-card-subtitle">The Engineer Behind the Code</span>
</a>
<a href="/projects/" class="nav-card">
<span class="nav-card-icon">🚀</span>
<h3 class="nav-card-title">Projects</h3>
<span class="nav-card-subtitle">AI Solutions in Action</span>
</a>
<a href="/ResumeJavierMatas.pdf" target="_blank" class="nav-card">
<span class="nav-card-icon">📄</span>
<h3 class="nav-card-title">Resume</h3>
<span class="nav-card-subtitle">Download My CV</span>
</a>
</nav>
<p class="quick-nav-tagline">Click to explore the future</p>
<section class="tech-showcase">
<h3 class="tech-showcase-title">★ Powered By ★</h3>
<div class="tech-grid">
<span class="tech-badge tech-badge--ai">Python</span>
<span class="tech-badge tech-badge--ai">PyTorch</span>
<span class="tech-badge tech-badge--ai">LangChain</span>
<span class="tech-badge tech-badge--ai">AWS Bedrock</span>
<div class="tech-divider"></div>
<span class="tech-badge tech-badge--backend">FastAPI</span>
<span class="tech-badge tech-badge--backend">PostgreSQL</span>
<span class="tech-badge tech-badge--backend">Vector DBs</span>
<div class="tech-divider"></div>
<span class="tech-badge tech-badge--fintech">DRL</span>
<span class="tech-badge tech-badge--fintech">Quant Trading</span>
</div>
</section>
<footer class="vintage-footer">
<div class="footer-hook">
<h3>AI Updates for Your</h3>
<h3 class="hook-highlight">INBOX</h3>
</div>
<p class="footer-tagline">Insights, projects, and the occasional mind-bending idea.</p>
<a href="https://www.linkedin.com/in/javier-cayetano-matas-pose-18b0a520a/" target="_blank" class="footer-cta">Let's Connect</a>
<p class="footer-copyright">© 2026 Javier Matas Pose — Engineering Tomorrow</p>
</footer>
```

> [!IMPORTANT]
> **Recuerda:** El HTML en Markdown de Hugo debe estar SIN INDENTAR para renderizar correctamente.

---

### [MODIFY] [about.md](file:///mnt/c/Users/javie/Programacion/GitHub/JavierMatasPose.github.io/content/about.md)

#### Cambio 1: Eliminar sección `.press-section` duplicada

**Líneas a eliminar (87-94):**
```html
<section class="press-section">
<h3 class="label-heading">As Seen In</h3>
<div class="press-grid">
<div class="press-item">🏆 Robotrader Competition — Top 3</div>
<div class="press-item">🎤 Speaker @ Madrid Stock Exchange</div>
<div class="press-item">🧠 Mensa International Member</div>
</div>
</section>
```

**Razón:** Duplica el contenido de la sección Achievements (líneas 74-83).

---

#### Cambio 2: Añadir sección "The Journey" Timeline (Opcional)

**Insertar después de la línea 85 (`</main>`):**

```html
<section class="journey-section">
<h3 class="journey-title">★ The Journey ★</h3>
<div class="journey-line">
<div class="journey-point">
<div class="journey-dot">🎓</div>
<span class="journey-year">2020</span>
<span class="journey-label">Started Coding AI</span>
</div>
<div class="journey-point">
<div class="journey-dot">📊</div>
<span class="journey-year">2022</span>
<span class="journey-label">SDG Group</span>
</div>
<div class="journey-point">
<div class="journey-dot">🚀</div>
<span class="journey-year">2023</span>
<span class="journey-label">DXC Technology</span>
</div>
<div class="journey-point">
<div class="journey-dot">🤖</div>
<span class="journey-year">NOW</span>
<span class="journey-label">Capgemini</span>
</div>
</div>
<p class="journey-tagline">"From code to intelligence, the path of a digital architect"</p>
</section>
```

---

#### Cambio 3: Mejorar sección Press/Featured con nuevo diseño

**Si se decide mantener una sección "Featured"**, reemplazar la sección Achievements (líneas 74-83) con diseño mejorado:

```html
<div class="achieve-block">
<h3 class="label-heading">Achievements</h3>
<section class="press-section-enhanced">
<div class="press-marquee">
<div class="press-item-enhanced press-item-enhanced--gold">
<span class="press-icon-large">🏆</span>
<div class="press-content">
<strong>Robotrader</strong>
<span class="press-detail">International Top 3 — 2024</span>
</div>
</div>
<div class="press-item-enhanced press-item-enhanced--blue">
<span class="press-icon-large">🎤</span>
<div class="press-content">
<strong>Speaker</strong>
<span class="press-detail">Madrid Stock Exchange</span>
</div>
</div>
<div class="press-item-enhanced press-item-enhanced--mauve">
<span class="press-icon-large">🧠</span>
<div class="press-content">
<strong>Mensa</strong>
<span class="press-detail">High-IQ Society Member</span>
</div>
</div>
</div>
</section>
</div>
```

---

### [MODIFY] [projects/_index.md](file:///mnt/c/Users/javie/Programacion/GitHub/JavierMatasPose.github.io/content/projects/_index.md)

#### Cambio: Añadir filtros de categoría (decorativos)

**Insertar después de `</header>` (línea 16):**

```html
<nav class="project-filters">
<input type="radio" name="filter" id="filter-all" class="filter-input" checked>
<label for="filter-all" class="filter-label">All</label>
<input type="radio" name="filter" id="filter-ai" class="filter-input">
<label for="filter-ai" class="filter-label">AI/ML</label>
<input type="radio" name="filter" id="filter-fintech" class="filter-input">
<label for="filter-fintech" class="filter-label">FinTech</label>
<input type="radio" name="filter" id="filter-fullstack" class="filter-input">
<label for="filter-fullstack" class="filter-label">Full Stack</label>
</nav>
```

> [!WARNING]
> Estos filtros son **solo visuales**. El filtrado real requiere JavaScript o páginas separadas por categoría en Hugo.

---

## Plan de Verificación

### Verificación Automatizada

No existen tests automatizados en este proyecto (es un sitio estático Hugo). La verificación se realizará manualmente.

### Verificación Manual

#### Test 1: Build de Hugo

```bash
cd /mnt/c/Users/javie/Programacion/GitHub/JavierMatasPose.github.io
hugo --minify
```

**Resultado esperado:** Build exitoso sin errores ni warnings.

---

#### Test 2: Servidor de desarrollo

```bash
cd /mnt/c/Users/javie/Programacion/GitHub/JavierMatasPose.github.io
hugo server -D
```

**Verificar en http://localhost:1313:**

1. **Homepage:**
   - [ ] Hero title visible con sombras correctas
   - [ ] 3 tarjetas Quick Nav visibles con rotaciones
   - [ ] Hover en tarjetas produce wiggle y elevación
   - [ ] Grid de Tech Stack visible con badges coloreados
   - [ ] Footer con hook phrase dividido ("AI Updates for Your" / "INBOX")
   - [ ] Footer CTA funciona (link a LinkedIn)

2. **About Page:**
   - [ ] No existe sección Press duplicada
   - [ ] Achievements section con nuevo diseño (si se implementó)
   - [ ] Timeline Journey visible (si se implementó)
   - [ ] Experience cards expandibles funcionan
   - [ ] Foto de perfil visible

3. **Projects Page:**
   - [ ] Filtros de categoría visibles
   - [ ] Filtro "All" marcado por defecto
   - [ ] Click en filtros cambia estado visual
   - [ ] Project cards expandibles funcionan
   - [ ] ASCII art visible en placeholders

4. **Responsive (viewport < 768px):**
   - [ ] Quick Nav cards se apilan verticalmente
   - [ ] Tech dividers ocultos
   - [ ] Timeline Journey se convierte en vertical
   - [ ] Todos los textos legibles

---

#### Test 3: Interacciones CSS

| Elemento | Acción | Resultado Esperado |
|----------|--------|-------------------|
| `.nav-card` | Hover | Wiggle animation + elevación |
| `.tech-badge` | Hover | Wiggle + scale(1.1) |
| `.press-item-enhanced` | Hover | TranslateY(-5px) + sombra profunda |
| `.project-button` | Active | Ripple effect |
| `.main-menu nav a` | Hover | Underline animado desde izquierda |
| `.filter-label` | Click | Background cambia a rojo, texto a amarillo |

---

## Orden de Implementación Sugerido

1. **Fase 1 — Quick Wins (Alta prioridad):**
   - Eliminar `.press-section` duplicada de `about.md`
   - Añadir estilos de Quick Nav y Tech Showcase a `custom.css`

2. **Fase 2 — Homepage Enhancement:**
   - Modificar `_index.md` con Quick Nav + Tech Grid
   - Mejorar Footer con hook phrase

3. **Fase 3 — About Page Improvements:**
   - Implementar Press/Featured enhanced
   - Añadir Timeline Journey (opcional)

4. **Fase 4 — Projects Page:**
   - Añadir filtros decorativos
   - Mejorar micro-interacciones

5. **Fase 5 — Polish:**
   - Revisar responsive en todos los viewports
   - Ajustar animaciones y transiciones
   - Verificar accesibilidad (focus states)

---

*Documento creado: 2026-01-11*
