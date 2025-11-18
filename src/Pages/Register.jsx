import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.scss'

const Register = () => {
  const navigate = useNavigate()
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
      setError("Barcha maydonlarni to'ldiring")
      setIsLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError("Email manzil noto'g'ri")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Parollar mos kelmaydi")
      setIsLoading(false)
      return
    }

    // localStorage'dan foydalanuvchilarni olish
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Email tekshirish
    const existingUser = users.find(u => u.email === formData.email)
    if (existingUser) {
      setError("Bu email allaqachon ro'yxatdan o'tgan")
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
      createdAt: new Date().toISOString(),
      provider: "local"
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    localStorage.setItem('hasRegistered', 'true')

    setIsLoading(false)
    navigate('/')
  }

  // --------------------------------------------------
  // 🔥 GOOGLE orqali FAKE kirish
  // --------------------------------------------------
  const handleGoogleLogin = () => {
    const googleUser = {
      id: Date.now(),
      name: "User",
      email: "User_user@gmail.com",
      phone: "Noma'lum",
      password: null,
      provider: "google",
      createdAt: new Date().toISOString()
    }

    localStorage.setItem("currentUser", JSON.stringify(googleUser))
    navigate("/")
  }

  // --------------------------------------------------
  // 🔥 FACEBOOK orqali FAKE kirish
  // --------------------------------------------------
  const handleFacebookLogin = () => {
    const fbUser = {
      id: Date.now(),
      name: "Facebook User",
      email: "User_user@gmail.com",
      phone: "Noma'lum",
      password: null,
      provider: "facebook",
      createdAt: new Date().toISOString()
    }

    localStorage.setItem("currentUser", JSON.stringify(fbUser))
    navigate("/")
  }

  // --------------------------------------------------

  return (
    <div className="auth-page register-page">
      <div className="auth-background">
        <div className="auth-pattern"></div>
      </div>
      <div className="auth-container">
        <div className="auth-card register-card">
          <div className="auth-logo">
            <h1>Auto Shop</h1>
          </div>

          <div className="auth-header">
            <h2>Ro'yxatdan o'tish</h2>
            <p>Yangi hisob yarating va barcha xizmatlardan foydalaning</p>
          </div>

          {error && (
            <div className="error-message">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">
                <i className="fa-solid fa-user"></i>
                Ism va Familiya
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ismingizni kiriting"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i>
                Email manzil
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">
                <i className="fa-solid fa-phone"></i>
                Telefon raqami
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+998 90 123 45 67"
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
              />
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Ro'yxatdan o'tilmoqda...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-user-plus"></i>
                  Ro'yxatdan o'tish
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Allaqachon hisobingiz bormi?{' '}
              <Link to="/login">Kirish</Link>
            </p>
          </div>

          <div className="auth-divider">
            <span>yoki</span>
          </div>

          {/* Social Login Buttons */}
          <div className="social-auth">
            <button className="social-btn google-btn" onClick={handleGoogleLogin}>
              <i className="fa-brands fa-google"></i>
              Google orqali
            </button>
            <button className="social-btn facebook-btn" onClick={handleFacebookLogin}>
              <i className="fa-brands fa-facebook"></i>
              Facebook orqali
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
