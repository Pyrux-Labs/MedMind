# MedMind — Tareas Manuales Pendientes

## 1. Google Search Console

- [ ] Obtener el archivo HTML de verificacion de Google Search Console y colocarlo en `public/` (ej: `public/google1234567890.html`)
- [ ] Crear una ruta en Next.js para servirlo, o verificar con metodo DNS/meta tag alternativo
- [ ] Verificar el sitio `https://www.medmind.com.ar` en Google Search Console
- [ ] Enviar el sitemap: `https://www.medmind.com.ar/sitemap.xml`
- [ ] Monitorear indexacion periodicamente

## 2. Variable de entorno SMTP

- [ ] Actualizar `SMTP_TO` en las variables de entorno de produccion (Vercel) de `info@medmindls.com` a `info@medmind.com.ar` (si corresponde)
- [ ] Verificar que `NEXT_PUBLIC_SITE_URL=https://www.medmind.com.ar` este configurado en las env vars de Vercel

## 3. Verificacion visual responsive

Re-testear en las siguientes resoluciones despues de los cambios aplicados:

- [ ] 360x800, 375x667, 390x844, 412x915, 430x932 (phones)
- [ ] 768x1024, 820x1180, 1024x1366 (tablets)
- [ ] 1280x800, 1366x768, 1920x1080 (laptops)

Focos de atencion:
- News cards en 2 columnas en mobile (verificar que no se ven muy chicas en 360px)
- Founders layout vertical en mobile
- Content components verticales en mobile
- Values layout vertical en mobile
- Cards flip on tap en mobile

## 4. Re-run Lighthouse post-deploy

Despues de deployar, correr Lighthouse de nuevo para verificar mejoras en:
- [ ] Performance (LCP, layout shifts)
- [ ] Accessibility (contraste, labels — ya corregidos en codigo)
- [ ] SEO (OG image, sitemap URL corregida)

**Nota:** Los issues de "Legacy JavaScript" y "Reduce unused JavaScript" son del bundle de Next.js y no se pueden resolver desde el codigo de la app. Son normales.

## 5. Monitoreo continuo

- [ ] Revisar Google Search Console semanalmente las primeras semanas
- [ ] Verificar que las OG images se renderizan correctamente en redes sociales (usar https://developers.facebook.com/tools/debug/ y https://cards-dev.twitter.com/validator)
