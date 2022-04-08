import React, {useState} from 'react'
import axiosAPI from '../axiosAPI';
import './portfolioOverview.css'
import CircularIndeterminate from '../loadingSpinner/CircularIndeterminate';
import { Button, Card } from '@mui/material';


export default function PortfolioOverview({ portfolioDetails, optimizePortfolio, analyzeResult }) {
    const info = portfolioDetails;

    const [loading, setLoading] = useState(<></>)

    const startAnalyze = () => {
        setLoading(<CircularIndeterminate />);
        analyzeResult(info.portfolio.id, setLoading);
    }

  return (
    <div className='portfolioOverview'>
        {info ? (<div className='portfolioDetails'>
                <Card className='portfolioInfo'>
                    {/* <button onClick={() => console.log(info)}> hi</button>  */}
                    <div className='portfolioHeader'>
                        <div className='portfolioName'>{info.portfolio.name}</div>
                        <div className='portfolioCreationDate'>Created on {info.portfolio.createDate}</div>
                        <div className='portfolioLastModified'>Last modified on {info.portfolio.lastModified}</div>
                    </div>
                </Card>

                <Card className='portfolioStatus'>
                    Status:
                    <div className='greenLight'>{info.portfolio.allowShort ? 'Allow Short' : 'Not Allow Short'}</div>
                </Card>


                <Card>
                    <div className='portfolioWeightedStockTable'>
                            <div className='portfolioStockBar'>
                                <div className='portfolioStockSymbol'>Stock</div>
                                <div className='portfolioStockName'>Company name</div>
                                <div className='portfolioStockSector'>Sector</div>
                                <div className='portfolioStockWeight'>weight</div>
                            </div>
                        {info.stocks.map(
                            (element) => (
                                <div className='portfolioStock' key={`portfolio${info.id}stock${element.symbol}`}>
                                    <div className='portfolioStockSymbol'>{element.symbol}</div>
                                    <div className='portfolioStockName'>{element.name}</div>
                                    <div className='portfolioStockSector'>{element.sector}</div>
                                    <div className='portfolioStockWeight'>{Math.round(element.weight*100)/100}</div>
                                </div>
                                
                            )
                        )}
                    </div>
                </Card>
                <div className='portfolioOperation'>
                    <Button onClick={() => startAnalyze()}>Analyze</Button>
                    <Button onClick={() => optimizePortfolio(info)}>Optimize</Button>
                    {loading}
                </div>
        </div>) : (<div>You have not pick a portfolio.</div>)}
    </div>
  )
}
