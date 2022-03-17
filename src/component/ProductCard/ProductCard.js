import React from "react";
import { withRouter } from "../../utils/withRouter";
import "./ProductCard.style.css";
import CartIcon from "../../assets/icons/white-cart.svg"

import { connect } from "react-redux";
import * as CartActions from '../../store/actions/Cart';

class ProductCard extends React.Component {
  constructor() {
    super();
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage() {
    this.props.navigate(`/productdescription/${this.props.data.id}`);
  }
  handleAddToCart(e){
    this.props.dispatch(CartActions.addToCart({productId:this.props.data.id, attributes: [], quantity:1}))
    e.stopPropagation()
  }

  render() {
    return (
      <div className="ProductCard" onClick={(e)=>{e.stopPropagation();this.handleChangePage()}}>
        <div className="ProductCard-ImageArea">
          <img
            className="ProductCard-ImageArea-Image"
            src={this.props.data.gallery[0]}
            alt="Product Image"
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
          {this.props.data.attributes.length === 0 ? 
            (this.props.data.inStock===true?
            <button className="ProductCard-Data-AddToCartButton" 
            onClick={(e)=>{this.handleAddToCart(e)}}
            >
              <img
                src={CartIcon}
                className="ProductCard-Data-AddToCartButton-Icon"
                alt="add to cart"
              />
            </button>:
            <button className="ProductCard-Data-AddToCartButton-OutOfStock"  onClick={(e)=>{e.stopPropagation()}}>
              <img
                src={CartIcon}
                className="ProductCard-Data-AddToCartButton-Icon"
                alt="add to cart"
              />
            </button>)
          : null}
          <div
            className={
              this.props.data.inStock
                ? "ProductCard-Data-Name"
                : "ProductCard-Data-Name-OutOfStock"
            }
          >
            {this.props.data.brand} {this.props.data.name}
          </div>
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
export default connect((state) => ({
  activeCurrency: state.currency.activeCurrency,
}))(withRouter(ProductCard));
