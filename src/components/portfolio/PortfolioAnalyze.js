import React, { useState } from 'react'
import './portfolioAnalyze.css'
import PortfolioAnalyzeOverview from './analyzeReport/PortfolioAnalyzeOverview'
import PortfolioSectorBar from './analyzeReport/PortfolioSectorBar'
import PortfolioAnalyzeSector from './analyzeReport/PortfolioAnalyzeSector'
import PortfolioAnalyzeSectorSummary from './analyzeReport/PortfolioAnalyzeSectorSummary'
import { Card, Button, TextField, Alert, AlertTitle } from '@mui/material';

export default function PortfolioAnalyze({info}) {
    const analyzeResult = info

    const [multiplier, setMultiplier] = useState(0);
    const [warning, setWarning] = useState(<></>);

    const  [year, setYear] = useState('all');

    const changeMultiplier = (event) => {
        event.preventDefault();
        var input = Number(event.target[0].value);
        if (isNaN(input)) {
            setWarning(
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>Please input numbers!</strong>
                </Alert>    
            );
        }else {
            setMultiplier(event.target[0].value);
            setWarning(
                <></>  
            );
        }
    }

  return (
    <div>
        {warning}
        <div className='analyzeResultPanel'>
            {/* <button onClick={() => console.log(analyzeResult)}>hi</button> */}
            <form onSubmit={changeMultiplier}>
                {/* ratio: <input type='text' name='multiplier'></input> */}
                <TextField label="Ratio" variant="outlined" required={true} name='multiplier'></TextField>
                <Button className="button submit" type="submit">ok</Button>
            </form> <br />

            <div className='analyzeResultOverview'>
                <div className='sessionName'>Portfolio Activity Summary</div>
                <div className='selectYear'>
                    {/* Select Year: */}
                    {/* <div>all</div> */}
                    {/* <div>2018</div>
                    <div>2019</div>
                    <div>2020</div>
                    <div>2021</div> */}
                </div>
                <Card className='overallValue'>
                    <PortfolioAnalyzeOverview m={multiplier} y={year} i={analyzeResult}/>
                </Card>
            </div><br />

            <div className='analyzeResultSectorPerformance'> 
                    <div className='sessionName'>Unrealized Gains</div>
                    <PortfolioSectorBar  m={multiplier} y={year} i={analyzeResult}/>
            </div><br />

            <div className='analyzeResultSector'>
                <div className='sessionName'>Allocation - Sectors</div>
                    <PortfolioAnalyzeSector m={multiplier} y={year} i={analyzeResult}/>
            </div><br />
            
            <Card className='analyzeResultIndividualPerformance'>
                <div className='sessionName'>Stock Summary</div>
                <PortfolioAnalyzeSectorSummary m={multiplier} y={year} i={analyzeResult}/>
            </Card>

            
        </div>
        
    </div>

  )
}
