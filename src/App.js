// client/src/App.js

import React from "react";
import logo from "./900dfdfe3610cf5e77403d64ae15264c.png";
import "./App.css";

function App() {
	//data that will be injected as table in response
	const [data, setData] = React.useState(null);
	//#number of records will get updated with response as well
	const [results, setResults] = React.useState("0");
	//Variables that will be paramaters for get request. Value is set by input fields;
	const [success, setSuccess] = React.useState("0");
	const [hunters, setHunters] = React.useState("1000");
	const [harvest, setHarvest] = React.useState("0");

	const handleSubmit = (event) => {
		event.preventDefault();
		getSuccess(success,hunters,harvest);
	}
	//Get request for mock data. Will eventually replace with get request to real DB
	const getSuccess=(success,hunters,harvest)=>
	{
		fetch('/api?success='+success+'&hunters='+hunters+'&harvest='+harvest)
		.then((res) => res.json())
		.then((data) => {
			setData(data.message.table)
			setResults(data.message.results)
		})
	}
return (
    <div className="app">
     	<header className="app-header">
        	<img src={logo} className="app-logo" alt="logo" />
			<div className="header-text">CO ELK Data</div>
		</header>
      	<div className="app-body">
        	<div className="inputs">
				<form onSubmit={handleSubmit}>
					<table className='data-table'>
						<tr>
							<th>Success</th>
							<th>Total Hunters</th> 
							<th>Total Harvest</th>  
						</tr>
						<tr>
							<td>
								<input 
									type="number" 
									value={success}
									onChange={(e) => setSuccess(e.target.value)}
									max="100"
								/>
							</td>
							<td>
								<input 
									type="number" 
									value={hunters}
									onChange={(e) => setHunters(e.target.value)}
									max="1000"
								/>
							</td>
							<td>
								<input 
									type="number" 
									value={harvest}
									onChange={(e) => setHarvest(e.target.value)}
									max="1000"
								/>
							</td>
						</tr>
					</table> 
					<div className="center">
						<input className="submit" type="submit" />
					</div>
				</form>
			</div>
			<p>Results Found: <span dangerouslySetInnerHTML={{ __html: results }}></span></p>
			<div className="results" dangerouslySetInnerHTML={{ __html: data }}></div>
      	</div>
    </div>
  );
}

export default App;