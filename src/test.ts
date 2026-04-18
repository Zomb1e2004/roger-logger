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
  borderColor: "green",
  borderStyle: "round",
  messageColor: "green",
});
console.log("\n");

// Caso 2: Conexión Exitosa a Base de Datos
console.log("--- Caso 2: Conexión Exitosa a Base de Datos ---");
logger.info({
  title: "Base de Datos",
  message: "Conexión a PostgreSQL establecida.",
  data: { host: "localhost", port: 5432, database: "mydatabase" },
  borderColor: "blue",
  borderStyle: "single",
  messageColor: "blue",
});
console.log("\n");

// Caso 3: Petición HTTP entrante con URL y datos
console.log("--- Caso 3: Petición HTTP entrante ---");
logger.info({
  title: "Servidor API",
  message: "Petición GET recibida para listar usuarios.",
  url: "http://localhost:3000/api/users",
  data: { method: "GET", path: "/api/users", queryParams: { limit: 10 } },
  borderColor: "cyan",
  borderStyle: "double",
  messageColor: "cyan",
});
console.log("\n");

// Caso 4: Resultado de una Operación Exitosa (ej. Usuario Creado)
console.log("--- Caso 4: Operación Exitosa ---");
logger.info({
  title: "Servicio Usuarios",
  message: "Nuevo usuario registrado exitosamente.",
  data: { userId: "uuid-123", username: "john.doe", email: "john@example.com" },
  borderColor: "green",
  borderStyle: "bold",
  messageColor: "green",
});
console.log("\n");

// Caso 5: Carga de Configuración
console.log("--- Caso 5: Carga de Configuración ---");
logger.info({
  title: "Configuración",
  message: "Variables de entorno cargadas.",
  data: { NODE_ENV: "development", PORT: 3000, DB_HOST: "localhost" },
  borderColor: "yellow",
  borderStyle: "singleDouble",
  messageColor: "yellow",
});
console.log("\n");

// Caso 6: Advertencia o Problema Menor (ej. cache miss)
console.log("--- Caso 6: Advertencia (cache miss) ---");
logger.info({
  title: "Servicio Cache",
  message:
    "Elemento no encontrado en la caché, consultando la fuente principal.",
  data: { key: "product:123" },
  borderColor: "yellow",
  borderStyle: "round",
  messageColor: "yellow",
});
console.log("\n");

// Caso 7: Errores o Excepciones (usando color rojo)
console.log("--- Caso 7: Error de Validación ---");
logger.info({
  title: "Middleware Validación",
  message: "Error de validación en la petición.",
  url: "http://localhost:3000/api/products",
  data: [
    { field: "name", error: "El nombre es requerido." },
    { field: "price", error: "El precio debe ser un número." },
  ],
  borderColor: "red",
  borderStyle: "double",
  messageColor: "red",
});
console.log("\n");

// Caso 8: Consumo de una API externa
console.log("--- Caso 8: Consumo de API Externa ---");
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

// Caso 9: Tareas programadas o Background Jobs
console.log("--- Caso 9: Tarea Programada ---");
logger.info({
  title: "Cron Job",
  message: "Proceso de limpieza de sesiones antiguas iniciado.",
  data: { recordsDeleted: 50, durationMs: 120 },
  borderColor: "white",
  borderStyle: "arrow",
  messageColor: "white",
});
console.log("\n");

// Caso 10: Mensaje simple sin datos ni URL
console.log("--- Caso 10: Mensaje Simple ---");
logger.info({
  title: "Eventos",
  message: "Evento 'usuarioConectado' emitido.",
  borderColor: "blue",
  messageColor: "blue",
});
console.log("\n");
