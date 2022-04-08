import React from 'react'
import { Treemap, ResponsiveContainer, Tooltip} from 'recharts';

export default function PortfolioAnalyzeSector({m, y, i}) {
    const multiplier = m;
    const year = y;
    const info = i;
    const ratio = parseInt(multiplier, 10);
    const treeDict = {};
    const treeData = []; 
    const COLORS = ['#533E85', '#488FB1', '#4FD3C4', '#C1F8CF', '#9ADCFF','#FFF89A','#FFF89A','#FFB2A6','#FF8AAE', '#151D3B','#2D31FA'];
    if (year == 'all') {
        info.analyzeResult.forEach(stock => {
            let quantity = Math.round(stock.weight*ratio);
            if (Math.abs(quantity) > 0){
                if (treeDict[stock.sector]){
                    treeDict[stock.sector] += Math.abs(quantity);
                } else {
                    treeDict[stock.sector] = Math.abs(quantity);
                }
            }
        })

        for (const [key, value] of Object.entries(treeDict)) {
            treeData.push({'name' : key,
                          'size' : value,
                         });
          }
    }


  return (
    <>
        <ResponsiveContainer width="100%" height="100%">
            <Treemap
                data={treeData}
                dataKey="size"
                stroke="#fff"
            >
            <Tooltip />
        </Treemap>
        </ResponsiveContainer>
    </>
  )
}
