import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TaxiCars.scss";

const TaxiCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedClass, setSelectedClass] = useState("Все");
  const navigate = useNavigate();

  // ✅ Ma'lumotlarni db.json dan olish
  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setCars(data.taxi_cars || []);

        // 🔹 Boshlang‘ichda har bir sinfdan 3 tadan chiqsin
        const grouped = data.taxi_cars.reduce((acc, car) => {
          acc[car.class] = acc[car.class] ? [...acc[car.class], car] : [car];
          return acc;
        }, {});
        const mixed = [
          ...(grouped["Эконом"] || []).slice(0, 3),
          ...(grouped["Комфорт"] || []).slice(0, 3),
          ...(grouped["Комфорт+"] || []).slice(0, 3),
        ];
        setFilteredCars(mixed);
      })
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  // ✅ Kategoriya bo‘yicha filterlash
  const handleFilter = (carClass) => {
    setSelectedClass(carClass);

    if (carClass === "Все") {
      const grouped = cars.reduce((acc, car) => {
        acc[car.class] = acc[car.class] ? [...acc[car.class], car] : [car];
        return acc;
      }, {});
      const mixed = [
        ...(grouped["Эконом"] || []).slice(0, 3),
        ...(grouped["Комфорт"] || []).slice(0, 3),
        ...(grouped["Комфорт+"] || []).slice(0, 3),
      ];
      setFilteredCars(mixed);
    } else {
      setFilteredCars(cars.filter((car) => car.class === carClass).slice(0, 6));
    }
  };

  // ✅ Tugmalar orqali boshqa sahifaga yo‘naltirish (hozircha faqat log)
  const handleNavigate = (path, id) => {
    console.log(`${path} bosildi: ID = ${id}`);
  };

  return (
    <div className="taxi-cars">
      <div className="container">
        {/* 🔝 Yuqori qism */}
        <div className="taxi-cars__top">
          <img src="src/Images/Png/taxiCardTop.png" alt="" className="top__img" />
          <h2 className="top__title">Автомобили для такси в наличии</h2>
          <img src="src/Images/Png/taxiCardTop.png" alt="" className="top__img" />
        </div>

        {/* 🚗 Filter tanlash qismi */}
        <div className="choice">
          <div className="left">
            <p className="choice__text">Выберите класс автомобиля</p>
            <button
              className={`btn ${selectedClass === "Эконом" ? "active" : ""}`}
              onClick={() => handleFilter("Эконом")}
            >
              Эконом
            </button>
            <button
              className={`btn ${selectedClass === "Комфорт" ? "active" : ""}`}
              onClick={() => handleFilter("Комфорт")}
            >
              Комфорт
            </button>
            <button
              className={`btn ${selectedClass === "Комфорт+" ? "active" : ""}`}
              onClick={() => handleFilter("Комфорт+")}
            >
              Комфорт +
            </button>
            <button
              className={`btn ${selectedClass === "Все" ? "active" : ""}`}
              onClick={() => handleFilter("Все")}
            >
              Все
            </button>
          </div>

          <div className="right">
            <select className="select">
              <option hidden>Марка</option>
              {[...new Set(cars.map((car) => car.brand))].map((brand) => (
                <option key={brand}>{brand}</option>
              ))}
            </select>

            <select className="select">
              <option hidden>Модель</option>
              {[...new Set(cars.map((car) => car.model))].map((model) => (
                <option key={model}>{model}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 🧩 Karta qismi */}
        <div className="cards-wrp">
          {filteredCars.map((car) => (
            <div
              className={`card ${
                car.class === "Эконом"
                  ? "econom"
                  : car.class === "Комфорт"
                  ? "comfort"
                  : "comfort-plus"
              }`}
              key={car.id}
            >
              <div className="card__top">
                <div className="left">
                  <i className="fa-regular fa-heart"></i>
                  <i className="fa-regular fa-chart-bar"></i>
                </div>
                <div className="right">
                  <p className="right__text">{car.class}</p>
                </div>
              </div>

              <div className="center">
                <img src={car.image} alt={car.model} className="card__img" />
                <h2 className="card__title">{car.name}</h2>
                <p className="old-price">{car.old_price}</p>
                <p className="new-price">{car.new_price}</p>
              </div>

              <div className="card__info">
                {car.bonuses.map((bonus, index) => (
                  <div className="gift" key={index}>
                    <i className="fa-solid fa-gift"></i>
                    <p className="gift__text">{bonus}</p>
                  </div>
                ))}
              </div>

              <div className="card__btns">
                <button className="btn1" onClick={() => handleNavigate("/details", car.id)}>
                  Подробнее
                </button>
                <button className="btn2" onClick={() => handleNavigate("/apply", car.id)}>
                  Оставить заявку
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🔽 Show more */}
        <button className="Show-more">Показать еще</button>
      </div>
    </div>
  );
};

export default TaxiCars;
