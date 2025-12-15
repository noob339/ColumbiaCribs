import React from 'react'
import BuildingInfo from '../components/BuildingInfo'
import ReviewCard from '../components/ReviewCard'
import './BuildingPage.css'

function BuildingPage() {
  return (
    <div className='BuildingPage'>
        <BuildingInfo />
        <h1>REVIEWS</h1>
        <ReviewCard />
    </div>
  )
}

export default BuildingPage
