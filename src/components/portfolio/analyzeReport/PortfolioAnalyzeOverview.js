import React from 'react'
import './overview.css'

export default function PortfolioAnalyzeOverview({m, y, i}) {
    const multiplier = m;
    const year = y;
    const info = i;
    const ratio = parseInt(multiplier, 10);
    var cost = 0;
    var portfolioValue = 0;
    var unrealizedGain = 0;
    
    if (year == 'all') {
        info.analyzeResult.forEach(stock => {
            const quantity = Math.round(stock.weight*ratio);
            if (Math.abs(quantity) > 0){
                if (quantity < 0) {
                    unrealizedGain += (stock.prices.start2018 - stock.prices.end2021) *  Math.abs(quantity);
                    cost += stock.prices.start2018 * Math.abs(quantity);
                } else {
                    unrealizedGain += (stock.prices.end2021 - stock.prices.start2018) * quantity;
                    cost += stock.prices.start2018 * Math.abs(quantity);
                }
            }
        })
        portfolioValue = cost + unrealizedGain
    }

    return (
        <>
            <div className='portfolioValue overviewBox'>
                <div className='OverviewBoxTitle'>Portfolio Value</div>
                ${Math.round(portfolioValue*100)/100}
            </div>
            <div className='unrealizedGain overviewBox'>
                <div className='OverviewBoxTitle'>Unrealized Gain</div>
                ${Math.round(unrealizedGain*100)/100}
            </div>
        </>
    )
}
