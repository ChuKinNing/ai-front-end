import React, { useState, useEffect } from "react";
import PortfolioView from "../components/portfolio/PortfolioView";
import "../app.css";
import Errors from "./Errors";
import Logout from "../components/login/Logout";
import Home from "../components/home/home";
import { Button } from "@mui/material";
import StockList from "../components/stockBrowser/StockList";

export default function Main() {
  const [dashboard, setDashboard] = useState();
  const userInfoFromGoogle = localStorage.getItem('givenName') ? JSON.parse(localStorage.getItem('givenName')): null
  const user = localStorage.getItem('unique_id').replace(/"/g, '');

  useEffect(() => {
    setDashboard(Home(userInfoFromGoogle));
  }, [])
  
  
  
  

  return (
    <div className="main">
        <div className="navbar">
          <div className="navbarWrapper">
              <div className="navbarLeft">
                <div className="logo">
                  AI Fund
                </div>
                </div>
              <div className="navbarRight">
                  <Logout />
              </div>
          </div>
      </div>
      <div className="container">
        <div className='sidebar'>
          <div className="sidebarWrapper">
                {/* <ul> */}
                    <Button onClick={() => (setDashboard(Home(userInfoFromGoogle)))}>Home</Button><br />
                    <Button onClick={() => (setDashboard(<StockList user = {user}/>))}>Stock</Button><br />
                    <Button onClick={() => (setDashboard(<PortfolioView user = {user}/>))}>Portfolio</Button>
                {/* </ul> */}
            </div>
          
        </div>    
      </div>
      <div className="dashboard">
            {dashboard}
          </div>
    </div>
  );
}
