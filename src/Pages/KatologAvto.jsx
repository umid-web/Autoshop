import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Katalog from '../Components/HomeComponents/katalogAuto/Katalog'
import Naliche from '../Components/HomeComponents/AvtomobileNaliche/Naliche'
import Description from '../Components/KatologAvtoComp/Description'
import './KatologAvto.scss'

const KatologAvto = () => {
  const location = useLocation()
  const [searchResult, setSearchResult] = useState(null)

  useEffect(() => {
    // State orqali ma'lumotni olish
    const stateData = location.state?.searchResult
    // localStorage'dan ma'lumotni olish
    const storedData = localStorage.getItem('searchResult')
    
    if (stateData) {
      setSearchResult(stateData)
    } else if (storedData) {
      try {
        setSearchResult(JSON.parse(storedData))
      } catch (e) {
        console.error('Error parsing search result:', e)
      }
    }
    
    // Ma'lumotni ko'rsatgandan keyin localStorage'dan o'chirish
    return () => {
      if (stateData || storedData) {
        localStorage.removeItem('searchResult')
      }
    }
  }, [location])

  const getResultDetails = () => {
    if (!searchResult) return null
    
    const { type, data } = searchResult
    
    switch (type) {
      case 'cardData':
        return {
          title: `Qidirilgan avtomobil #${data.id}`,
          items: [
            { label: 'Narxi', value: data.price },
            { label: 'Kredit narxi', value: data.kreditPrice },
            { label: 'Dvigatel', value: data.engine },
            { label: 'Yoqilg\'i sarfi', value: data.fuel },
            { label: 'Tezlik', value: data.speed },
            { label: '0-100 km/h', value: data.second }
          ]
        }
      case 'car':
      case 'avtomobile':
        return {
          title: `Qidirilgan brend: ${data.make || data.name}`,
          items: [
            { label: 'Brend', value: data.make || data.name },
            { label: 'ID', value: data.id }
          ]
        }
      case 'future':
        return {
          title: `Qidirilgan avtomobil: ${data.marka} ${data.model}`,
          items: [
            { label: 'Yil', value: data.year },
            { label: 'Narxi (chegirma)', value: data.price_discount },
            { label: 'Asosiy narx', value: data.price_base },
            { label: 'Oylik to\'lov', value: data.monthly }
          ]
        }
      case 'bodyType':
        return {
          title: `Qidirilgan kuzov turi: ${data.name}`,
          items: [
            { label: 'Nomi', value: data.name },
            { label: 'Qiymati', value: data.value }
          ]
        }
      case 'transmission':
        return {
          title: `Qidirilgan transmissiya: ${data.name}`,
          items: [
            { label: 'Nomi', value: data.name },
            { label: 'Qiymati', value: data.value }
          ]
        }
      default:
        return null
    }
  }

  const resultDetails = getResultDetails()

  return (
    <div style={{marginTop:'90px'}}>
      {/* {resultDetails && (
        <div className="search-result-banner">
          <div className="container">
            <div className="banner-content">
              <h3 className="banner-title">
                <i className="fa-solid fa-magnifying-glass"></i>
                {resultDetails.title}
              </h3>
              <div className="banner-details">
                {resultDetails.items.map((item, idx) => (
                  <div key={idx} className="detail-item">
                    <span className="detail-label">{item.label}:</span>
                    <span className="detail-value">{item.value}</span>
                  </div>
                ))}
              </div>
              <button 
                className="close-banner"
                onClick={() => {
                  setSearchResult(null)
                  localStorage.removeItem('searchResult')
                }}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      )} */}
      <Katalog />
      <Naliche highlightData={searchResult?.data} />
      <Description/>
    </div>
  )
}

export default KatologAvto