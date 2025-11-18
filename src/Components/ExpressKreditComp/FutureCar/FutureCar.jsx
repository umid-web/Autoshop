import React, { useEffect, useState } from "react";
import "./FutureCar.scss"; // agar SCSS faylingiz bo‘lsa

const FutureCar = () => {
  const [futureCars, setFutureCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  // 📦 JSON fayldan ma’lumotni olish
  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setFutureCars(data.future);
        setSelectedCar(data.future[0]); // birinchi mashina default tanlanadi
      })
      .catch((err) => console.error("Xato:", err));
  }, []);

  // 🔹 Select orqali mashina tanlash
  const handleSelect = (e) => {
    const selected = futureCars.find((car) => car.marka === e.target.value);
    setSelectedCar(selected);
  };

  return (
    <div className="futureCar">
      <div className="container">
        <div className="light">
          <h2 className="title">Ваш будущий автомобиль</h2>

          <div className="selects">
            {/* 🔸 Mashina markasi */}
            <select onChange={handleSelect}>
              <option hidden>Марка</option>
              {futureCars.map((car) => (
                <option key={car.id} value={car.marka}>
                  {car.marka}
                </option>
              ))}
            </select>

            {/* 🔸 Model */}
            <select disabled>
              <option hidden>Модель</option>
              {selectedCar && <option>{selectedCar.model}</option>}
            </select>

            {/* 🔸 Комплектация */}
            <select disabled>
              <option hidden>Комплектация</option>
              {selectedCar && <option>{selectedCar.year}</option>}
            </select>
          </div>
        </div>

        {/* 🔹 Mashina haqida ma’lumotlar */}
        {selectedCar && (
          <div className="right">
            <img src={selectedCar.img} alt={selectedCar.marka} />
            <div className="info">
              <h2 className="car-name">
                {selectedCar.marka} {selectedCar.model} ({selectedCar.year})
              </h2>
              <p className="text">Цена со скидками</p>
              <p className="price-scidka">{selectedCar.price_discount}</p>

              <p className="text">Базовая цена</p>
              <p className="base-price">{selectedCar.price_base}</p>

              <p className="base">{selectedCar.monthly}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FutureCar;
