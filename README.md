# roger-logger

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

// Mensaje simple
logger.info({
  title: "Servidor",
  message: "Aplicación iniciada",
});

// Con un objeto en data
logger.info({
  title: "Servidor",
  message: "Datos del usuario",
  data: { name: "Rodrigo", age: 32 },
});

// Con un array de objetos en data
logger.info({
  title: "Base de Datos",
  message: "Usuarios encontrados",
  data: [
    { name: "Rodrigo", age: 32 },
    { name: "Ana", age: 28 },
  ],
});

// Con apariencia personalizada
logger.info({
  title: "Auth",
  message: "Token inválido",
  borderColor: "red",
  borderStyle: "double",
  messageColor: "yellow",
});

// Con una URL
logger.info({
  title: "Servidor API",
  message: "Endpoint de usuarios",
  url: "https://api.ejemplo.com/v1/users",
  borderColor: "magenta",
  borderStyle: "bold",
  messageColor: "magenta",
});
```

---

## API

### `new RogerLogger()`

Crea una nueva instancia del logger. No requiere configuración inicial.

---

### `logger.info(options: LoggerOptions): void`

Imprime un mensaje informativo dentro de un cuadro decorativo.

#### `LoggerOptions`

| Campo         | Tipo                  | Requerido | Default    | Descripción                                                                 |
|---------------|-----------------------|-----------|------------|-----------------------------------------------------------------------------|
| `title`       | `string`              | ✅        | —          | Título del cuadro, centrado en el borde superior.                           |
| `message`     | `string`              | ✅        | —          | Descripción breve del evento. Aparece con el prefijo `[INFO]`.              |
| `data`        | `unknown \| unknown[]`| ❌        | —          | Objeto o array de objetos a mostrar debajo del mensaje. Se serializa automáticamente. |
| `url`         | `string`              | ❌        | —          | Una URL opcional para incluir en el log, mostrada debajo del mensaje y los datos. |
| `borderColor` | `LoggerColor`         | ❌        | `"cyan"`   | Color del borde del cuadro (encabezado y pie comparten el mismo color).     |
| `borderStyle` | `LoggerBorderStyle`   | ❌        | `"round"`  | Estilo de borde del cuadro. Ver estilos disponibles abajo.                  |
| `messageColor`| `LoggerColor`         | ❌        | `"cyan"`   | Color del texto del mensaje.                                                |

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

Cuando se pasa un objeto único, se muestra directamente sin índice:

```
{
  "name": "Rodrigo",
  "age": 32
}
```

---

## Dependencias

- [`boxen`](https://github.com/sindresorhus/boxen) — renderizado del cuadro decorativo en consola.
