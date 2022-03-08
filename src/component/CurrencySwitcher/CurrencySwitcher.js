import React from 'react';

import { gql } from "@apollo/client";
import {graphql} from 'react-apollo';

import './CurrencySwitcher.style.css'

const getCurrencies = gql`
    {
        currencies{
            symbol
            label
        }
    }
`


class CurrencySwitcher extends React.Component{

    displayCurrencies(){
        const data = this.props.data
        if(data.loading){
            return(<div>Loading...</div>)
        }
        return data.currencies.map((currency, key) =>{
            return(
                <button key={key} className='CurrencySwitcher-btn'>{currency.symbol} {currency.label}</button>
            )
        })
    }
    render(){
        return(
            <div className='CurrencySwitcher'>
                {this.displayCurrencies()}
            </div>
        )
    }
}

export default graphql(getCurrencies)(CurrencySwitcher)