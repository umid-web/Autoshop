import React, { useEffect, useState } from "react";
import "./AvtoKredit.scss";

const AvtoKredit = ({ type = "avtokredit" }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((info) => {
        if (type === "avtokredit") setData(info.avtokredit);      })
      .catch((err) => console.error("Xatolik:", err));
  }, [type]);

  if (!data || data.length === 0) {
    return <p className="loading">Загрузка данных...</p>;
  }

  return (
    <div className="avto-kredit">
      <div className="container">
        <h2 className="title">
          {type === "avtokredit"
            ? "Преимущества автокредита"
            : "Преимущества Trade-in программы"}
        </h2>

        <div className="card-wrp">
          {data.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.img} className="card__img" alt="" />
              <p className="card__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvtoKredit;
