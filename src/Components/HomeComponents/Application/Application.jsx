import React, { useState } from 'react';
import '../Application/Application.scss';

const Application = () => {
  const [initialPercent, setInitialPercent] = useState(30); // boshlang‘ich foiz
  const [price, setPrice] = useState(500); // narx
  const [months, setMonths] = useState(24); // oy

  return (
    <div className='application'>
      <div className="container">
        <h2 className="title">Заявка на автокредит</h2>

        {/* Chap blok */}
        <div className="left">
          <div className="selects">
            <select defaultValue="">
              <option value="" disabled hidden>Марка</option>
              <option value="Skoda">Skoda</option>
              <option value="Toyota">Toyota</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Kia">Kia</option>
              <option value="BMW">BMW</option>
            </select>

            <select defaultValue="">
              <option value="" disabled hidden>Модель</option>
              <option value="Octavia">Octavia</option>
              <option value="Camry">Camry</option>
              <option value="Elantra">Elantra</option>
              <option value="Sportage">Sportage</option>
              <option value="X5">X5</option>
            </select>

            <select defaultValue="">
              <option value="" disabled hidden>Комплектация</option>
              <option value="Base">Base</option>
              <option value="Comfort">Comfort</option>
              <option value="Premium">Premium</option>
              <option value="Sport">Sport</option>
            </select>
          </div>

          <div className="center">
            {/* Chap tomon */}
            <div className="center__left">
              <img src="src/Images/Png/Application.png" alt="car" />
              <div className="quantity">
                <div className="desc">
                  <h2 className="tit">0 </h2>
                  <p className="text">  {initialPercent}%</p>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={initialPercent}
                  onChange={(e) => setInitialPercent(Number(e.target.value))}
                />
                <div className="part">
                  <span>Первоначальный взнос</span>
                  <span>Остаток по кредиту</span>
                </div>
              </div>
            </div>

            {/* O‘ng tomon */}
            <div className="center__right">
              <div className="quantity">
                <div className="desc">
                  <h2 className="tit">Цена</h2>
                  <p className="text">{price} тыс. ₽</p>
                </div>
                <input
                  type="range"
                  min="300"
                  max="3000"
                  step="100"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <div className="part">
                  <span>300</span>
                  <span>600</span>
                  <span>1200</span>
                  <span>1800</span>
                  <span>2400</span>
                  <span>3000</span>
                </div>
              </div>

              <div className="quantity">
                <div className="desc">
                  <h2 className="tit">Срок кредита, мес.</h2>
                  <p className="text">{months} мес.</p>
                </div>
                <input
                  type="range"
                  min="6"
                  max="84"
                  step="6"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                />
                <div className="part">
                  <span>6</span>
                  <span>12</span>
                  <span>24</span>
                  <span>36</span>
                  <span>48</span>
                  <span>60</span>
                  <span>72</span>
                  <span>84</span>
                </div>
              </div>

              <div className="center__right__bottom">
                <p className="text">Первоначальный взнос, руб</p>
                <input type="number" className="bottom__input" placeholder="Введите сумму" />
              </div>
            </div>
          </div>
        </div>

        {/* O‘ng blok */}
        <div className="right">
          <h2 className="right-title">
            Получить выгоду <span>300 000 ₽</span>
          </h2>
          <form>
            <input type="text" placeholder="Ваше имя" />
            <input type="tel" placeholder="Телефон" />
            <button>Получить предложение</button>
          </form>
          <p className="text">
            Нажимая кнопку “Получить скидку” Вы даете согласие на обработку своих персональных данных
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Application;
