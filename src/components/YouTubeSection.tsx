const videos = [
  {
    id: "dQw4w9WgXcQ",
    title: "Discover Pohang: Korea's Hidden Coastal Gem",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Homigot Sunrise Experience with Pohang Sudal",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Jukdo Market Seafood Tour - Full Experience",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Guryongpo Heritage Walk - Colonial Village Tour",
  },
];

export default function YouTubeSection() {
  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
          Watch
        </span>
        <h2 className="font-serif text-3xl text-dark mt-2">
          See Pohang in Action
        </h2>
        <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
          Get a preview of what awaits you in Pohang through our tour videos.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, i) => (
          <div key={i} className="rounded-2xl overflow-hidden shadow-sm bg-white">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-dark text-sm">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
