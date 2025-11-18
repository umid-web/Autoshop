import React, { useEffect, useState } from "react";
import "../../HomeComponents/AvtomobileNaliche/Naliche.scss";

const Naliche = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setCards(data.cardData))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  return (
    <div className="naliche">
      <div className="container">
        <h2 className="naliche__title">Автомобили в наличии с ПТС</h2>
        <div className="naliche__cards">
          {cards.map((card) => (
            <div className="naliche__card" key={card.id}>
              <div className="card__top">
                <h2 className="card__title">
                  Skoda Octavia 1.6 MPI MT Active
                </h2>
                <div className="top__icon">
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-solid fa-chart-simple"></i>
                </div>
              </div>

              <div className="btn1-wrp">
                <button className="car__btn1">Предложение дня</button>
                <button className="card__btn2">Выгода до 300 000 ₽</button>
              </div>

              <div className="card__center">
                <div className="items">
                  <div className="item">
                    <i className="fa-solid fa-gift"></i>
                    <p className="text">
                      Оборудование <span>в подарок</span>
                    </p>
                  </div>
                  <div className="item">
                    <i className="fa-solid fa-gift"></i>
                    <p className="text">
                      КАСКО <span>в подарок</span>
                    </p>
                  </div>
                  <div className="item">
                    <i className="fa-solid fa-gift"></i>
                    <p className="text">
                      Комплект резины <span>в подарок</span>
                    </p>
                  </div>
                </div>

                <img src={card.img} alt="car" className="naliche__img" />
              </div>

              <div className="pices">
                <p className="price">от {card.price}</p>
                <p className="kredit__price">Кредит от {card.kreditPrice}</p>
              </div>

              <div className="characteristics">
                <div className="about">
                  <img
                    className="about__img"
                    src="src/Images/Svg/engine.svg"
                    alt=""
                  />
                  <p className="text">{card.engine}</p>
                </div>
                <div className="about">
                  <img
                    className="about__img"
                    src="src/Images/Svg/Vector.svg"
                    alt=""
                  />
                  <p className="text">{card.fuel}</p>
                </div>
                <div className="about">
                  <img
                    className="about__img"
                    src="src/Images/Svg/speed.svg"
                    alt=""
                  />
                  <p className="text">{card.speed}</p>
                </div>
                <div className="about">
                  <img
                    className="about__img"
                    src="src/Images/Svg/stopwatch 1.svg"
                    alt=""
                  />
                  <p className="text">{card.second}</p>
                </div>
              </div>

              <div className="bottom-wrap">
                <div className="bottom-btns">
                  <button className="btn btn1">Резерв онлайн</button>
                  <button className="btn btn2">Купить</button>
                  <button className="btn btn3">Подробнее</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="naliche__btn">Показать  еще</button>
      </div>
    </div>
  );
};

export default Naliche;
