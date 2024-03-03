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

		{"unit":1, "bulls":5, "cows":25, "calves":3, "totalHarvest":33, "totalHunters":68, "percSuccess":49, "totalDays":277},
		{"unit":2, "bulls":29, "cows":106, "calves":5, "totalHarvest":140, "totalHunters":166, "percSuccess":84, "totalDays":537},
		{"unit":201, "bulls":30, "cows":35, "calves":3, "totalHarvest":68, "totalHunters":157, "percSuccess":43, "totalDays":593},
		{"unit":3, "bulls":378, "cows":575, "calves":44, "totalHarvest":997, "totalHunters":3611, "percSuccess":28, "totalDays":13471},
		{"unit":301, "bulls":152, "cows":203, "calves":26, "totalHarvest":382, "totalHunters":1652, "percSuccess":23, "totalDays":5876},
		{"unit":4, "bulls":531, "cows":611, "calves":87, "totalHarvest":1229, "totalHunters":4118, "percSuccess":30, "totalDays":16830},
		{"unit":441, "bulls":212, "cows":250, "calves":41, "totalHarvest":503, "totalHunters":1355, "percSuccess":37, "totalDays":5189},
		{"unit":5, "bulls":278, "cows":310, "calves":24, "totalHarvest":612, "totalHunters":1792, "percSuccess":34, "totalDays":6323},
		{"unit":6, "bulls":67, "cows":114, "calves":20, "totalHarvest":200, "totalHunters":2234, "percSuccess":9, "totalDays":8959},
		{"unit":7, "bulls":42, "cows":48, "calves":1, "totalHarvest":92, "totalHunters":1248, "percSuccess":7, "totalDays":5213},
		{"unit":8, "bulls":65, "cows":79, "calves":1, "totalHarvest":146, "totalHunters":1247, "percSuccess":12, "totalDays":6058},
		{"unit":9, "bulls":37, "cows":39, "calves":0, "totalHarvest":77, "totalHunters":154, "percSuccess":50, "totalDays":527},
		{"unit":10, "bulls":34, "cows":262, "calves":13, "totalHarvest":309, "totalHunters":547, "percSuccess":56, "totalDays":2106},
		{"unit":11, "bulls":655, "cows":713, "calves":80, "totalHarvest":1448, "totalHunters":4906, "percSuccess":30, "totalDays":19631},
		{"unit":211, "bulls":486, "cows":407, "calves":39, "totalHarvest":933, "totalHunters":2743, "percSuccess":34, "totalDays":10657},
		{"unit":12, "bulls":695, "cows":606, "calves":27, "totalHarvest":1327, "totalHunters":5401, "percSuccess":25, "totalDays":22156},
		{"unit":13, "bulls":360, "cows":274, "calves":60, "totalHarvest":694, "totalHunters":1590, "percSuccess":44, "totalDays":6370},
		{"unit":131, "bulls":91, "cows":87, "calves":10, "totalHarvest":188, "totalHunters":735, "percSuccess":26, "totalDays":2818},
		{"unit":231, "bulls":130, "cows":109, "calves":6, "totalHarvest":245, "totalHunters":1113, "percSuccess":22, "totalDays":4562},
		{"unit":14, "bulls":93, "cows":44, "calves":7, "totalHarvest":144, "totalHunters":903, "percSuccess":16, "totalDays":3780},
		{"unit":214, "bulls":215, "cows":216, "calves":17, "totalHarvest":447, "totalHunters":1033, "percSuccess":43, "totalDays":3235},
		{"unit":15, "bulls":145, "cows":131, "calves":10, "totalHarvest":286, "totalHunters":2671, "percSuccess":11, "totalDays":12827},
		{"unit":16, "bulls":63, "cows":92, "calves":5, "totalHarvest":161, "totalHunters":1210, "percSuccess":13, "totalDays":5609},
		{"unit":161, "bulls":80, "cows":115, "calves":9, "totalHarvest":203, "totalHunters":1903, "percSuccess":11, "totalDays":8321},
		{"unit":17, "bulls":68, "cows":98, "calves":12, "totalHarvest":178, "totalHunters":1295, "percSuccess":14, "totalDays":4830},
		{"unit":171, "bulls":63, "cows":88, "calves":0, "totalHarvest":152, "totalHunters":1325, "percSuccess":11, "totalDays":5450},
		{"unit":18, "bulls":220, "cows":253, "calves":10, "totalHarvest":483, "totalHunters":3760, "percSuccess":13, "totalDays":15232},
		{"unit":181, "bulls":38, "cows":135, "calves":7, "totalHarvest":180, "totalHunters":1212, "percSuccess":15, "totalDays":4750},
		{"unit":19, "bulls":36, "cows":14, "calves":0, "totalHarvest":49, "totalHunters":760, "percSuccess":7, "totalDays":4606},
		{"unit":191, "bulls":36, "cows":3, "calves":0, "totalHarvest":39, "totalHunters":535, "percSuccess":7, "totalDays":2662},
		{"unit":20, "bulls":97, "cows":174, "calves":19, "totalHarvest":289, "totalHunters":746, "percSuccess":39, "totalDays":6263},
		{"unit":21, "bulls":211, "cows":108, "calves":11, "totalHarvest":330, "totalHunters":1414, "percSuccess":23, "totalDays":5689},
		{"unit":22, "bulls":302, "cows":285, "calves":13, "totalHarvest":600, "totalHunters":2451, "percSuccess":24, "totalDays":11303},
		{"unit":23, "bulls":290, "cows":305, "calves":18, "totalHarvest":614, "totalHunters":3302, "percSuccess":19, "totalDays":13596},
		{"unit":24, "bulls":218, "cows":175, "calves":31, "totalHarvest":424, "totalHunters":2910, "percSuccess":15, "totalDays":11720},
		{"unit":25, "bulls":142, "cows":101, "calves":2, "totalHarvest":245, "totalHunters":1110, "percSuccess":22, "totalDays":4805},
		{"unit":26, "bulls":89, "cows":81, "calves":0, "totalHarvest":170, "totalHunters":794, "percSuccess":21, "totalDays":3596},
		{"unit":27, "bulls":42, "cows":64, "calves":13, "totalHarvest":120, "totalHunters":979, "percSuccess":12, "totalDays":4130},
		{"unit":28, "bulls":143, "cows":108, "calves":14, "totalHarvest":265, "totalHunters":2529, "percSuccess":10, "totalDays":10956},
		{"unit":29, "bulls":8, "cows":56, "calves":8, "totalHarvest":72, "totalHunters":154, "percSuccess":47, "totalDays":1259},
		{"unit":30, "bulls":88, "cows":123, "calves":0, "totalHarvest":211, "totalHunters":922, "percSuccess":23, "totalDays":3795},
		{"unit":31, "bulls":133, "cows":241, "calves":21, "totalHarvest":394, "totalHunters":1372, "percSuccess":29, "totalDays":6475},
		{"unit":32, "bulls":51, "cows":50, "calves":5, "totalHarvest":107, "totalHunters":417, "percSuccess":26, "totalDays":1497},
		{"unit":33, "bulls":110, "cows":178, "calves":20, "totalHarvest":307, "totalHunters":2181, "percSuccess":14, "totalDays":9484},
		{"unit":34, "bulls":57, "cows":4, "calves":0, "totalHarvest":61, "totalHunters":526, "percSuccess":12, "totalDays":2245},
		{"unit":35, "bulls":60, "cows":47, "calves":5, "totalHarvest":113, "totalHunters":615, "percSuccess":18, "totalDays":2219},
		{"unit":36, "bulls":65, "cows":32, "calves":0, "totalHarvest":97, "totalHunters":667, "percSuccess":15, "totalDays":2890},
		{"unit":361, "bulls":31, "cows":20, "calves":0, "totalHarvest":51, "totalHunters":271, "percSuccess":19, "totalDays":1061},
		{"unit":37, "bulls":37, "cows":156, "calves":22, "totalHarvest":214, "totalHunters":1410, "percSuccess":15, "totalDays":5818},
		{"unit":371, "bulls":26, "cows":35, "calves":3, "totalHarvest":64, "totalHunters":685, "percSuccess":9, "totalDays":2785},
		{"unit":38, "bulls":45, "cows":45, "calves":0, "totalHarvest":89, "totalHunters":510, "percSuccess":18, "totalDays":3018},
		{"unit":39, "bulls":61, "cows":38, "calves":3, "totalHarvest":101, "totalHunters":265, "percSuccess":38, "totalDays":1867},
		{"unit":391, "bulls":13, "cows":44, "calves":0, "totalHarvest":58, "totalHunters":102, "percSuccess":57, "totalDays":725},
		{"unit":40, "bulls":91, "cows":97, "calves":1, "totalHarvest":189, "totalHunters":363, "percSuccess":52, "totalDays":1654},
		{"unit":41, "bulls":92, "cows":123, "calves":15, "totalHarvest":230, "totalHunters":1160, "percSuccess":20, "totalDays":5495},
		{"unit":411, "bulls":33, "cows":56, "calves":6, "totalHarvest":95, "totalHunters":529, "percSuccess":18, "totalDays":2895},
		{"unit":42, "bulls":252, "cows":286, "calves":17, "totalHarvest":555, "totalHunters":2151, "percSuccess":26, "totalDays":9972},
		{"unit":421, "bulls":181, "cows":179, "calves":13, "totalHarvest":373, "totalHunters":1921, "percSuccess":19, "totalDays":9775},
		{"unit":43, "bulls":200, "cows":240, "calves":27, "totalHarvest":467, "totalHunters":1964, "percSuccess":24, "totalDays":8521},
		{"unit":44, "bulls":110, "cows":4, "calves":0, "totalHarvest":114, "totalHunters":540, "percSuccess":21, "totalDays":2235},
		{"unit":444, "bulls":104, "cows":0, "calves":0, "totalHarvest":104, "totalHunters":574, "percSuccess":18, "totalDays":2469},
		{"unit":45, "bulls":50, "cows":1, "calves":0, "totalHarvest":51, "totalHunters":392, "percSuccess":13, "totalDays":1598},
		{"unit":46, "bulls":11, "cows":10, "calves":2, "totalHarvest":22, "totalHunters":164, "percSuccess":14, "totalDays":864},
		{"unit":461, "bulls":1, "cows":9, "calves":0, "totalHarvest":10, "totalHunters":57, "percSuccess":18, "totalDays":247},
		{"unit":47, "bulls":64, "cows":0, "calves":0, "totalHarvest":64, "totalHunters":218, "percSuccess":30, "totalDays":943},
		{"unit":471, "bulls":8, "cows":17, "calves":6, "totalHarvest":31, "totalHunters":112, "percSuccess":28, "totalDays":367},
		{"unit":48, "bulls":40, "cows":33, "calves":5, "totalHarvest":78, "totalHunters":191, "percSuccess":41, "totalDays":732},
		{"unit":481, "bulls":59, "cows":43, "calves":8, "totalHarvest":110, "totalHunters":359, "percSuccess":31, "totalDays":1753},
		{"unit":49, "bulls":108, "cows":119, "calves":22, "totalHarvest":249, "totalHunters":589, "percSuccess":42, "totalDays":2353},
		{"unit":50, "bulls":59, "cows":65, "calves":12, "totalHarvest":137, "totalHunters":527, "percSuccess":26, "totalDays":2449},
		{"unit":500, "bulls":69, "cows":29, "calves":13, "totalHarvest":111, "totalHunters":450, "percSuccess":25, "totalDays":2155},
		{"unit":501, "bulls":31, "cows":27, "calves":2, "totalHarvest":61, "totalHunters":257, "percSuccess":24, "totalDays":1337},
		{"unit":51, "bulls":48, "cows":88, "calves":0, "totalHarvest":136, "totalHunters":363, "percSuccess":37, "totalDays":2212},
		{"unit":511, "bulls":47, "cows":30, "calves":0, "totalHarvest":77, "totalHunters":827, "percSuccess":9, "totalDays":3970},
		{"unit":512, "bulls":0, "cows":4, "calves":0, "totalHarvest":4, "totalHunters":4, "percSuccess":100, "totalDays":13},
		{"unit":52, "bulls":75, "cows":37, "calves":2, "totalHarvest":114, "totalHunters":940, "percSuccess":12, "totalDays":3912},
		{"unit":521, "bulls":175, "cows":46, "calves":12, "totalHarvest":232, "totalHunters":1150, "percSuccess":20, "totalDays":4924},
		{"unit":53, "bulls":100, "cows":75, "calves":2, "totalHarvest":178, "totalHunters":862, "percSuccess":21, "totalDays":3925},
		{"unit":54, "bulls":410, "cows":91, "calves":6, "totalHarvest":508, "totalHunters":2005, "percSuccess":25, "totalDays":8994},
		{"unit":55, "bulls":268, "cows":104, "calves":15, "totalHarvest":387, "totalHunters":2091, "percSuccess":19, "totalDays":9345},
		{"unit":551, "bulls":110, "cows":73, "calves":8, "totalHarvest":190, "totalHunters":1298, "percSuccess":15, "totalDays":5967},
		{"unit":56, "bulls":32, "cows":50, "calves":0, "totalHarvest":82, "totalHunters":266, "percSuccess":31, "totalDays":1317},
		{"unit":561, "bulls":23, "cows":21, "calves":0, "totalHarvest":44, "totalHunters":156, "percSuccess":28, "totalDays":757},
		{"unit":57, "bulls":68, "cows":56, "calves":3, "totalHarvest":127, "totalHunters":430, "percSuccess":30, "totalDays":2312},
		{"unit":58, "bulls":87, "cows":117, "calves":6, "totalHarvest":209, "totalHunters":581, "percSuccess":36, "totalDays":3558},
		{"unit":581, "bulls":66, "cows":59, "calves":14, "totalHarvest":139, "totalHunters":1212, "percSuccess":11, "totalDays":8679},
		{"unit":59, "bulls":26, "cows":7, "calves":0, "totalHarvest":32, "totalHunters":392, "percSuccess":8, "totalDays":1403},
		{"unit":591, "bulls":18, "cows":19, "calves":0, "totalHarvest":37, "totalHunters":135, "percSuccess":27, "totalDays":648},
		{"unit":60, "bulls":53, "cows":35, "calves":2, "totalHarvest":90, "totalHunters":290, "percSuccess":31, "totalDays":1379},
		{"unit":61, "bulls":227, "cows":305, "calves":24, "totalHarvest":555, "totalHunters":1002, "percSuccess":55, "totalDays":4056},
		{"unit":62, "bulls":305, "cows":136, "calves":10, "totalHarvest":452, "totalHunters":2741, "percSuccess":16, "totalDays":12450},
		{"unit":63, "bulls":98, "cows":102, "calves":9, "totalHarvest":209, "totalHunters":952, "percSuccess":22, "totalDays":4556},
		{"unit":64, "bulls":78, "cows":138, "calves":3, "totalHarvest":220, "totalHunters":876, "percSuccess":25, "totalDays":3500},
		{"unit":65, "bulls":241, "cows":231, "calves":57, "totalHarvest":528, "totalHunters":1924, "percSuccess":27, "totalDays":7619},
		{"unit":66, "bulls":251, "cows":143, "calves":12, "totalHarvest":406, "totalHunters":952, "percSuccess":43, "totalDays":4065},
		{"unit":67, "bulls":119, "cows":130, "calves":14, "totalHarvest":263, "totalHunters":885, "percSuccess":30, "totalDays":3882},
		{"unit":68, "bulls":176, "cows":18, "calves":0, "totalHarvest":194, "totalHunters":1444, "percSuccess":13, "totalDays":6729},
		{"unit":681, "bulls":87, "cows":3, "calves":2, "totalHarvest":91, "totalHunters":818, "percSuccess":11, "totalDays":3471},
		{"unit":682, "bulls":27, "cows":27, "calves":0, "totalHarvest":53, "totalHunters":72, "percSuccess":74, "totalDays":137},
		{"unit":69, "bulls":21, "cows":23, "calves":4, "totalHarvest":48, "totalHunters":222, "percSuccess":22, "totalDays":1023},
		{"unit":691, "bulls":3, "cows":8, "calves":0, "totalHarvest":11, "totalHunters":71, "percSuccess":16, "totalDays":278},
		{"unit":70, "bulls":603, "cows":198, "calves":15, "totalHarvest":816, "totalHunters":2328, "percSuccess":35, "totalDays":10722},
		{"unit":71, "bulls":276, "cows":21, "calves":0, "totalHarvest":297, "totalHunters":1602, "percSuccess":19, "totalDays":6350},
		{"unit":711, "bulls":225, "cows":36, "calves":2, "totalHarvest":263, "totalHunters":1462, "percSuccess":18, "totalDays":6587},
		{"unit":72, "bulls":35, "cows":0, "calves":0, "totalHarvest":35, "totalHunters":291, "percSuccess":12, "totalDays":1229},
		{"unit":73, "bulls":45, "cows":3, "calves":0, "totalHarvest":48, "totalHunters":406, "percSuccess":12, "totalDays":1715},
		{"unit":74, "bulls":161, "cows":37, "calves":1, "totalHarvest":199, "totalHunters":922, "percSuccess":22, "totalDays":3743},
		{"unit":741, "bulls":37, "cows":12, "calves":0, "totalHarvest":48, "totalHunters":225, "percSuccess":21, "totalDays":1175},
		{"unit":75, "bulls":177, "cows":27, "calves":0, "totalHarvest":205, "totalHunters":951, "percSuccess":22, "totalDays":4077},
		{"unit":751, "bulls":183, "cows":46, "calves":0, "totalHarvest":229, "totalHunters":783, "percSuccess":29, "totalDays":3458},
		{"unit":76, "bulls":158, "cows":167, "calves":11, "totalHarvest":336, "totalHunters":842, "percSuccess":40, "totalDays":3343},
		{"unit":77, "bulls":474, "cows":22, "calves":0, "totalHarvest":496, "totalHunters":2559, "percSuccess":19, "totalDays":11875},
		{"unit":771, "bulls":71, "cows":3, "calves":0, "totalHarvest":74, "totalHunters":451, "percSuccess":16, "totalDays":1810},
		{"unit":78, "bulls":352, "cows":31, "calves":1, "totalHarvest":384, "totalHunters":2005, "percSuccess":19, "totalDays":9337},
		{"unit":79, "bulls":66, "cows":47, "calves":2, "totalHarvest":115, "totalHunters":742, "percSuccess":15, "totalDays":3390},
		{"unit":791, "bulls":45, "cows":8, "calves":0, "totalHarvest":53, "totalHunters":88, "percSuccess":60, "totalDays":247},
		{"unit":80, "bulls":295, "cows":91, "calves":2, "totalHarvest":388, "totalHunters":2037, "percSuccess":19, "totalDays":9363},
		{"unit":81, "bulls":309, "cows":91, "calves":1, "totalHarvest":402, "totalHunters":2186, "percSuccess":18, "totalDays":9676},
		{"unit":82, "bulls":251, "cows":244, "calves":5, "totalHarvest":500, "totalHunters":1798, "percSuccess":28, "totalDays":6417},
		{"unit":83, "bulls":80, "cows":194, "calves":9, "totalHarvest":282, "totalHunters":714, "percSuccess":40, "totalDays":2848},
		{"unit":84, "bulls":89, "cows":97, "calves":0, "totalHarvest":186, "totalHunters":412, "percSuccess":45, "totalDays":2171},
		{"unit":85, "bulls":264, "cows":152, "calves":11, "totalHarvest":426, "totalHunters":1910, "percSuccess":22, "totalDays":9134},
		{"unit":851, "bulls":95, "cows":33, "calves":0, "totalHarvest":127, "totalHunters":392, "percSuccess":32, "totalDays":1385},
		{"unit":86, "bulls":83, "cows":96, "calves":4, "totalHarvest":183, "totalHunters":1116, "percSuccess":16, "totalDays":6982},
		{"unit":861, "bulls":46, "cows":50, "calves":6, "totalHarvest":102, "totalHunters":388, "percSuccess":26, "totalDays":1754},
		{"unit":87, "bulls":5, "cows":2, "calves":2, "totalHarvest":10, "totalHunters":85, "percSuccess":12, "totalDays":380},
		{"unit":88, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":2, "percSuccess":0, "totalDays":7},
		{"unit":89, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":2, "percSuccess":0, "totalDays":2},
		{"unit":90, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":2, "percSuccess":0, "totalDays":2},
		{"unit":91, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":5, "percSuccess":0, "totalDays":5},
		{"unit":93, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":5, "percSuccess":50, "totalDays":7},
		{"unit":94, "bulls":2, "cows":5, "calves":0, "totalHarvest":7, "totalHunters":10, "percSuccess":75, "totalDays":15},
		{"unit":95, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":7, "percSuccess":0, "totalDays":319},
		{"unit":96, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":7, "percSuccess":0, "totalDays":39},
		{"unit":97, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":5, "percSuccess":0, "totalDays":5},
		{"unit":98, "bulls":5, "cows":0, "calves":0, "totalHarvest":5, "totalHunters":13, "percSuccess":43, "totalDays":43},
		{"unit":99, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":5, "percSuccess":0, "totalDays":268},
		{"unit":100, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":5, "percSuccess":0, "totalDays":15},
		{"unit":101, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":12, "percSuccess":0, "totalDays":248},
		{"unit":102, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":17, "percSuccess":0, "totalDays":178},
		{"unit":104, "bulls":46, "cows":131, "calves":4, "totalHarvest":182, "totalHunters":339, "percSuccess":54, "totalDays":1685},
		{"unit":105, "bulls":50, "cows":10, "calves":2, "totalHarvest":63, "totalHunters":195, "percSuccess":32, "totalDays":2559},
		{"unit":106, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":5, "percSuccess":0, "totalDays":24},
		{"unit":107, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":12, "percSuccess":0, "totalDays":112},
		{"unit":109, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":5, "percSuccess":0, "totalDays":10},
		{"unit":110, "bulls":33, "cows":20, "calves":2, "totalHarvest":55, "totalHunters":139, "percSuccess":40, "totalDays":1421},
		{"unit":111, "bulls":5, "cows":0, "calves":0, "totalHarvest":5, "totalHunters":24, "percSuccess":20, "totalDays":231},
		{"unit":112, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":7, "percSuccess":0, "totalDays":54},
		{"unit":113, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":5, "percSuccess":0, "totalDays":32},
		{"unit":114, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":2, "percSuccess":0, "totalDays":5},
		{"unit":115, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":2, "percSuccess":0, "totalDays":5},
		{"unit":116, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":10, "percSuccess":0, "totalDays":49},
		{"unit":118, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":10, "percSuccess":0, "totalDays":68},
		{"unit":119, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":19, "percSuccess":0, "totalDays":175},
		{"unit":120, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":5, "percSuccess":0, "totalDays":34},
		{"unit":121, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":3, "percSuccess":100, "totalDays":12},
		{"unit":122, "bulls":0, "cows":0, "calves":0, "totalHarvest":0, "totalHunters":2, "percSuccess":0, "totalDays":17},
		{"unit":123, "bulls":19, "cows":5, "calves":0, "totalHarvest":24, "totalHunters":56, "percSuccess":43, "totalDays":615},
		{"unit":124, "bulls":7, "cows":0, "calves":0, "totalHarvest":7, "totalHunters":32, "percSuccess":23, "totalDays":202},
		{"unit":125, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":15, "percSuccess":20, "totalDays":99},
		{"unit":126, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":22, "percSuccess":11, "totalDays":298},
		{"unit":127, "bulls":3, "cows":3, "calves":0, "totalHarvest":6, "totalHunters":28, "percSuccess":22, "totalDays":359},
		{"unit":128, "bulls":24, "cows":5, "calves":5, "totalHarvest":35, "totalHunters":174, "percSuccess":20, "totalDays":994},
		{"unit":129, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":22, "percSuccess":11, "totalDays":129},
		{"unit":130, "bulls":13, "cows":10, "calves":2, "totalHarvest":26, "totalHunters":53, "percSuccess":49, "totalDays":266},
		{"unit":132, "bulls":2, "cows":0, "calves":0, "totalHarvest":2, "totalHunters":32, "percSuccess":8, "totalDays":330},
		{"unit":133, "bulls":3, "cows":13, "calves":0, "totalHarvest":17, "totalHunters":40, "percSuccess":42, "totalDays":138},
		{"unit":134, "bulls":14, "cows":7, "calves":0, "totalHarvest":21, "totalHunters":43, "percSuccess":50, "totalDays":315},
		{"unit":135, "bulls":27, "cows":2, "calves":0, "totalHarvest":29, "totalHunters":166, "percSuccess":17, "totalDays":895},
		{"unit":136, "bulls":10, "cows":0, "calves":0, "totalHarvest":10, "totalHunters":115, "percSuccess":9, "totalDays":806},
		{"unit":137, "bulls":8, "cows":5, "calves":0, "totalHarvest":13, "totalHunters":41, "percSuccess":31, "totalDays":174},
		{"unit":138, "bulls":3, "cows":0, "calves":0, "totalHarvest":3, "totalHunters":5, "percSuccess":55, "totalDays":8},
		{"unit":139, "bulls":5, "cows":0, "calves":0, "totalHarvest":5, "totalHunters":20, "percSuccess":27, "totalDays":80},
		{"unit":140, "bulls":55, "cows":7, "calves":0, "totalHarvest":63, "totalHunters":124, "percSuccess":50, "totalDays":401},
		{"unit":141, "bulls":10, "cows":17, "calves":0, "totalHarvest":27, "totalHunters":54, "percSuccess":49, "totalDays":166},
		{"unit":142, "bulls":32, "cows":11, "calves":4, "totalHarvest":47, "totalHunters":128, "percSuccess":36, "totalDays":510},
		{"unit":143, "bulls":24, "cows":24, "calves":0, "totalHarvest":48, "totalHunters":122, "percSuccess":39, "totalDays":541},
		{"unit":144, "bulls":16, "cows":0, "calves":0, "totalHarvest":16, "totalHunters":82, "percSuccess":19, "totalDays":334},
		{"unit":145, "bulls":5, "cows":3, "calves":0, "totalHarvest":8, "totalHunters":34, "percSuccess":25, "totalDays":232},
		{"unit":146, "bulls":5, "cows":0, "calves":0, "totalHarvest":5, "totalHunters":80, "percSuccess":6, "totalDays":1046},
		{"unit":147, "bulls":17, "cows":5, "calves":0, "totalHarvest":22, "totalHunters":92, "percSuccess":24, "totalDays":517}
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
			const docRef = await addDoc(collection(db, "2022-all-rifle"), {
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
			var successInt = Number(success);
			var huntersInt = Number(hunters);
			var harvestInt = Number(harvest);
			console.log(successInt);
			var proccessData = [];
			let q = query(collection(db, season), where("percSuccess", ">=", successInt), orderBy("percSuccess", "desc"));
			const querySnapshot = await getDocs(q);
			console.log(querySnapshot);
			querySnapshot.forEach((doc) => {
			  // doc.data() is never undefined for query doc snapshots
			  var dataCall = doc.data();
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
			var resultsTable = "<table class='data-table'><thead><tr><th>unit</th><th>Bulls</th><th>Cows</th><th>Calves</th><th>Total Harvest</th><th>Total Hunters</th><th>Percent Success</th><th>Days</th><tbody>";
			var datalength = data.length;
			var returnLength = 0;
			console.log(datalength);
			for (let i = 0; i < datalength; i++) {
				console.log(i);
				returnLength++
				var unit = data[i]["unit"];
				var bulls = data[i]["bulls"];
				var cows = data[i]["cows"];
				var calves = data[i]["calves"];
				var totalHarvest = data[i]["totalHarvest"];
				var totalHunters = data[i]["totalHunters"];
				var PercSuccess = data[i]["percSuccess"];
				var totalDays = data[i]["totalDays"];
		
				resultsTable+= "<tr><td>"+unit+"</td><td>"+bulls+"</td><td>"+cows+"</td><td>"+calves+"</td><td>"+totalHarvest+"</td><td>"+totalHunters+"</td><td>"+PercSuccess+"</td><td>"+totalDays+"</td></tr>";
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
							<td> 
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
