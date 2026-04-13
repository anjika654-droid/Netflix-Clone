import React, { useState, useEffect } from "react";

// NetflixClone.jsx
// Single-file React component (Tailwind CSS based) demo of a Netflix-style UI.
// Usage: Drop into a React app (CRA / Vite) with Tailwind configured.

export default function NetflixClone() {
  const [modalItem, setModalItem] = useState(null);
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState({ popular: [], trending: [], newReleases: [] });

  // sample dataset (replace with TMDB fetches for a real app)
  const sample = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    title: [
      "The Lost Signal",
      "Dark Waters",
      "Azure Nights",
      "City of Echoes",
      "Midnight Run",
      "Silent Shore",
      "Neon Dawn",
      "Aftermath",
      "Broken Compass",
      "Glass Tower",
      "Silver Line",
      "Hidden Truths",
    ][i % 12],
    desc: "Short synopsis for the title that describes the plot in one sentence.",
    img: `https://picsum.photos/seed/net${i}/400/600`,
  }));

  useEffect(() => {
    // For demo: split sample into rows
    setRows({
      popular: sample.slice(0, 8),
      trending: sample.slice(4, 12),
      newReleases: sample.slice(2, 8),
    });
  }, []);

  function openModal(item) {
    setModalItem(item);
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    setModalItem(null);
    document.body.style.overflow = "auto";
  }

  function Row({ title, items }) {
    return (
      <section className="mb-8">
        <h3 className="text-white text-lg font-semibold mb-3">{title}</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {items.map((it) => (
            <div
              key={it.id}
              className="min-w-[160px] w-[160px] cursor-pointer transform transition duration-150 hover:scale-105"
              onClick={() => openModal(it)}
              onKeyDown={(e) => e.key === "Enter" && openModal(it)}
              role="button"
              tabIndex={0}
            >
              <div className="rounded-md overflow-hidden shadow-md">
                <img src={it.img} alt={it.title} className="w-full h-[240px] object-cover block" />
              </div>
              <div className="text-sm text-gray-200 mt-2 truncate">{it.title}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-red-600 tracking-wide">NETFLIX</div>
          <div className="flex items-center gap-3">
            <input
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="bg-white/5 border border-white/6 text-sm rounded px-3 py-2 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <div className="w-9 h-9 rounded-md bg-neutral-700 flex items-center justify-center">A</div>
          </div>
        </div>
      </header>

      {/* Hero / Banner */}
      <main className="pt-24 max-w-7xl mx-auto px-4 pb-12">
        <section className="relative rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.0)), url('https://picsum.photos/1200/420?blur=2')` }}>
          <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-end md:items-center gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Featured — The Lost Signal</h1>
              <p className="text-gray-300 mb-4">An edge-of-your-seat sci-fi thriller about a team chasing a mysterious frequency that changes reality.</p>
              <div className="flex gap-3">
                <button className="bg-white text-black px-4 py-2 rounded font-semibold">Play</button>
                <button onClick={() => openModal(sample[0])} className="bg-white/20 border border-white/20 px-4 py-2 rounded font-semibold">More Info</button>
              </div>
            </div>
          </div>
        </section>

        {/* Rows */}
        <div className="mt-8">
          <Row title="Popular on Netflix" items={rows.popular} />
          <Row title="Trending Now" items={rows.trending} />
          <Row title="New Releases" items={rows.newReleases} />
        </div>
      </main>

      {/* Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70" onClick={closeModal}>
          <div className="w-[90%] max-w-3xl bg-[#0f0f0f] rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="flex justify-end p-3">
              <button onClick={closeModal} className="bg-white/10 px-3 py-1 rounded">Close</button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{modalItem.title}</h2>
              <p className="text-gray-300 mb-4">{modalItem.desc}</p>
              <div className="aspect-video bg-black rounded-md flex items-center justify-center text-gray-500">Trailer / Video</div>
            </div>
          </div>
        </div>
      )}

      {/* tiny CSS-in-JS hack for hiding scrollbar in tailwind-less setups */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar{height:8px}
        .hide-scrollbar::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:6px}
      `}</style>
    </div>
  );
}
