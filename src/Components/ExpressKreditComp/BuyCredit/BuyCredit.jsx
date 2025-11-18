import React, { useEffect, useState } from "react";
import "../BuyCredit/BuyCredit.scss";

const BuyCredit = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(1);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((result) => {
        setData(result.BuyCredit);
      })
      .catch((err) => console.log("Xatolik:", err));
  }, []);

  const multiplesOf12 = [12, 24, 36, 48, 60, 72, 84];

  // 🎯 Hozirgi 12-lik oralig‘ini aniqlaymiz
  const activeIndex = Math.floor((rangeValue - 1) / 12);

  return (
    <div className="buycredit">
      <div className="container">
        {data.map((item) => (
          <div key={item.id}>
            {/* === TOP === */}
            <div className="top">
              <div className="left">
                <h2 className="title">{item.title}</h2>

                <div className="range">
                  <div className="year">
                    <p className="text">{item.durationLabel}</p>
                    <p className="text1">{rangeValue} мес.</p>
                  </div>

                  <input
                    type="range"
                    className="input-parce"
                    min="1"
                    max="84"
                    step="1"
                    value={rangeValue}
                    onChange={(e) => setRangeValue(Number(e.target.value))}
                  />

                  {/* Faqat 12 ga karrali sonlarni chiqaramiz */}
                  <div className="numbers">
                    {multiplesOf12.map((num, index) => (
                      <p
                        key={index}
                        className={`number ${index === activeIndex ? "active" : ""}`}
                      >
                        {num}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* === RIGHT === */}
              <div className="right">
                <div className="checks">
                  <div className="discount">
                    <input type="checkbox" className="check" />
                    <p className="discount__text">{item.discountText}</p>
                  </div>
                  <div className="useful">
                    <input type="checkbox" className="check" />
                    <p className="useful__text">{item.promoText}</p>
                  </div>
                </div>

                <input
                  type="text"
                  className="payment"
                  placeholder={item.placeholder}
                />
              </div>
            </div>

            {/* === BOTTOM === */}
            <div className="bottom">
              <div className="cards">
                {item.cardImages &&
                  item.cardImages.map((img, idx) => (
                    <div key={idx} className="card">
                      <img
                        src={img}
                        className="card__img"
                        alt={`credit-${idx}`}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
