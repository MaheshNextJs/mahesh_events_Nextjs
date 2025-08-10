// app/events/[id]/page.tsx
import React from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: PageProps) {
  const { id } = await params; // ✅ works with new Next.js types

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Event ID: {id}</h1>
      <p className="text-gray-600">Details about the event will go here.</p>
    </div>
  );
}
