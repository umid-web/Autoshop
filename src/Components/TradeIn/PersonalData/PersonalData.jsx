import React, { useEffect, useState } from "react";
import "./PersonalData.scss";

const PersonalData = ({ type = "personal_data" }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((info) => {
        if (type === "personal_data") setData(info.personal_data);
      })
      .catch((err) => console.error("Xatolik:", err));
  }, [type]);

  if (!data || data.length === 0) {
    return <p className="loading">Загрузка данных...</p>;
  }

  return (
    <div className="personal-data">
      <div className="container">
        <h2 className="title">
          {type === "personal_data"
            ? "Персональные данные клиентов"
            : "Преимущества автокредита"}
        </h2>

        <div className="card-wrp">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.img} className="card__img" alt={item.text || "Image"} />
              <p className="card__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
