import React, { useEffect, useState } from 'react';
import './Trade-in-program.scss';

const Trade_in_program = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/db.json')
      .then((res) => res.json())
      .then((result) => setData(result.trade_in))
      .catch((error) => console.error("Error loading trade-in data:", error));
  }, []);

  if (!data) {
    return <p className="loading">Загрузка данных...</p>;
  }

  return (
    <div className='trade-in-program'>
      <div className="container">
        <div className="left">
          <h2 className="title">{data.title}</h2>
          <div className="selects">
            <select>
              <option value="" disabled selected hidden>Марка</option>
              {data.brands.map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select>

            <select>
              <option value="" disabled selected hidden>Модель</option>
              {data.models.map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="right">
          <div className="top">
            <input type="checkbox" className="checkbox" />
            <p className="top__text">{data.discount}</p>
          </div>

          <div className="selects2">
            <select >
              <option value="" disabled selected hidden>Год выпуска</option>
              {data.years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>

            <select >
              <option value="" disabled selected hidden>Трансмиссия</option>
              {data.transmissions.map((t, index) => (
                <option key={index} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder='Ваша цена'
            className='your-price'
          />
        </div>
      </div>
    </div>
  );
};

export default Trade_in_program;
