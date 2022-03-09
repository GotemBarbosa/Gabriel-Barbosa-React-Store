import React from "react";
import "./ProductCard.style.css";
import {Link} from 'react-router-dom'


class ProductCard extends React.Component {

  render() {

    return (
      <Link to={`/productdescription/${this.props.data.id}`}>
        <div className="ProductCard">
            <div className="ProductCard-ImageArea">
            <img
            className="ProductCard-ImageArea-Image"
            src={this.props.data.gallery[0]}
            alt="Product Image"
            />
            </div>
            <div className="ProductCard-Data">
            <div className="ProductCard-Data-Name">{this.props.data.name}</div>
            <div className="ProductCard-Data-Price">
                {this.props.data.prices[0].currency.symbol} {" "}
                {this.props.data.prices[0].amount}
            </div>
            </div>
        </div>
      </Link>
    );
  }
}
export default ProductCard;
