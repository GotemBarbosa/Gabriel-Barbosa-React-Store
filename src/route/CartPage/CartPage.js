import React from "react";

import { connect } from "react-redux";
import { graphql } from "react-apollo";

import { getCartData } from "../../graphql/Queries";
import CartProduct from "../../component/CartProduct";

import emptyCart from "../../assets/icons/empty-cart.svg";

import "./CartPage.style.scss";

class CartPage extends React.Component {
  constructor() {
    super();
    this.state = {
      imageIndex: 0,
    };
  }

  showCartProducts() {
    return this.props.cartItems.map((cartItem, key) => {
      return this.props.data.category.products.map((item) => {
        if (item.id === cartItem.productId && cartItem.quantity !== 0) {
          return (
            <CartProduct
              key={key}
              index={key}
              cartItem={cartItem}
              item={item}
              activeCurrency={this.props.activeCurrency}
            />
          );
        }
        return null;
      });
    });
  }
  render() {
    const data = this.props.data;
    if (data.loading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="CartPage">
        {this.props.cartItems.length === 0 ? (
          <div className="CartPage-EmptyCart">
            <img
              className="CartPage-EmptyCart-Icon"
              src={emptyCart}
              alt="Empty cart"
            />
            <p className="CartPage-EmptyCart-Title">Your Cart is empty :(</p>
            <p className="CartPage-EmptyCart-Tip">
              Add some product to the Cart to appear here!
            </p>
          </div>
        ) : (
          <>
            <div className="CartPage-Header">
              <p className="CartPage-Header-Text">CART</p>
            </div>
            <div className="CartPage-Products">{this.showCartProducts()}</div>
          </>
        )}
      </div>
    );
  }
}

export default connect((state) => ({
  cartItems: state.cart.cartItems,
  activeCurrency: state.currency.activeCurrency,
}))(
  graphql(getCartData, {
    options: () => {
      return {
        fetchPolicy: "no-cache",
      };
    },
  })(CartPage)
);
