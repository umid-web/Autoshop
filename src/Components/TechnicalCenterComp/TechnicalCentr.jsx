import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './TechnicalCentr.scss';

const TechnicalCentr = () => {
  const [data, setData] = useState(null);

  // 🔹 Ma’lumotlarni db.json dan olish
  useEffect(() => {
    fetch('/db.json')
      .then((res) => res.json())
      .then((info) => setData(info.technical_center))
      .catch((err) => console.error('Xatolik:', err));
  }, []);

  if (!data) {
    return (
      <div className="technical-center">
        <div className="container">
          <p className="text">Ma’lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='technical-center'>
      <div className="container">
        <div className="links">
          <NavLink to='/' className='link'>Главная / Техцентр</NavLink>
        </div>

        <h2 className="title">{data.title}</h2>
        <p className="text">{data.text}</p>

        <div className="wrp">
          {data.cards.map((item, index) => (
            <div className="card" key={index}>
              <h2 className="card__title">
                <span>-</span>{item.title}
              </h2>
              <p className="card__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalCentr;
