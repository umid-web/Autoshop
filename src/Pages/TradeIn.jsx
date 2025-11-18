import React from 'react'
import Express from '../Components/ExpressKreditComp/Express/Express'
import Programm from '../Components/ExpressKreditComp/Programm/Programm'
import FutureCar from '../Components/ExpressKreditComp/FutureCar/FutureCar'
import BuyCredit from '../Components/ExpressKreditComp/BuyCredit/BuyCredit'
import Personal from '../Components/ExpressKreditComp/Personal/Personal'
import AvtoKredit from '../Components/ExpressKreditComp/AvtoKredit/AvtoKredit'
import Requirement from '../Components/ExpressKreditComp/Requirement/Requirement'
import Believe from '../UI/Believe/Believe'
import Map from '../Components/HomeComponents/Map/Map'
import Comment from '../Components/HomeComponents/AvtomobileNaliche/Comment/Comment'
import Trade_in_program from '../Components/ExpressKreditComp/Trade-in-program/Trade-in-program'
import BuyOnCredit from '../Components/BuyOnCredit/BuyOnCredit'
import PersonalData from '../Components/TradeIn/PersonalData/PersonalData'
import AdvantagesTradeIn from '../Components/TradeIn/AdvantagesTradeIn/AdvantagesTradeIn'
const TradeIn = () => {
  return (
    <div>
            <Express type="tradein"/>
            <AdvantagesTradeIn/>
       <FutureCar/>
<BuyOnCredit type="buy_on_credit_trade_in"/>
      <Trade_in_program/>
       <Personal/>
<PersonalData type="personal_data" />
       <Requirement/>
       <Believe/>
       <Map/>
           <Comment type='comments'/>

    </div>
  )
}

export default TradeIn