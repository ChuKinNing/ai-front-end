import React , {useState, useEffect} from 'react'
import './portfoliopanel.css';
import Select from 'react-select';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import axiosAPI from '../axiosAPI';
import { Button, Alert, AlertTitle, Card} from '@mui/material';
import { GetSortOrder, hasDuplicates } from '../lib/lib';

// function GetSortOrder(prop) {    
//     return function(a, b) {    
//         if (a[prop] > b[prop]) {    
//             return 1;    
//         } else if (a[prop] < b[prop]) {    
//             return -1;    
//         }    
//         return 0;    
//     }    
// }

// function hasDuplicates(array) {
//     return (new Set(array)).size !== array.length;
// }


export default function PortfolioPanel({createPortfolio, updatePortfolio, data}) {
    const COLORS = ['#533E85', '#488FB1', '#4FD3C4', '#C1F8CF', '#9ADCFF','#FFF89A','#ED8975','#FFB2A6','#FF8AAE', '#151D3B','#2D31FA'];

    const [options, setOptions] = useState([]);
    const [pieChartDatas, setPieChartDatas] = useState([]);
    const [portfolioName, setPortfolioName] = useState('');
    const [allowShort, setAllowShort] = useState(false);
    const [formValues, setFormValues] = useState([]);
    const [warning, setWarning] = useState(<></>);

    const changePie = (sectorList) => {
        let pie = sectorList.reduce(function (slice, stock) {
            slice[stock.sector] = slice[stock.sector] || 0;
            slice[stock.sector] += 1;
                return slice;
        }, Object.create(null));
        let newPieDatas = [];
        for (var key in pie) {
            if (key) {
                newPieDatas.push({'name':key, 'value':pie[key]});
            }
        }
        setPieChartDatas([...newPieDatas]);
    };

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i] = e;
        setFormValues(newFormValues);
        changePie(newFormValues);
    };

    const buildOptions = (unorder) => {
        let ordered = unorder.sort(GetSortOrder('label'));
        setOptions(ordered);
    }

    useEffect(() =>
        {   
            if (data) {
            // update
                console.log(data);
                setAllowShort(data.portfolio.allowShort);
                setPortfolioName(data.portfolio.name);
                let loadPortfolio = []
                data.stocks.forEach(element => {
                    let temp = {}
                    temp.value=element.id;
                    temp.label=element.symbol;
                    temp.name=element.name;
                    temp.sector=element.sector;
                    temp.stock_id=element.stock_id;
                    loadPortfolio.push(temp);
                });
                setFormValues(loadPortfolio);
                changePie(loadPortfolio);
            } else if (isNaN(data)) {
                setAllowShort(false);
                setPortfolioName('');
                setFormValues(...[]);

            }
            // const token = localStorage.getItem("access_token");
            axiosAPI.get("/api/stock-list/").then((res) => buildOptions(res.data));
        }, []
    );

    const addFormFields = () => {
        setFormValues([...formValues, {value: '', label: '', name:'' ,sector: ''}])
    };
    
    const removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
        changePie(newFormValues);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var allowUpdate = true;
        if (portfolioName === ''){
            setWarning(
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>Empty Portfolio Name!</strong>
                </Alert>    
            );
            allowUpdate = false;
            return;
        }

        formValues.forEach(element => {
            if (element.label === '') {
                allowUpdate = false;
                setWarning(
                    <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>Empty Stock!</strong>
                    </Alert>    
                );
                return;
            }
        });

        if (formValues.length <= 1){
            allowUpdate = false;
                setWarning(
                    <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>Please more than 1 stock!</strong>
                    </Alert>    
                );
        }

        if (hasDuplicates(formValues)){
            allowUpdate = false;
                setWarning(
                    <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>There is duplicated stocks!</strong>
                    </Alert>    
                );
        }



        let stocks = []
        let option_allowShort = document.getElementById('optionAllowShort');
        console.log(option_allowShort);
        if (allowUpdate){
            if (data) {
                formValues.forEach(element => {
                    stocks.push(element.stock_id);
                });
                let sendData = {update_portfolio_id:data.portfolio.id, portfolioName, allowShort, stocks}
                console.log(sendData);
                updatePortfolio(sendData, setWarning);
            } else {
                formValues.forEach(element => {
                    stocks.push(element.stock_id);
                });
                let sendData = {portfolioName, allowShort, stocks}
                console.log(sendData);
                createPortfolio(sendData, setWarning);
            }

        }
        
        
    };

    return (
        <div>
            <Card>
                    {warning}
                </Card>
            <form onSubmit={handleSubmit}>
                <Card className='portfolioSetting'>
                    <div className='portfolioPanelName'>
                        Portfolio Name: <input type='text' onChange={(event) => setPortfolioName(event.target.value)} value={portfolioName}></input>
                    </div>
                    <div className='portfolioAllowShort' id='optionAllowShort' onChange={(event) => setAllowShort(event.target.checked)}>
                        <input type="checkbox" id="optionAllowShort" name='optionAllowShort' checked={allowShort}></input>
                        <label htmlFor="optionAllowShort"> Allow short? </label><br></br>
                    </div>
                </Card>

                
                

                <Card className='stockGraph'>
                    <ResponsiveContainer width="40%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={pieChartDatas}
                                isAnimationActive={true}
                                cx="50%"
                                cy="50%"
                                outerRadius='100%'
                            >
                                {
                                    pieChartDatas.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={entry.name}/>)
                                }
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className='liveStockList'>
                            {formValues.map((element, index) => (
                                <div className='liveStockListItem' key={`${element.label}${index}`}>
                                    <div className='liveStockListItemIndex'>{index+1}</div>
                                    <div className='liveStockListItemLabel'>{element.label}</div>
                                    <div className='liveStockListItemName'>{element.name}</div>
                                    <div className='liveStockListItemSector'>{element.sector}</div>
                                </div>
                            ))}
                    </div>
                </Card>

                <div className='panelBar'>
                    <div className='panelBar-element-number'>No.</div>
                    <div className='panelBar-element-stock'>Stock</div>
                    <div className='panelBar-element-companyName'>Company name</div>
                    <div className='panelBar-element-sector'>Sector</div>
                    <div className='panelBar-element-action'>Action</div>
                </div>
                <div className='editPanel'>
                    {formValues.map((element, index) => (
                        <div className='stock-input' key={index}>
                            <div className='panel-element-number'>
                                {index+1}
                            </div>
                            <div className='panel-element-stock'>
                                <Select options={options} value={element} onChange={e => handleChange(index, e)}/>
                            </div>
                            <div className='panel-element-companyName'>
                                {element.name || 'Company name'}
                            </div>
                            <div className='panel-element-sector'>
                                {element.sector || 'Company sector'}
                            </div>
                            <div className='panel-element-action'>
                                <Button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</Button> 
                                {/* <Button type="button" >Browse</Button>  */}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='controlPanel'>
                    <div className="button-section">
                        <Button variant="contained" className="button add" type="button" onClick={() => addFormFields()}>Add Stock</Button>
                        <Button variant="contained" className="button submit" type="submit">Save Portfolio</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
