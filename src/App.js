import { useEffect, useState, useRef, useMemo } from "react";

import Item from "./components/item.component";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const containerRef = useRef(null);

  const imgUrls = useMemo(
    () => [
      "https://source.unsplash.com/random/300x240/?laptop",
      "https://source.unsplash.com/random/300x240/?smartphone",
      "https://source.unsplash.com/random/300x240/?gaming",
    ],
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("data/index.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      for (const imgUrl of imgUrls) {
        const image = new Image();
        image.onload = () => {
          setLoading(false);
        };
        image.src = imgUrl;
        await new Promise((resolve) => (image.onload = resolve));
      }
    })();
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight >= container.scrollHeight &&
      !loading
    ) {
      loadMoreItems();
    }
  };

  const loadMoreItems = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = data.slice(0, endIndex);

  return (
    <div className="d-flex flex-column min-vh-100 align-items-center justify-content-center">
      <div className="items-wrapper" ref={containerRef} onScroll={handleScroll}>
        {visibleItems.map((item, index) => (
          <Item key={index} {...item} img_urls={imgUrls} />
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default App;
