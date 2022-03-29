import React from "react";
import { graphql } from "react-apollo";

import { connect } from "react-redux";
import { getProducts } from "../../graphql/Queries";

import "./ProductListing.style.scss";
import ProductCard from "../../component/ProductCard";

class ProductListing extends React.Component {

  displayProducts() {
    const data = this.props.data;
    if (data.loading) {
      return <div>...</div>;
    }
    return data.category.products.map((product) =><ProductCard key={product.id} data={product} currency={this.props.activeCurrency}/>);
  }

  render() {
''
    return (
      <div className="ProductListing">
        <div className="ProductListing-CategoryTitle">
          {this.props.categoryName}
        </div>

        <div className="ProductListing-Products">{this.displayProducts()}</div>
      </div>
    );
  }
}

export default connect((state) => ({
  categoryName: state.category.activeCategoryName,
  activeCurrency: state.currency.activeCurrency
}))(
  graphql(getProducts, {
    options: (props) => {
      return {
        variables: {
          type: props.categoryName,
        },
        fetchPolicy: "no-cache" 
      };
    },
  })(ProductListing)
);
