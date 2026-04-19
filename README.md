# roger-logger v1.0.2

Logger visual para consola con formato de cuadro decorativo, construido sobre [`boxen`](https://github.com/sindresorhus/boxen).

Genera bloques enmarcados con título, mensaje y datos estructurados, con soporte para colores ANSI y múltiples estilos de borde. Diseñado para mejorar la legibilidad de logs en aplicaciones Node.js, scripts CLI y procesos backend.

```
╭────────── Servidor API ──────────╮
│                                  │
│   [INFO] Endpoint de usuarios    │
│                                  │
│   URL: https://api.ejemplo.com/v1/users │
│                                  │
╰──────────────────────────────────╯
```

---

## Instalación

```bash
npm install roger-logger@latest
```

---

## Uso

```typescript
import { RogerLogger } from "roger-logger";

const logger = new RogerLogger();

// Éxito (Verde por defecto)
logger.success({
  title: "Auth",
  message: "Usuario autenticado correctamente",
  data: { userId: "123" }
});

// Información (Celeste por defecto)
logger.info({
  title: "Servidor",
  message: "Aplicación iniciada en el puerto 3000",
});

// Advertencia (Amarillo/Naranja por defecto)
logger.warn({
  title: "Performance",
  message: "La consulta tardó más de lo esperado",
  data: { duration: "850ms" }
});

// Error (Rojo por defecto)
logger.error({
  title: "Base de Datos",
  message: "No se pudo establecer conexión",
  data: { host: "localhost", port: 5432 }
});
```

---

## API

### `new RogerLogger()`

Crea una nueva instancia del logger. No requiere configuración inicial.

---

### Métodos de Log

Todos los métodos aceptan un objeto `LoggerOptions` y funcionan de la misma manera, variando únicamente su color y prefijo por defecto.

- `logger.success(options)`: Prefijo `[SUCCESS]`, color verde.
- `logger.info(options)`: Prefijo `[INFO]`, color celeste.
- `logger.warn(options)`: Prefijo `[WARN]`, color amarillo.
- `logger.error(options)`: Prefijo `[ERROR]`, color rojo.

#### `LoggerOptions`

| Campo         | Tipo                  | Requerido | Default    | Descripción                                                                 |
|---------------|-----------------------|-----------|------------|-----------------------------------------------------------------------------|
| `title`       | `string`              | ✅        | —          | Título del cuadro, centrado en el borde superior.                           |
| `message`     | `string`              | ✅        | —          | Descripción del evento. Aparece con el prefijo correspondiente.             |
| `data`        | `unknown \| unknown[]`| ❌        | —          | Objeto o array a mostrar debajo del mensaje. Serializado automáticamente.   |
| `url`         | `string`              | ❌        | —          | URL opcional para incluir en el log.                                        |
| `borderColor` | `LoggerColor`         | ❌        | *Dinámico* | Color del borde (según el nivel).                                           |
| `borderStyle` | `LoggerBorderStyle`   | ❌        | `"round"`  | Estilo de borde del cuadro.                                                 |
| `messageColor`| `LoggerColor`         | ❌        | *Dinámico* | Color del texto del mensaje (según el nivel).                               |

---

### Colores disponibles (`LoggerColor`)

| Valor       |
|-------------|
| `"black"`   |
| `"red"`     |
| `"green"`   |
| `"yellow"`  |
| `"blue"`    |
| `"magenta"` |
| `"cyan"`    |
| `"white"`   |

---

### Estilos de borde disponibles (`LoggerBorderStyle`)

| Valor            | Vista previa  |
|------------------|---------------|
| `"round"`        | `╭──────╮`    |
| `"single"`       | `┌──────┐`    |
| `"double"`       | `╔══════╗`    |
| `"bold"`         | `┏━━━━━━┓`    |
| `"singleDouble"` | `╓──────╖`    |
| `"doubleSingle"` | `╒══════╕`    |
| `"classic"`      | `+------+`    |
| `"arrow"`        | `↘↓↓↓↓↓↙`    |

---

### Campo `data` — serialización automática

El campo `data` acepta un único objeto o un array. La serialización es automática — no es necesario llamar a `JSON.stringify` manualmente.

Cuando se pasa un array, cada elemento se muestra precedido de su índice entre corchetes:

```
[0] {
  "name": "Rodrigo",
  "age": 32
}

[1] {
  "name": "Ana",
  "age": 28
}
```

---

## Dependencias

- [`boxen`](https://github.com/sindresorhus/boxen) — renderizado del cuadro decorativo en consola.
