"use client";
import { useState, useEffect } from "react";
import type { Event } from "@/types/Event";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Event[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(event: Event) {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === event.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== event.id);
      } else {
        return [...prev, event];
      }
    });
  }

  return { favorites, toggleFavorite };
}
