import Link from "next/link";

export const AccountHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <Link href="/" className="hover:text-blue-400">
            Next Shop
          </Link>
        </h1>

        <button
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          Log Out
        </button>
      </div>
    </header>
  );
};
