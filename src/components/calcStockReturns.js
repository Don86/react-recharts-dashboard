import standardDeviation from "./standardDeviation"

export default function calcStockReturns(inputArr) {
    let returnsArray = [] //array of 1-year returns
    //let returnsArray10 = [] //array of 10-year returns
    for (let i=0; i < inputArr.length; i++) {
        let currentYear = +inputArr[i].date.split("-")[0]
        let currentMth = +inputArr[i].date.split("-")[1]
        let currentVal = +inputArr[i].a
        let j = i+1
        if (j < inputArr.length) {
            for (let j=i+1; j < inputArr.length; j++) {
                let nextYear = +inputArr[j].date.split("-")[0]
                let nextMonth = +inputArr[j].date.split("-")[1]
                if (nextYear === currentYear+1 && nextMonth === currentMth) {
                    let nextVal = +inputArr[j].a
                    let annualReturn = (nextVal - currentVal)/currentVal
                    //console.log(currentYear, currentMth, nextYear, nextMonth, currentVal, nextVal, annualReturn)
                    returnsArray.push(annualReturn)
                }
            }
        }
    }
  
    const sum = returnsArray.reduce((prev, current)=> current += prev);
    return {"N":inputArr.length,
            "avg_return":sum/returnsArray.length, 
            "sd":standardDeviation(returnsArray), 
            }
}