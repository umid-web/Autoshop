import React, { useEffect, useState } from "react";
import "../PartnerSwiper/Partner.scss";

const PartnerSwiper = () => {
  const [cards, setCards] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // Breakpointlarga qarab card sonini aniqlash
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setCardsPerView(1);
      } else if (window.innerWidth <= 990) {
        setCardsPerView(2);
      } else if (window.innerWidth <= 1300) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setCards(data.swiperExtra || []);
      })
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  const visibleCards = cards.slice(startIndex, startIndex + cardsPerView);

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
      setStartIndex(Math.max(0, cards.length - cardsPerView));
    }
  };

  return (
    <div className="partner">
      <div className="container">
        <div className="top">
          <div className="title--wrp">
            <h2 className="title">Банки-партнеры</h2>
          </div>

          <div className="btns">
            <i className="fa-solid fa-angle-left" onClick={handlePrev}></i>
            <i className="fa-solid fa-angle-right" onClick={handleNext}></i>
          </div>
        </div>

        <div className="cards">
          {visibleCards.length > 0 ? (
            visibleCards.map((item) => (
              <div className="card" key={item.id}>
                <img src={item.img} alt={item.title} />
              </div>
            ))
          ) : (
            <p className="no-data">Ma’lumotlar yuklanmoqda...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerSwiper;
