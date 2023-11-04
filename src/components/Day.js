import React, { useState, useEffect } from 'react'
import { format, addDays } from 'date-fns'

const Day = ({ currentDate }) => {
	const [dayText, setDayText] = useState('')

	const handleDayTextChange = (text) => {
		setDayText(text)
	}

	const clearText = () => {
		setDayText('')
	}

	useEffect(() => {
		const savedText = localStorage.getItem('dayText')
		if (savedText) {
			setDayText(savedText)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('dayText', dayText)
	}, [dayText])

	const dateStyle = {
		fontSize: '18px',
		fontFamily: 'Space Mono, monospace',
	}

	const dayLabelStyle = {
		fontFamily: 'Space Mono, monospace',
		margin: '20px 0',
		fontSize: '16px',
	}

	return (
		<div className='day'>
			<div className='day-label' style={dayLabelStyle}>
				{format(currentDate, 'EEEE')}
			</div>
			<div
				className='day-date'
				style={{ margin: '10px 0', padding: '5px', ...dateStyle }}
			>
				{format(currentDate, 'MMM d')}
			</div>
			<textarea
				placeholder=' '
				value={dayText}
				onChange={(e) => handleDayTextChange(e.target.value)}
				style={{
					width: '300px',
					padding: '5px',
					margin: '0',
					minHeight: '250px',
					border: '1px solid #ccc',
					borderRadius: '5px',
					fontFamily: 'Space Mono, monospace',
				}}
			/>
			<button
				style={{
					background: '#FCE1E8',
					color: 'black',
					border: 'none',
					padding: '10px 20px',
					margin: '10px',
					borderRadius: '5px',
					cursor: 'pointer',
				}}
				onClick={clearText}
			>
				Clear Text
			</button>
		</div>
	)
}

const App = () => {
	const [currentDate, setCurrentDate] = useState(new Date())

	const appStyle = {
		backgroundColor: '#FFFFFF',
		padding: '20px',
	}

	const h1Style = {
		fontFamily: 'Space Mono, monospace',
		fontSize: '24px',
		color: '#333',
	}

	const buttonStyle = {
		background: '#4CAF50',
		color: 'white',
		border: 'none',
		padding: '10px 20px',
		margin: '10px',
		borderRadius: '5px',
		cursor: 'pointer',
	}

	const goToNextDay = () => {
		const nextDay = addDays(currentDate, 1)
		setCurrentDate(nextDay)
	}

	const goToPreviousDay = () => {
		const previousDay = addDays(currentDate, -1)
		setCurrentDate(previousDay)
	}

	return (
		<div style={appStyle}>
			<h1 style={h1Style}>le petit journal 🌱</h1>
			<div>
				<button style={buttonStyle} onClick={goToPreviousDay}>
					Previous Day
				</button>
				<button style={buttonStyle} onClick={goToNextDay}>
					Next Day
				</button>
			</div>
			<Day currentDate={currentDate} />
		</div>
	)
}

export default App
