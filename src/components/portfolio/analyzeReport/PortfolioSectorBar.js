import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer, Cell } from 'recharts'

export default function PortfolioSectorBar({m, y, i}) {
    const multiplier = m;
    const year = y;
    const info = i;
    const ratio = parseInt(multiplier, 10);
    var BarData = {};
    var BarDict = [];
    const COLORS = ['#533E85', '#488FB1', '#4FD3C4', '#C1F8CF', '#9ADCFF','#FFF89A','#FFF89A','#FFB2A6','#FF8AAE', '#151D3B','#2D31FA'];

    if (year == 'all') {
        info.analyzeResult.forEach(stock => {
            let quantity = Math.round(stock.weight*ratio);
            if (Math.abs(quantity) > 0){
                if (BarData[stock.sector]){
                    BarData[stock.sector] += (stock.prices.end2021 - stock.prices.start2018) * quantity;
                } else {
                    BarData[stock.sector] = (stock.prices.end2021 - stock.prices.start2018) *  quantity;
                }
            }
            
        })
        // console.log(BarData);

        for (const [key, value] of Object.entries(BarData)) {
            BarDict.push({'sector':key,
                          'gain':Math.round(value*100)/100,
                         });
          }
        
        // console.log(BarDict);
          
    }


  return (
    <>
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={BarDict}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sector" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="gain" fill="#5bc5d8">
        </Bar>
        </BarChart>
    </ResponsiveContainer>
    </>
  )
}
