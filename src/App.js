import React, { useState, useEffect, Fragment } from 'react';

function Date({ date, index, deleteDate }) {
	return (
		<div className="date">
			<p>Pet: <span>{date.pet}</span></p>
			<p>Owner: <span>{date.owner}</span></p>
			<p>Date: <span>{date.date}</span></p>
			<p>Time: <span>{date.time}</span></p>
			<p>Symptoms: <span>{date.symptom}</span></p>
			<button
				onClick={() => deleteDate(index)}
				type="button" className="button delete u-full-width">Delete</button>
		</div>
	)
}

function Form({ createDate }) {

	const initialState = {
		pet: '',
		owner: '',
		date: '',
		time: '',
		symptom: ''
	}

	// date = actual state
	// updateDate = function to change the state
	const [date, updateDate] = useState(initialState);

	// update the state
	const handleChange = (e) => {
		updateDate({
			...date,
			[e.target.name]: e.target.value
		})
	}

	// pass the date to the main component
	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(date);

		// pass the appointment to the initial component
		createDate(date);

		// restart state (restart the form)
		updateDate(initialState);
	}

	return (
		<Fragment>
			<h2>Fill out the form to create a new appointment</h2>
			<form onSubmit={handleSubmit}>
				<label>Pet Name</label>
				<input
					type="text"
					name="pet"
					className="u-full-width"
					placeholder="Pet Name"
					onChange={handleChange}
					value={date.pet}
				/>
				<label>Owner Name</label>
				<input
					type="text"
					name="owner"
					className="u-full-width"
					placeholder="Pet Owner's Name"
					onChange={handleChange}
					value={date.owner}
				/>
				<label>Date</label>
				<input
					type="date"
					className="u-full-width"
					name="date"
					onChange={handleChange}
					value={date.date}
				/>
				<label>Time</label>
				<input
					type="time"
					className="u-full-width"
					name="time"
					onChange={handleChange}
					value={date.time}
				/>
				<label>Symptom</label>
				<textarea
					className="u-full-width"
					name="symptom"
					placeholder="Describe the symptoms"
					onChange={handleChange}
					value={date.symptom}
				></textarea>
				<button type="submit" className="button-primary u-full-width">Add New Appointment</button>
			</form>
		</Fragment>
	)
}

function App() {

	// load the dates of the local storage like initial state
	let initialDates = JSON.parse(localStorage.getItem('dates'));

	if(!initialDates) {
		initialDates = [];
	}

	// useState return two functions
	// dates = this.state;
	// saveDate function that updates the state, this.setState();
	const [dates, saveDate] = useState(initialDates);

	// Add new dates to the state
	const createDate = (date) => {

		// take a copy of the state and add the new client
		const newDates = [...dates, date];

		// Store in the state
		saveDate(newDates);
	}

	// Delete the Dates of the state
	const deleteDate = (index) => {
		const newDates = [...dates];
		newDates.splice(index, 1);
		saveDate(newDates);
	}

	useEffect(
		() => {
			let initialDates = JSON.parse(localStorage.getItem('dates'));

			if(initialDates) {
				localStorage.setItem('dates', JSON.stringify(dates));
			} else {
				localStorage.setItem('dates', JSON.stringify([]));
			}
		}, [dates]
	)

	// Load a title conditionally
	const title = Object.keys(dates).length === 0 ? 'No Dates' : 'Manage Dates Here';


	return (
		<Fragment>
			<h1>Veterinary Patient Administrator</h1>
			<div className="container">
				<div className="row">
					<div className="one-half column">
						<Form
							createDate={createDate}
						/>
					</div>
					<div className="one-half column">
						<h2>{title}</h2>
						{dates.map((date, index) => (
							<Date
								key={index}
								index={index}
								date={date}
								deleteDate={deleteDate}
							/>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default App;
