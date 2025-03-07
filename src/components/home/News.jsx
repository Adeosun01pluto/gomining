// components/home/News.jsx
const News = () => {
  const newsItems = [
    {
      source: "GoMining Blog",
      title: "Big Updates Have Dropped—Here's What You Need to Know",
      date: "March 3, 2025",
      image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=2070&auto=format&fit=crop",
      link: "https://gomining.com/blog/pay-with-unlimit-referral-promo-code-updates-and-more"
    },
    {
      source: "GoMining Blog",
      title: "AMA Recap: The Bitcoin Renaissance – BTCfi and the Future of Bitcoin's Ecosystem",
      date: "March 3, 2025",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop",
      link: "https://gomining.com/blog/pay-with-unlimit-referral-promo-code-updates-and-more"
    },
    {
      source: "GoMining Blog",
      title: "What's Crypto Dust and What Risks Does It Carry?",
      date: "March 2, 2025",
      image: "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2069&auto=format&fit=crop",
      link: "https://gomining.com/blog/pay-with-unlimit-referral-promo-code-updates-and-more"
    },
    {
      source: "GoMining Blog",
      title: "The Uniqueness Leaderboard is Here! See Where Your Miner Stands🏆",
      date: "February 14, 2025",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop",
      link: "https://gomining.com/blog/pay-with-unlimit-referral-promo-code-updates-and-more"
    }
  ];

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 sm:mb-8">
        GoMining News
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {newsItems.map((item, index) => (
          <a 
            key={index} 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 sm:h-48 object-cover"
            />
            <div className="p-4 sm:p-6">
              <div className="text-gray-600 text-xs sm:text-sm mb-2">
                {item.source} • {item.date}
              </div>
              <h3 className="text-black text-base sm:text-xl font-bold line-clamp-2">
                {item.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default News;