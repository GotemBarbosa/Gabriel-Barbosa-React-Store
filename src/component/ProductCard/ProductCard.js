import React from "react";
import "./ProductCard.style.css";
import { withRouter } from "../../utils/withRouter";


class ProductCard extends React.Component {
  constructor(){
    super()
    this.handleChangePage=this.handleChangePage.bind(this);
  }

  handleChangePage(){
    this.props.navigate(`/productdescription/${this.props.data.id}`)
  }

  render() {
    return (
        <div className="ProductCard" onClick={this.handleChangePage}>
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
                {this.props.data.prices[this.props.currency].currency.symbol} {" "}
                {this.props.data.prices[this.props.currency].amount}
            </div>
            </div>
        </div>
      
    );
  }
}
export default withRouter(ProductCard);
