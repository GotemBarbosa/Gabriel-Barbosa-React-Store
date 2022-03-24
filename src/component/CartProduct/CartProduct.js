import React from "react";
import { connect } from "react-redux";
import * as CartActions from "../../store/actions/Cart";

import arrowLeft from "../../assets/icons/arrow-left-white.svg";
import arrowRight from "../../assets/icons/arrow-right-white.svg";
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
  changeImageIndex(operation) {
    if (operation === "+") {
      if (this.props.item.gallery[this.state.imageIndex + 1] !== undefined) {
        this.setState({ imageIndex: this.state.imageIndex + 1 });
      }
    } else {
      if (this.props.item.gallery[this.state.imageIndex - 1] !== undefined) {
        this.setState({ imageIndex: this.state.imageIndex - 1 });
      }
    }
  }
  showAttributes() {
    return this.props.cartItem.attributes.map((cartItemAttribute) => {
      return this.props.item.attributes.map((itemAttribute) => {
        if (cartItemAttribute.id === itemAttribute.id) {
          return itemAttribute.items.map((itemAttributeSelection, key) => {
            if (cartItemAttribute.selected === key) {
              if (cartItemAttribute.type === "text") {
                return (
                  <div className="Product-Attribute">
                    <div className="Product-Attribute-AttributeText">
                      <button
                        className="Product-Attribute-AttributeText-Option-Selected"
                        key={key}
                      >
                        <p className="Product-Attribute-AttributeText-Option-Text">
                          {itemAttributeSelection.value}
                        </p>
                      </button>
                    </div>
                  </div>
                );
              }
              if (cartItemAttribute.type === "swatch") {
                return (
                  <div className="Product-Attribute">
                    <div className="Product-Attribute-AttributeSwatch">
                      <div className="Product-Attribute-AttributeSwatch-Option" key={key}>
                        <button
                          className="Product-Attribute-AttributeSwatch-Option-Color-Selected"
                          style={{
                            backgroundColor: `${itemAttributeSelection.value}`,
                          }}
                          key={key}
                        />
                        <p className="Product-Attribute-AttributeSwatch-Option-Text">
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
          <div className="Product-Information-Categories">
            {this.showAttributes()}
          </div>
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
              this.props.dispatch(
                CartActions.updateCartQuantity(
                  this.props.index,
                  this.props.cartItem.quantity - 1
                )
              );
            }}
          >
            <img src={minusIcon} alt="minus" />
          </button>
        </div>
        <div className="Product-ImageArea">
          <img
            src={this.props.item.gallery[this.state.imageIndex]}
            className="Product-ImageArea-Image"
          ></img>
          <img
            className="Product-ImageArea-ArrowLeft"
            src={arrowLeft}
            onClick={() => {
              this.changeImageIndex("-");
            }}
          />
          <img
            className="Product-ImageArea-ArrowRight"
            src={arrowRight}
            onClick={() => {
              this.changeImageIndex("+");
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ cartItems: state.cart.cartItems }))(
  CartProduct
);
