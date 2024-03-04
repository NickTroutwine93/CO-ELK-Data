// client/src/App.js

import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import logo from "./900dfdfe3610cf5e77403d64ae15264c.png";
import "./App.css";
import ResultsDataTable from "./client/components/data-table.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, query, where, orderBy  } from "firebase/firestore";

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
/*try {
	console.log("tru");
	console.log(gmuData.units.length)
	for(var i=0; i<gmuData.units.length; i++){
		var unit = gmuData.units[i];
		console.log(i);
		console.log("unit",unit);
			const docRef = await addDoc(collection(db, "2022-fourth-rifle"), {
				unit: unit.unit,
				bulls: unit.bulls,
				cows: unit.cows,
				calves: unit.calves,
				totalHarvest: unit.totalHarvest,
				totalHunters: unit.totalHunters,
				percSuccess: unit.percSuccess,
				totalDays: unit.totalDays
			});
			console.log("Document written with ID: ", docRef.id);
		
	}
} catch (e) {
	console.error("Error adding document: ", e);
  } */
//let season = "all-seasons"
//let querySnapshot = await getDocs(collection(db, season));
const otcGmu ={
    gmuPublicOnly: [6, 15, 16, 17, 18, 21, 22, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 47, 52, 53, 54, 55, 59, 60, 62, 63, 64, 65, 68, 70, 71, 72, 73, 74, 75, 77, 78, 80, 81, 82],
    gmuBoth: [85, 86, 133, 134, 140, 141, 142, 161, 171, 181, 361, 371, 411, 421, 431, 444, 471, 511, 521, 551, 581, 591, 681, 691, 711, 741, 751, 771, 851],
    gmuPrivateOnly: [3, 4, 5, 11, 12, 13, 14, 23, 24, 131, 211, 214, 231, 301, 441]

}
const successMarks = [
	{
		value: 0,
		label: '0',
	},
	{
		value: 100,
		label: '100',
	}
];
const hunterMarks = [
	{
		value: 0,
		label: '0',
	},
	{
		value: 2000,
		label: '2000',
	}
];
const harvestMarks = [
	{
		value: 0,
		label: '0',
	},
	{
		value: 500,
		label: '500',
	}
];
  

function App() {
	//data that will be injected as table from response
	//#number of records will get updated with response as well
	const [results, setResults] = React.useState("0");
	//Variables that will be paramaters for get request. Value is set by input fields;
	const [data, setData] = React.useState(null);
	const [success, setSuccess] = React.useState(0);
	const [hunters, setHunters] = React.useState(2000);
	const [harvest, setHarvest] = React.useState(0);
	const [season, setSeason] = React.useState("2022-all-rifle");
	
	const handleSubmit = (event) => {
		//console.log(event);
		event.preventDefault();
		GetData(success,hunters,harvest);
		async function GetData(success,hunters,harvest){
			//console.log("data");
			let successInt = Number(success);
			let huntersInt = Number(hunters);
			let harvestInt = Number(harvest);
			//console.log(successInt);
			let proccessData = [];
			let q = query(collection(db, season), where("percSuccess", ">=", successInt), orderBy("percSuccess", "desc"));
			const querySnapshot = await getDocs(q);
			//console.log(querySnapshot);
			querySnapshot.forEach((doc) => {
			  // doc.data() is never undefined for query doc snapshots
			  let dataCall = doc.data();
			  //console.log("dataCall",dataCall);
			  //console.log(dataCall.totalHarvest,harvestInt);
			
			  if((dataCall.totalHarvest >= harvestInt)&&(dataCall.totalHunters <= huntersInt)){
				proccessData.push(doc.data());
			  }
			});
			buildTable(proccessData);
			//setResults(returnLength);
		} 
		function buildTable(unitData){
			let datalength = unitData.length;
			//console.log(datalength);
			for (let i = 0; i < datalength; i++) {
				let unit = unitData[i]["unit"];
				let otcStatus = "Draw Only";
				if((season.includes("second"))||(season.includes("third"))){
					if(otcGmu.gmuBoth.includes(unit)){
						otcStatus = "Both"
					}
					if(otcGmu.gmuPublicOnly.includes(unit)){
						otcStatus = "Public"
					}
					if(otcGmu.gmuPrivateOnly.includes(unit)){
						otcStatus = "Private"
					}
				}
				unitData[i]["otc"] = otcStatus;
				unitData[i]["id"] = i;
			}
			console.log(unitData);
			const columns = [
				{ field: 'unit', headerName: 'Unit', width: 70 },
				{ field: 'bulls', headerName: 'Bulls', width: 70  },
				{ field: 'cows', headerName: 'Cows', width: 70 },
				{ field: 'calves', headerName: 'Calves', width: 70 },
				{ field: 'totalHarvest', headerName: 'Harvest', width: 70  },
				{ field: 'totalHunters', headerName: 'Hunters', width: 70 },
				{ field: 'percSuccess', headerName: 'Success', width: 70  },
				{ field: 'totalDays', headerName: 'Days', width: 70 },
				{ field: 'otc', headerName: 'OTC Status', width: 110  }
			];
			let dt = ResultsDataTable(unitData,columns)
			setData(dt);
		}
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
					<table className='data-table season-input-group'>
						<tr>
							<th>Season</th>
						</tr>
						<tr>
							<td id="season-dropdown"> 
								<Select
								  labelId="season-dropdown-label"
								  id="season-dropdown-select"
								  value={season}
								  label="Season"
								  onChange={(e) => setSeason(e.target.value)}
								>
								  <MenuItem value={"2022-all-rifle"}>2022 All Rifle</MenuItem>
								  <MenuItem value={"2022-first-rifle"}>2022 First Rifle</MenuItem>
								  <MenuItem value={"2022-second-rifle"}>2022 Second Rifle</MenuItem>
								  <MenuItem value={"2022-third-rifle"}>2022 Third Rifle</MenuItem>
								  <MenuItem value={"2022-fourth-rifle"}>2022 Fourth Rifle</MenuItem>
								</Select>
							</td>
						</tr>
					</table>
					<table className='data-table data-points'> 
						<tr className="sliders">
							<td>
								<Box>
									<Typography className="labels" gutterBottom>
										Min Harvest
									</Typography>
								  <Slider
								  	className="slider"
									aria-label="Always visible"
									step={10}
									marks={harvestMarks}
									valueLabelDisplay="on"
									value={harvest}
									max={500}
									onChange={(e) => setHarvest(e.target.value)}
								  />
								</Box>
							</td>
							<td> 
								<Box>
									<Typography className="labels" gutterBottom>
										Max Hunters
									</Typography>
								  <Slider
								  	className="slider"
									aria-label="Always visible"
									step={10}
									marks={hunterMarks}
									valueLabelDisplay="on"
									value={hunters}
									max={2000}
									onChange={(e) => setHunters(e.target.value)}
								  />
								</Box>
							</td>
							<td>
								<Box>
									<Typography className="labels" gutterBottom>
										Min Success %
									</Typography>
								  <Slider
								  	className="slider"
									aria-label="Always visible"
									step={1}
									marks={successMarks}
									valueLabelDisplay="on"
									value={success}
									onChange={(e) => setSuccess(e.target.value)}
								  />
								</Box>
							</td>
						</tr>
					</table> 
					<div className="center">
						<input className="submit" type="submit" />
					</div>
				</form>
			</div>
			<div className="records">{data}</div>
 


      	</div>
    </div>
  );
}

export default App;
