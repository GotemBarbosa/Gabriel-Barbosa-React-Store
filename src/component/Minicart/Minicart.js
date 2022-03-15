import React from "react";
import { connect } from "react-redux";
import * as CartActions from '../../store/actions/Cart'
import { gql } from "@apollo/client";
import { graphql } from "react-apollo";

import { withRouter } from "../../utils/withRouter";

import "./Minicart.styles.css";

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
      }
    }
    currencies{
        symbol
        label
      }
  }
`;

class Minicart extends React.Component {
  showProducts(data) {
    return this.props.cartItems.map((cartItem, key) => {
      return data.category.products.map((item) => {
        if ((item.id === cartItem.productId) && (cartItem.quantity !== 0)) {
          return (
            <div className="Minicart-Products-Product" key={key}>
              <div className="Minicart-Products-Product-Information">
                <div className="Minicart-Products-Product-Information-Indentification">
                  <p className="Minicart-Products-Product-Information-Indentification-Brand">
                    {item.brand}
                  </p>
                  <p className="Minicart-Products-Product-Information-Indentification-Name">
                    {item.name}
                  </p>
                </div>
                <div className="Minicart-Products-Product-Information-Value">
                  <p className="Minicart-Products-Product-Information-Value-Label">
                    {item.prices[this.props.activeCurrency].currency.symbol}
                    {item.prices[this.props.activeCurrency].amount}
                  </p>
                </div>
                <div className="Minicart-Products-Product-Information-Categories"></div>
              </div>
              <div className="Minicart-Products-Product-Quantity">
                <button className="Minicart-Products-Product-Quantity-PlusButton" onClick={()=>{
                    this.props.dispatch(CartActions.updateCartQuantity(key, cartItem.quantity + 1))
                }}>
                  +
                </button>
                <p className="Minicart-Products-Product-Quantity-CurrentQuantity">
                  {cartItem.quantity}
                </p>
                <button className="Minicart-Products-Product-Quantity-MinusButton"
                onClick={()=>{
                    this.props.dispatch(CartActions.updateCartQuantity(key, cartItem.quantity - 1))
                }}>
                  -
                </button>
              </div>
              <div className="Minicart-Products-Product-ImageArea">
                <img
                  src={item.gallery[0]}
                  className="Minicart-Products-Product-ImageArea-Image"
                  alt='Product'
                />
              </div>
            </div>
          );
        }
        return null;
      });
    });
  }

  getFullPrice(data) {
    let price = 0
    this.props.cartItems.map((cartItem)=>(
        data.category.products.map((item)=>{
            if (item.id === cartItem.productId) {
               return price += (item.prices[this.props.activeCurrency].amount * cartItem.quantity) 
            }
        })
    ))
    return parseFloat(price).toFixed(2)
  }
  render() {
    const data = this.props.data;
    if (data.loading) {
      return <div>...</div>;
    }
    const fullPrice = this.getFullPrice(data)
    return (
      <div className="Minicart">
        <div
          className="Minicart-ScreenBackground"
          onClick={this.props.onOutClick}
        >
          <div
            className="Minicart-ScreenBackground-Overlay"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="Minicart-Header">
              <p className="Minicart-Header-Indentificantion">My Bag</p>
              <p className="Minicart-Header-CartItemsCount">
                , {this.props.cartItems.length} items
              </p>
            </div>
            <div className="Minicart-Products">{this.showProducts(data)}</div>
            <div className="Minicart-TotalPrice">
              <p className="Minicart-TotalPrice-Label">Total</p>
              <p className="Minicart-TotalPrice-Value">{this.props.data.currencies[this.props.activeCurrency].symbol} {fullPrice}</p>
            </div>
            <div className="Minicart-Functions">
              <button className="Minicart-Functions-ViewBagButton" onClick={()=>{this.props.navigate(`/cart`); this.props.onOutClick()}}>
                VIEW BAG
              </button>
              <button className="Minicart-Functions-CheckOutButton">
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  cartItems: state.cart.cartItems,
  activeCurrency: state.currency.activeCurrency,
}))(graphql(getData)(withRouter(Minicart)));
