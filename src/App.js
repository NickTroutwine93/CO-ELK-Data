// client/src/App.js

import React from "react";
import logo from "./900dfdfe3610cf5e77403d64ae15264c.png";
import "./App.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const gmuData = { 
	"units": [
	  {
		  "unit": 1,
		  "bulls": 100,
		  "cows": 20,
		  "calves": 0,
		  "totalHarvest": 120,
		  "totalHunters": 300,
		  "PercSuccess": 30,
		  "totalDays": 100
	  },
	  {
		  "unit": 2,
		  "bulls": 20,
		  "cows": 10,
		  "calves": 0,
		  "totalHarvest": 30,
		  "totalHunters": 300,
		  "PercSuccess": 10,
		  "totalDays": 432
	  },
	  {
		  "unit": 3,
		  "bulls":80,
		  "cows": 20,
		  "calves": 0,
		  "totalHarvest": 100,
		  "totalHunters": 500,
		  "PercSuccess": 20,
		  "totalDays": 234
	  },
	  {
		  "unit": 4,
		  "bulls": 100,
		  "cows": 100,
		  "calves": 0,
		  "totalHarvest": 200,
		  "totalHunters": 400,
		  "PercSuccess": 50,
		  "totalDays": 200
	  },
	  {
		  "unit": 5,
		  "bulls": 10,
		  "cows": 0,
		  "calves": 0,
		  "totalHarvest": 10,
		  "totalHunters": 200,
		  "PercSuccess": 5,
		  "totalDays": 100
	  },
	  {
		  "unit": 6,
		  "bulls": 100,
		  "cows": 0,
		  "calves": 0,
		  "totalHarvest": 120,
		  "totalHunters": 300,
		  "PercSuccess": 30,
		  "totalDays": 120
	  },
	  {
		  "unit": 7,
		  "bulls": 200,
		  "cows": 0,
		  "calves": 0,
		  "totalHarvest": 200,
		  "totalHunters": 300,
		  "PercSuccess": 66,
		  "totalDays": 650
	  },
	  {
		  "unit": 8,
		  "bulls": 100,
		  "cows": 0,
		  "calves": 0,
		  "totalHarvest": 100,
		  "totalHunters": 200,
		  "PercSuccess": 50,
		  "totalDays": 550
	  },
	  {
		  "unit": 9,
		  "bulls": 10,
		  "cows": 0,
		  "calves": 0,
		  "totalHarvest": 10,
		  "totalHunters": 100,
		  "PercSuccess": 10,
		  "totalDays": 340
	  },
	  {
		  "unit": 10,
		  "bulls": 15,
		  "cows": 15,
		  "calves": 0,
		  "totalHarvest": 30,
		  "totalHunters": 200,
		  "PercSuccess": 15,
		  "totalDays": 840
	  },
	  {
		  "unit": 11,
		  "bulls": 100,
		  "cows": 20,
		  "calves": 0,
		  "totalHarvest": 420,
		  "totalHunters": 700,
		  "PercSuccess": 10,
		  "totalDays": 100
	  },
	  {
		  "unit": 12,
		  "bulls": 20,
		  "cows": 10,
		  "calves": 0,
		  "totalHarvest": 30,
		  "totalHunters": 680,
		  "PercSuccess": 4,
		  "totalDays": 432
	  },
	  {
		  "unit": 13,
		  "bulls":80,
		  "cows": 20,
		  "calves": 0,
		  "totalHarvest": 100,
		  "totalHunters": 500,
		  "PercSuccess": 20,
		  "totalDays": 234
	  },
	  {
		  "unit": 14,
		  "bulls": 100,
		  "cows": 100,
		  "calves": 0,
		  "totalHarvest": 200,
		  "totalHunters": 800,
		  "PercSuccess": 10,
		  "totalDays": 200
	  },
	  {
		  "unit": 15,
		  "bulls": 10,
		  "cows": 0,
		  "calves": 0,
		  "totalHarvest": 10,
		  "totalHunters": 444,
		  "PercSuccess": 45,
		  "totalDays": 100
	  },
	  {
		  "unit": 16,
		  "bulls": 100,
		  "cows": 0,
		  "calves": 0,
		  "totalHarvest": 444,
		  "totalHunters": 999,
		  "PercSuccess": 12,
		  "totalDays": 110
	  },
	  {
		  "unit": 17,
		  "bulls": 200,
		  "cows": 30,
		  "calves": 0,
		  "totalHarvest": 200,
		  "totalHunters": 300,
		  "PercSuccess": 32,
		  "totalDays": 1650
	  },
	  {
		  "unit": 18,
		  "bulls": 100,
		  "cows": 0,
		  "calves": 0,
		  "totalHarvest": 100,
		  "totalHunters": 200,
		  "PercSuccess": 50,
		  "totalDays": 550
	  },
	  {
		  "unit": 19,
		  "bulls": 10,
		  "cows": 0,
		  "calves": 0,
		  "totalHarvest": 10,
		  "totalHunters": 100,
		  "PercSuccess": 10,
		  "totalDays": 340
	  },
	  {
		  "unit": 20,
		  "bulls": 15,
		  "cows": 15,
		  "calves": 0,
		  "totalHarvest": 30,
		  "totalHunters": 200,
		  "PercSuccess": 15,
		  "totalDays": 840
	  }
	]
  }
   
  
const firebaseConfig = {
  apiKey: "AIzaSyA2VWbPBxWzxqVYDA52BZLRrVmZARDN8nw",
  authDomain: "co-elk-data.firebaseapp.com",
  databaseURL: "https://co-elk-data-default-rtdb.firebaseio.com",
  projectId: "co-elk-data",
  storageBucket: "co-elk-data.appspot.com",
  messagingSenderId: "778122995725",
  appId: "1:778122995725:web:5fbc5371b9a6f68b8b8d44",
  measurementId: "G-SQ1QDJ64QP"
};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig);
const analytics = getAnalytics(app1);
const db = getFirestore(app1);
console.log('hit');
try {
	console.log("tru");
	console.log()
	for(var i=0; i<gmuData.units.length; i++){
		var unit = gmuData.units[i];
		console.log(i);
		console.log("unit",unit);
			const docRef = await addDoc(collection(db, "all-seasons"), {
				unit: unit.unit,
				bulls: unit.bulls,
				cows: unit.cows,
				calves: unit.calves,
				totalHarvest: unit.totalHarvest,
				totalHunters: unit.totalHunters,
				PercSuccess: unit.PercSuccess,
				totalDays: unit.totalDays
			});
			console.log("Document written with ID: ", docRef.id);
		
	}
} catch (e) {
	console.error("Error adding document: ", e);
  }
const querySnapshot = await getDocs(collection(db, "all-seasons"));
querySnapshot.forEach((doc) => {
	console.log(doc._document.data.value.mapValue.fields);
  //console.log(`${doc.id} => ${doc.data()}`);
});
function App() {
	//data that will be injected as table from response
	const [data, setData] = React.useState(null);
	//#number of records will get updated with response as well
	const [results, setResults] = React.useState("0");
	//Variables that will be paramaters for get request. Value is set by input fields;
	const [success, setSuccess] = React.useState("0");
	const [hunters, setHunters] = React.useState("1000");
	const [harvest, setHarvest] = React.useState("0");
	
	const handleSubmit = (event) => {
		console.log(event);
		//event.preventDefault();
		//getSuccess(success,hunters,harvest);
	}
	//Get request for mock data. Will eventually replace with request to DB
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
