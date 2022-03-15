import React from 'react';
import { connect } from 'react-redux';
import * as CartActions from '../../store/actions/Cart'

import arrowLeft from '../../assets/icons/arrow-left-white.svg'
import arrowRight from '../../assets/icons/arrow-right-white.svg'

import './CartProduct.style.css'


class CartProduct extends React.Component{
    constructor(){
        super()
        this.state={
            imageIndex:0
        }
    }
    changeImageIndex(operation){
        if(operation === '+'){
            if(this.props.item.gallery[this.state.imageIndex + 1] !== undefined){
                this.setState({imageIndex: this.state.imageIndex + 1})
            }
        }else{
            if(this.props.item.gallery[this.state.imageIndex - 1] !== undefined){
                this.setState({imageIndex: this.state.imageIndex - 1})
            }
        }
    }
    showAttributes(){
        return this.props.cartItem.attributes.map((item)=>{
            if(item.type === 'text'){
                return(
                    this.props.item.attributes.map((attribute) => {
                        if(attribute.id===item.id){
                            return(
                                <div className="Attribute">
                                    <div className="AttributeText">
                                        {attribute.items.map((attributeType, key) => (
                                        <button
                                            className={item.selected === key?"AttributeText-Option-Selected":"AttributeText-Option"}
                                            key={key}
                                        >
                                            <p className="AttributeText-Option-Text">{attributeType.displayValue}</p>
                                        </button>
                                        ))} 
                                    </div>
                                </div>
                            )
                        }
                    })
                    
                )
            }
            if(item.type === 'swatch'){
                return(
                    this.props.item.attributes.map((attribute) => {
                        if(attribute.id===item.id){
                            return(
                                <div className="Attribute">
                                    <div className="AttributeSwatch">
                                        {attribute.items.map((attributeType, key) => (
                                        <div className="AttributeSwatch-Option" key={key}>
                                            <button
                                            className={item.selected === key?"AttributeSwatch-Option-Color-Selected":"AttributeSwatch-Option-Color"}
                                            style={{ backgroundColor: `${attributeType.value}` }}
                                            onClick={(()=>{this.changeSelection(key, 'swatch')})}
                                            key={key}
                                            />
                                            <p className="AttributeSwatch-Option-Text">
                                            {attributeType.displayValue}
                                            </p>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                    })
                    
                )
            }
        })
    }
            
    render(){
        return(
            <div className="Product">
                    <div className="Product-Information">
                    <div className="Product-Information-Indentification">
                        <p className="Product-Information-Indentification-Brand">
                          {this.props.item.brand}
                        </p>
                        <p className="Product-Information-Indentification-Name">
                          {this.props.item.name}
                        </p>
                      </div>
                      <div className="Product-Information-Value">
                        <p className="Product-Information-Value-Label">
                          {this.props.item.prices[this.props.activeCurrency].currency.symbol}
                          {this.props.item.prices[this.props.activeCurrency].amount}
                        </p>
                      </div>
                      <div className="Product-Information-Categories">
                          {this.showAttributes()}
                      </div>
                    </div>
                    <div className="Product-Quantity">
                      <button className="Product-Quantity-PlusButton" onClick={()=>{
                        this.props.dispatch(CartActions.updateCartQuantity(this.props.index, this.props.cartItem.quantity + 1))
                      }}>
                        +
                      </button>
                      <p className="Product-Quantity-CurrentQuantity">
                        {this.props.cartItem.quantity}
                      </p>
                      <button className="Product-Quantity-MinusButton"
                      onClick={()=>{
                        this.props.dispatch(CartActions.updateCartQuantity(this.props.index, this.props.cartItem.quantity - 1))
                      }}>
                        -
                      </button>
                    </div>
                    <div className="Product-ImageArea">
                      <img
                        src={this.props.item.gallery[this.state.imageIndex]}
                        className="Product-ImageArea-Image"
                      >
                      </img>
                          <img className='Product-ImageArea-ArrowLeft' src={arrowLeft} onClick={()=>{this.changeImageIndex('-')}}/>
                          <img className='Product-ImageArea-ArrowRight' src={arrowRight} onClick={()=>{this.changeImageIndex('+')}}/>                
                    </div>
                  </div>
        )
    }
}

export default connect((state) => ({cartItems: state.cart.cartItems}))(CartProduct);

