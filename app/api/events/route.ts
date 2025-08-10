// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const search = searchParams.get("search") || "";

//   const API_KEY = process.env.TICKETMASTER_API_KEY;
//   const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&size=100`;

//   const res = await fetch(url);
//   if (!res.ok) {
//     return NextResponse.json({ error: "Failed to fetch events" }, { status: res.status });
//   }

//   const data = await res.json();
//   let events = data._embedded?.events || [];

//   if (search) {
//     const lowerSearch = search.toLowerCase();
//     events = events.filter((e: any) => e.name.toLowerCase().includes(lowerSearch));
//   }

//   // Map Ticketmaster fields to your frontend's expected shape
//   const mappedEvents = events.map((e: any) => ({
//     id: e.id,
//     title: e.name,
//     image: e.images?.[0]?.url || "",
//     date: e.dates?.start?.localDate || "",
//     venue: e._embedded?.venues?.[0]?.name || "",
//   }));

//   return NextResponse.json(mappedEvents);
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const API_KEY = process.env.TICKETMASTER_API_KEY;
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&size=100`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: res.status });
  }

  const data = await res.json();
  let events = data._embedded?.events || [];

  if (search) {
    const lowerSearch = search.toLowerCase();
    events = events.filter((e: any) => e.name.toLowerCase().includes(lowerSearch));
  }

  const mappedEvents = events.map((e: any) => ({
    id: e.id,
    title: e.name,
    image: e.images?.find((img: any) => img.width >= 600)?.url || e.images?.[0]?.url || "",
    date: e.dates?.start?.localDate || "",
    venue: e._embedded?.venues?.[0]?.name || "",
  }));

  return NextResponse.json(mappedEvents);
}
