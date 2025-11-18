import React, { useEffect, useState } from "react";
import "../../UI/MySwiperExtra/Swiper.scss";

const Swiper = () => {
  const [cards, setCards] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // default 3 card

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setCards(data.swiperExtra || []);
      })
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  // breakpoints bo'yicha visibleCount ni sozlash
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 550) setVisibleCount(1);
      else if (width <= 990) setVisibleCount(2);
      else setVisibleCount(3);
    };

    handleResize(); // sahifa yuklanganda ham ishlashi uchun
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCards = cards.slice(startIndex, startIndex + visibleCount);

  const handleNext = () => {
    if (startIndex + visibleCount < cards.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(cards.length - visibleCount);
    }
  };

  return (
    <div className="swiperr">
      <div className="container">
        <div className="top">
          <div className="title--wrp">
            <h2 className="title">Наши подборки</h2>
            <button className="title__btn">Все подборки</button>
          </div>

          <div className="btns">
            <i className="fa-solid fa-angle-left" onClick={handlePrev}></i>
            <i className="fa-solid fa-angle-right" onClick={handleNext}></i>
          </div>
        </div>

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
                <h3 className="card__title">{item.title}</h3>
                <button className="bottom-btn">Посмотреть</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Swiper;
