import boxen, { type Options as BoxenOptions } from "boxen";

type LoggerColor =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";

type LoggerBorderStyle = BoxenOptions["borderStyle"];

/**
 * Configuración visual y de contenido para imprimir un mensaje en consola.
 *
 * Define el título del bloque, mensaje principal, datos estructurados opcionales
 * y la apariencia del cuadro renderizado con `boxen`.
 *
 * @example
 * // Solo mensaje
 * const options: LoggerOptions = {
 *   title: "Servidor",
 *   message: "Aplicación iniciada",
 * };
 *
 * @example
 * // Mensaje con datos estructurados
 * const options: LoggerOptions = {
 *   title: "Servidor",
 *   message: "Usuarios encontrados",
 *   data: [{ name: "Rodrigo", age: 32 }, { name: "Ana", age: 28 }],
 * };
 *
 * @example
 * // Configuración completa con apariencia personalizada
 * const options: LoggerOptions = {
 *   title: "Auth",
 *   message: "Token inválido",
 *   borderColor: "red",
 *   borderStyle: "double",
 *   messageColor: "white",
 * };
 */
type LoggerOptions = {
  /**
   * Texto mostrado como título del cuadro de log.
   *
   * Aparece centrado en el borde superior del bloque
   * renderizado por `boxen`.
   *
   * @example "Servidor"
   * @example "Base de Datos"
   * @example "Autenticación"
   */
  title: string;

  /**
   * Descripción breve del evento, estado o resultado a registrar.
   *
   * Aparece precedido por el prefijo del nivel (ej. `[INFO]`).
   * Para adjuntar información estructurada adicional, usar el campo `data`.
   *
   * @example "Aplicación iniciada en el puerto 3000"
   * @example "Conexión exitosa con PostgreSQL"
   * @example "Token JWT inválido o expirado"
   */
  message: string;

  /**
   * Colección de elementos estructurados a mostrar debajo del mensaje.
   *
   * Acepta un único objeto o un array de objetos. Cada elemento se serializa
   * automáticamente con `JSON.stringify` usando indentación de 2 espacios.
   * Se muestra separado del mensaje principal para mantener una lectura
   * clara y ordenada.
   *
   * Cuando se pasa un array, cada elemento se precede de su índice entre
   * corchetes (ej. `[0]`, `[1]`).
   *
   * @example { name: "Rodrigo", age: 32 }
   * @example [{ id: 1, status: "active" }, { id: 2, status: "inactive" }]
   * @example ["error_1", "error_2"]
   */
  data?: unknown | unknown[];

  /**
   * Una URL opcional para incluir en el log.
   *
   * Se mostrará debajo del mensaje principal y cualquier dato estructurado.
   *
   * @example "http://localhost:5134"
   */
  url?: string;

  /**
   * Color ANSI aplicado al borde del cuadro (encabezado y pie).
   *
   * Ambos bordes comparten siempre el mismo color para
   * mantener una apariencia visual consistente.
   *
   * @default "cyan"
   */
  borderColor?: LoggerColor;

  /**
   * Estilo de borde del cuadro renderizado por `boxen`.
   *
   * Determina los caracteres utilizados para dibujar el marco del log.
   * Acepta cualquier estilo soportado por `boxen`.
   *
   * Estilos disponibles: `"single"`, `"double"`, `"round"`, `"bold"`,
   * `"singleDouble"`, `"doubleSingle"`, `"classic"`, `"arrow"`.
   *
   * @default "round"
   *
   * @example "round"   // ╭──────╮
   * @example "double"  // ╔══════╗
   * @example "bold"    // ┏━━━━━━┓
   */
  borderStyle?: LoggerBorderStyle;

  /**
   * Color ANSI aplicado al cuerpo del mensaje.
   *
   * Controla el color del texto que contiene el prefijo
   * de nivel y el contenido del log.
   *
   * @default "cyan"
   */
  messageColor?: LoggerColor;
};

/**
 * Logger visual para consola con formato de cuadro decorativo.
 *
 * Genera salidas estructuradas usando `boxen` para renderizar
 * un bloque enmarcado con título, cuerpo y borde estilizado.
 * Soporta colores ANSI, múltiples estilos de borde y serialización
 * automática de datos estructurados mediante el campo `data`.
 *
 * Ideal para mejorar la legibilidad de logs en aplicaciones Node.js,
 * scripts CLI y procesos backend donde distinguir contextos visualmente
 * es importante.
 *
 * ---
 *
 * ### Formato de salida — solo mensaje
 *
 * ```
 * ╭──────── Servidor ────────╮
 * │                          │
 * │   [INFO] App iniciada    │
 * │                          │
 * ╰──────────────────────────╯
 * ```
 *
 * ### Formato de salida — mensaje con data
 *
 * ```
 * ╭────────── Servidor ──────────╮
 * │                              │
 * │   [INFO] Usuarios cargados   │
 * │                              │
 * │   [0] {                      │
 * │     "name": "Rodrigo",       │
 * │     "age": 32                │
 * │   }                          │
 * │                              │
 * ╰──────────────────────────────╯
 * ```
 *
 * ---
 *
 * @example
 * // Uso básico
 * const logger = new RogerLogger();
 *
 * logger.info({
 *   title: "Servidor",
 *   message: "Aplicación iniciada",
 * });
 *
 * @example
 * // Con datos estructurados
 * const logger = new RogerLogger();
 *
 * logger.info({
 *   title: "Servidor",
 *   message: "Usuarios cargados",
 *   data: [{ name: "Rodrigo", age: 32 }],
 * });
 *
 * @example
 * // Con apariencia personalizada
 * const logger = new RogerLogger();
 *
 * logger.info({
 *   title: "Auth",
 *   message: "Token inválido",
 *   borderColor: "red",
 *   borderStyle: "double",
 *   messageColor: "yellow",
 * });
 */
export class RogerLogger {
  /**
   * Mapa de códigos de escape ANSI indexados por nombre de color.
   *
   * Usado internamente para colorear el texto del mensaje
   * antes de pasarlo a `boxen`.
   */
  private colors: Record<LoggerColor, string> = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  };

  /**
   * Código ANSI de reset que restaura el estilo predeterminado
   * de la terminal al finalizar el texto coloreado.
   */
  private reset = "\x1b[0m";

  /**
   * Serializa el array `data` en un bloque de texto legible.
   *
   * Cada elemento se representa con su índice entre corchetes (ej. `[0]`)
   * seguido de su contenido serializado con `JSON.stringify` e indentado
   * con 2 espacios. Los elementos se separan entre sí con una línea en blanco.
   *
   * @param data - Array de valores a serializar.
   * @returns Bloque de texto listo para incluir en el log.
   *
   * @example
   * this.serializeData([{ name: "Rodrigo" }]);
   * // "[0] {\n  \"name\": \"Rodrigo\"\n}"
   */
  private serializeData(data: unknown | unknown[]): string {
    if (!Array.isArray(data)) {
      return JSON.stringify(data, null, 2);
    }

    return data
      .map((item, index) => `[${index}] ${JSON.stringify(item, null, 2)}`)
      .join("\n\n");
  }

  /**
   * Imprime un mensaje informativo dentro de un cuadro decorativo.
   *
   * Renderiza un bloque enmarcado con `boxen` compuesto por:
   * 1. **Título**: centrado en el borde superior del cuadro.
   * 2. **Mensaje**: prefijo `[INFO]` seguido de la descripción del evento.
   * 3. **Data** *(opcional)*: cada elemento del array serializado con su índice,
   *    mostrado debajo del mensaje y separado por una línea en blanco.
   *
   * El borde del cuadro (color y estilo) y el color del mensaje
   * pueden personalizarse de forma independiente mediante {@link LoggerOptions}.
   *
   * @param options - Configuración del log. Ver {@link LoggerOptions}.
   * @returns `void`. Este método produce un efecto secundario en consola.
   *
   * @example
   * // Solo mensaje
   * logger.info({
   *   title: "Servidor",
   *   message: "Aplicación iniciada",
   * });
   *
   * @example
   * // Con datos estructurados
   * logger.info({
   *   title: "Servidor",
   *   message: "Usuarios cargados",
   *   data: [{ name: "Rodrigo", age: 32 }, { name: "Ana", age: 28 }],
   * });
   *
   * @example
   * // Personalización completa
   * logger.info({
   *   title: "Auth",
   *   message: "Token inválido",
   *   borderColor: "red",
   *   borderStyle: "double",
   *   messageColor: "white",
   * });
   */
  info({
    title,
    message,
    data,
    url,
    borderColor = "cyan",
    borderStyle = "round",
    messageColor = "cyan",
  }: LoggerOptions): void {
    const color = this.colors[messageColor];
    const lines = [`${color}[INFO] ${message}${this.reset}`];

    if (data !== undefined) {
      lines.push(`${color}${this.serializeData(data)}${this.reset}`);
    }

    if (url !== undefined) {
      lines.push(`${color}URL: ${url}${this.reset}`);
    }

    console.log(
      boxen(lines.join("\n\n"), {
        title,
        titleAlignment: "center",
        padding: 1,
        borderStyle,
        borderColor,
      }),
    );
  }
}
