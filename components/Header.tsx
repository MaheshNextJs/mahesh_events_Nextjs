import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <Link href="/" className="font-bold text-xl">
        Mahesh Bairi Events
      </Link>
      <nav className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/favorites">Favorites</Link>
      </nav>
    </header>
  );
}
