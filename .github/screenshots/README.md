# 📸 Screenshots

Esta carpeta contiene las capturas de pantalla utilizadas en la documentación del proyecto.

## 📋 Lista de Capturas Requeridas

### Desktop Views (1920x1080 recomendado)
- [x] `desktop-dashboard.png` - Dashboard principal con estadísticas
- [x] `desktop-patient-list.png` - Lista de pacientes en grid
- [x] `desktop-patient-detail.png` - Vista detallada de un paciente
- [x] `desktop-edit-form.png` - Formulario de crear/editar

### Mobile Views (375x812 recomendado - iPhone X)
- [x] `mobile-menu.png` - Menú hamburguesa abierto
- [x] `mobile-dashboard.png` - Dashboard en vista móvil

### Optional
- [ ] `tablet-responsive.png` - Vista en tablet (768x1024)

## 🎨 Recomendaciones

### Resolución y Formato
- **Desktop**: 1920x1080px o 1440x900px
- **Mobile**: 375x812px (iPhone X/11) o 390x844px (iPhone 12/13)
- **Formato**: PNG con compresión optimizada
- **Peso máximo**: 500KB por imagen

### Captura Professional
1. **Limpia el navegador**: Oculta extensiones y bookmarks
2. **Usa modo incógnito**: Para una barra limpia
3. **Zoom 100%**: Asegura proporciones correctas
4. **Datos realistas**: Usa los pacientes de ejemplo incluidos
5. **Scroll a 0**: Captura desde el inicio de la página

### Herramientas Recomendadas
- **macOS**: Cmd + Shift + 4 (nativo)
- **Windows**: Snipping Tool o Win + Shift + S
- **Extensiones Chrome**: 
  - [Awesome Screenshot](https://chrome.google.com/webstore/detail/awesome-screenshot)
  - [FireShot](https://chrome.google.com/webstore/detail/fireshot)

### Optimización
- Usa [TinyPNG](https://tinypng.com/) para comprimir
- O ejecuta: `npm install -g imagemin-cli && imagemin *.png --out-dir=optimized`

## 🚀 Testing de Screenshots

Después de añadir las imágenes, verifica:
```bash
# Verifica que todas las imágenes existan
ls -la *.png

# Verifica el tamaño de las imágenes
du -h *.png
```

---

**Nota**: Las imágenes deben mostrar el estado real y funcional de la aplicación para generar confianza en potenciales usuarios o empleadores.
