import React, { Fragment, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/layouts/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layouts/Alert'
import About from './components/pages/About'
import GithubState from './context/github/GithubState'

import './App.css';

const App = () => {
	const [repos, setRepos] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState(null)

  // async componentDidMount() {
  //   this.setState({loading: true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   this.setState({users: res.data, loading: false})
  // }





  // Get user repo
  const getUserRepos = async (username) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=20&sort=created:asd&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
		setRepos(res.data)
		setLoading(false)
  } 

  // Clear users from state

	
	// Set alert
	const showAlert = (msg,type) => {
		setAlert({ msg, type })

		setTimeout(() => setAlert(null), 5000)
	}


		return (
			<GithubState>
				<Router>
					<div className='App'>
						<Navbar />
						<div className="container">
							<Alert alert={alert} />
							<Switch>
								<Route 
									exact 
									path='/' 
									render={props => (
									<Fragment>
										<Search 
											showAlert={showAlert}
										/>
										<Users />
									</Fragment>
									)} 
								/>
								<Route exact path='/about' component={About} />
								<Route exact path='/user/:login' render={props => (
									<User 
										{...props} 
										getUserRepos={getUserRepos} 
										repos={repos}
									/>
								)} />
							</Switch>
						</div>
					</div>
				</Router>
			</GithubState>
		);


}

export default App;
