import React, { useEffect, useState } from 'react'
import './FamilyCar.scss'

const FamilyCar = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(info => setData(info.receiptFamily))
      .catch(err => console.error("❌ Ma'lumot yuklanmadi:", err));
  }, []);

  if (!data) return <p className="loading">Yuklanmoqda...</p>;

  return (
    <div className='familyCar'>
      <div 
        className="container"
        style={{ backgroundImage: `url(${data.bgImage})` }}
      >
        <div className="wrp">
          <h2 className="title">Семейный кредит</h2>
          <p className="text">Лучшие условия для покупки автомобиля</p>

          <div className="description">
            <div className="first">
              <h2 className="tit">Преимущества</h2>
              {data.info.slice(0, 3).map((item, index) => (
                <div className="desc" key={index}>
                  <i className="fa-solid fa-circle-check"></i>
                  <p className="text">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="second">
              <h2 className="tit">Дополнительные условия</h2>
              {data.info.slice(0, 3).map((item, index) => (
                <div className="desc" key={index}>
                  <i className="fa-solid fa-circle-check"></i>
                  <p className="text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="images">
          <img src={data.img1} alt="card" className="img1" />
          <img src={data.img2} alt="car" className="img2" />
        </div>
      </div>
    </div>
  )
}

export default FamilyCar
