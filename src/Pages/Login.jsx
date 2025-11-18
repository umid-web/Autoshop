import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.scss'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    if (!formData.email || !formData.password) {
      setError('Barcha maydonlarni to\'ldiring')
      setIsLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Email manzil noto\'g\'ri')
      setIsLoading(false)
      return
    }

    // localStorage'dan foydalanuvchilarni olish
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === formData.email && u.password === formData.password)

    if (user) {
      // Foydalanuvchi topildi
      localStorage.setItem('currentUser', JSON.stringify(user))
      setIsLoading(false)
      navigate('/')
    } else {
      setError('Email yoki parol noto\'g\'ri')
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Kirish</h2>
            <p>Hisobingizga kiring</p>
          </div>

          {error && (
            <div className="error-message">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Parolingizni kiriting"
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Kutilmoqda...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-sign-in-alt"></i>
                  Kirish
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Hisobingiz yo'qmi?{' '}
              <Link to="/register">Ro'yxatdan o'tish</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login




