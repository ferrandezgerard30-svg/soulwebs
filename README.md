# Soul Webs — soulwebsites.com

Estudio español de diseño web para peluquerías, barberías y restaurantes. Sitio oficial.

🌐 https://www.soulwebsites.com
📱 WhatsApp +34 614 141 469
✉️ soulwebs2026@gmail.com
📷 [@soul_webs](https://instagram.com/soul_webs)

## Stack

- HTML + CSS vanilla (sin frameworks)
- Tipografías: Fraunces, Geist, Geist Mono (Google Fonts)
- Despliegue: Vercel
- Sin build step — archivos estáticos

## Estructura

```
.
├── index.html           # Inicio
├── servicios.html       # Servicios y planes
├── trabajos.html        # Casos reales
├── sectores.html        # Peluquerías y restaurantes
├── opiniones.html         # Formulario de reseñas
├── contacto.html        # WhatsApp / email / IG
├── logo.jpg             # Logo
├── robots.txt           # Permisos crawlers (todos los AI bots permitidos)
├── sitemap.xml          # Sitemap
├── llms.txt             # Contexto para LLMs
├── llms-full.txt        # Contexto extendido
├── pricing.md           # Precios machine-readable
├── pricing.txt          # Mismo, en .txt
├── manifest.webmanifest # PWA manifest
├── humans.txt           # Créditos
├── AGENTS.md            # Guía para agentes AI
├── vercel.json          # Config Vercel
└── README.md            # Este archivo
```

## SEO

- Schema.org JSON-LD (Organization, ProfessionalService, WebSite, BreadcrumbList, FAQPage, Service)
- Open Graph + Twitter Cards en todas las páginas
- Canonical URLs
- Hreflang (es, es-ES)
- robots.txt con explicit allow para GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.
- sitemap.xml
- llms.txt y llms-full.txt para AI search
- pricing.md y AGENTS.md para AI agents

## Deploy a Vercel

```bash
# Desde la raíz del repo:
npx vercel --prod
```

O conectar el repo en https://vercel.com/new — Vercel detecta automáticamente que es un sitio estático.

## Dominio

Configurar `soulwebsites.com` en Vercel → Settings → Domains.
