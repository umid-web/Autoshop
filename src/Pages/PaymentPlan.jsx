import React from 'react'
import Express from '../Components/ExpressKreditComp/Express/Express'
import Programm from '../Components/ExpressKreditComp/Programm/Programm'
import FutureCar from '../Components/ExpressKreditComp/FutureCar/FutureCar'
import BuyCredit from '../Components/ExpressKreditComp/BuyCredit/BuyCredit'
import Personal from '../Components/ExpressKreditComp/Personal/Personal'
import AvtoKredit from '../Components/ExpressKreditComp/AvtoKredit/AvtoKredit'
import Requirement from '../Components/ExpressKreditComp/Requirement/Requirement'
import Receipt from '../Components/ExpressKreditComp/Receipt/Receipt'
import Offer from '../Components/HomeComponents/Offer/Offer'
import Believe from '../UI/Believe/Believe'
import Map from '../Components/HomeComponents/Map/Map'
import Comment from '../Components/HomeComponents/AvtomobileNaliche/Comment/Comment'
const PaymentPlan = () => {
  return (
    <div>
           <Express type="payment-plan"/>
       <Programm/> 
       <FutureCar/>
       <BuyCredit/>
       <Personal/>
      <AvtoKredit type="avtokredit" />
       <Requirement/>
       <Receipt />
       <Offer/>
       <Believe/>
       <Map/>
              <Comment type='comments'/>

    </div>
  )
}

export default PaymentPlan