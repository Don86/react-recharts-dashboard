import React from "react"

function TableRow (props) {
    return(
        <tr>
        <td>{props.year}</td>
        <td>{props.deposited}</td>
        <td>{props.interest}</td>
        </tr>
    )
}

export default TableRow