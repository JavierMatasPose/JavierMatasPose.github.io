# Propuesta de Rediseño: "The Vintage Monopage"

## 1. Análisis: La Esencia "Tripletta" vs. Javier Matas

**Tripletta Pizza** se caracteriza por:
- **Estructura Monopágina (Single Page):** Todo el contenido esencial vive en una sola experiencia de scroll continuo. No hay fricción de carga entre páginas.
- **Narrativa Visual:** Cada sección (Pizza, Locales, Equipo) fluye hacia la siguiente con transiciones suaves o cortes de "bloque" estilizados.
- **Identidad Fuerte:** Uso de tipografías bold, colores vibrantes y una estética que mezcla lo tradicional con lo moderno/kitsch.

**Tu Portfolio Actual:**
- Ya tiene una estética visual **increíble** ("Vintage Synthwave Poster") muy alineada con esa vibración de "ads de los 80s".
- Sin embargo, la estructura está *fragmentada* en varias páginas (`/about`, `/projects`), lo que rompe la inmersión de "poster continuo".

## 2. La Propuesta: "Infinite Vintage Scroll"

El objetivo es transformar tu sitio en una **experiencia de una sola página (Monopage)**, donde el usuario hace scroll hacia abajo para descubrir tu historia, tal y como si estuviera leyendo una revista o un poster vertical infinito.

### A. Estructura Unificada
Moveremos todo el contenido a `content/_index.md` utilizando "Bloques" de Hugo o Partials.

**Nuevo Flujo de Scroll:**
1.  **HERO ("The Hook")**:
    - *Contenido:* "THE FUTURE IS TODAI", foto principal, subtítulo "Engineering Intelligence".
    - *Estilo:* Impacto visual máximo, pantalla completa. Sin cambios mayores aquí, ya funciona bien.
2.  **NAV BAR (Sticky)**:
    - Se mantiene fija al hacer scroll (o aparece al hacer scroll up).
    - Links: `[INTRO] [PROJECTS] [STACK] [EXPERIENCE] [CONTACT]` (ahora anclas `#`).
3.  **SECTION 1: INTRO / ABOUT ("The Persona")**:
    - *Origen:* Contenido de `about.md`.
    - *Diseño:* En lugar de una sidebar estática, integremos tu biografía en el flujo central. Quizás un diseño de "Entrevista de Revista" o "Ficha de Personaje RPG".
4.  **SECTION 2: TECH STACK ("The Tools")**:
    - *Origen:* Tus tags de tecnologías.
    - *Diseño:* Un "sticker wall" (pared de pegatinas) o grid de iconos pixelados que ocupa todo el ancho.
5.  **SECTION 3: PROJECTS ("The Work")**:
    - *Origen:* `projects/_index.md`.
    - *Diseño:* Grid Masonry o lista vertical de "Cards" gigantes alternadas (izquierda/derecha) para dar dinamismo. Cada proyecto es un "anuncio" en sí mismo.
6.  **SECTION 4: EXPERIENCE / TRACK RECORD ("The Journey")**:
    - *Origen:* Tu timeline de experiencia.
    - *Diseño:* Línea de tiempo vertical estilizada como un mapa de metros o circuito impreso retro.
7.  **FOOTER ("The Call")**:
    - *Contenido:* Contacto, redes, CV.
    - *Estilo:* "Order Now" estética de cupón recortable.

### B. Mejoras Estéticas (Inspiración Tripletta/80s Ad)

-   **Secciones de "Corte" (Parallax/Separadores):** Entre secciones, usar bandas de cinta de precaución ("CAUTION: AI AT WORK"), o patrones geométricos (zig-zag, grid de olas synthwave) para separar visualmente los bloques.
-   **Tipografía Gigante:** Usar la fuente `Bungee` no solo en títulos principales, sino como elementos de fondo gigantes y semitransparentes (ej: la palabra "CODE" ocupando todo el fondo de la sección de proyectos).
-   **Micro-interacciones:** Al hacer hover en las fotos, que estas "vibren" o cambien de color (efecto duotono) para dar esa sensación de "energía".

### C. Plan de Implementación Técnica en Hugo

1.  **Refactorización de Contenido:**
    -   Consolidar `content/about.md` y `content/projects/*.md` en una estructura modular dentro de la home.
    -   Probablemente usaremos `headless bundles` en Hugo para organizar las secciones (`content/home/about.md`, `content/home/projects.md`) y renderizarlas todas en `layouts/index.html`.
2.  **Navegación:**
    -   Actualizar `hugo.toml` para apuntar los menús a `#about`, `#projects`, etc.
    -   Asegurar *smooth-scroll* en CSS (`html { scroll-behavior: smooth; }`).
3.  **CSS:**
    -   Asegurar que cada sección tenga `min-height: 100vh` o al menos un padding generoso para "respirar".
    -   Unificar los anchos de los contenedores (`.vintage-container` pasa a ser el wrapper de cada sección individualmente, o un wrapper global).

## 3. Siguientes Pasos

Si te gusta esta dirección:
1.  **Aprobación:** Confirma que quieres proceder con la estructura Monopage.
2.  **Ejecución:**
    -   Crearé la estructura de directorios "headless" para la home.
    -   Moveré el contenido existente.
    -   Ajustaré el CSS para el flujo vertical continuo.
