# &#x1F50B; Dashboard de Demanda de Bater&#xED;as — Argentina

Dashboard interactivo para visualizar la demanda potencial de bater&#xED;as de auto en Argentina, cruzando datos de **temperatura clim&#xE1;tica real** y **% de inter&#xE9;s en Google**.

## Features

- &#x1F5FA; **Mapa de calor** de Argentina (Leaflet + Leaflet.heat)
- &#x1F321; **Temperatura real** por municipio v&#xED;a [Open-Meteo](https://open-meteo.com/) (gratis, sin API key)
- &#x1F4C8; **% de inter&#xE9;s** via Google Trends (Netlify Function proxy)
- &#x23F3; **Timeline cronol&#xF3;gico** — &#xFA;ltimos 12 meses con reproducci&#xF3;n autom&#xE1;tica
- &#x1F3AF; **Score de demanda** = Inter&#xE9;s (65%) + Estr&#xE9;s t&#xE9;rmico (35%)
- &#x1F4CA; Gr&#xE1;fico de tendencia mensual con Chart.js

## Stack

- Vanilla JS + HTML/CSS (sin framework, sin build step)
- [Leaflet.js](https://leafletjs.com/) 1.9.4
- [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat)
- [Chart.js](https://www.chartjs.org/) 4.x
- Netlify Functions (Node.js) para Google Trends

## Deploy

[![Netlify Status](https://api.netlify.com/api/v1/badges/placeholder/deploy-status)](https://app.netlify.com)

El sitio se auto-deploya en Netlify desde la rama `main`.

## Configuraci&#xF3;n local

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Instalar dependencias de la function
cd netlify/functions && npm install && cd ../..

# Correr localmente (incluye las Netlify Functions)
netlify dev
```

## L&#xF3;gica del Score

```
tempStress  = |temp - 18| / 22   (normalizado 0-1)
demandScore = interest * 0.65 + tempStress * 100 * 0.35
```

- **Temperatura ideal:** 18&#xB0;C (la bater&#xED;a opera con m&#xED;nimo estr&#xE9;s)
- **Fr&#xED;o extremo (<0&#xB0;C):** reduce hasta 60% la capacidad de arranque
- **Calor extremo (>40&#xB0;C):** acelera la sulfataci&#xF3;n y degrada la vida &#xFA;til

## Roadmap

- [ ] Alertas autom&#xE1;ticas cuando una regi&#xF3;n supera score 80
- [ ] Integraci&#xF3;n con datos de ventas reales (CSV upload)
- [ ] Export PDF del reporte mensual
- [ ] Widget embebible para e-commerce
