import React from 'react';
import { connect } from 'react-redux';

import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import CartProduct from '../../component/CartProduct';
import emptyCart from '../../assets/icons/empty-cart.svg'
import './Cart.style.scss'

const getData = gql`
  {
    category {
      products {
        id
        name
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        gallery
        brand
        attributes{
            id
            name
            type
            items{
                displayValue
                value
                id
            }
        }
      }
    }
    currencies{
        symbol
        label
      }
  }
`;


class Cart extends React.Component{

    constructor(){
        super()
        this.state={
            imageIndex: 0
        }
    }

    showCartProducts(){
        return this.props.cartItems.map((cartItem, key) => {
            return this.props.data.category.products.map((item) => {
              if ((item.id == cartItem.productId) &&cartItem.quantity != 0) {
                return (
                  <CartProduct key={key} index={key} cartItem={cartItem} item={item} activeCurrency={this.props.activeCurrency}/>
                );
              }
              return;
            });
          }); 
    }
    render(){
        const data = this.props.data;
            if (data.loading) {
            return <div>...</div>;
        }
        return(
            <div className='Cart'>
                {this.props.cartItems.length === 0?
                <div className='Cart-EmptyCart'>
                  <img className="Cart-EmptyCart-Icon"  src={emptyCart} alt='Empty cart'/>
                  <p className='Cart-EmptyCart-Title'>Your Cart is empty :(</p>
                  <p className='Cart-EmptyCart-Tip'>Add some product to the Cart to appear here!</p>
                </div>:
                <>
                <div className='Cart-Header'>
                    <p className='Cart-Header-Text'>CART</p>
                </div>
                <div className='Cart-Products'>
                    {this.showCartProducts()}
                </div>
                </>
              }
            </div>
        )
    }
}

export default connect((state) => ({
    cartItems: state.cart.cartItems,
    activeCurrency: state.currency.activeCurrency,
  }))(graphql(getData,{
    options: ()=>{
      return{
        fetchPolicy: "no-cache" 
      }
    }
  })(Cart));
  