import React, {useState} from 'react'
import axiosAPI from '../axiosAPI';
import CircularIndeterminate from '../loadingSpinner/CircularIndeterminate';
import './portfolioOptimize.css';
import { InputLabel, Button, Select, MenuItem, FormControl, TextField, Alert, AlertTitle, Card } from '@mui/material';

export default function PortfolioOptimize({info}) {
    const data = info;
    
    const [loading, setLoading] = useState(<></>);
    const [algo, setAlgo] = useState('AMPO');
    const [pop, setPop] = useState('');
    const [iteration, setIteration] = useState('');
    const [warning, setWarning] = useState(<></>);

    const handleChange = (e) => {
      setAlgo(e.target.value);
    }

    const handleInput = (portfolioId) => {
      var input_pop = parseInt(pop);
      var input_iteration = parseInt(iteration);
      if (isNaN(input_pop) || isNaN(input_iteration)){
        setWarning(
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>Please input numbers!</strong>
            </Alert>
        );
      } else {
        setWarning(
          <Alert severity="info">
          <AlertTitle>Processing...</AlertTitle>
          <strong>The portfolio is being optimized!</strong>
          </Alert>
      );
        optimizePortfolio(portfolioId);
      }
    }


    const optimizePortfolio = (portfolioId) => {
        if ((pop == '') || (iteration == '')) {
          console.log('no empty');
          setWarning(
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>No Field should be left empty!</strong>
            </Alert>    
        );
        } else {
            setLoading(<CircularIndeterminate size='200px'/>);
            axiosAPI.post('api/optimizePortfolio/',
            {
                portfolio: portfolioId, // This is the body part
                algo: algo,
                population: pop,
                iteration: iteration
            }
            ).then((res) => 
                { 
                  setWarning(
                    <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    <strong>Portfolio is Optimized!</strong>
                    </Alert>    
                );
                  setLoading(<></>);
                }
            ).catch((error) => {
              console.log(error);
            });
        }
      }

  return (
    <div className='algo-opertaion'> 
        <div className='optimizeFormOptionContainer'>
            {warning}
            <FormControl required sx={{ m: 1, minWidth: 120 }} className='optimizeOptionForm'>
                <InputLabel id="algo-select-label">Algo</InputLabel>
                <Select
                    labelId="algo-select-label"
                    id="algo-select"
                    value={algo}
                    label="Algo"
                    onChange={(e) => handleChange(e)}
                    required={true}
                >
                    <MenuItem value={'AMPO'}>AMPO</MenuItem>
                    <MenuItem value={'GA'}>GA</MenuItem>
                    <MenuItem value={'PSO'}>PSO</MenuItem>
                </Select> <br />
                <TextField label="Populations" variant="outlined" onChange={(event) => setPop(event.target.value)} required={true}/><br />
                <TextField label="Iterations" variant="outlined" onChange={(event) => setIteration(event.target.value)} required={true} /><br />
                <Button onClick={() => handleInput(data.portfolio.id)}> optimize</Button>
                {/* <Button onClick={() => showInput()} type='submit'> submit</Button> */}
                {loading}
            </FormControl>
        </div>
    </div>
  )
}
