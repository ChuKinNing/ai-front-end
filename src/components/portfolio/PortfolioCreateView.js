import React from 'react'
import PortfolioPanel from './PortfolioPanel'

export default function PortfolioCreateView({createPortfolio, updatePortfolio, data}) {

  return (
    <div className='portfolioPanel'>
        <PortfolioPanel createPortfolio={createPortfolio} updatePortfolio={updatePortfolio} data={data}/>
    </div>
  )
}
