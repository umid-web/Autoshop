import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './KontaktHead.scss';
const KontaktHead = () => {
  const [data, setData] = useState(null);

  // ✅ db.json dan ma'lumot olish
  useEffect(() => {
    fetch('/db.json')
      .then((res) => res.json())
      .then((info) => setData(info.contacts))
      .catch((err) => console.error("Ma'lumotni olishda xatolik:", err));
  }, []);

  if (!data) return <p className="loading">Yuklanmoqda...</p>;

  return (
    <div className="kontakt-head">
      <div className="container">
        <div className="link">
          <NavLink to="/">{data.link}</NavLink>
        </div>

        <h2 className="title">{data.title}</h2>
        <hr />

        <div className="info">
          {data.items.map((item, index) => (
            <div key={index} className="contact-card">
              <i className={item.icon}></i>
              <div className="desc">
                <h2 className="desc__title">{item.title}</h2>
                {item.texts.map((txt, i) => (
                  <p key={i} className="desc__text">{txt}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KontaktHead;
