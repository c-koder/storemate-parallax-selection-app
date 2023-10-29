import { useState, useEffect } from "react";

const Item = ({ id, product_name, quantity, price, img_urls }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const changeImage = () => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % img_urls.length);
    };

    const intervalId = setInterval(changeImage, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [img_urls]);

  const handleImageChange = (increment) => {
    setActiveImageIndex(
      (prevIndex) => (prevIndex + increment + img_urls.length) % img_urls.length
    );
  };

  return (
    <div className="item">
      <div className="p-img-wrapper">
        {img_urls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={product_name}
            style={{ opacity: index === activeImageIndex ? 1 : 0 }}
          />
        ))}
        <div className="image-navigation">
          <button onClick={() => handleImageChange(-1)}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/left-chevron.png`}
              alt="Chevron Left"
            />
          </button>
          <button onClick={() => handleImageChange(1)}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/right-chevron.png`}
              alt="Chevron Left"
            />
          </button>
        </div>
      </div>
      <div className="p-content">
        <div className="p-name">
          <span className="p-id">{id}. </span>
          {product_name}
        </div>
        <div className="p-qty">{quantity} Remaining</div>
        <div className="p-price">Rs.{price}</div>
      </div>
    </div>
  );
};

export default Item;
