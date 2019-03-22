import React, { Component } from 'react';
import './App.css';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
//import _ from 'lodash';
import axios from 'axios';

import calcBarChart from "./components/calcBarChart"
import TableRow from "./components/TableRow"
//import TopBar from "./components/TopBar"
//import standardDeviation from "./components/standardDeviation"
import calcStockReturns from "./components/calcStockReturns"
import parseData from "./components/parseData"


class App extends Component {
  constructor() {
    super()
    this.state = {
      barStartVal: 20000,
      barIncrement: 5000,
      barInterestRate: 3,
      barNumYears: 10,
      barData: [
      {name: '1', "deposit": 4000, "interest": 0,},
      {name: '2', "deposit": 3000, "interest": 0,},
      {name: '3', "deposit": 2000, "interest": 0,},
      {name: '4', "deposit": 2780, "interest": 0,},
      {name: '5', "deposit": 1890, "interest": 0,},
      {name: '6', "deposit": 2390, "interest": 0,},
      {name: '7', "deposit": 3490, "interest": 0,},
      ],
      ticker0:"",
      ticker1:"",
      lineData: [{date: '1', a: 0},
                {date: '2', a: 0},
                {date: '3', a: 0},
                {date: '4', a: 0},
                {date: '5', a: 0},
                {date: '6', a: 0}],
      returnsObj: {"avg_return": 0, "sd": 0, "N": 0}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleStockSubmit = this.handleStockSubmit.bind(this)
    this.handleStockChange = this.handleStockChange.bind(this)
  }

  handleChange(event) {
    event.target.name === "ticker" ? this.setState({[event.target.name]: event.target.value}) 
    : this.setState({[event.target.name]: parseFloat(event.target.value)})
  }

  handleSubmit(event) {
    const newBarData = calcBarChart(this.state.barStartVal,
      this.state.barIncrement,
      this.state.barInterestRate,
      this.state.barNumYears)
      this.setState({barData: newBarData})
    event.preventDefault();
  }

  /*
  handleStockChange(event) {
    this.setState({"ticker": event.target.value}) 
    if (event.target.name === "ticker") {
      const api_key = "EEKL6B77HNZE6EB4"
      const ticker = event.target.value

      fetch("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol="+ticker+"&apikey="+api_key)
      .then(response => response.json())
      .then(data => parseData(data["Monthly Time Series"]))
      .then(data => console.log(data))
      .then(data =>{this.setState({lineData:data})})
    }
  }

  handleStockSubmit() {
  }
  */


  handleStockChange(e) {
    this.setState({
      ticker0: e.target.value
    });
    console.log("handleStockChange: ", e.target.value)
  }

  handleStockSubmit(e) {
    if(e) e.preventDefault();
    this.setState({
      ticker0: '',
      ticker1: this.state.ticker0
    });

    let term = this.state.ticker0;
    const api_key = 'EEKL6B77HNZE6EB4';
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol="+term+"&apikey="+api_key

    axios.get(url)
    .then(response => {
      //console.log(response.data);
      let lineData = parseData(response.data["Monthly Time Series"]);
      let returnsObj = calcStockReturns(lineData)
      console.log(returnsObj);
      this.setState((state, props) => {
        return {
          ...state,
          lineData,
          returnsObj
        }
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    // compute TblArray to be displayed as table
    const TblArray = this.state.barData.map(row => <TableRow key={row.name} 
      year={row.name} 
      deposited={row.deposited}
      interest={row.interest}/>)

    // Compute final total values of deposited amounts and earned interest
    const totalDeposited = this.state.barStartVal + (this.state.barIncrement*this.state.barNumYears)
    let interestArray = []
    let totalInterest = 0
    for (let i=0; i<this.state.barData.length; i++) {
      interestArray.push(+this.state.barData[i].interest)
      totalInterest += +this.state.barData[i].interest
    }
    totalInterest = parseFloat(totalInterest.toFixed(2))

    return (
      <div>
        <div className="h1">Compound Interest Calculator</div>
      <div className="container">
        <form id="form1" className="card" onSubmit={this.handleSubmit}>
          <label>Initial Deposit </label><br />
          <input className="input" name="barStartVal" type="number" placeholder="20000" onBlur={this.handleChange} />
          <br />
          <label>Annual contribution </label><br />
          <input className="input" name="barIncrement" type="number" placeholder="5000" onBlur={this.handleChange} />
          <br />
          <label>Interest Rate (%) </label><br />
          <input className="input" name="barInterestRate" type="number" placeholder="3.00" onBlur={this.handleChange} min="0.00" step="0.001" />
          <br />
          <label>Number of years </label><br />
          <input className="input" name="barNumYears" type="number" placeholder="10" onBlur={this.handleChange} />
          <br />
          <input className="inputBtn" type="submit" value="Submit" />
        </form>

        <BarChart className="card"
                  width={500}
                  height={350}
                  data={this.state.barData}
                  margin={{top: 20, right: 10, left: 10, bottom: 5,}}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="deposited" stackId="a" fill="#00A6FF" />
          <Bar dataKey="interest" stackId="a" fill="#25DC41" />
        </BarChart>

        <div className="card form3">
        <table className="fixed_header">
            <tbody>
              <tr>
                <th>Year</th>
                <th>Deposited</th>
                <th>Interest</th>
              </tr>
            {TblArray}
            </tbody>
          </table>
          <br />
          <div className="textMed">Total Amount Deposited</div>
          <div className="textSmall">{totalDeposited}</div>
          <br />
          <div className="textMed">Total Interest Earned</div>
          <div className="textSmall">{totalInterest}</div>
        </div>
      </div>

      <div>
        <div className="h1">Stock Index</div>
        <div className="container">
          <form id="form2" className="card">
            <input className="input"
                  placeholder="stock symbol"
                  value={ this.state.ticker0 }
                  onChange={ this.handleStockChange } />
            <br />
            <button className="inputBtn" 
                    onClick={ this.handleStockSubmit }>
                    Submit
            </button>
          </form>

          <LineChart className="card"
                    width={500}
                    height={350}
                    data={this.state.lineData}
                    margin={{top: 20, right: 10, left: 10, bottom: 5,}}>
                    >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="a" stroke="#8884d8" activeDot={{ r: 3 }} />
          </LineChart>

          <div className="card form3">
            <div className="textMed">Average 1-yr Return</div>
            <div className="textSmall">{parseFloat(this.state.returnsObj.avg_return.toFixed(5))}</div>
            <br />
            <div className="textMed">Standard Deviation</div>
            <div className="textSmall">{parseFloat(this.state.returnsObj.sd.toFixed(5))}</div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;