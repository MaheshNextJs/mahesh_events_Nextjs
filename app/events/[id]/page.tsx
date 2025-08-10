// app/events/[id]/page.tsx
import React from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

const API_KEY = process.env.TICKETMASTER_API_KEY;

async function getEvent(id: string) {
  const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function EventPage({ params }: PageProps) {
  const { id } = await params;

  const event = await getEvent(id);

  if (!event) {
    return (
      <div className="p-4 text-red-500">Event not found or failed to load.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.name || "No title"}</h1>
      {event.images?.[0]?.url && (
        <img
          src={event.images[0].url}
          alt={event.name}
          className="w-full rounded-lg shadow-md"
        />
      )}
      <div className="mt-4 space-y-2">
        <p>
          <strong>Date:</strong> {event.dates?.start?.localDate || "N/A"}
        </p>
        <p>
          <strong>Venue:</strong> {event._embedded?.venues?.[0]?.name || "N/A"}
        </p>
        <p>{event.info || event.pleaseNote || "No description available"}</p>
      </div>
    </div>
  );
}
