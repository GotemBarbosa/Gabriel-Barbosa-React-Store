import React from "react";

import { connect } from "react-redux";

import * as CartActions from "../../store/actions/Cart";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import minusIcon from "../../assets/icons/minus.svg";
import plusIcon from "../../assets/icons/plus.svg";

import "./CartProduct.style.scss";

class CartProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      imageIndex: 0,
    };
  }

  changeImage(operation) {
    if (operation === "+") {
      if (this.props.item.gallery[this.state.imageIndex + 1] !== undefined) {
        this.setState({ imageIndex: this.state.imageIndex + 1 });
      } else {
        this.setState({ imageIndex: 0 });
      }
    } else {
      if (this.props.item.gallery[this.state.imageIndex - 1] !== undefined) {
        this.setState({ imageIndex: this.state.imageIndex - 1 });
      } else {
        this.setState({ imageIndex: this.props.item.gallery.length - 1 });
      }
    }
  }

  showAttributes() {
    return this.props.cartItem.attributes.map((cartItemAttribute, index) => (
      <div className="Product-Information-Attributes" key={index}>
        <p className="Product-Information-Attributes-Name">
          {cartItemAttribute.id}:
        </p>
        {this.props.item.attributes.map((itemAttribute) => {
          if (cartItemAttribute.id === itemAttribute.id) {
            return itemAttribute.items.map((itemAttributeSelection, key) => {
              if (cartItemAttribute.type === "text") {
                return (
                  <div
                    className="Product-Information-Attributes-Attribute"
                    key={itemAttributeSelection.id}
                  >
                    <div className="Product-Information-Attributes-Attribute-AttributeText">
                      <button
                        className={
                          cartItemAttribute.selected === key
                            ? "Product-Information-Attributes-Attribute-AttributeText-Option-Selected"
                            : "Product-Information-Attributes-Attribute-AttributeText-Option"
                        }
                        key={key}
                      >
                        <p className="Product-Information-Attributes-Attribute-AttributeText-Option-Text">
                          {itemAttributeSelection.value}
                        </p>
                      </button>
                    </div>
                  </div>
                );
              }
              if (cartItemAttribute.type === "swatch") {
                return (
                  <div
                    className="Product-Information-Attributes-Attribute"
                    key={itemAttributeSelection.id}
                  >
                    <div className="Product-Information-Attributes-Attribute-AttributeSwatch">
                      <div
                        className="Product-Information-Attributes-Attribute-AttributeSwatch-Option"
                        key={key}
                      >
                        <button
                          className={
                            cartItemAttribute.selected === key
                              ? "Product-Information-Attributes-Attribute-AttributeSwatch-Option-Color-Selected"
                              : "Product-Information-Attributes-Attribute-AttributeSwatch-Option-Color"
                          }
                          style={{
                            backgroundColor: `${itemAttributeSelection.value}`,
                          }}
                          key={key}
                        />
                        <p className="Product-Information-Attributes-Attribute-AttributeSwatch-Option-Text">
                          {itemAttributeSelection.displayValue}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            });
          }
          return null;
        })}
      </div>
    ));
  }

  render() {
    return (
      <div className="Product">
        <div className="Product-Information">
          <div className="Product-Information-Identification">
            <p className="Product-Information-Identification-Brand">
              {this.props.item.brand}
            </p>
            <p className="Product-Information-Identification-Name">
              {this.props.item.name}
            </p>
          </div>
          <div className="Product-Information-Value">
            <p className="Product-Information-Value-Label">
              {
                this.props.item.prices[this.props.activeCurrency].currency
                  .symbol
              }
              {this.props.item.prices[this.props.activeCurrency].amount}
            </p>
          </div>
          {this.showAttributes()}
        </div>
        <div className="Product-Quantity">
          <button
            className="Product-Quantity-PlusButton"
            onClick={() => {
              this.props.dispatch(
                CartActions.updateCartQuantity(
                  this.props.index,
                  this.props.cartItem.quantity + 1
                )
              );
            }}
          >
            <img src={plusIcon} alt="plus" />
          </button>
          <p className="Product-Quantity-CurrentQuantity">
            {this.props.cartItem.quantity}
          </p>
          <button
            className="Product-Quantity-MinusButton"
            onClick={() => {
              if (this.props.cartItem.quantity === 1) {
                this.props.dispatch(
                  CartActions.deleteInCart(this.props.cartItem)
                );
              } else {
                this.props.dispatch(
                  CartActions.updateCartQuantity(
                    this.props.index,
                    this.props.cartItem.quantity - 1
                  )
                );
              }
            }}
          >
            <img src={minusIcon} alt="minus icon" />
          </button>
        </div>
        <div className="Product-ImageArea">
          <img
            src={this.props.item.gallery[this.state.imageIndex]}
            className="Product-ImageArea-Image"
            alt="Product"
          ></img>
          <img
            className="Product-ImageArea-ArrowLeft"
            src={arrowLeft}
            alt="ArrowLeft"
            onClick={() => {
              this.changeImage("-");
            }}
          />
          <img
            className="Product-ImageArea-ArrowRight"
            src={arrowRight}
            alt="ArrowLeft"
            onClick={() => {
              this.changeImage("+");
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  cartItems: state.cart.cartItems,
}))(CartProduct);
