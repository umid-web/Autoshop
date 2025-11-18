import React from 'react'
import Katalog from '../Components/HomeComponents/katalogAuto/Katalog'
import Naliche from '../Components/HomeComponents/AvtomobileNaliche/Naliche'
import BlogSwiper from '../UI/BlogSwiper/BlogSwiper'
import Description from '../Components/KatologAvtoComp/Description'
import AutoProbTitle from '../Components/AutoProbegComp/AutoProbTitle'

const AutoProbeg = () => {
  return (
    <div style={{marginTop:'50px'}}>
      <AutoProbTitle/>
    <Katalog/>  
<Naliche/>
<BlogSwiper/>
<Description/>
    </div>
  )
}

export default AutoProbeg