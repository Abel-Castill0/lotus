import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(3, "Nombre muy corto (min. 3 caracteres)"),
  address: z.string().min(5, "Direccion muy corta (min. 5 caracteres)"),
  city: z.string().min(2, "Ciudad requerida"),
  zipCode: z.string().min(3, "Codigo postal requerido"),
  country: z.string().min(2, "Pais requerido"),
  phone: z
    .string()
    .regex(/^9\d{8}$/, "Telefono invalido (9 digitos, formato Peru)"),
  email: z.string().email("Email invalido").optional().or(z.literal("")),
  notes: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
