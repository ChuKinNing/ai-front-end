import React, {useState} from 'react'
import axiosAPI from '../axiosAPI';
import './portfolioList.css'
import './portfoliopanel.css'
import PortfolioOverview from './PortfolioOverview';
import PortfolioCreateView from './PortfolioCreateView';
import PortfolioOptimize from './PortfolioOptimize';
import PortfolioAnalyze from './PortfolioAnalyze';
import { Button } from '@mui/material';
import { Card } from '@mui/material';

export default function PortfolioList({portfolios, user, createPortfolio, deletePortfolio, updatePortfolio}) {
  const userId = user;
  const defaultList = portfolios;

  const [portfolioAction, setPortfolioAction] = useState();

  const showPortfolio = (data) => {
    axiosAPI.post('api/portfolioOverview/',
              {
                portfolio_id: data.id, // This is the body part
              }
            ).then((res) => 
                setPortfolioAction(<PortfolioOverview portfolioDetails={res.data} optimizePortfolio={optimizePortfolio} analyzeResult={analyzeResult}/>)
            ).catch((error) => {
              console.log(error);
            });
  }

  const addPortfolio = () => {
      setPortfolioAction(<PortfolioCreateView createPortfolio={createPortfolio} data={null}/>);
  }

  const optimizePortfolio = (info) => {
      setPortfolioAction(<PortfolioOptimize info={info}/>)
      console.log(info);
  }

  const finishAnalyze = (res, setLoading, mutliplier) => {
      setPortfolioAction(<PortfolioAnalyze info={res.data}  mutliplier={mutliplier}/>);
      // setLoading(<>Done</>);
      // setPortfolioAction(<PortfolioAnalyze info={res.data}  mutliplier={mutliplier}/>)
  }

  const analyzeResult = (portfolioId , setLoading, mutliplier) => {
      axiosAPI.post('api/analyzePortfolio/',
              {
                portfolio_id: portfolioId, // This is the body part
              }
            ).then((res) => 
                // console.log(res.data)
                // setPortfolioAction(<PortfolioAnalyze info={res.data}  mutliplier={mutliplier}/>)
                finishAnalyze(res, setLoading, mutliplier)
            ).catch((error) => {
              console.log(error);
            });
  }


  const showPortfolioOverview = (data) => {
    showPortfolio(data);
  }

  const DeletePortfolio = (deletePortfolioId) => {
    let data = {'unique_id': userId, 'delete_portfolio_id': deletePortfolioId};
    deletePortfolio(data);
  }

  const UpdatePortfolio = (element) => {
      axiosAPI.post('api/portfolioOverview/',
                {
                  portfolio_id: element.id, // This is the body part
                }
              ).then((res) => 
                  setPortfolioAction(<PortfolioCreateView updatePortfolio={updatePortfolio} data={res.data}/>)
                  // console.log(res.data)
              ).catch((error) => {
                console.log(error);
              });
  }

  return (
    <>
        <div className='portfolioListBar'>
              <div className='portfolioListPanel'>
                  <div className='addPortfolio'>
                      <Button onClick={() => addPortfolio()}>Add Portfolio</Button>  
                  </div>
                  {defaultList.map((element, index) => (
                    <Card className='portfolioListElement' key={`portfolioListElement ${element.id}`}>
                        <div className='portfolioListElementIndex'>{index+1}</div>
                        <div>
                            <div className='portfolioListElementName' onClick={() => showPortfolioOverview(element)}>{element.name}</div> 
                                <div className='portfolioListElementInfo'> 
                                <div className='portfolioListElementCreateDate'>create on {element.createDate}</div>  
                                <div className='portfolioListElementLastModified'>last modified on {element.lastModified}</div> 
                                <div>
                                    <Button className='editPortfolioButton' onClick={() => showPortfolioOverview(element)}>OVerview</Button> 
                                    <Button className='editPortfolioButton' onClick={() => UpdatePortfolio(element)}>Edit</Button> 
                                    <Button size='small' color='warning' onClick={() => DeletePortfolio(element.id)} className='deletePortfolioButton'>Delete</Button>
                                </div>
                            </div> 
                        </div>
                    </Card>
                  ))
                  
                  }
              </div>
        </div>
      <div className='portfolioDetails'>
          {portfolioAction}
      </div>
  </>
  )
}
