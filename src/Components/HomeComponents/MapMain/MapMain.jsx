import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../MapMain/MapMain.scss';

const MapMain = () => {
  useEffect(() => {
    // Xarita markazi — Moskva, MKAD 38KM
    const map = L.map('map').setView([55.597073, 37.511814], 13);

    // OpenStreetMap qatlamini ulaymiz
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Marker qo‘shamiz
    const marker = L.marker([55.597073, 37.511814]).addTo(map);
    marker.bindPopup(`
      <b>Россия, Москва</b><br/>
      38КМ МКАД, 6Бс1<br/>
      <a href="https://yandex.ru/maps/213/moscow/house/mkad_38_y_kilometr_6bs1/Z04YcwZhQUQDQFtvfXl4dnxkZw%3D%3D/" target="_blank">
        📍 Ochiq xaritada ko‘rish
      </a>
    `);

    return () => map.remove();
  }, []);

  return (
    <div className='map'>
      <div className='container'>
        <div id='map'>
          <div className='card'>
            <h3 className='card__title'>Наш автосалон</h3>
            <p className='tel'>📞 Телефон: <a href="tel:+74951234567">+7 (495) 123-45-67</a></p>
            <p className='hour'>🕓 Время работы: Пн–Вс, 09:00–21:00</p>
            <p className='place'>📍 Адрес: Россия, Москва, 38КМ МКАД, 6Бс1</p>
            <button 
              className='btn' 
              onClick={() => window.open("https://yandex.ru/maps/213/moscow/house/mkad_38_y_kilometr_6bs1/Z04YcwZhQUQDQFtvfXl4dnxkZw%3D%3D/", "_blank")}
            >
              Открыть на карте
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapMain;
