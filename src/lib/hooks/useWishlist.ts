"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/context/AuthContext";

const LOCAL_WISHLIST_KEY = "lotus-wishlist";

export function useWishlist() {
  const { user } = useAuth();
  const supabase = createClient();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLocalWishlist = useCallback(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_WISHLIST_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }, []);

  const saveLocalWishlist = useCallback((ids: number[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_WISHLIST_KEY, JSON.stringify(ids));
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      if (user && supabase) {
        const { data } = await supabase
          .from("wishlist")
          .select("product_id")
          .eq("user_id", user.id);
        setWishlist(data?.map((w) => w.product_id) ?? []);
      } else {
        setWishlist(loadLocalWishlist());
      }
      setLoading(false);
    };
    load();
  }, [user, supabase, loadLocalWishlist]);

  const addToWishlist = async (productId: number) => {
    if (user && supabase) {
      const { error } = await supabase
        .from("wishlist")
        .insert({ user_id: user.id, product_id: productId });
      if (error && error.code !== "23505") {
        console.error(error);
      }
    }
    const newList = [...wishlist, productId];
    setWishlist(newList);
    saveLocalWishlist(newList);
  };

  const removeFromWishlist = async (productId: number) => {
    if (user && supabase) {
      await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);
    }
    const newList = wishlist.filter((id) => id !== productId);
    setWishlist(newList);
    saveLocalWishlist(newList);
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const toggleWishlist = (productId: number) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      return false;
    } else {
      addToWishlist(productId);
      return true;
    }
  };

  return {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };
}
