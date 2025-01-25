// components/home/News.jsx
const News = () => {
  const newsItems = [
    {
      source: "CoinDesk",
      title: "Bitcoin Mining Made Accessible",
      date: "Jan 15, 2024",
      image: "/api/placeholder/400/320"
    },
    {
      source: "CoinDesk",
      title: "Bitcoin Mining Made Accessible",
      date: "Jan 15, 2024",
      image: "/api/placeholder/400/320"
    },
    {
      source: "CoinDesk",
      title: "Bitcoin Mining Made Accessible",
      date: "Jan 15, 2024",
      image: "/api/placeholder/400/320"
    },
    // Add more news items as needed
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-black mb-8">GoMining News</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {newsItems.map((item, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-gray-800 text-sm mb-2">{item.source} • {item.date}</div>
              <h3 className="text-black text-xl font-bold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;