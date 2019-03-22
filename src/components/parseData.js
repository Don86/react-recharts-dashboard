export default function parseData(myInput) {
    // processes alpha vantage data into a format for viz
    // 1. Convert object of objects into array of objects
    // create new key: date (originally a key in the first level of objects)
    let newArray = []
    for (var key in myInput) {
        if (myInput.hasOwnProperty(key)) {
            const newRow = Object.assign({"newDate": new Date(key)}, {"Date": key}, myInput[key])
            newArray.push(newRow)
        }
    }
    //console.log(newArray)
    // 2. Generate plotData for d3js
    let newArray2 = []
    for (var i = 0; i < newArray.length; i++) {
      let newRow = Object.assign({"date": newArray[i]["Date"]}, {"a":parseFloat(newArray[i]["4. close"])})
      newArray2.unshift(newRow)
    }
  
    return newArray2
  };