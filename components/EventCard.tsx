interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
}

export default function EventCard({
  event,
  isFav,
  toggleFavorite,
}: {
  event: Event;
  isFav: boolean;
  toggleFavorite: (event: Event) => void;
}) {
  return (
    <div className="rounded-lg p-4 m-2 border border-gray-300 shadow hover:shadow-xl transition transform hover:scale-105">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl font-bold mt-2">{event.title}</h2>
      <p className="text-sm text-gray-500">
        {event.date} — {event.location}
      </p>
      <div className="mt-4 flex justify-between">
        <a
          href={`/events/${event.id}`}
          className="text-blue-500 hover:underline"
        >
          View Details
        </a>
        <button
          onClick={() => toggleFavorite(event)}
          className={`px-3 py-1 rounded ${
            isFav ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          {isFav ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
