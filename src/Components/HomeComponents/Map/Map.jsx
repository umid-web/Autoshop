import React, { useEffect, useState } from "react";
import "../Map/Map.scss";

const Map = () => {
  const [map, setMap] = useState([]);

  // 📦 Ma'lumotlarni public/db.json dan olish
  useEffect(() => {
    fetch("/db.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("JSON yuklanmadi!");
        }
        return response.json();
      })
      .then((data) => setMap(data.map))
      .catch((error) => console.error("Xatolik:", error));
  }, []);

  // ⭐ Reyting bo‘yicha yulduzlar
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="fa-solid fa-star filled"></i>);
      } else if (rating >= i - 0.5) {
        stars.push(<i key={i} className="fa-solid fa-star-half-stroke filled"></i>);
      } else {
        stars.push(<i key={i} className="fa-regular fa-star empty"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="map">
      <div className="container">
        {map.map((item) => (
          <div className="card" key={item.id}>
            {/* 🔹 Names va Desc wrapper */}
            <div className="names-desc-wrapper">
              <div className="names">
                <img src={item.logo} alt={item.name} className="logo" />
                <p className="text">{item.name}</p>
              </div>

              <div className="desc">
                <p className="parce">{item.percent}</p>
                <div className="stars">{renderStars(item.rating)}</div>
              </div>
            </div>

            {/* 🔹 Rating */}
            <p className="rating">{item.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
