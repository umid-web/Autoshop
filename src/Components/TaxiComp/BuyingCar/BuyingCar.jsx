import React, { useEffect, useState } from "react";
import "./BuyingCar.scss";

const BuyingCar = () => {
  const [cards, setCards] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        // ✅ db.json ichidagi ma’lumotlarni olish
        setCards(data.buying_car.cards);
        setText(data.buying_car.text);
      })
      .catch((err) => console.error("Xatolik yuz berdi:", err));
  }, []);

  return (
    <div className="buying-car">
      <div className="container">
        <p className="text">{text}</p>

        <div className="wrp">
          {cards.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.img} alt="" className="car__img" />
              <p className="card__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyingCar;
