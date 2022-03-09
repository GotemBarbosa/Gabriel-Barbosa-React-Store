import React from "react";
import { gql } from "@apollo/client";
import { graphql } from "react-apollo";

import { connect } from "react-redux";


import "./ProductListing.style.css";
import ProductCard from "../../component/ProductCard";

const getNewProducts = gql`
  query ($type: String!) {
    category(input: { title: $type }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
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
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

class ProductListing extends React.Component {

  displayProducts() {
    const data = this.props.data;
    if (data.loading) {
      return <div>...</div>;
    }
    return data.category.products.map((product, key) =><ProductCard key={product.id} data={product}/>);
  }

  render() {
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
}))(
  graphql(getNewProducts, {
    options: (props) => {
      return {
        variables: {
          type: props.categoryName,
        },
      };
    },
  })(ProductListing)
);
