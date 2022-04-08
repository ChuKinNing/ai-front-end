import React, {useEffect, useState} from 'react';
import './stockList.css';
import { TextField, Button, Card } from '@mui/material';
import axiosAPI from '../axiosAPI';
import { GetSortOrder } from '../lib/lib';
import CircularIndeterminate from '../loadingSpinner/CircularIndeterminate';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

export default function StockList() {
    const [stocks, setStocks] = useState([]);
    const [displayStocks, setDisplayStocks] = useState([]);
    const [sortOption, setsortOption] = useState('label');
    const [loading, setLoading] = useState(<></>);
    const [loadingStock, setLoadingStock] = useState(<></>);
    const [showStock, setshowStock] = useState();

    const sortStocks = (option) => {
      var newStocks = displayStocks.sort(GetSortOrder(option));
      setsortOption(option);
      // setStocks([...newStocks]);
      setDisplayStocks([...newStocks]);
    }

    const filterStocks = (value) => {
      // console.log(value);
      // for 
      let allStocks = stocks;
      let filteredStocks = [];
      allStocks.forEach(element => {
        if (element.label.includes(value.toUpperCase())){
          filteredStocks.push(element);
        }
      });
      filteredStocks.sort(GetSortOrder(sortOption));
      setDisplayStocks([...filteredStocks]);
    }

    const selectStockDetails = (element) => {
      console.log(element);
      setLoadingStock(<CircularIndeterminate />);
      axiosAPI.post('api/getStockData/',
                {
                  stock_name: element.label, // This is the body part
                }
              ).then((res) => {
                console.log(res.data);
                setLoadingStock(<></>);
                var stockChartDetails = []
                for (const [key, value] of Object.entries(res.data.stockPriceData)) {
                  // console.log(`${key}: ${value}`);
                  stockChartDetails.push({'name': key, 'price': Math.round(value * 100) / 100});
                }
                // console.log(stockChartDetails);
                // setStockDetails(...stockChartDetails);

                let stockDetailView = (
                  <>
                    <Card className='stockDetailBasicInfo'>
                      <div className='sotckListStockLabel'>{element.label}</div>
                      <div>{element.name}</div>
                    </Card>


                    <div>Stock Prices in recent 3 months:</div> <br />
                    <ResponsiveContainer width="90%" height="50%">
                      <AreaChart data={stockChartDetails}>
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={0.5} fill="url(#colorUv)" />
                      </AreaChart>
                    </ResponsiveContainer>

                    <Card className='stockDetailInfoBox'>
                      <div>Sector: {element.sector}</div>
                      <div>Industry: {res.data.stockInfo.industry || 'NA'}</div>
                      <div>Full Time Employees: {res.data.stockInfo.fullTimeEmployees  || 'NA'}</div>
                      <div>Country: {res.data.stockInfo.country  || 'NA'}</div>
                      <div>Website: {res.data.stockInfo.website  || 'NA'}</div> <br />
                      <div>{res.data.stockInfo.longBusinessSummary  || 'NA'}</div>
                    </Card>  <br />

                    <div className='stockDetailNewsBox'>
                      News:  <br />
                      {res.data.stockNews!='NA' && res.data.stockNews.map((element, index) => (
                        <div className='stockDetailNews' key={`stockDetailNews${index}`}>
                          <div><a href={element.link} target="_blank">{element.title}</a></div>
                        </div>
                      ))}
                    </div>
                  
                  </>)


                 setshowStock(<>{stockDetailView}</>);
              }
                  
                 
              ).catch((error) => {
                  console.log(error);
              });
    }

    useEffect(() => {
      setLoading(<CircularIndeterminate />);
      axiosAPI.get("/api/stock-list/"
      ).then((res) => {
          // console.log(res.data);
          let ordered = res.data.sort(GetSortOrder('label'));
          setStocks([...ordered]);
          setDisplayStocks([...ordered]);
          setLoading(<></>);
      }
        // console.log(res.data)
      ).catch((error) => {
        console.log(error);
      });


    }, []);
    



  return (
    <div className='stockBrowser'>
        <div className='stockList'>
          <br/>
            <div className='stockListOperation'>
                <TextField onChange={(e) => filterStocks(e.target.value)} label='Stock'></TextField><br />
                <Button onClick={() => sortStocks('label')}> Sort By Name</Button>
                <Button onClick={() => sortStocks('sector')}> Sort By Sector</Button>
            </div>
            <div className='stockListPanel'>
              {loading}
              {displayStocks.map((element, index) => (
                <Card key={element.label} className='stockListStock' onClick={() => selectStockDetails(element)}>
                    <div className='sotckListStockLabel'>{element.label}</div>
                    <div>{element.name}</div>
                    <div>{element.sector}</div>
                </Card>
              ))}

            </div>
        </div>
        <div className='stockDetails'>{loadingStock}{showStock}</div>
    </div>
  )
}
