const posts = [
  {
    emoji: "🌅",
    caption: "First sunrise at Homigot — magical morning!",
    gradient: "from-[#f7806a] to-[#f28dac]",
  },
  {
    emoji: "🦐",
    caption: "Fresh sashimi at Jukdo Market",
    gradient: "from-[#5eb8f0] to-[#7ed6c3]",
  },
  {
    emoji: "🏘️",
    caption: "Walking through Guryongpo Japanese Village",
    gradient: "from-[#c4b5f5] to-[#f28dac]",
  },
  {
    emoji: "⛰️",
    caption: "Bogyeongsa waterfall trail",
    gradient: "from-[#7ed6c3] to-[#5eb8f0]",
  },
  {
    emoji: "🌊",
    caption: "Space Walk at Hwanho Park",
    gradient: "from-[#5eb8f0] to-[#c4b5f5]",
  },
  {
    emoji: "🐟",
    caption: "Gwamegi season in Pohang!",
    gradient: "from-[#a8d8ea] to-[#b8c6db]",
  },
  {
    emoji: "🌸",
    caption: "Cherry blossoms along the river",
    gradient: "from-[#fbc2eb] to-[#f8b4c8]",
  },
  {
    emoji: "🏖️",
    caption: "Summer vibes at Yeongildae Beach",
    gradient: "from-[#43e97b] to-[#38f9d7]",
  },
  {
    emoji: "🦦",
    caption: "Your guide is ready!",
    gradient: "from-[#6CB4EE] to-[#F28DAC]",
  },
];

export default function InstagramFeed() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
            @pohangsudal
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
            Follow Our Adventures
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            See the latest photos from our tours and discover Pohang through our
            lens.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {posts.map((post, i) => (
            <a
              key={i}
              href="https://instagram.com/pohangsudal"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}
              >
                <span className="text-4xl sm:text-5xl opacity-70 group-hover:scale-110 transition-transform duration-300">
                  {post.emoji}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <p className="text-white text-xs sm:text-sm text-center px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-6">
          <a
            href="https://instagram.com/pohangsudal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-sky hover:text-pink transition-colors tracking-wide font-medium"
          >
            Follow @pohangsudal on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
