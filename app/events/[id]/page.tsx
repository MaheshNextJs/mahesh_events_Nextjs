// import React from "react";

// type PageProps = {
//   params: Promise<{ id: string }>;
// };

// export default async function EventPage({ params }: PageProps) {
//   const { id } = await params;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Event ID: {id}</h1>
//       <p className="text-gray-600">Details about the event will go here.</p>
//     </div>
//   );
// }

import React from "react";

type EventDetails = {
  id: string;
  title: string;
  image: string;
  date: string;
  venue: string;
  info?: string;
  pleaseNote?: string;
};

async function getEvent(id: string): Promise<EventDetails | null> {
  const API_KEY = process.env.TICKETMASTER_API_KEY;
  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${API_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  const e = await res.json();

  return {
    id: e.id,
    title: e.name,
    image:
      e.images?.find((img: any) => img.width >= 600)?.url ||
      e.images?.[0]?.url ||
      "",
    date: e.dates?.start?.localDate || "",
    venue: e._embedded?.venues?.[0]?.name || "",
  };
}

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEvent(params.id);

  if (!event) {
    return <div className="p-4 text-red-500">Event not found</div>;
  }

  // console.log("Event data:", event);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-64 object-cover rounded-lg shadow-lg"
      />
      <h1 className="mt-4 text-2xl font-bold">{event.title}</h1>
      <p className="text-gray-500">
        {event.date} • {event.venue}
      </p>
      <p>{event.info || event.pleaseNote || "No description available"}</p>
    </div>
  );
}
