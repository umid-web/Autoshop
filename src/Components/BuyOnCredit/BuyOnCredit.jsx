import React, { useEffect, useState } from 'react';
import './BuyOnCredit.scss';

const BuyOnCredit = ({ type }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/db.json')
      .then((res) => res.json())
      .then((result) => {
        if (type === 'buy_on_credit') setData(result.buy_on_credit);
        else if (type === 'buy_on_credit_trade_in') setData(result.buy_on_credit_trade_in);
      })
      .catch((error) => console.error('Error loading BuyOnCredit data:', error));
  }, [type]);

  if (!data) {
    return <span className="loading">Yuklanmoqda...</span>;
  }

  return (
    <div className="buy-on-credit">
      <div className="container">
        {/* Chap tomondagi ma’lumotlar */}
        {(data.text || data.buttonText) && (
          <div className="left">
            {data.text && <p className="text">{data.text}</p>}
            {data.buttonText && <button className="btn">{data.buttonText}</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyOnCredit;
