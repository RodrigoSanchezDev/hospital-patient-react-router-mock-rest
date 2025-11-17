# Guía de Contribución

¡Gracias por tu interés en contribuir al Sistema de Gestión de Pacientes! 🎉

## Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas un ambiente respetuoso y profesional.

## ¿Cómo Contribuir?

### 🐛 Reportar Bugs

Si encuentras un bug, por favor abre un issue con:
- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs. actual
- Screenshots si es posible
- Información del navegador y sistema operativo

### 💡 Sugerir Mejoras

Para sugerir nuevas características:
1. Verifica que no exista un issue similar
2. Abre un nuevo issue con la etiqueta "enhancement"
3. Describe claramente la funcionalidad propuesta
4. Explica por qué sería útil

### 🔧 Pull Requests

1. **Fork** el repositorio
2. **Crea una rama** desde `main`:
   ```bash
   git checkout -b feature/mi-nueva-caracteristica
   ```
3. **Haz tus cambios** siguiendo las guías de estilo
4. **Commit** tus cambios:
   ```bash
   git commit -m 'Add: descripción clara del cambio'
   ```
5. **Push** a tu fork:
   ```bash
   git push origin feature/mi-nueva-caracteristica
   ```
6. **Abre un Pull Request** desde tu rama hacia `main`

## Guías de Estilo

### Código JavaScript/React

- Usa **ES6+** syntax
- Nombres de componentes en **PascalCase**
- Nombres de archivos coinciden con el componente: `MyComponent.jsx`
- Usa **arrow functions** para componentes funcionales
- Props destructuring en la firma de la función
- Hooks al inicio del componente

### Commits

Sigue el formato:
```
Tipo: Descripción breve

Descripción detallada (opcional)
```

Tipos válidos:
- `Add`: Nueva funcionalidad
- `Fix`: Corrección de bug
- `Update`: Actualización de código existente
- `Refactor`: Refactorización de código
- `Style`: Cambios de formato/estilo
- `Docs`: Cambios en documentación
- `Test`: Añadir o modificar tests

### Tailwind CSS

- Usa clases de Tailwind en lugar de CSS custom
- Agrupa clases relacionadas: `flex items-center justify-between`
- Usa las variables de color del tema: `text-primary`, `bg-secondary`
- Responsive classes: móvil primero, luego breakpoints `sm:`, `md:`, `lg:`

## Estructura de Branches

- `main` - Producción, siempre estable
- `develop` - Desarrollo activo
- `feature/*` - Nuevas características
- `fix/*` - Correcciones de bugs
- `hotfix/*` - Fixes urgentes en producción

## Testing

Antes de enviar un PR:
1. Verifica que la app corra sin errores: `npm run dev`
2. Verifica que el build funcione: `npm run build`
3. Revisa la consola del navegador (no debe haber errores)
4. Prueba en diferentes tamaños de pantalla

## Proceso de Review

1. Un maintainer revisará tu PR
2. Pueden solicitar cambios
3. Una vez aprobado, se hará merge a `main`
4. Tu contribución será acreditada en el proyecto

## Preguntas

Si tienes dudas, puedes:
- Abrir un issue con la etiqueta "question"
- Contactar a rodrigo@sanchezdev.com

---

¡Gracias por contribuir! 🚀
