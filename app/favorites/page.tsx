"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import type { Event } from "@/types/Event";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Event[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Favorite Events</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isFav={true}
                toggleFavorite={() => {}}
              />
            ))}
          </div>
        ) : (
          <p>No favorites yet.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
