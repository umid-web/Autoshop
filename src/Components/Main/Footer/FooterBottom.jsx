import React from 'react'
import '../Footer/FooterBottom.scss';
import { NavLink } from 'react-router-dom';
const FooterBottom = () => {
  return (
    <div className='footerbottom'>
        <div className="container">
            <div className="left">
                <h2 className="tit">© 2021 Автосалон "ABC AUTO". Официальный дилер</h2>
            <div className="link">
                    <NavLink>Политика конфиденциальности</NavLink>
                <NavLink>Пользовательское соглашение</NavLink>
            </div>
            </div>
            <div className="center">
                <p className="text">Обращаем Ваше внимание на то, что данный интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации.</p>
            </div>
<div className="right">
    <img src="src/Images/Png/Footerbottom.png" alt="" />
</div>
        </div>
    </div>
  )
}

export default FooterBottom