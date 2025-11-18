import React from 'react'
import '../Offer/Offer.scss';
const Offer = () => {
  return (
    <div className='offer'>
        <div className="container">
            <div className="offer__img">
                <img src="src/Images/Png/offer.png" alt="" />
            </div>
            <div className="desc">
                <h2 className="title">Перебьем предложения от конкурентов!</h2>
                <p className="text">Скидки от 10 до 25% на стоимость автомобиля </p>
                <div className="buttons">
                    <input type="tel" className="tell" placeholder='Ваш телефон'/>
                    <button className="btn">Получить предложение</button>
                </div>
                <p className="info">Нажимая кнопку “Отправить” Вы даете согласие на обработку своих персональных данных</p>
            </div>
        </div>
    </div>
  )
}

export default Offer