# Para Karen

Blog estático, sin backend y listo para publicar con GitHub Pages.

## Añadir una nota diaria

Abre `notes.js` y agrega la nota nueva **al principio** de `window.NOTES`:

```js
{
  date: "2026-10-15",
  title: "Título de la nota",
  text: "El mensaje que quieras dejar hoy.",
  signature: "Para Karen"
},
```

Guarda el archivo, crea un commit y súbelo a GitHub. La nota más reciente se muestra en grande y las demás pasan automáticamente al archivo.

## Verlo en tu computadora

No requiere instalación. Puedes abrir `index.html` directamente o levantar un servidor local:

```bash
python3 -m http.server 8080
```

Luego visita `http://localhost:8080`.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube estos archivos.
2. En el repositorio abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Elige la rama `main`, la carpeta `/ (root)` y guarda.

GitHub mostrará la dirección pública cuando termine el despliegue.

> Importante: si el repositorio o GitHub Pages son públicos, cualquier persona con el enlace podrá leer las notas. No publiques datos privados sin el consentimiento de quienes aparezcan en ellos.
