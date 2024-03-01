// client/src/App.js

import React from "react";
import logo from "./900dfdfe3610cf5e77403d64ae15264c.png";
import "./App.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, query, where  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  
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
/*
try {
	console.log("tru");
	console.log()
	for(var i=0; i<gmuData.units.length; i++){
		var unit = gmuData.units[i];
		console.log(i);
		console.log("unit",unit);
			const docRef = await addDoc(collection(db, "all-seasons"), {
				unit
			});
			console.log("Document written with ID: ", docRef.id);
		
	}
} catch (e) {
	console.error("Error adding document: ", e);
  }
*/
//let season = "all-seasons"
//let querySnapshot = await getDocs(collection(db, season));


const q = query(collection(db, "all-seasons"), where("PercSuccess", ">=", 50));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc);
  console.log(doc.id, " => ", doc.data());
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
		//console.log(event);
		event.preventDefault();
		getSuccess(success,hunters,harvest);
	}
	//Get request for mock data. Will eventually replace with request to DB
	const getSuccess=(success,hunters,harvest)=>
	{
		console.log(success);
		/*
		querySnapshot.forEach((doc) => {
			console.log(doc._document.data.value.mapValue.fields);
		  //console.log(`${doc.id} => ${doc.data()}`);
		});
		fetch('/api?success='+success+'&hunters='+hunters+'&harvest='+harvest)
		.then((res) => res.json())
		.then((data) => {
			setData(data.message.table)
			setResults(data.message.results)
		})*/
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
