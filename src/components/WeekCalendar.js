import React, { useState, useEffect } from 'react'
import { format, addDays, startOfWeek } from 'date-fns'

const WeekCalendar = ({ startDate }) => {
	const [dayTexts, setDayTexts] = useState(new Array(7).fill(''))

	const handleDayTextChange = (index, text) => {
		const updatedDayTexts = [...dayTexts]
		updatedDayTexts[index] = text
		setDayTexts(updatedDayTexts)
	}

	const clearAllTextFields = () => {
		// Reset all text inputs to an empty string
		setDayTexts(new Array(7).fill(''))
	}

	// Load saved text from local storage on component mount
	useEffect(() => {
		const savedTexts = JSON.parse(localStorage.getItem('dayTexts'))
		if (savedTexts) {
			setDayTexts(savedTexts)
		}
	}, [])

	// Save text to local storage whenever dayTexts changes
	useEffect(() => {
		localStorage.setItem('dayTexts', JSON.stringify(dayTexts))
	}, [dayTexts])

	const days = []

	const dateStyle = {
		fontSize: '18px',
		fontFamily: 'Space Mono, monospace',
	}

	for (let i = 0; i < 7; i++) {
		const day = addDays(startDate, i)
		days.push(
			<div
				key={i}
				className='day'
				style={{
					margin: '10px',
					display: 'inline-block',
					fontFamily: 'Space Mono, monospace',
				}}
			>
				<div className='day-label'>{format(day, 'EEEE')}</div>
				<div
					className='day-date'
					style={{ margin: '10px 0', padding: '5px', ...dateStyle }}
				>
					{format(day, 'MMM d')}
				</div>
				<textarea
					placeholder=' '
					value={dayTexts[i]}
					onChange={(e) => handleDayTextChange(i, e.target.value)}
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
			</div>
		)
	}

	const buttonStyle = {
		background: '#FCE1E8',
		color: 'black',
		border: 'none',
		padding: '10px 20px',
		margin: '10px', // Adjusted margin for mobile
		borderRadius: '5px',
		cursor: 'pointer',
	}

	return (
		<div className='week-calendar'>
			{days}
			<button
				style={buttonStyle}
				onClick={clearAllTextFields}
				className='clear-button'
			>
				Clear All
			</button>
		</div>
	)
}

const App = () => {
	const [currentWeek, setCurrentWeek] = useState(
		startOfWeek(new Date(), { weekStartsOn: 1 })
	)

	const appStyle = {
		backgroundColor: '#FFFEDF',
		padding: '20px',
	}

	const buttonContainerStyle = {
		display: 'flex',
		flexDirection: 'column', // Adjusted flex direction for mobile
		alignItems: 'center', // Center align buttons vertically
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

	const goToNextWeek = () => {
		const nextWeek = addDays(currentWeek, 7)
		setCurrentWeek(nextWeek)
	}

	const goToPreviousWeek = () => {
		const previousWeek = addDays(currentWeek, -7)
		setCurrentWeek(previousWeek)
	}

	return (
		<div style={appStyle}>
			<div style={buttonContainerStyle}>
				<h1 style={h1Style}>le petit menu 🌱</h1>
				<div>
					<button style={buttonStyle} onClick={goToPreviousWeek}>
						Previous Week
					</button>
					<button style={buttonStyle} onClick={goToNextWeek}>
						Next Week
					</button>
				</div>
			</div>
			<WeekCalendar startDate={currentWeek} />
		</div>
	)
}

export default App
