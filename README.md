# MAGNATES — Landing Page (Estructura Modular)

Landing page de **MAGNATES** (Agencia de marketing digital 360 en Cartagena de Indias).

Este proyecto fue extraído y reestructurado a partir del archivo monolítico original, separando el código HTML semántico, los estilos CSS por componentes y la lógica JavaScript en módulos reutilizables y documentados.

---

## 📁 Estructura del Proyecto

```text
magnates/
├── index.html                   # Documento HTML principal estructurado y semántico
├── README.md                    # Documentación y guía de uso
│
├── css/                         # Hojas de estilo modulares
│   ├── style.css                # Hoja de estilo principal que importa todos los módulos
│   ├── variables.css            # Tokens de diseño, variables de color y tipografía
│   ├── base.css                 # Reset CSS, estilos base, utilidades de texto y botones
│   ├── navbar.css               # Barra de navegación flotante, logo y menú responsive
│   ├── hero.css                 # Hero section, stage 3D interactivo y slides
│   ├── components.css           # Marquee infinito, tarjetas de servicios, métricas y nichos
│   ├── contact.css              # Formulario interactivo, etiquetas de interés y animaciones
│   └── footer.css               # Pie de página y créditos
│
└── js/                          # Lógica JavaScript desacoplada
    ├── data.js                  # Fuente de datos (stack tecnológico, servicios, iconos SVG)
    ├── hero-3d.js               # Motor 3D de Icosaedro proyectado en Canvas según el scroll
    ├── marquee.js               # Componente de marquesina infinita bidireccional
    ├── services.js              # Generador de tarjetas de servicios y spotlight dinámico con mouse
    ├── form.js                  # Manejo de botones de selección y envío de formulario
    ├── main.js                  # Entry point con módulos ES e IntersectionObserver
    └── magnates.standalone.js   # Script todo-en-uno para abrir directamente con doble clic (file:///)
```

---

## 🚀 ¿Cómo visualizarlo?

### Opción 1: Directo desde el explorador de archivos (Recomendada para pruebas rápidas)
Simplemente haz **doble clic en `index.html`** en Windows Explorer o ábrelo en tu navegador favorito. El archivo ya viene configurado para funcionar sin necesidad de servidores locales ni problemas de CORS.

### Opción 2: Con servidor local (para desarrollo con módulos ES)
Si deseas trabajar con módulos ES nativos (`type="module"`), puedes usar cualquier servidor estático local:

```bash
# Con npx serve o live-server:
npx serve magnates

# O con Python:
python -m http.server 8080 --directory magnates
```

---

## 🎨 Características Implementadas
1. **Hero interactivo en 3D:** Icosaedro matemático proyectado en `<canvas>` 2D cuyas coordenadas y rotación reaccionan con suavidad al scroll del usuario.
2. **Efecto Spotlight:** Las tarjetas de servicios siguen la posición del puntero del ratón iluminando el fondo con un resplandor radial dinámico (`--x`, `--y`).
3. **Marquesina tecnológica continua:** Doble fila animada por CSS con pausado automático al pasar el ratón.
4. **Formulario con Floating Labels:** Etiquetas flotantes puras en CSS con selector de servicios en píldoras interactivas.
5. **SEO y Metadatos completos:** Incluye marcado Schema.org (`MarketingAgency`), metadatos para redes sociales y fuentes Google Fonts precargadas.
