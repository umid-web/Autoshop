import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Express from '../Components/ExpressKreditComp/Express/Express'
import BuyingCar from '../Components/TaxiComp/BuyingCar/BuyingCar'
import TaxiCars from '../Components/TaxiComp/TaxiCars/TaxiCars'
import PartnerSwiper from '../UI/PartnerSwiper/PartnerSwiper'

const Taxi_Kredit = () => {
  const location = useLocation()
  const [searchResult, setSearchResult] = useState(null)

  useEffect(() => {
    const stateData = location.state?.searchResult
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
    
    return () => {
      if (stateData || storedData) {
        localStorage.removeItem('searchResult')
      }
    }
  }, [location])

  const getResultDetails = () => {
    if (!searchResult || searchResult.type !== 'taxi_car') return null
    
    const { data } = searchResult
    
    return {
      title: `Qidirilgan taksi avtomobili: ${data.name}`,
      items: [
        { label: 'Brend', value: data.brand },
        { label: 'Model', value: data.model },
        { label: 'Klass', value: data.class },
        { label: 'Eski narx', value: data.old_price },
        { label: 'Yangi narx', value: data.new_price },
        { label: 'Bonuslar', value: data.bonuses?.join(', ') || 'Mavjud emas' }
      ]
    }
  }

  const resultDetails = getResultDetails()

  return (
    <div >
      <Express type="taxi-kredit"/>
      <BuyingCar/>
      <TaxiCars highlightData={searchResult?.data} />
      <PartnerSwiper/>
    </div>
  )
}

export default Taxi_Kredit