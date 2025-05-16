const {z} = require("zod")

const postreSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    precio_por_porcion_dop: z.number().positive('Debe ser un número positivo'),
    precio_completo_dop: z.number().positive('Debe ser un número positivo'),
  });

module.exports = { postreSchema }