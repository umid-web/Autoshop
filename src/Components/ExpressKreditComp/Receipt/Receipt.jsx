import React, { useEffect, useState } from "react";
import "./Receipt.scss";

const Receipt = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((info) => {
        if (info.receipt) {
          setData(info.receipt);
        } else {
          console.error("❌ receipt topilmadi");
        }
      })
      .catch((err) => console.error("Ma'lumot yuklanmadi:", err));
  }, []);

  if (!data) {
    return <div className="loading">Yuklanmoqda...</div>;
  }

  return (
    <div className="receipt">
      <div
        className="container"
        style={{
          backgroundImage: `url(${data.bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "25px",
        }}
      >
        <div className="content">
          <div className="info">
            <h2 className="title">Условия получения кредита</h2>

            <div className="description">
              {data.info.map((item, index) => (
                <div className="desc" key={index}>
                  <i className="fa-solid fa-circle-check"></i>
                  <div className="wrp">
                    <h2 className="tit">{item.title}</h2>
                    <p className="text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="images">
            <img src={data.img1} className="img1" alt="car" />
            <img src={data.img2} className="img2" alt="card" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
