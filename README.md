# taller-ria

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install

-- Para libreria de avatars
npm install @dicebear/core @dicebear/styles --save
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Crear un módulo

```sh
npm run create-module -- usuario
```

Esto crea `src/modules/usuario/` con archivos base en `component`, `composable`, `store`, `config`, `service` y `type`, listos para extender.

### Navegabilidad del módulo

La comunicación queda organizada así:

`service -> store -> composable -> componente`

1. `service` consume la URL definida en `config` y obtiene los datos.
2. `store` llama al `service`, guarda el estado y expone acciones.
3. `composable` consume el `store` y entrega al componente solo lo necesario.
4. `componente` usa el `composable` para mostrar la interfaz y disparar acciones.

La idea es que cada módulo viva aislado dentro de `src/modules/<nombre>/`, con importaciones internas hacia sus propias capas y sin mezclar lógica con otros módulos.
