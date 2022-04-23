import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React, { useState}  from "react";
import './App.css';

import Login from './pages/Login';
import Home from './pages/Home';
import Farmer from './pages/Farmer';
import Investor from './pages/Investor';
import Consumer from './pages/Consumer';

function App() {
	console.log("App");
	const [User, setUser] = useState();
    const [UserRole, setUserRole] = useState();
	const [UserAddr, setUserAddr] = useState();

	if(!User) {
        return <Login setUser={setUser} setUserRole={setUserRole} setUserAddr={setUserAddr}/>
    }

  	return (
		<div className='App'>
			<BrowserRouter>
				<div className='App-header'> 
					<table>
						<tbody>
							<tr>
								<th className='org-name'>Organic Chain </th>
								<th className="User-display">
										Welcomes {User} !!
								</th>
								<th>
									<div className="logout-container">	
										<button className="logout-button" onClick={() => setUser('') }>Logout</button>
									</div>
								</th>
							</tr>
							</tbody>
					</table>
				</div>
				
				<nav>
					<div className='header'>
						<Link className='link' to="/">Home</Link>
						{ UserRole === 'FARMER' && 				
							<Link className='link' to="/farmer">Farmer</Link>	
						}
						{ UserRole === 'INVESTOR' && 
							<Link className='link' to="/investor">Investor</Link>
						}
						{ UserRole === 'CONSUMER' && 
							<Link className='link' to="/consumer">Consumer</Link>
						}
					</div>
				</nav>
				<Routes>
					<Route exact path="/" element={<Home />}/>
					<Route path="/farmer" element={<Farmer />}/>
					<Route path="/investor" element={<Investor/>}/>
					<Route path="/consumer" element={<Consumer/>}/>
				</Routes>
			</BrowserRouter>
		</div>
  	)
}

export default App