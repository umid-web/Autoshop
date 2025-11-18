import React from 'react'
import './LogoutModal.scss'

const LogoutModal = ({ onClose, onConfirm, userName }) => {
  return (
    <div className="logout-modal-overlay" onClick={onClose}>
      <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <i className="fa-solid fa-sign-out-alt"></i>
        </div>
        
        <h3>Hisobdan chiqish</h3>
        <p>
          {userName ? `${userName}, ` : ''}Hisobingizdan chiqishni xohlaysizmi?
        </p>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            <i className="fa-solid fa-times"></i>
            Bekor qilish
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            <i className="fa-solid fa-check"></i>
            Ha, chiqish
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal




