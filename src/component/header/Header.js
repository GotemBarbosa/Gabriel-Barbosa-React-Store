import React from 'react';
import { useQuery, gql } from "@apollo/client";
import {graphql} from 'react-apollo';

import './Header.style.css'
import CategoryButton from '../CategoryButton';
import Logo from '../../assets/images/logo.svg';
import ArrowDown from '../../assets/icons/arrow-down.svg'
import ArrowUp from '../../assets/icons/arrow-up.svg'
import Cart from '../../assets/icons/cart.svg'

const getCatogories = gql`
    {
        categories{
            name
        }
    }
`

class Header extends React.Component{

    constructor(){
        super();
        this.state={
            categorySelected: 0,
            optionPricesSelected: false,
        }
    }

    displayCategories(){
        const data = this.props.data
        if(data.loading){
            return(<div>...</div>)
        }
        return data.categories.map((category, key) =>{
            return(
                <CategoryButton active={this.state.categorySelected === key? true:false} name={category.name} onClick={()=>{this.setState({categorySelected: key})}}></CategoryButton>
            )
        })
    }
    showPricesChangeOptions(){
        this.setState({optionPricesSelected: !this.state.optionPricesSelected})
        console.log('clicou')
    }
    render(){
        return(    
            <div className='Header'>
            <div className='Categories'>
                {this.displayCategories()}
            </div>    
            <div className='Logo'>
                <img className='Logo-Image' src={Logo}></img>
            </div>

            <div className='Options'>
                <div className="Options-Prices">
                    <button className='Options-Prices-btn' onClick={()=>{this.showPricesChangeOptions()}}>
                        <div className='Options-Prices-btn-Label'>
                            $ 
                        </div>
                        <div className='Options-Prices-btn-Indicator'>
                            {this.state.optionPricesSelected===true?
                            <img className='Options-Prices-btn-Indicator-Arrow' src={ArrowUp}/>:
                            <img className='Options-Prices-btn-Indicator-Arrow' src={ArrowDown}/>
                            }
                        </div>
                    </button>    
                </div>
                <div className='Options-Cart'>
                    <div className='Options-Cart-btn'>
                        <img className='Option-Cart-btn-Indicator' src={Cart}></img>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default graphql(getCatogories)(Header)