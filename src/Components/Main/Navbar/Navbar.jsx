import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.scss";
import LogoutModal from "../../LogoutModal/LogoutModal";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Foydalanuvchi ma'lumotlarini yuklash
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, [location]);

  // Chiqish funksiyasi
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setShowLogoutModal(false);
    navigate('/');
  };

  // 💡 Brauzerdan so‘nggi tanlovni olish
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  // 💡 Dark/Light o‘zgartirish
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 🔹 Navigatsiya funksiyalari
  const goToCatalog = () => navigate("/catalog-avto");
  const goToAvtoProbeg = () => navigate("/avto-probeg");
  const goToKredit = () => navigate("/avto-kredit");
  const goToSearch = () => navigate("/search"); // ✅ Yangi funksiya

  // 💡 “Спецпредложения” tugmasi bosilganda
  const handleSpecialOffers = () => navigate("/special-offers");

  // 🚖 “Такси в кредит” tugmasi bosilganda
  const handleTaxiCredit = () => navigate("/taxi-kredit");

  // ✅ Modalni ochish/yopish
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = !isModalOpen ? "hidden" : "auto";
  };

  // 📞 Qo‘ng‘iroq tugmasi bosilganda ishlaydigan funksiya
  const handleCallRequest = () => {
    alert("📞 Sizning qo‘ng‘iroq so‘rovingiz qabul qilindi! Operator tez orada bog‘lanadi.");
  };

  return (
    <div className="navbar">
      {/* ✅ MODAL */}
      <div className={`modal ${isModalOpen ? "active" : ""}`}>
        <button className="close-modal" onClick={toggleModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ||
              location.pathname.startsWith("/catalog-avto") ||
              location.pathname.startsWith("/avto-probeg") ||
              location.pathname.startsWith("/avto-kredit")
                ? "active"
                : ""
            }
            onClick={toggleModal}
          >
            Подбор авто
          </NavLink>
          <NavLink to="/компании" onClick={toggleModal}>
            О компании
          </NavLink>
          <NavLink to="/Техцентр" onClick={toggleModal}>
            Техцентр
          </NavLink>
          <NavLink to="/Отзывы" onClick={toggleModal}>
            Отзывы
          </NavLink>
          <NavLink to="/Контакты" onClick={toggleModal}>
            Контакты
          </NavLink>
        </div>

        <div className="nav__bottom">
          <div className="nav__bottom-selects">
            <button onClick={() => { goToCatalog(); toggleModal(); }}>
              Каталог авто <i className="fa-solid fa-chevron-down"></i>
            </button>
            <button onClick={() => { goToAvtoProbeg(); toggleModal(); }}>
              Авто с пробегом <i className="fa-solid fa-chevron-down"></i>
            </button>
            <button onClick={() => { goToKredit(); toggleModal(); }}>
              Кредит и рассрочка <i className="fa-solid fa-chevron-down"></i>
            </button>
            <button onClick={() => { handleSpecialOffers(); toggleModal(); }}>
              Спецпредложения <i className="fa-solid fa-chevron-down"></i>
            </button>
            <button onClick={() => { handleTaxiCredit(); toggleModal(); }}>
              Такси в кредит <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          <div className="icons">
            <i className="fa-regular fa-heart"></i>
            <i className="fa-solid fa-chart-simple"></i>

            {/* ✅ Search ikonkasiga bosilganda search sahifasiga o‘tadi */}
            <i className="fa-solid fa-magnifying-glass" onClick={goToSearch}></i>

            {theme === "light" ? (
              <i className="fa-solid fa-moon" onClick={toggleTheme}></i>
            ) : (
              <i className="fa-solid fa-sun" onClick={toggleTheme}></i>
            )}
          </div>
                  {/* Chiqish modal */}
        {showLogoutModal && (
          <LogoutModal 
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
            userName={currentUser?.name}
          />
        )}
                    {/* Foydalanuvchi nomi va chiqish */}
            {currentUser && (
              <div className="user-info-navbar">
                <div className="user-name">
                  <i className="fa-solid fa-user-circle"></i>
                  <span>{currentUser.name}</span>
                </div>
                <button 
                  className="logout-icon-btn" 
                  onClick={() => setShowLogoutModal(true)}
                  title="Chiqish"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            )}
        </div>
      </div>

      {/* ✅ NAVBAR CONTENT */}
      <div className="container">
        <div className="nav__top">
          <i className="fa-solid fa-bars" onClick={toggleModal}></i>

          <img
            src="src/Images/Svg/logo1 1.svg"
            alt="logo"
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />

          <span className="line"></span>
          <p className="year">
            <span>10 лет</span> превосходим ваши ожидания
          </p>

          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ||
                location.pathname.startsWith("/catalog-avto") ||
                location.pathname.startsWith("/avto-probeg") ||
                location.pathname.startsWith("/avto-kredit")
                  ? "active"
                  : ""
              }
            >
              Подбор авто
            </NavLink>
            <NavLink to="/компании">О компании</NavLink>
            <NavLink to="/Техцентр">Техцентр</NavLink>
            <NavLink to="/Отзывы">Отзывы</NavLink>
            <NavLink to="/Контакты">Контакты</NavLink>
          </div>

          <div className="tell">
            <a href="tel:+78005519431" className="call-icon">
              <i className="fa-solid fa-phone"></i>
            </a>

            <div className="number">
              <a href="tel:+78005519431" className="number1">+7 (800) 551-94-31</a>
              <a href="tel:+74952921867" className="number2">+7 (495) 292-18-67</a>
            </div>

            <button className="nav__btn" onClick={handleCallRequest}>
              Обратный звонок
            </button>

            <div className="tell__search">
              {/* ✅ Bu yerda ham bosilganda Search sahifasiga o'tadi */}
              <i className="fa-solid fa-magnifying-glass" onClick={goToSearch}></i>
            </div>


          </div>
        </div>



        {/* --- NAV BOTTOM --- */}
        <div className="nav__bottom">
          <div className="nav__bottom-selects">
            <button onClick={goToCatalog}>
              Каталог авто <i className="fa-solid fa-chevron-down"></i>
            </button>
            <button onClick={goToAvtoProbeg}>
              Авто с пробегом <i className="fa-solid fa-chevron-down"></i>
            </button>
            <button onClick={goToKredit}>
              Кредит и рассрочка <i className="fa-solid fa-chevron-down"></i>
            </button>
            <button onClick={handleSpecialOffers}>
              Спецпредложения <i className="fa-solid fa-chevron-down"></i>
            </button>
            <button onClick={handleTaxiCredit}>
              Такси в кредит <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          <div className="icons">
            <i className="fa-regular fa-heart"></i>
            <i className="fa-solid fa-chart-simple"></i>
            <i className="fa-solid fa-magnifying-glass" onClick={goToSearch}></i>
            {theme === "light" ? (
              <i className="fa-solid fa-moon" onClick={toggleTheme}></i>
            ) : (
              <i className="fa-solid fa-sun" onClick={toggleTheme}></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
