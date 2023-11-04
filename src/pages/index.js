import React from 'react'
import WeekCalendar from '../components/Day'

const Home = () => {
	const today = new Date() // or any date you want as the starting point

	return (
		<div>
			<WeekCalendar startDate={today} />
		</div>
	)
}

export default Home
