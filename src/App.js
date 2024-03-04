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
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import logo from "./900dfdfe3610cf5e77403d64ae15264c.png";
import "./App.css";
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
const gmuData = { 
	"units": [
{"unit":1, "bulls":0, "cows":12, "calves":0, "totalHarvest":12, "totalHunters":17, "percSuccess":70, "totalDays":43},
{"unit":2, "bulls":0, "cows":14, "calves":2, "totalHarvest":16, "totalHunters":16, "percSuccess":100, "totalDays":41},
{"unit":201, "bulls":0, "cows":8, "calves":0, "totalHarvest":8, "totalHunters":32, "percSuccess":26, "totalDays":109},
{"unit":3, "bulls":22, "cows":121, "calves":29, "totalHarvest":173, "totalHunters":801, "percSuccess":22, "totalDays":2843},
{"unit":301, "bulls":4, "cows":31, "calves":0, "totalHarvest":36, "totalHunters":376, "percSuccess":9, "totalDays":986},
{"unit":4, "bulls":37, "cows":84, "calves":8, "totalHarvest":130, "totalHunters":388, "percSuccess":33, "totalDays":1362},
{"unit":441, "bulls":4, "cows":49, "calves":11, "totalHarvest":65, "totalHunters":119, "percSuccess":54, "totalDays":379},
{"unit":5, "bulls":0, "cows":23, "calves":0, "totalHarvest":23, "totalHunters":53, "percSuccess":44, "totalDays":121},
{"unit":6, "bulls":2, "cows":31, "calves":0, "totalHarvest":33, "totalHunters":157, "percSuccess":21, "totalDays":563},
{"unit":7, "bulls":0, "cows":5, "calves":0, "totalHarvest":5, "totalHunters":69, "percSuccess":7, "totalDays":238},
{"unit":8, "bulls":15, "cows":0, "calves":0, "totalHarvest":15, "totalHunters":79, "percSuccess":19, "totalDays":281},
{"unit":9, "bulls":5, "cows":0, "calves":0, "totalHarvest":5, "totalHunters":12, "percSuccess":45, "totalDays":38},
{"unit":10, "bulls":0, "cows":19, "calves":0, "totalHarvest":19, "totalHunters":69, "percSuccess":28, "totalDays":252},
{"unit":11, "bulls":37, "cows":118, "calves":11, "totalHarvest":166, "totalHunters":735, "percSuccess":23, "totalDays":2524},
{"unit":211, "bulls":51, "cows":74, "calves":22, "totalHarvest":147, "totalHunters":633, "percSuccess":23, "totalDays":1965},
{"unit":12, "bulls":21, "cows":45, "calves":0, "totalHarvest":66, "totalHunters":312, "percSuccess":21, "totalDays":978},
{"unit":13, "bulls":70, "cows":29, "calves":7, "totalHarvest":107, "totalHunters":237, "percSuccess":45, "totalDays":820},
{"unit":131, "bulls":2, "cows":4, "calves":0, "totalHarvest":6, "totalHunters":48, "percSuccess":12, "totalDays":177},
{"unit":231, "bulls":0, "cows":3, "calves":1, "totalHarvest":4, "totalHunters":44, "percSuccess":9, "totalDays":150},
{"unit":14, "bulls":8, "cows":6, "calves":0, "totalHarvest":13, "totalHunters":56, "percSuccess":23, "totalDays":180},
{"unit":214, "bulls":2, "cows":9, "calves":0, "totalHarvest":10, "totalHunters":25, "percSuccess":40, "totalDays":75},
{"unit":15, "bulls":21, "cows":14, "calves":0, "totalHarvest":35, "totalHunters":180, "percSuccess":19, "totalDays":657},
{"unit":16, "bulls":9, "cows":6, "calves":0, "totalHarvest":15, "totalHunters":71, "percSuccess":22, "totalDays":245},
{"unit":161, "bulls":13, "cows":17, "calves":3, "totalHarvest":33, "totalHunters":181, "percSuccess":19, "totalDays":718},
{"unit":17, "bulls":8, "cows":20, "calves":3, "totalHarvest":30, "totalHunters":124, "percSuccess":24, "totalDays":434},
{"unit":171, "bulls":8, "cows":26, "calves":0, "totalHarvest":34, "totalHunters":118, "percSuccess":29, "totalDays":363},
{"unit":18, "bulls":20, "cows":47, "calves":0, "totalHarvest":66, "totalHunters":503, "percSuccess":13, "totalDays":1600},
{"unit":181, "bulls":0, "cows":57, "calves":3, "totalHarvest":60, "totalHunters":237, "percSuccess":25, "totalDays":686},
{"unit":19, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":65, "percSuccess":0, "totalDays":208},
{"unit":191, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":91, "percSuccess":0, "totalDays":308},
{"unit":20, "bulls":13, "cows":4, "calves":0, "totalHarvest":17, "totalHunters":41, "percSuccess":41, "totalDays":143},
{"unit":21, "bulls":4, "cows":23, "calves":4, "totalHarvest":32, "totalHunters":168, "percSuccess":19, "totalDays":526},
{"unit":22, "bulls":21, "cows":22, "calves":2, "totalHarvest":45, "totalHunters":224, "percSuccess":20, "totalDays":729},
{"unit":23, "bulls":30, "cows":22, "calves":0, "totalHarvest":52, "totalHunters":333, "percSuccess":16, "totalDays":1137},
{"unit":24, "bulls":5, "cows":11, "calves":0, "totalHarvest":16, "totalHunters":119, "percSuccess":14, "totalDays":386},
{"unit":25, "bulls":0, "cows":1, "calves":0, "totalHarvest":1, "totalHunters":34, "percSuccess":3, "totalDays":141},
{"unit":26, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":38, "percSuccess":7, "totalDays":163},
{"unit":27, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":59, "percSuccess":5, "totalDays":198},
{"unit":28, "bulls":15, "cows":7, "calves":6, "totalHarvest":29, "totalHunters":401, "percSuccess":7, "totalDays":1286},
{"unit":29, "bulls":3, "cows":2, "calves":0, "totalHarvest":5, "totalHunters":10, "percSuccess":50, "totalDays":23},
{"unit":30, "bulls":11, "cows":4, "calves":0, "totalHarvest":15, "totalHunters":161, "percSuccess":9, "totalDays":546},
{"unit":31, "bulls":34, "cows":12, "calves":0, "totalHarvest":46, "totalHunters":147, "percSuccess":31, "totalDays":445},
{"unit":32, "bulls":0, "cows":7, "calves":3, "totalHarvest":9, "totalHunters":44, "percSuccess":21, "totalDays":148},
{"unit":33, "bulls":7, "cows":17, "calves":0, "totalHarvest":24, "totalHunters":202, "percSuccess":12, "totalDays":721},
{"unit":34, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":30, "percSuccess":9, "totalDays":123},
{"unit":35, "bulls":0, "cows":9, "calves":0, "totalHarvest":9, "totalHunters":33, "percSuccess":26, "totalDays":127},
{"unit":36, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":23, "percSuccess":15, "totalDays":76},
{"unit":361, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":16, "percSuccess":0, "totalDays":56},
{"unit":37, "bulls":2, "cows":26, "calves":0, "totalHarvest":29, "totalHunters":392, "percSuccess":7, "totalDays":1212},
{"unit":371, "bulls":0, "cows":7, "calves":0, "totalHarvest":7, "totalHunters":80, "percSuccess":9, "totalDays":230},
{"unit":38, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":9, "percSuccess":22, "totalDays":37},
{"unit":39, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":15, "percSuccess":14, "totalDays":38},
{"unit":391, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":3, "percSuccess":0, "totalDays":15},
{"unit":40, "bulls":4, "cows":10, "calves":0, "totalHarvest":13, "totalHunters":45, "percSuccess":30, "totalDays":148},
{"unit":41, "bulls":14, "cows":9, "calves":0, "totalHarvest":24, "totalHunters":94, "percSuccess":25, "totalDays":323},
{"unit":411, "bulls":6, "cows":3, "calves":0, "totalHarvest":8, "totalHunters":37, "percSuccess":23, "totalDays":91},
{"unit":42, "bulls":23, "cows":23, "calves":0, "totalHarvest":47, "totalHunters":217, "percSuccess":22, "totalDays":658},
{"unit":421, "bulls":2, "cows":9, "calves":0, "totalHarvest":11, "totalHunters":95, "percSuccess":12, "totalDays":308},
{"unit":43, "bulls":9, "cows":26, "calves":6, "totalHarvest":41, "totalHunters":143, "percSuccess":29, "totalDays":553},
{"unit":44, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":17, "percSuccess":9, "totalDays":47},
{"unit":444, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":37, "percSuccess":9, "totalDays":144},
{"unit":45, "bulls":8, "cows":0, "calves":0, "totalHarvest":8, "totalHunters":30, "percSuccess":27, "totalDays":104},
{"unit":46, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":6, "percSuccess":0, "totalDays":19},
{"unit":461, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":7, "percSuccess":0, "totalDays":21},
{"unit":47, "bulls":7, "cows":0, "calves":0, "totalHarvest":7, "totalHunters":38, "percSuccess":19, "totalDays":118},
{"unit":471, "bulls":1, "cows":0, "calves":0, "totalHarvest":1, "totalHunters":7, "percSuccess":15, "totalDays":26},
{"unit":48, "bulls":0, "cows":6, "calves":0, "totalHarvest":6, "totalHunters":28, "percSuccess":23, "totalDays":94},
{"unit":481, "bulls":5, "cows":0, "calves":0, "totalHarvest":5, "totalHunters":18, "percSuccess":25, "totalDays":65},
{"unit":49, "bulls":3, "cows":35, "calves":6, "totalHarvest":44, "totalHunters":135, "percSuccess":32, "totalDays":501},
{"unit":50, "bulls":4, "cows":11, "calves":9, "totalHarvest":24, "totalHunters":75, "percSuccess":32, "totalDays":258},
{"unit":500, "bulls":6, "cows":0, "calves":0, "totalHarvest":6, "totalHunters":16, "percSuccess":37, "totalDays":69},
{"unit":501, "bulls":5, "cows":0, "calves":0, "totalHarvest":5, "totalHunters":31, "percSuccess":17, "totalDays":114},
{"unit":51, "bulls":6, "cows":0, "calves":0, "totalHarvest":6, "totalHunters":19, "percSuccess":30, "totalDays":51},
{"unit":511, "bulls":8, "cows":0, "calves":0, "totalHarvest":8, "totalHunters":93, "percSuccess":9, "totalDays":304},
{"unit":52, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":48, "percSuccess":0, "totalDays":167},
{"unit":521, "bulls":6, "cows":5, "calves":3, "totalHarvest":13, "totalHunters":57, "percSuccess":23, "totalDays":177},
{"unit":53, "bulls":2, "cows":17, "calves":0, "totalHarvest":19, "totalHunters":74, "percSuccess":26, "totalDays":259},
{"unit":54, "bulls":32, "cows":14, "calves":0, "totalHarvest":46, "totalHunters":134, "percSuccess":35, "totalDays":520},
{"unit":55, "bulls":11, "cows":0, "calves":0, "totalHarvest":11, "totalHunters":44, "percSuccess":24, "totalDays":177},
{"unit":551, "bulls":6, "cows":4, "calves":1, "totalHarvest":11, "totalHunters":19, "percSuccess":57, "totalDays":69},
{"unit":56, "bulls":4, "cows":6, "calves":0, "totalHarvest":10, "totalHunters":37, "percSuccess":26, "totalDays":139},
{"unit":561, "bulls":0, "cows":3, "calves":0, "totalHarvest":3, "totalHunters":30, "percSuccess":12, "totalDays":127},
{"unit":57, "bulls":19, "cows":8, "calves":0, "totalHarvest":26, "totalHunters":85, "percSuccess":31, "totalDays":264},
{"unit":58, "bulls":26, "cows":22, "calves":6, "totalHarvest":54, "totalHunters":87, "percSuccess":61, "totalDays":260},
{"unit":581, "bulls":1, "cows":2, "calves":0, "totalHarvest":3, "totalHunters":109, "percSuccess":3, "totalDays":341},
{"unit":59, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":61, "percSuccess":0, "totalDays":153},
{"unit":60, "bulls":10, "cows":10, "calves":0, "totalHarvest":19, "totalHunters":47, "percSuccess":41, "totalDays":168},
{"unit":61, "bulls":17, "cows":79, "calves":7, "totalHarvest":103, "totalHunters":221, "percSuccess":47, "totalDays":799},
{"unit":62, "bulls":11, "cows":25, "calves":7, "totalHarvest":43, "totalHunters":201, "percSuccess":21, "totalDays":746},
{"unit":63, "bulls":8, "cows":8, "calves":0, "totalHarvest":16, "totalHunters":51, "percSuccess":31, "totalDays":184},
{"unit":64, "bulls":2, "cows":17, "calves":3, "totalHarvest":22, "totalHunters":75, "percSuccess":30, "totalDays":214},
{"unit":65, "bulls":14, "cows":58, "calves":10, "totalHarvest":81, "totalHunters":250, "percSuccess":33, "totalDays":795},
{"unit":66, "bulls":10, "cows":38, "calves":4, "totalHarvest":52, "totalHunters":116, "percSuccess":45, "totalDays":409},
{"unit":67, "bulls":4, "cows":23, "calves":3, "totalHarvest":31, "totalHunters":117, "percSuccess":26, "totalDays":460},
{"unit":68, "bulls":22, "cows":0, "calves":0, "totalHarvest":22, "totalHunters":106, "percSuccess":20, "totalDays":354},
{"unit":681, "bulls":5, "cows":2, "calves":2, "totalHarvest":8, "totalHunters":63, "percSuccess":13, "totalDays":221},
{"unit":69, "bulls":6, "cows":0, "calves":0, "totalHarvest":6, "totalHunters":27, "percSuccess":21, "totalDays":60},
{"unit":691, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":2, "percSuccess":0, "totalDays":2},
{"unit":70, "bulls":7, "cows":26, "calves":0, "totalHarvest":33, "totalHunters":110, "percSuccess":30, "totalDays":409},
{"unit":71, "bulls":4, "cows":0, "calves":0, "totalHarvest":4, "totalHunters":35, "percSuccess":10, "totalDays":135},
{"unit":711, "bulls":12, "cows":13, "calves":0, "totalHarvest":25, "totalHunters":90, "percSuccess":28, "totalDays":324},
{"unit":72, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":7, "percSuccess":0, "totalDays":29},
{"unit":73, "bulls":9, "cows":0, "calves":0, "totalHarvest":9, "totalHunters":12, "percSuccess":71, "totalDays":26},
{"unit":74, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":43, "percSuccess":5, "totalDays":140},
{"unit":741, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":18, "percSuccess":0, "totalDays":67},
{"unit":75, "bulls":7, "cows":3, "calves":0, "totalHarvest":11, "totalHunters":76, "percSuccess":14, "totalDays":303},
{"unit":751, "bulls":2, "cows":3, "calves":0, "totalHarvest":5, "totalHunters":38, "percSuccess":12, "totalDays":193},
{"unit":76, "bulls":0, "cows":43, "calves":8, "totalHarvest":51, "totalHunters":177, "percSuccess":29, "totalDays":586},
{"unit":77, "bulls":14, "cows":5, "calves":0, "totalHarvest":18, "totalHunters":56, "percSuccess":33, "totalDays":182},
{"unit":771, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":28, "percSuccess":0, "totalDays":72},
{"unit":78, "bulls":9, "cows":5, "calves":0, "totalHarvest":14, "totalHunters":57, "percSuccess":25, "totalDays":251},
{"unit":79, "bulls":0, "cows":23, "calves":0, "totalHarvest":23, "totalHunters":107, "percSuccess":22, "totalDays":408},
{"unit":80, "bulls":2, "cows":16, "calves":0, "totalHarvest":18, "totalHunters":61, "percSuccess":29, "totalDays":205},
{"unit":81, "bulls":6, "cows":8, "calves":0, "totalHarvest":14, "totalHunters":73, "percSuccess":20, "totalDays":252},
{"unit":82, "bulls":25, "cows":15, "calves":0, "totalHarvest":40, "totalHunters":140, "percSuccess":29, "totalDays":465},
{"unit":83, "bulls":5, "cows":26, "calves":9, "totalHarvest":40, "totalHunters":114, "percSuccess":35, "totalDays":460},
{"unit":84, "bulls":6, "cows":4, "calves":0, "totalHarvest":10, "totalHunters":36, "percSuccess":28, "totalDays":140},
{"unit":85, "bulls":11, "cows":16, "calves":4, "totalHarvest":31, "totalHunters":137, "percSuccess":22, "totalDays":501},
{"unit":851, "bulls":6, "cows":4, "calves":0, "totalHarvest":10, "totalHunters":13, "percSuccess":76, "totalDays":44},
{"unit":86, "bulls":6, "cows":2, "calves":0, "totalHarvest":8, "totalHunters":57, "percSuccess":15, "totalDays":220},
{"unit":861, "bulls":6, "cows":0, "calves":2, "totalHarvest":8, "totalHunters":21, "percSuccess":39, "totalDays":68},
{"unit":104, "bulls":6, "cows":0, "calves":0, "totalHarvest":6, "totalHunters":6, "percSuccess":100, "totalDays":19},
{"unit":133, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":10, "percSuccess":34, "totalDays":35},
{"unit":134, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":7, "percSuccess":0, "totalDays":21},
{"unit":140, "bulls":4, "cows":3, "calves":0, "totalHarvest":7, "totalHunters":25, "percSuccess":27, "totalDays":85},
{"unit":141, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":5, "percSuccess":0, "totalDays":12},
{"unit":142, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":10, "percSuccess":0, "totalDays":28}
    
	]
  }
   
   
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
	const [data, setData] = React.useState(null);
	//#number of records will get updated with response as well
	const [results, setResults] = React.useState("0");
	//Variables that will be paramaters for get request. Value is set by input fields;
	const [success, setSuccess] = React.useState(0);
	const [hunters, setHunters] = React.useState(2000);
	const [harvest, setHarvest] = React.useState(0);
	const [season, setSeason] = React.useState("2022-all-rifle");
	
	const handleSubmit = (event) => {
		//console.log(event);
		event.preventDefault();
		GetData(success,hunters,harvest);
		async function GetData(success,hunters,harvest){
			console.log("data");
			let successInt = Number(success);
			let huntersInt = Number(hunters);
			let harvestInt = Number(harvest);
			console.log(successInt);
			let proccessData = [];
			let q = query(collection(db, season), where("percSuccess", ">=", successInt), orderBy("percSuccess", "desc"));
			const querySnapshot = await getDocs(q);
			console.log(querySnapshot);
			querySnapshot.forEach((doc) => {
			  // doc.data() is never undefined for query doc snapshots
			  let dataCall = doc.data();
			  console.log("dataCall",dataCall);
			  console.log(dataCall.totalHarvest,harvestInt);
			
			  if((dataCall.totalHarvest >= harvestInt)&&(dataCall.totalHunters <= huntersInt)){
				proccessData.push(doc.data());
			  }
			});
			buildTable(proccessData);
		} 
		function buildTable(data){
			console.log(data);
			let resultsTable = "<table class='data-table'><thead><tr><th>unit</th><th>Bulls</th><th>Cows</th><th>Calves</th><th>Total Harvest</th><th>Hunters</th><th>Success</th><th>Days</th><th>OTC Status</th><tbody>";
			let datalength = data.length;
			let returnLength = 0;
			console.log(datalength);
			for (let i = 0; i < datalength; i++) {
				console.log(i);
				returnLength++
				let unit = data[i]["unit"];
				let bulls = data[i]["bulls"];
				let cows = data[i]["cows"];
				let calves = data[i]["calves"];
				let totalHarvest = data[i]["totalHarvest"];
				let totalHunters = data[i]["totalHunters"];
				let PercSuccess = data[i]["percSuccess"];
				let totalDays = data[i]["totalDays"];
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
				resultsTable+= "<tr><td>"+unit+"</td><td>"+bulls+"</td><td>"+cows+"</td><td>"+calves+"</td><td>"+totalHarvest+"</td><td>"+totalHunters+"</td><td>"+PercSuccess+"%</td><td>"+totalDays+"</td><td>"+otcStatus+"</td></tr>";
			}
			resultsTable+="</tbody></table>";
			setData(resultsTable);
			setResults(returnLength);
		}
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
			<p className="records">Results Found: <span dangerouslySetInnerHTML={{ __html: results }}></span></p>
			<div className="results" dangerouslySetInnerHTML={{ __html: data }}></div>
 


      	</div>
    </div>
  );
}

export default App;
