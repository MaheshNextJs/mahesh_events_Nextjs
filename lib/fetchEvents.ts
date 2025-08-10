export default async function fetchEvents(search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await fetch(`/api/events${query}`);
  
  if (!res.ok) throw new Error("Failed to fetch events");
  
  return await res.json();
}
