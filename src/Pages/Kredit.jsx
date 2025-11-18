import React from 'react'
import Offer from '../Components/HomeComponents/Offer/Offer'
import Believe from '../UI/Believe/Believe'
import Map from '../Components/HomeComponents/Map/Map'
import Comment from '../Components/HomeComponents/AvtomobileNaliche/Comment/Comment'
import KreditTitle from '../Components/KreditComp/KreditHeader/KreditHeader'

const Kredit = () => {
  return (
    <div style={{marginTop: '65px'}}>
        <KreditTitle/>
<Offer/>
<Believe/>
<Map/>
       <Comment type='comments'/>
    </div>
  )
}

export default Kredit