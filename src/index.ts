import boxen, { type Options as BoxenOptions } from "boxen";

/**
 * Colores ANSI soportados para el borde y el texto del log.
 */
type LoggerColor =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";

/**
 * Estilos de borde disponibles proporcionados por la librería `boxen`.
 */
type LoggerBorderStyle = BoxenOptions["borderStyle"];

/**
 * Configuración visual y de contenido para imprimir un mensaje en consola.
 *
 * Define el título del bloque, mensaje principal, datos estructurados opcionales
 * y la apariencia del cuadro renderizado.
 *
 * @example
 * // Uso básico
 * const options: LoggerOptions = {
 *   title: "API",
 *   message: "Usuario creado",
 * };
 *
 * @example
 * // Con datos y estilo personalizado
 * const options: LoggerOptions = {
 *   title: "Auth",
 *   message: "Fallo de login",
 *   data: { user: "admin", ip: "127.0.0.1" },
 *   borderStyle: "double",
 *   borderColor: "red"
 * };
 */
type LoggerOptions = {
  /**
   * Texto mostrado como título del cuadro de log.
   *
   * Aparece centrado en el borde superior del bloque.
   *
   * @example "Servidor"
   * @example "Database"
   */
  title: string;

  /**
   * Descripción del evento o resultado a registrar.
   *
   * Aparece precedido por el prefijo del nivel correspondiente (ej. `[SUCCESS]`, `[ERROR]`).
   *
   * @example "Aplicación iniciada en el puerto 3000"
   * @example "No se pudo conectar a la base de datos"
   */
  message: string;

  /**
   * Colección de elementos estructurados a mostrar debajo del mensaje.
   *
   * Acepta un único objeto o un array. Cada elemento se serializa
   * automáticamente a JSON con una indentación de 2 espacios.
   *
   * @example { id: 1, status: "active" }
   * @example ["error_code_1", "error_code_2"]
   */
  data?: unknown | unknown[];

  /**
   * Una URL opcional para incluir en el log.
   *
   * Se mostrará al final del contenido del cuadro.
   *
   * @example "https://api.example.com/v1/health"
   */
  url?: string;

  /**
   * Color ANSI aplicado al borde del cuadro.
   *
   * @default "cyan" | "green" | "yellow" | "red" (según el método llamado)
   */
  borderColor?: LoggerColor;

  /**
   * Estilo de borde del cuadro renderizado.
   *
   * Estilos: `"single"`, `"double"`, `"round"`, `"bold"`, `"singleDouble"`,
   * `"doubleSingle"`, `"classic"`, `"arrow"`.
   *
   * @default "round"
   */
  borderStyle?: LoggerBorderStyle;

  /**
   * Color ANSI aplicado al cuerpo del mensaje y datos.
   *
   * @default "cyan" | "green" | "yellow" | "red" (según el método llamado)
   */
  messageColor?: LoggerColor;
};

/**
 * Logger visual para consola con formato de cuadro decorativo.
 *
 * Utiliza `boxen` para renderizar bloques enmarcados con títulos, prefijos de nivel
 * y serialización automática de datos. Ofrece métodos especializados para diferentes
 * niveles de severidad con colores predefinidos.
 *
 * ### Niveles disponibles:
 * - `info()`: Color celeste (cyan).
 * - `success()`: Color verde (green).
 * - `warn()`: Color amarillo/naranja (yellow).
 * - `error()`: Color rojo (red).
 *
 * @example
 * const logger = new RogerLogger();
 *
 * logger.success({ title: "DB", message: "Conexión establecida" });
 * logger.info({ title: "App", message: "Servidor escuchando" });
 * logger.warn({ title: "Config", message: "Falta variable de entorno" });
 * logger.error({ title: "Auth", message: "Token expirado", data: { exp: 123456 } });
 */
export class RogerLogger {
  /**
   * Mapa de códigos de escape ANSI para colores de texto.
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
   * Código ANSI para resetear el color del texto.
   */
  private reset = "\x1b[0m";

  /**
   * Serializa datos estructurados para su visualización.
   *
   * @param data - Datos a serializar (objeto o array).
   * @returns String formateado con indentación y prefijos de índice si es array.
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
   * Lógica interna para renderizar y mostrar el log.
   *
   * @param level - Prefijo de nivel (INFO, SUCCESS, etc).
   * @param options - Configuración del log proporcionada por el usuario.
   * @param defaultColor - Color predeterminado si no se especifica uno en opciones.
   */
  private print(
    level: "INFO" | "SUCCESS" | "ERROR" | "WARN",
    options: LoggerOptions,
    defaultColor: LoggerColor,
  ): void {
    const {
      title,
      message,
      data,
      url,
      borderColor = defaultColor,
      borderStyle = "round",
      messageColor = defaultColor,
    } = options;

    const color = this.colors[messageColor];
    const lines = [`${color}[${level}] ${message}${this.reset}`];

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

  /**
   * Registra un mensaje de información.
   *
   * @param options - Configuración del log. Por defecto usa color celeste (cyan).
   * @example
   * logger.info({ title: "System", message: "Iniciando proceso..." });
   */
  info(options: LoggerOptions): void {
    this.print("INFO", options, "cyan");
  }

  /**
   * Registra un mensaje de éxito.
   *
   * @param options - Configuración del log. Por defecto usa color verde (green).
   * @example
   * logger.success({ title: "Upload", message: "Archivo subido con éxito" });
   */
  success(options: LoggerOptions): void {
    this.print("SUCCESS", options, "green");
  }

  /**
   * Registra un mensaje de error.
   *
   * @param options - Configuración del log. Por defecto usa color rojo (red).
   * @example
   * logger.error({ title: "API", message: "Error 500", data: { error: "Internal Server Error" } });
   */
  error(options: LoggerOptions): void {
    this.print("ERROR", options, "red");
  }

  /**
   * Registra un mensaje de advertencia.
   *
   * @param options - Configuración del log. Por defecto usa color amarillo (yellow).
   * @example
   * logger.warn({ title: "Memory", message: "Uso de memoria elevado" });
   */
  warn(options: LoggerOptions): void {
    this.print("WARN", options, "yellow");
  }
}
