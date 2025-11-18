import React from 'react'
import Programm from '../Components/ExpressKreditComp/Programm/Programm'
import FutureCar from '../Components/ExpressKreditComp/FutureCar/FutureCar'
import BuyCredit from '../Components/ExpressKreditComp/BuyCredit/BuyCredit'
import Personal from '../Components/ExpressKreditComp/Personal/Personal'
import AvtoKredit from '../Components/ExpressKreditComp/AvtoKredit/AvtoKredit'
import Requirement from '../Components/ExpressKreditComp/Requirement/Requirement'
import Offer from '../Components/HomeComponents/Offer/Offer'
import Believe from '../UI/Believe/Believe'
import Map from '../Components/HomeComponents/Map/Map'
import Comment from '../Components/HomeComponents/AvtomobileNaliche/Comment/Comment'
import Express from '../Components/ExpressKreditComp/Express/Express'
import Familycar from '../Components/FamilyCarComp/FamilyCar/FamilyCar'
import BuyOnCredit from '../Components/BuyOnCredit/BuyOnCredit'
const FamilyCar = () => {
  return (
    <div>
      <Express type="family"/>  
      <Programm/>
       <FutureCar/>
       <BuyCredit/>
       <BuyOnCredit/>
       <Personal/>
       <AvtoKredit/>
       <Requirement/>
       <Familycar/>
       <Offer/>
       <Believe/>
       <Map/>
              <Comment type='comments'/>

    </div>
  )
}

export default FamilyCar