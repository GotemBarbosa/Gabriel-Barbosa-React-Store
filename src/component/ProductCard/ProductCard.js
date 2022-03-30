import React from "react";

import { connect } from "react-redux";

import * as CartActions from "../../store/actions/Cart";
import { withRouter } from "../../utils/withRouter";
import Notification from "../Notification";

import CartIcon from "../../assets/icons/white-cart.svg";
import checkIcon from "../../assets/images/check.png";

import "./ProductCard.style.scss";

class ProductCard extends React.Component {
  constructor() {
    super();
    this.state = {
      notificationData: {},
      showNotification: false,
    };
  }

  closeNotification(e) {
    this.setState({ showNotification: false });
    e.stopPropagation();
  }

  changePage() {
    this.props.navigate(`/product/${this.props.data.id}`);
  }

  addToCart(e) {
    this.setState({
      notificationData: {
        title: "Success",
        description: ` ${this.props.data.name} added to the cart`,
        color: "#5ece7b",
        icon: checkIcon,
      },
      showNotification: true,
    });
    this.props.dispatch(
      CartActions.addToCart({
        productId: this.props.data.id,
        attributes: [],
        quantity: 1,
      })
    );
    e.stopPropagation();
  }

  showSwatch() {
    return this.props.data.attributes.map((attribute, key) =>
      attribute.type === "swatch" ? (
        <div className="ProductCard-Data-Swatch" key={key}>
          {attribute.items.map((item) => (
            <div
              className={
                this.props.data.inStock
                  ? "ProductCard-Data-Swatch-Color"
                  : "ProductCard-Data-Swatch-Color-OutOfStock"
              }
              key={item.id}
              style={{ backgroundColor: `${item.value}` }}
            />
          ))}
        </div>
      ) : null
    );
  }

  render() {
    return (
      <div
        className={
          this.props.data.attributes.length === 0
            ? "ProductCard-AddEnabled"
            : "ProductCard"
        }
        onClick={(e) => {
          e.stopPropagation();
          this.changePage();
        }}
      >
        {this.state.showNotification ? (
          <Notification
            data={this.state.notificationData}
            onClose={(e) => {
              this.closeNotification(e);
            }}
          />
        ) : null}
        <div className="ProductCard-ImageArea">
          <img
            className="ProductCard-ImageArea-Image"
            src={this.props.data.gallery[0]}
            alt="Product"
          />
          {this.props.data.inStock ? null : (
            <div className="ProductCard-ImageArea-OutOfStock">
              <p className="ProductCard-ImageArea-OutOfStock-Text">
                OUT OF STOCK
              </p>
            </div>
          )}
        </div>
        <div className="ProductCard-Data">
          {this.props.data.attributes.length === 0 ? (
            this.props.data.inStock === true ? (
              <button
                className="ProductCard-Data-AddToCartButton"
                onClick={(e) => {
                  this.addToCart(e);
                }}
              >
                <img
                  src={CartIcon}
                  className="ProductCard-Data-AddToCartButton-Icon"
                  alt="add to cart"
                />
              </button>
            ) : (
              <button
                className="ProductCard-Data-AddToCartButton-OutOfStock"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <img
                  src={CartIcon}
                  className="ProductCard-Data-AddToCartButton-Icon"
                  alt="add to cart"
                />
              </button>
            )
          ) : null}
          <div
            className={
              this.props.data.inStock
                ? "ProductCard-Data-Name"
                : "ProductCard-Data-Name-OutOfStock"
            }
          >
            {this.props.data.brand} {this.props.data.name}
          </div>
          {this.showSwatch()}
          <div
            className={
              this.props.data.inStock
                ? "ProductCard-Data-Price"
                : "ProductCard-Data-Price-OutOfStock"
            }
          >
            {this.props.data.prices[this.props.currency].currency.symbol}{" "}
            {this.props.data.prices[this.props.currency].amount}
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(withRouter(ProductCard));
