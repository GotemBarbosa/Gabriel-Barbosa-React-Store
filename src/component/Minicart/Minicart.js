import React from "react";
import { connect } from "react-redux";
import * as CartActions from "../../store/actions/Cart";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import { withRouter } from "../../utils/withRouter";

import "./Minicart.styles.scss";
import emptyCartIcon from '../../assets/icons/empty-cart.svg'
import minusIcon from "../../assets/icons/minus.svg";
import plusIcon from "../../assets/icons/plus.svg";

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
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        gallery
        brand
      }
    }
    currencies {
      symbol
      label
    }
  }
`;

class Minicart extends React.Component {
  showAttributes(cartItem, item) {
    return cartItem.attributes.map((cartItemAttribute) => {
      return item.attributes.map((itemAttribute) => {
        if (cartItemAttribute.id === itemAttribute.id) {
          return itemAttribute.items.map((itemAttributeSelection, key) => {
            if (cartItemAttribute.selected === key) {
              if (cartItemAttribute.type === "text") {
                return (
                  <div className="Minicart-Products-Product-Information-Attributes-Attribute" key = {key}>
                    <div className="Minicart-Products-Product-Information-Attributes-Attribute-AttributeText">
                      <button
                        className="Minicart-Products-Product-Information-Attributes-Attribute-AttributeText-Option-Selected"
                        
                      >
                        <p className="Minicart-Products-Product-Information-Attributes-Attribute-AttributeText-Option-Text">
                          {itemAttributeSelection.value}
                        </p>
                      </button>
                    </div>
                  </div>
                );
              }
              if (cartItemAttribute.type === "swatch") {
                return (
                  <div className="Minicart-Products-Product-Information-Attributes-Attribute"  key = {key}>
                    <div className="Minicart-Products-Product-Information-Attributes-Attribute-AttributeSwatch">
                      <div className="Minicart-Products-Product-Information-Attributes-Attribute-AttributeSwatch-Option">
                        <button
                          className="Minicart-Products-Product-Information-Attributes-Attribute-AttributeSwatch-Option-Color-Selected"
                          style={{
                            backgroundColor: `${itemAttributeSelection.value}`,
                          }}
        
                        />
                        <p className="Minicart-Products-Product-Information-Attributes-Attribute-AttributeSwatch-Option-Text">
                          {itemAttributeSelection.displayValue}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }
          });
        }
      });
    });
  }

  showProducts(data) {
    
    return this.props.cartItems.map((cartItem, key) => {
      return data.category.products.map((item) => {
        if(cartItem){
          if (item.id === cartItem.productId && cartItem.quantity !== 0 ) {
            return (
              <div className="Minicart-Products-Product" key={key}>
                <div className="Minicart-Products-Product-Information">
                  <div className="Minicart-Products-Product-Information-Identification">
                    <p className="Minicart-Products-Product-Information-Identification-Brand">
                      {item.brand}
                    </p>
                    <p className="Minicart-Products-Product-Information-Identification-Name">
                      {item.name}
                    </p>
                  </div>
                  <div className="Minicart-Products-Product-Information-Value">
                    <p className="Minicart-Products-Product-Information-Value-Label">
                      {item.prices[this.props.activeCurrency].currency.symbol}
                      {item.prices[this.props.activeCurrency].amount}
                    </p>
                  </div>
                  <div className="Minicart-Products-Product-Information-Attributes">
                    {this.showAttributes(cartItem, item)}
                  </div>
                </div>
                <div className="Minicart-Products-Product-Quantity">
                  <button
                    className="Minicart-Products-Product-Quantity-PlusButton"
                    onClick={() => {
                      this.props.dispatch(
                        CartActions.updateCartQuantity(key, cartItem.quantity + 1)
                      );
                      //localStorage.setItem('CART', JSON.stringify(this.props.cartItems))
                    }}
                  >
                    <img
                      src={plusIcon}
                      className="Minicart-Products-Product-Quantity-PlusButton-Icon"
                      alt="plus"
                    />
                  </button>
                  <p className="Minicart-Products-Product-Quantity-CurrentQuantity">
                    {cartItem.quantity}
                  </p>
                  <button
                    className="Minicart-Products-Product-Quantity-MinusButton"
                    onClick={() => {
                      if(cartItem.quantity == 1){
                        this.props.dispatch(
                          CartActions.deleteInCart(cartItem)
                        );
                        //localStorage.setItem('CART', JSON.stringify(this.props.cartItems))
                      }else{
                        this.props.dispatch(
                          CartActions.updateCartQuantity(key, cartItem.quantity - 1)
                        );
                        //localStorage.setItem('CART', JSON.stringify(this.props.cartItems))
                      }
                    }}
                  >
                    <img
                      src={minusIcon}
                      className="Minicart-Products-Product-Quantity-MinusButton-Icon"
                      alt="minus"
                    />
                  </button>
                </div>
                <div className="Minicart-Products-Product-ImageArea">
                  <img
                    src={item.gallery[0]}
                    className="Minicart-Products-Product-ImageArea-Image"
                    alt="Product"
                  />
                </div>
              </div>
            );
          }
        }
        return null;
      });
    }
    );
  }

  getFullPrice(data) {
    let price = 0;
    this.props.cartItems.map((cartItem) =>
      data.category.products.map((item) => {
        if(cartItem){
          if (item.id === cartItem.productId) {
            return (price +=
              item.prices[this.props.activeCurrency].amount * cartItem.quantity);
          }
        }
      })
    );
    return parseFloat(price).toFixed(2);
  }
  render() {
    const data = this.props.data;
    if (data.loading) {
      return <div>...</div>;
    }
    const fullPrice = this.getFullPrice(data);
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
              <p className="Minicart-Header-Identification">My Bag</p>
              <p className="Minicart-Header-CartItemsCount">
                , {this.props.cartItems.length} items
              </p>
            </div>
            {this.props.cartItems.length === 0?
            <div className="Minicart-EmptyCart">
                <img className="Minicart-EmptyCart-Icon"  src={emptyCartIcon} alt='Empty cart'/>
                <p className="Minicart-EmptyCart-Title">Your Cart is empty  :(</p>
                <p className="Minicart-EmptyCart-Tip">Add some product to the Cart to appear here!</p>
            </div>
            :
            <>
            <div className="Minicart-Products">{this.showProducts(data)}</div>
            <div className="Minicart-TotalPrice">
              <p className="Minicart-TotalPrice-Label">Total</p>
              <p className="Minicart-TotalPrice-Value">
                {this.props.data.currencies[this.props.activeCurrency].symbol}{" "}
                {fullPrice}
              </p>
            </div>
            <div className="Minicart-Functions">
              <button
                className="Minicart-Functions-ViewBagButton"
                onClick={() => {
                  this.props.navigate(`/cart`);
                  this.props.onOutClick();
                }}
              >
                VIEW BAG
              </button>
              <button className="Minicart-Functions-CheckOutButton">
                CHECK OUT
              </button>
            </div>
            </>}
          </div>
        </div>
      </div>
    );
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
})(withRouter(Minicart)));
