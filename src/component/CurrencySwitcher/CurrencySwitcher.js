import React from 'react';

import { gql } from "@apollo/client";
import {graphql} from 'react-apollo';

import { connect } from 'react-redux';

import * as CurrencyActions from '../../store/actions/Currency'

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
    handleChangeActiveCurrency(key){
        this.props.dispatch(CurrencyActions.changeCurrency(key))
    }

    displayCurrencies(){
        const data = this.props.data
        if(data.loading){
            return(<div>Loading...</div>)
        }
        return data.currencies.map((currency, key) =>{
            return(
        <button key={key} className='CurrencySwitcher-btn' onClick={()=>{this.handleChangeActiveCurrency(key)}}>{currency.symbol} {currency.label}</button>
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

export default connect(state=>({currency: state.currency}))(graphql(getCurrencies)(CurrencySwitcher))

