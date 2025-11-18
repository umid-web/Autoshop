import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.scss';

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(() => localStorage.getItem('searchQuery') || '');
  const [allData, setAllData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedResult, setSelectedResult] = useState(null);

  // Qidiruv so‘zini localStorage'ga saqlash
  useEffect(() => {
    if (query.trim()) {
      localStorage.setItem('searchQuery', query);
    }
  }, [query]);

  // db.json ni yuklash
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json', { signal: controller.signal });
        if (!response.ok) throw new Error("Ma'lumotlarni olishda xatolik.");
        const data = await response.json();
        setAllData(data);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Ulanishda muammo bor.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  // Chuqur qidiruv funksiyasi (string va number bo‘yicha, massivlarni ham hisobga oladi)
  const searchInObject = (obj, lowerQuery) => {
    if (!obj || typeof obj !== 'object') return false;
    if (Array.isArray(obj)) {
      return obj.some(item => searchInObject(item, lowerQuery));
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'string' && value.toLowerCase().includes(lowerQuery)) return true;
        if (typeof value === 'number' && value.toString().includes(lowerQuery)) return true;
        if ((typeof value === 'object' || Array.isArray(value)) && value !== null) {
          if (searchInObject(value, lowerQuery)) return true;
        }
      }
    }
    return false;
  };

  // Har bir kategoriya uchun konfiguratsiya
  const searchConfigs = [
    { key: 'cars', category: 'Mashina brendlari', type: 'car', getTitle: i => i.make ?? 'Brend', getDescription: i => `ID: ${i.id ?? '?'}` },
    { key: 'avtomobile', category: 'Avtomobillar', type: 'avtomobile', getTitle: i => i.name ?? 'Avto', getDescription: i => `ID: ${i.id ?? '?'}` },
    { key: 'bodyTypes', category: 'Kuzov turlari', type: 'bodyType', getTitle: i => i.name, getDescription: i => i.value },
    { key: 'transmissions', category: 'Transmissiya', type: 'transmission', getTitle: i => i.name, getDescription: i => i.value },
    { key: 'swiper', category: 'Avtomobillar', type: 'swiper', getTitle: i => i.title ?? 'Slider', getDescription: i => i.text?.substring(0, 100) + '...' || '' },
    { key: 'cardData', category: 'Avtomobil ma\'lumotlari', type: 'cardData', getTitle: i => `Avtomobil #${i.id}`, getDescription: i => `${i.price} | ${i.engine} | ${i.fuel}` },
    { key: 'Blogswaper', category: 'Blog', type: 'blog', getTitle: i => i.text, getDescription: i => i.data },
    { key: 'description', category: 'Tavsif', type: 'description', getTitle: i => i.title, getDescription: i => i.text?.substring(0, 100) + '...' || '' },
    { key: 'programm', category: 'Dasturlar', type: 'programm', getTitle: i => i.text, getDescription: i => i.number },
    { key: 'taxi_cars', category: 'Taksi avtomobillari', type: 'taxi_car', getTitle: i => i.name || `${i.brand} ${i.model}`, getDescription: i => `${i.brand} ${i.model} | ${i.class} | ${i.new_price}` },
    { key: 'special_offers', category: 'Maxsus takliflar', type: 'special_offer', getTitle: i => i.title, getDescription: i => i.text },
    { key: 'comments', category: 'Sharhlar', type: 'comment', getTitle: i => i.name, getDescription: i => i.text?.substring(0, 80) + '...' },
    { key: 'otzivi', category: 'Otzivlar', type: 'otziv', getTitle: i => i.name, getDescription: i => i.text?.substring(0, 80) + '...' },
    { key: 'avtokredit', category: 'Avtokredit', type: 'avtokredit', getTitle: i => i.text, getDescription: i => `ID: ${i.id}` },
    { key: 'future', category: 'Kelajakdagi avtomobillar', type: 'future', getTitle: i => `${i.marka} ${i.model}`, getDescription: i => `${i.year} | ${i.price_discount}` },
    // Agar boshqa massivlar qo‘shmoqchi bo‘lsangiz, shu yerga qo‘shing
  ];

  // Qidiruv natijalari
  const searchResults = useMemo(() => {
    if (!allData) return [];

    // Bo‘sh qidiruv — mashhur brendlar
    if (!query.trim()) {
      return (allData.cars || []).slice(0, 6).map(car => ({
        type: 'car',
        category: 'Mashina brendlari',
        data: car,
        title: car.make,
        description: `ID: ${car.id}`
      }));
    }

    const results = [];
    const lowerQuery = query.trim().toLowerCase();

    searchConfigs.forEach(config => {
      const items = allData[config.key] || [];
      items.forEach(item => {
        if (searchInObject(item, lowerQuery)) {
          results.push({
            type: config.type,
            category: config.category,
            data: item,
            title: config.getTitle(item),
            description: config.getDescription(item)
          });
        }
      });
    });

    return results;
  }, [allData, query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(prev => prev.trim());
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    localStorage.setItem('searchQuery', query);
    localStorage.setItem('searchResult', JSON.stringify(result));

    switch (result.type) {
      case 'car':
      case 'avtomobile':
      case 'cardData':
      case 'swiper':
      case 'future':
        navigate('/catalog-avto', { state: { searchResult: result, highlightData: result.data } });
        break;
      case 'taxi_car':
        navigate('/taxi-kredit', { state: { searchResult: result, highlightData: result.data } });
        break;
      case 'special_offer':
        navigate('/special-offers', { state: { searchResult: result, highlightData: result.data } });
        break;
      case 'avtokredit':
      case 'programm':
        navigate('/avto-kredit', { state: { searchResult: result, highlightData: result.data } });
        break;
      case 'comment':
      case 'otziv':
        navigate('/Отзывы', { state: { searchResult: result, highlightData: result.data } });
        break;
      case 'bodyType':
      case 'transmission':
        navigate('/catalog-avto', { state: { searchResult: result, highlightData: result.data } });
        break;
      case 'blog':
      case 'description':
        navigate('/', { state: { searchResult: result, highlightData: result.data } });
        break;
      default:
        navigate('/', { state: { searchResult: result, highlightData: result.data } });
    }
  };

  // To'liq ma'lumotlarni ko'rsatish (avvalgidek)
  const getFullDetails = (result) => {
    const { type, data } = result;

    switch (type) {
      case 'cardData':
        return {
          title: `Avtomobil #${data.id}`,
          details: [
            { label: 'Narxi', value: data.price },
            { label: 'Kredit narxi', value: data.kreditPrice },
            { label: 'Dvigatel', value: data.engine },
            { label: 'Yoqilg\'i sarfi', value: data.fuel },
            { label: 'Tezlik', value: data.speed },
            { label: '0-100 km/h', value: data.second }
          ]
        };
      case 'taxi_car':
        return {
          title: data.name,
          details: [
            { label: 'Brend', value: data.brand },
            { label: 'Model', value: data.model },
            { label: 'Klass', value: data.class },
            { label: 'Eski narx', value: data.old_price },
            { label: 'Yangi narx', value: data.new_price },
            { label: 'Bonuslar', value: data.bonuses?.join(', ') || 'Mavjud emas' }
          ]
        };
      case 'future':
        return {
          title: `${data.marka} ${data.model}`,
          details: [
            { label: 'Yil', value: data.year },
            { label: 'Narxi (chegirma)', value: data.price_discount },
            { label: 'Asosiy narx', value: data.price_base },
            { label: 'Oylik to\'lov', value: data.monthly }
          ]
        };
      case 'blog':
        return {
          title: data.text,
          details: [
            { label: 'Sana', value: data.data },
            { label: 'To\'liq matn', value: data.text }
          ]
        };
      case 'description':
        return {
          title: data.title,
          details: [{ label: 'To\'liq tavsif', value: data.text }]
        };
      case 'programm':
        return {
          title: data.text,
          details: [
            { label: 'Raqam', value: data.number },
            { label: 'Tavsif', value: data.text }
          ]
        };
      case 'comment':
      case 'otziv':
        return {
          title: data.name,
          details: [
            { label: 'To\'liq sharh', value: data.text },
            { label: 'Video', value: data.video || 'Mavjud emas' }
          ]
        };
      case 'avtokredit':
        return {
          title: data.text,
          details: [
            { label: 'Tavsif', value: data.text },
            { label: 'ID', value: data.id }
          ]
        };
      default:
        return {
          title: result.title,
          details: [{ label: 'Tavsif', value: result.description }]
        };
    }
  };

  // Kategoriyalar bo‘yicha guruhlash
  const groupedResults = useMemo(() => {
    const grouped = {};
    searchResults.forEach(result => {
      if (!grouped[result.category]) grouped[result.category] = [];
      grouped[result.category].push(result);
    });
    return grouped;
  }, [searchResults]);

  return (
    <div className="search">
      <div className="container">
        <form className="top" onSubmit={handleSubmit}>
          <div className="input-wrp">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Mashina, xizmat yoki ma'lumot qidiring..."
              aria-label="Qidiruv"
            />
          </div>
          <button className="btn" type="submit">Найти</button>
        </form>

        <div className="bottom">
          {isLoading && <p className="status">Ma'lumotlar yuklanmoqda...</p>}
          {error && !isLoading && <p className="status error">{error}</p>}

          {!isLoading && !error && (
            <>
              {query && !searchResults.length && (
                <p className="status">Natijalar topilmadi. Boshqa so'zni kiriting.</p>
              )}
              {!query && (
                <p className="status muted">Mashhur brendlar ro'yxati bilan tanishib chiqing.</p>
              )}

              {!!searchResults.length && (
                <div className="results-container">
                  {Object.keys(groupedResults).map(category => (
                    <div key={category} className="category-group">
                      <h3 className="category-title">{category}</h3>
                      <ul className="results">
                        {groupedResults[category].map((result, index) => {
                          const fullDetails = getFullDetails(result);
                          return (
                            <li
                              key={`${result.type}-${result.data.id || index}`}
                              onClick={() => handleResultClick(result)}
                              className="result-item"
                            >
                              <span className="circle">
                                {result.title?.[0]?.toUpperCase() || '?'}
                              </span>
                              <div className="result-content">
                                <p className="make">{fullDetails.title}</p>
                                <div className="result-details">
                                  {fullDetails.details.slice(0, 3).map((detail, idx) => (
                                    <p key={idx} className="meta">
                                      <span className="detail-label">{detail.label}:</span> {detail.value}
                                    </p>
                                  ))}
                                  {fullDetails.details.length > 3 && (
                                    <p className="meta more-info">
                                      +{fullDetails.details.length - 3} ta boshqa ma'lumot
                                    </p>
                                  )}
                                </div>
                                <div className="result-footer">
                                  <span className="category-badge">{result.category}</span>
                                  <span className="navigate-hint">
                                    <i className="fa-solid fa-arrow-right"></i> Batafsil
                                  </span>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                  <p className="results-count">
                    Jami {searchResults.length} ta natija topildi
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;