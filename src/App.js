import React, { Component } from 'react';
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import './App.css';

class App extends Component {
	render() {
		// const numbers = [1,2,3,4]
		return (
			<div className='App'>
				<Navbar />
				<Users />
			</div>
		);
	}

}

export default App;
