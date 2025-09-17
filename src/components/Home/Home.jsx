import React from 'react'
import UsersList from '../UsersList/UsersList'
import UsersChart from '../UsersChart/UsersChart'

export default function Home() {
  return (
    <div className="container py-4">
    <h2>📊 Dashboard</h2>
    
    {/* Users Chart */}
    <UsersChart />

  </div>
  )
}
