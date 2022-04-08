import React, { useState, useEffect } from 'react';
import './portfolioView.css';
import PortfolioList from './portfolioList';
import axiosAPI from '../axiosAPI';
import { Alert,AlertTitle } from '@mui/material';

export default function PortfolioView({user}){
    const [portfolios, setPortfolios] = useState([
      // {id:'', owner:'', name:'', allowShort: false, hasOptimized: false, createdDate: '', lastModified: '', weightedStocks: []},
    ]);
    const userid = user;
    useEffect(() => {
      axiosAPI.post('api/getAllPortfolio/',
              {
                unique_id: user,
              }
            ).then((res) => 
                setPortfolios(res.data)
            ).catch((error) => {
                console.log(error);
            });
    }, []);


    const createPortfolio = (data, setWarning) => {
      data.unique_id = userid;
      let JsonData = JSON.stringify(data);
      console.log(JsonData);
      axiosAPI.post('api/createPortfolio/',JsonData
            ).then((res) => {
              setPortfolios(res.data);
              setWarning(<Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  <strong>Portfolio is saved!</strong>
              </Alert> );
            }
                
            ).catch((error) => {
                console.log(error);
            });
    }

    const deletePortfolio = (data) => {
      let JsonData = JSON.stringify(data);
      // console.log(JsonData);
      axiosAPI.post('api/deletePortfolio/',JsonData
            ).then((res) => 
              setPortfolios(res.data)
              // console.log(res.data)
            ).catch((error) => {
              console.log(error);
            });
    }

    const updatePortfolio = (data, setWarning) => {
      let JsonData = JSON.stringify(data);
      // console.log(JsonData);
      axiosAPI.post('api/updatePortfolio/',JsonData
            ).then((res) => {
              console.log(res.data)
              setWarning(<Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  <strong>Portfolio is updated!</strong>
              </Alert> );
            }
              
            ).catch((error) => {
              console.log(error);
            });
    }
    
    return (
      <div className='portfolio'>
          <PortfolioList portfolios={portfolios} user={userid} createPortfolio={createPortfolio} deletePortfolio={deletePortfolio} updatePortfolio={updatePortfolio}/>
      </div>
    ) 
}

