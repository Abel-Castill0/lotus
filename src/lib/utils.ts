import { clsx, type ClassValue } from "clsx";
import { CartItem, CheckoutFormData, Product } from "./types";
import { products } from "./products";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return `S/ ${price.toFixed(2)}`;
}

export function generateWhatsAppUrl(
  items: CartItem[],
  customerData: CheckoutFormData,
  subtotal: number,
  discount: number,
  total: number,
  couponCode: string | null
): string {
  const phone = "51960599967";

  let message = "Hola, Lotus Manga Store! 🌸\n\n";
  message += "Quiero realizar el siguiente pedido:\n\n";
  message += "📚 Productos:\n";

  items.forEach((item) => {
    message += `- ${item.title} (x${item.quantity}) - S/ ${(item.price * item.quantity).toFixed(2)}\n`;
  });

  message += `\n💰 Subtotal: S/ ${subtotal.toFixed(2)}\n`;

  if (couponCode && discount > 0) {
    message += `🏷️ Cupon: ${couponCode} (-${discount}%)\n`;
  }

  message += `💵 Total: S/ ${total.toFixed(2)}\n\n`;
  message += "📦 Datos de envio:\n";
  message += `Nombre: ${customerData.fullName}\n`;
  message += `Direccion: ${customerData.address}\n`;
  message += `Ciudad: ${customerData.city}\n`;
  message += `CP: ${customerData.zipCode}\n`;
  message += `Pais: ${customerData.country}\n`;
  message += `📞 Telefono: +51 ${customerData.phone}\n`;

  if (customerData.email) {
    message += `📧 Email: ${customerData.email}\n`;
  }

  if (customerData.notes) {
    message += `\n📝 Notas: ${customerData.notes}\n`;
  }

  message += "\n!Gracias! 🙏";

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function getStarRating(rating: number): string[] {
  const stars: string[] = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) stars.push("full");
  if (hasHalf) stars.push("half");
  while (stars.length < 5) stars.push("empty");

  return stars;
}

export function saveCustomerData(data: CheckoutFormData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("lotus-customer", JSON.stringify(data));
  }
}

export function loadCustomerData(): CheckoutFormData | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("lotus-customer");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function clearCustomerData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("lotus-customer");
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => slugify(p.title) === slug);
}
