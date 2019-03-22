export default function standardDeviation(inputArray) {
    //Should check that all values in inputArray are floats/integers
    const sum = inputArray.reduce((accumulator, currentVal) => accumulator += currentVal);
    const avg = sum/inputArray.length
    const squareArray = inputArray.map(x => Math.pow((x - avg), 2))
    const sd = Math.sqrt((squareArray.reduce((accumulator, currentVal)=>accumulator += currentVal))/(inputArray.length - 1))

    return sd
};