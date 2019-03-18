export default function calcBarChart(
    barInitialValue,
    barAnnualContribution,
    barInterestRate,
    barNumYears) 
    {
        /* Computes state.barData. 

        Output
        ------
        Array of objects. Each object has keys: "name", "deposited", "interest"
        All float values rounded to 2 d.p.
        */
        const r = barInterestRate/100
        let barData = [{"name":1, "deposited":barInitialValue, "interest":barInitialValue*r}]
        for (let i=1; i < barNumYears; i++) {
            let oldVal = barData[i-1].deposited
            let oldInterest = barData[i-1].interest
            let newVal = oldVal+barAnnualContribution+oldInterest
            let newInterest = newVal*r
            let newRow = {"name":i+1, "deposited":newVal, "interest":newInterest}
            barData.push(newRow)
        }

        // rounding to 2 dp
        let barData2 = []
        for (let i=0; i < barNumYears; i++) {
            let newRow = {"name": barData[i].name, 
                    "deposited": barData[i].deposited.toFixed(2), 
                    "interest": barData[i].interest.toFixed(2), 
                    }
            barData2.push(newRow)
        }

        return barData2
  }