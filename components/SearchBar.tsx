"use client";
import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded p-2 flex-1"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
