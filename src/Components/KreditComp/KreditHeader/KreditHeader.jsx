// ✅ KreditHeader.jsx
import React, { useEffect, useState } from "react";
import "../KreditHeader/KreditHeader.scss";

const KreditHeader = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setCards(data.swiper))
      .catch((err) => console.error("Ma'lumotni olishda xatolik:", err));
  }, []);

  return (
    <div className="kreditHeader">
      <div className="container">
        <h2 className="title">Кредит и рассрочка</h2>

        <div className="card-wrp">
          {cards.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                backgroundImage: `url(${item.img2})`,
              }}
            >
              <div className="overlay">
                <h3 className="tit">{item.title}</h3>
                <p className="text">{item.text}</p>
                <button className="card__btn">Подробнее</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KreditHeader;
