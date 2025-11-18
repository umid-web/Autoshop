import React, { useEffect, useState } from 'react';
import './AdvantagesTradeIn.scss';

const AdvantagesTradeIn = () => {
  const [advantages, setAdvantages] = useState([]);

  useEffect(() => {
    fetch('/db.json')
      .then((res) => res.json())
      .then((data) => setAdvantages(data["advantages-trade-in"]))
      .catch((err) => console.error('Xatolik:', err));
  }, []);

  return (
    <div className='advantages-trade-in'>
      <div className="container">
        <h2 className="title">Преимущества покупки в trade-in</h2>

        <div className="card-wrp">
          {advantages.map((item) => (
            <div key={item.id} className="card">
              <img src={item.img} alt={item.title} className="card__img" />
              <h3 className="card__title">{item.title}</h3>
              <p className="card__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvantagesTradeIn;
