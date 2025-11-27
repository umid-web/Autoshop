import React, { useEffect, useState } from "react";
import "./SpecialOffers.scss";

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setOffers(data.special_offers))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  return (
    <div className="special-offer">
      <div className="container">
        <div className="wrp">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="card"
              style={{
                backgroundImage: `url(${offer.img})`,
              }}
            >
              <div className="overlay">
                <h2 className="title">{offer.title}</h2>
                <p className="text">{offer.text}</p>
          <button 
  onClick={() => window.location.href = offer.link} 
  className="btn"
>
  Узнать больше
</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
