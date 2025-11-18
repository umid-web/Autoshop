import React, { useState } from 'react'
import './RegisterModal.scss'

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validatsiya
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Barcha maydonlarni to\'ldiring')
      setIsLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Email manzil noto\'g\'ri')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Parollar mos kelmaydi')
      setIsLoading(false)
      return
    }

    // localStorage'dan foydalanuvchilarni olish
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Email tekshirish
    const existingUser = users.find(u => u.email === formData.email)
    if (existingUser) {
      setError('Bu email allaqachon ro\'yxatdan o\'tgan')
      setIsLoading(false)
      return
    }

    // Yangi foydalanuvchi yaratish
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    localStorage.setItem('hasRegistered', 'true')

    setIsLoading(false)
    onClose()
  }

  return (
    <div className="register-modal-overlay" onClick={onClose}>
      <div className="register-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          <i className="fa-solid fa-times"></i>
        </button>

        <div className="modal-header">
          <h2>Ro'yxatdan o'tish</h2>
          <p>Loyihadan foydalanish uchun ro'yxatdan o'ting</p>
        </div>

        {error && (
          <div className="error-message">
            <i className="fa-solid fa-circle-exclamation"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">
              <i className="fa-solid fa-user"></i>
              Ism
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ismingizni kiriting"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <i className="fa-solid fa-envelope"></i>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <i className="fa-solid fa-phone"></i>
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+998 90 123 45 67"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fa-solid fa-lock"></i>
              Parol
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Kamida 6 ta belgi"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <i className="fa-solid fa-lock"></i>
              Parolni tasdiqlash
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Parolni qayta kiriting"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Kutilmoqda...
              </>
            ) : (
              <>
                <i className="fa-solid fa-user-plus"></i>
                Ro'yxatdan o'tish
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterModal




