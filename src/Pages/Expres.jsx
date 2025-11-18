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
import Trade_in_program from '../Components/ExpressKreditComp/Trade-in-program/Trade-in-program'
   const Expres = () => {
  return (
    <div >
        <Express type="express"/>
       <Programm/> 
       <FutureCar/>
       <BuyCredit/>
       <Trade_in_program/>
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

export default Expres