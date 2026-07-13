export { createClient as createBrowserClient } from "./supabase/client";

export interface Order {
  id: number;
  user_id: string;
  status: string;
  subtotal: number;
  discount: number;
  total: number;
  coupon_code: string | null;
  customer_data: Record<string, string> | null;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number | null;
  title: string;
  price: number;
  quantity: number;
  cover_image: string | null;
}

export async function saveOrder(
  order: Omit<Order, "id" | "created_at">
): Promise<number | null> {
  const { createClient } = await import("./supabase/server");
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select("id")
    .single();

  if (error) {
    console.error("[Supabase] Error saving order:", error);
    return null;
  }
  return data?.id ?? null;
}

export async function saveOrderItems(
  orderId: number,
  items: Omit<OrderItem, "id" | "order_id">[]
) {
  const { createClient } = await import("./supabase/server");
  const supabase = await createClient();
  if (!supabase) return;
  const { error } = await supabase.from("order_items").insert(
    items.map((item) => ({ ...item, order_id: orderId }))
  );
  if (error) console.error("[Supabase] Error saving order items:", error);
}
