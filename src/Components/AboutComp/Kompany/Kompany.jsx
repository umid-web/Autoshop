import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Kompany/Kompany.scss";

const Kompany = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((info) => setData(info.kompany))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  if (!data) return <p className="loading">Загрузка...</p>;

  return (
    <div className="kompany">
      <div className="kompany__container">
        <div className="link">
          <NavLink to="/">Главная / О компании</NavLink>
        </div>

        <h2 className="title">{data.title}</h2>

        {data.paragraphs.map((p, i) => (
          <p key={i} className="text">
            {p}
          </p>
        ))}

        <p className="about">{data.aboutTitle}</p>

        <ul>
          {data.list.map((item, i) => (
            <li key={i}>
              <p className="li__text">{item}</p>
            </li>
          ))}
        </ul>

        {data.bottomText.map((p, i) => (
          <p key={i} className="text">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Kompany;
