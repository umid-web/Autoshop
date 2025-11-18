import React from 'react'
import { NavLink } from 'react-router-dom'
import './Otzivi.scss'
const Otzivi = () => {
  return (
    <div className='otzivi'>
        <div className="container">
            <div className="link">
                <NavLink to='/'>Главная / Отзывы</NavLink>
            </div>
            <hr />

        </div>
    </div>
  )
}

export default Otzivi