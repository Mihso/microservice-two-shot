import React from 'react'
import { Link } from 'react-router-dom'

function ShoeDelete(props)
{
    const href = props.href

    const fetchConfig ={
        method: 'delete',
        body: JSON.stringify(href),
        headers: {"Content-Type": 'application/json'},
    }
}

export default ShoeDelete