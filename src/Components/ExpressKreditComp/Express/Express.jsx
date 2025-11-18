import React, { useEffect, useState } from 'react';
import '../Express/Express.scss';
import { NavLink } from 'react-router-dom';

const Express = ({ type }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/db.json')
      .then((res) => res.json())
      .then((result) => {
        if (type === 'express') setData(result.express);
        else if (type === 'family') setData(result.family);
        else if (type === 'first-avtomobil') setData(result['first-avtomobil']);
        else if (type === 'medisine') setData(result.medisine);
        else if (type === 'payment-plan') setData(result['payment-plan']);
        else if (type === 'tradein') setData(result.tradein);
        else if (type === 'taxi-kredit') setData(result['taxi-kredit']);
      })
      .catch((err) => console.error("Xatolik:", err));
  }, [type]);

  if (!data) {
    return <p style={{ textAlign: 'center', marginTop: '100px' }}>Yuklanmoqda...</p>;
  }

  return (
    <div className='express'>
      <div
        className="container"
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="desc-wrapper">
          <div className="desc">
            <div className="link">
              <NavLink to="/">Главная</NavLink>
              <NavLink to="/avto-kredit">Кредит и рассрочка</NavLink>
              <NavLink
                to={
                  type === 'family'
                    ? '/family-car'
                    : type === 'first-avtomobil'
                    ? '/first-avtomobil'
                    : type === 'taxi-kredit'
                    ? '/taxi-kredit'
                    : '/express-kredit'
                }
              >
                {data.title}
              </NavLink>
            </div>

            <h2 className="title">{data.title}</h2>
            <p className="text">{data.description}</p>
            <p className="parce">
              <span>{data.percent}</span> По льготной ставке
            </p>

            <div className="icon">
              {data.icons && data.icons.length > 0 ? (
                data.icons.map((item, index) => (
                  <div key={index} className={`icon-item item-${index}`}>
                    <i className={item.icon}></i>
                    <p className="text">{item.text}</p>
                  </div>
                ))
              ) : (
                <p className='icon__text'>
                  <span>-10%</span> От стоимости автомобиля
                </p>
              )}
            </div>
          </div>

          {/* 🖼 Rasmni o‘ng tomonda chiqarish */}
          {data.rightImage && (
            <div className="right-img">
              <img src={data.rightImage} alt="offer car" />
            </div>
          )}
        </div>

        <div className="info">
          <div className="left">
            <h2 className="info__tit">Получите специальную цену</h2>
            <span>{data.date}</span>
          </div>

          <div className="right">
            <div className="inputs">
              <input type="text" placeholder="Ваше имя" />
              <input type="text" placeholder="Ваш телефон" />
              <button>Получить предложение</button>
            </div>
            <p className="text">
              Нажимая кнопку “Получить скидку” Вы даете согласие на обработку своих персональных данных
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Express;
