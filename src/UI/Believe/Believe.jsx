import React, { useEffect, useState } from "react";
import "../Believe/Believe.scss";

const Believe = () => {
  const [cards, setCards] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4); // 🔹 Ekranga qarab o‘zgaradi

  // 🔹 db.json dan ma’lumotni olish
  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setCards(data.believeBanks || []);
      })
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  // 🔹 Ekran o‘lchamiga qarab card sonini o‘zgartirish
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth <= 560) {
        setCardsPerView(1);
      } else if (window.innerWidth <= 800) {
        setCardsPerView(2);
      } else if (window.innerWidth <= 1200) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    updateCardsPerView(); // dastlabki chaqirish
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // 🔹 Slayder funksiyalari
  const handleNext = () => {
    if (startIndex + cardsPerView < cards.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(Math.max(cards.length - cardsPerView, 0));
    }
  };

  const visibleCards = cards.slice(startIndex, startIndex + cardsPerView);

  return (
    <div className="believe">
      <div className="container">
        {/* Yuqori qism */}
        <div className="top">
          <div className="title--wrp">
            <h2 className="title">Нам доверяют</h2>
          </div>

          <div className="btns">
            <i className="fa-solid fa-angle-left" onClick={handlePrev}></i>
            <i className="fa-solid fa-angle-right" onClick={handleNext}></i>
          </div>
        </div>

        {/* Karta slayder */}
        <div className="cards">
          {visibleCards.map((item) => {
            const starsCount = (item.recommend / 100) * 5;
            const fullStars = Math.floor(starsCount);
            const halfStar = starsCount % 1 >= 0.5;

            return (
              <div className="card" key={item.id}>
                <h2 className="title">{item.site}</h2>
                <h3 className="subtitle">{item.dealer}</h3>

                <div className="bottom">
                  <p className="percent">
                    Рекомендуют <span>{item.recommend}%</span>
                  </p>

                  <div className="stars">
                    {[...Array(5)].map((_, i) => {
                      if (i < fullStars) {
                        return <i key={i} className="fa-solid fa-star full"></i>;
                      } else if (i === fullStars && halfStar) {
                        return (
                          <i
                            key={i}
                            className="fa-solid fa-star-half-stroke half"
                          ></i>
                        );
                      } else {
                        return (
                          <i key={i} className="fa-regular fa-star empty"></i>
                        );
                      }
                    })}
                  </div>

                  <p className="number">{item.rating.toFixed(1)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Believe;
