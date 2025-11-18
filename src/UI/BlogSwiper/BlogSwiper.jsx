import React, { useEffect, useState } from "react";
import "../BlogSwiper/BlogSwiper.scss";

const BlogSwiper = () => {
  const [cards, setCards] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4); // Ekranga qarab o‘zgaradi

  // 🔹 Ma'lumotlarni olish
  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setCards(data.Blogswaper || []);
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

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // 🔹 Slayder navigatsiyasi
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
    <div className="blog">
      <div className="container">
        {/* Yuqori qism */}
        <div className="top">
          <div className="title--wrp">
            <h2 className="title">Блог</h2>
            <button className="title__btn">Все статьи</button>
          </div>

          <div className="btns">
            <i className="fa-solid fa-angle-left" onClick={handlePrev}></i>
            <i className="fa-solid fa-angle-right" onClick={handleNext}></i>
          </div>
        </div>

        {/* Karta slayder */}
        <div className="cards">
          {visibleCards.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="card__bottom">
                <h3 className="card__title">{item.data}</h3>
                <p className="text">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSwiper;
