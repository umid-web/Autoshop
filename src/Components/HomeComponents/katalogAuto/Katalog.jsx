import React, { useEffect, useState } from "react";
import "./Katalog.scss";

const Katalog = () => {
  const [cars, setCars] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [transmissions, setTransmissions] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => {
        if (!res.ok) throw new Error("JSON topilmadi");
        return res.json();
      })
      .then((data) => {
        console.log("✅ JSON dan olingan ma’lumot:", data);
        setCars(data.cars || []);
        setBodyTypes(data.bodyTypes || []);
        setTransmissions(data.transmissions || []);
      })
      .catch((err) => console.error("❌ Xatolik:", err));
  }, []);

  return (
    <div className="katalog">
      <div className="container">
        <div className="car-grid">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div className="car-card" key={car.id}>
                <img src={car.emblems} alt={car.make} className="car-emblem" />
                <h3 className="car-name">{car.make}</h3>
              </div>
            ))
          ) : (
            <p>Ma’lumot yuklanmoqda yoki topilmadi...</p>
          )}
        </div>

        <div className="prices">
          <h2 className="title">Быстрый подбор авто</h2>

          <div className="quantity">
            <div className="desc">
              <h2 className="tit">Цена</h2>
              <p className="text">0 - 500т</p>
            </div>
            <input type="range" />
            <div className="part">
              <span>0</span>
              <span>600t</span>
              <span>1200t</span>
              <span>1800t</span>
              <span>2400t</span>
              <span>3000M</span>
            </div>
          </div>

          <div className="selects">
            <select className="Коробка" name="model" id="model">
              <option value="">Тип кузова</option>
              {bodyTypes.map((type) => (
                <option key={type.id} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>

            <select className="select" name="transmission" id="transmission">
              <option value="">Коробка</option>
              {transmissions.map((tr) => (
                <option key={tr.id} value={tr.value}>
                  {tr.name}
                </option>
              ))}
            </select>
          </div>

          <button className="btn">Показать 73</button>
        </div>
      </div>
    </div>
  );
};

export default Katalog;
