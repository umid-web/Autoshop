import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Footer/Footer.scss";

const Footer = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => {
        if (!res.ok) throw new Error("Server javob bermadi");
        return res.json();
      })
      .then((data) => {
        if (data.avtomobile && Array.isArray(data.avtomobile)) {
          setCars(data.avtomobile);
        } else {
          setError("Avtomobil ma'lumotlari topilmadi");
        }
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setError("Ma'lumot yuklashda xatolik yuz berdi");
      });
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        {/* ======================== BEGIN ======================== */}
        <div className="begin">
          <div className="top">
            <NavLink to="/catalog-avto">Каталог авто</NavLink>
            <NavLink to="/mapmain">Карта сайта</NavLink>
          </div>

          <div className="avtomobile">
            {error ? (
              <p className="error">{error}</p>
            ) : cars.length > 0 ? (
              cars.map((car) => (
                <NavLink
                  key={car.id}
                  to={`/katalogAvto/${car.name.toLowerCase().replace(/\s+/g, "-")}`}
                  aria-label={`Перейти к ${car.name}`}
                >
                  {car.name}
                </NavLink>
              ))
            ) : (
              <p className="loading">Загрузка...</p>
            )}
          </div>
        </div>

        {/* ======================== CENTER ======================== */}
        <div className="center">
          <NavLink to="/kredit-plan">Кредит и рассрочка</NavLink>
          <NavLink to="/express-kredit">Экспресс-кредит</NavLink>
          <NavLink to="/family-car">Семейный автомобиль</NavLink>
          <NavLink to="/first-avtomobil">Первый автомобиль</NavLink>
          <NavLink to="/medisine">Работникам медицины</NavLink>
          <NavLink to="/payment-plan">Рассрочка</NavLink>
          <NavLink to="/trade-in">Trade-in</NavLink>
        </div>

        {/* ======================== END ======================== */}
        <div className="end">
          <NavLink to="/контакты">Контакты</NavLink>

          <p className="tell">
            <i className="fa-solid fa-phone"></i> +7 (800) 551-94-31
          </p>

          <p className="hour">
            <i className="fa-solid fa-clock"></i> Ежедневно с 08:00 до 21:00
          </p>

          <p className="pleace">
            <i className="fa-solid fa-location-dot"></i> Россия, Москва, 38КМ МКАД, 6Бс1
            <span className="map-link">Схема проезда</span>
          </p>

          <select name="city" aria-label="Выберите город">
            <option value="Москва" selected>
              Москва
            </option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
