"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Review {
  id: number;
  user_id: string;
  product_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  user?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export function useReviews(productId: number) {
  const supabase = createClient();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*, user:profiles(full_name, avatar_url)")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    setReviews(data ?? []);
    setLoading(false);
  }, [productId, supabase]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const addReview = async (rating: number, comment: string) => {
    if (!supabase) return { error: "No disponible" };
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Debes iniciar sesion" };

    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      product_id: productId,
      rating,
      comment,
    });

    if (!error) {
      await loadReviews();
      return { success: true };
    }
    return { error: error.message };
  };

  const updateReview = async (
    reviewId: number,
    rating: number,
    comment: string
  ) => {
    if (!supabase) return { error: "No disponible" };
    const { error } = await supabase
      .from("reviews")
      .update({ rating, comment, updated_at: new Date().toISOString() })
      .eq("id", reviewId);

    if (!error) {
      await loadReviews();
      return { success: true };
    }
    return { error: error.message };
  };

  const deleteReview = async (reviewId: number) => {
    if (!supabase) return { error: "No disponible" };
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);

    if (!error) {
      await loadReviews();
      return { success: true };
    }
    return { error: error.message };
  };

  return { reviews, loading, addReview, updateReview, deleteReview };
}
