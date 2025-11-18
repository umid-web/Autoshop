import React from 'react'
import '../FooterTop/FooterTop.scss'
import { NavLink } from 'react-router-dom'
const FooterTop = () => {
  return (
    <div className='footertop'>
        <div className="container">
         <div className="pages">
            <NavLink to="/catalog-avto">Каталог авто</NavLink>
            <NavLink to="/avto-probeg">Авто с пробегом</NavLink>
            <NavLink to="/avto-kredit">Кредит и рассрочка</NavLink>
            <NavLink to="/offers">Спецпредложения</NavLink>
            <NavLink to="/taxi-kredit">Такси в кредит</NavLink>
            </div>   
        </div>
    </div>
  )
}

export default FooterTop