import React from 'react'
import BuildingInfo from '../components/BuildingInfo'
import ReviewCard from '../components/ReviewCard'
import './BuildingPage.css'
import RatingsCard from '../components/RatingsCard'

function BuildingPage() {
  return (
    <div className='BuildingPage'>
        <BuildingInfo />
        <RatingsCard />
        <h1>REVIEWS</h1>
        <ReviewCard />
        <ReviewCard />
    </div>
  )
}

export default BuildingPage
