import React from 'react';
import './summary.css';

export default function PortfolioAnalyzeSectorSummary({m, y, i}) {
    const multiplier = m;
    const year = y;
    const info = i;
    const ratio = parseInt(multiplier, 10);

    var table = [];


    if (year == 'all') {
        info.analyzeResult.forEach(stock => {
            let quantity = Math.round(stock.weight*ratio);
            table.push({'stock': stock.symbol, 'size' : quantity, 'cost': Math.round(stock.prices.start2018 * 100)/100,
            'change2018': Math.round(((stock.prices.end2018-stock.prices.start2018)/stock.prices.start2018*100) * 100)/100,
            'change2019': Math.round(((stock.prices.end2019-stock.prices.start2019)/stock.prices.start2019*100) * 100)/100,
            'change2020': Math.round(((stock.prices.end2020-stock.prices.start2020)/stock.prices.start2020*100) * 100)/100,
            'change2021': Math.round(((stock.prices.end2021-stock.prices.start2021)/stock.prices.start2021*100) * 100)/100,
            'change': Math.round((stock.prices.end2021-stock.prices.start2018) * 100)/100, })
        })
    }

  return (  
        <div className='analyzeReportIndividualStockTable'>
            <div className='analyzeReportIndividualStock'>
                <div className='analyzeReportIndividualStockIndex'>Index</div>
                <div className='analyzeReportIndividualStockLabel'>Stock</div>
                <div className='analyzeReportIndividualStockSize'>Quantity</div>
                <div className='analyzeReportIndividualStockCost'>Purchase Price</div>
                <div className='analyzeReportIndividualStockChange2018'>change in 2018</div>
                <div className='analyzeReportIndividualStockChange2019'>change in 2019</div>
                <div className='analyzeReportIndividualStockChange2020'>change in 2020</div>
                <div className='analyzeReportIndividualStockChange2021'>change in 2021</div>
                <div className='analyzeReportIndividualStockTotalChange'>Price change</div>
            </div>
            {table.map((element, index) => (
                <div className='analyzeReportIndividualStock' key={`analyzeReportIndividualStock_${index+1}`}>
                    <div className='analyzeReportIndividualStockIndex'>{index+1}</div>
                    <div className='analyzeReportIndividualStockLabel'>{element.stock}</div>
                    <div className='analyzeReportIndividualStockSize'>{element.size}</div>
                    <div className='analyzeReportIndividualStockCost'>${element.cost}</div>
                    <div className='analyzeReportIndividualStockChange2018'>{element.change2018}%</div>
                    <div className='analyzeReportIndividualStockChange2019'>{element.change2019}%</div>
                    <div className='analyzeReportIndividualStockChange2020'>{element.change2020}%</div>
                    <div className='analyzeReportIndividualStockChange2021'>{element.change2021}%</div>
                    <div className='analyzeReportIndividualStockTotalChange'>${element.change}</div>
                </div>
            ))}
        </div>
  )
}
