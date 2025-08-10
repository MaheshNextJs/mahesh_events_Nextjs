"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import EventCard from "@/components/EventCard";
import fetchEvents from "@/lib/fetchEvents";
import type { Event } from "@/types/Event";

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Event[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (event: Event) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === event.id);
      return exists
        ? prev.filter((fav) => fav.id !== event.id)
        : [...prev, event];
    });
  };

  const loadEvents = async (search?: string) => {
    setLoading(true);
    try {
      const data = await fetchEvents(search);
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <SearchBar onSearch={loadEvents} />
        {loading && (
          <p className="text-sm text-gray-500 mt-2">Loading events...</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {events.slice(-20).map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isFav={favorites.some((fav) => fav.id === event.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
