import { RogerLogger } from "../dist/index.js"; // Ajusta la ruta si es necesario

const logger = new RogerLogger();

console.log("--- RogerLogger: Ejemplos de Casos de Uso en Desarrollo ---");
console.log("\n");

// Caso 1: Inicio de la Aplicación
console.log("--- Caso 1: Inicio de la Aplicación (INFO) ---");
logger.info({
  title: "Sistema Core",
  message: "Aplicación de Backend iniciada correctamente.",
  data: { version: "1.0.0", environment: "development" },
});
console.log("\n");

// Caso 2: Conexión Exitosa a Base de Datos
console.log("--- Caso 2: Conexión Exitosa a Base de Datos (INFO) ---");
logger.info({
  title: "Base de Datos",
  message: "Conexión a PostgreSQL establecida.",
  data: { host: "localhost", port: 5432, database: "mydatabase" },
  borderColor: "blue",
  borderStyle: "single",
  messageColor: "blue",
});
console.log("\n");

// Caso 3: Operación Exitosa (SUCCESS)
console.log("--- Caso 3: Operación Exitosa (SUCCESS) ---");
logger.success({
  title: "Servicio Usuarios",
  message: "Nuevo usuario registrado exitosamente.",
  data: { userId: "uuid-123", username: "john.doe" },
});
console.log("\n");

// Caso 4: Advertencia de Depreciación (WARN)
console.log("--- Caso 3: Advertencia de Depreciación (WARN) ---");
logger.warn({
  title: "Middleware",
  message: "El uso de 'body-parser' está depreciado en esta versión.",
  data: { alternative: "express.json()" },
});
console.log("\n");

// Caso 5: Error de Validación (ERROR)
console.log("--- Caso 5: Error de Validación (ERROR) ---");
logger.error({
  title: "Middleware Validación",
  message: "Error de validación en la petición.",
  url: "http://localhost:3000/api/products",
  data: [
    { field: "name", error: "El nombre es requerido." },
    { field: "price", error: "El precio debe ser un número." },
  ],
});
console.log("\n");

// Caso 6: Fallo Crítico de Conexión (ERROR)
console.log("--- Caso 6: Fallo Crítico de Conexión (ERROR) ---");
logger.error({
  title: "Redis",
  message: "No se pudo conectar al servidor de Redis.",
  data: { host: "127.0.0.1", port: 6379, code: "ECONNREFUSED" },
  borderStyle: "double",
});
console.log("\n");

// Caso 7: Advertencia de Performance (WARN)
console.log("--- Caso 7: Advertencia de Performance (WARN) ---");
logger.warn({
  title: "Performance",
  message: "La consulta a la base de datos tomó más de 500ms.",
  data: { query: "SELECT * FROM large_table", duration: "840ms" },
  borderStyle: "bold",
});
console.log("\n");

// Caso 8: Petición HTTP entrante (INFO)
console.log("--- Caso 8: Petición HTTP entrante (INFO) ---");
logger.info({
  title: "Servidor API",
  message: "Petición GET recibida para listar usuarios.",
  url: "http://localhost:3000/api/users",
  data: { method: "GET", path: "/api/users", queryParams: { limit: 10 } },
});
console.log("\n");

// Caso 9: Consumo de una API externa con estilo personalizado
console.log("--- Caso 9: Consumo de API Externa (INFO con estilo) ---");
logger.info({
  title: "Integración Stripe",
  message: "Solicitud de pago enviada a Stripe.",
  url: "https://api.stripe.com/v1/charges",
  data: { amount: 1000, currency: "usd", description: "Orden #ABC" },
  borderColor: "magenta",
  borderStyle: "bold",
  messageColor: "magenta",
});
console.log("\n");

// Caso 10: Tarea Programada (INFO)
console.log("--- Caso 10: Tarea Programada (INFO) ---");
logger.info({
  title: "Cron Job",
  message: "Proceso de limpieza de sesiones antiguas iniciado.",
  data: { recordsDeleted: 50, durationMs: 120 },
  borderColor: "white",
  borderStyle: "arrow",
  messageColor: "white",
});
console.log("\n");

// Caso 11: Mensaje simple sin datos ni URL (INFO)
console.log("--- Caso 11: Mensaje Simple (INFO) ---");
logger.info({
  title: "Eventos",
  message: "Evento 'usuarioConectado' emitido.",
});
console.log("\n");
