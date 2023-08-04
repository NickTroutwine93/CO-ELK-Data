// client/src/App.js

import React from "react";
import logo from "./900dfdfe3610cf5e77403d64ae15264c.png";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  const [success, setSuccess] = React.useState("");
  const [hunters, setHunters] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    getSuccess(success);
  }
  const getSuccess=(value)=>
  {
      fetch('/api?success='+value)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="header-text">CO ELK Data</h2>
      </header>
      <div className="App-body">
        <div className="Inputs">
          <form onSubmit={handleSubmit}>
            <label>Percentage of success:&nbsp;&nbsp;&nbsp;
              <input 
                type="text" 
                value={success}
                onChange={(e) => setSuccess(e.target.value)}
              />
            </label><br></br>
            <label>Number of hunters:&nbsp;&nbsp;&nbsp;
              <input 
                type="text" 
                value={hunters}
                onChange={(e) => setHunters(e.target.value)}
              />
            </label><br></br>
            <input className="Submit" type="submit" />
          </form>
        </div>
        <p>Results Found:</p>
        <div className="Results" dangerouslySetInnerHTML={{ __html: data }}></div>
      </div>
    </div>
  );
}

export default App;