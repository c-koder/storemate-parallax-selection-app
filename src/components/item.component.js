import { useState, useEffect } from "react";

const Item = (props) => {
  const { product_name, quantity, price, img_urls } = props;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const changeImage = () => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % img_urls.length);
    };

    const intervalId = setInterval(changeImage, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [img_urls]);

  return (
    <div className="item">
      <div className="p-img-wrapper">
        <img src={img_urls[activeImageIndex]} alt={product_name} />
      </div>
      <div className="p-name">{product_name}</div>
      <div className="p-qty">{quantity} Remaining</div>
      <div className="p-price">Rs.{price}</div>
    </div>
  );
};

export default Item;
