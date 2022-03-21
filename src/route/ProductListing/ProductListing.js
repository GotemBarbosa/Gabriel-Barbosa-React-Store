import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import { connect } from "react-redux";


import "./ProductListing.style.css";
import ProductCard from "../../component/ProductCard";

const getNewProducts = gql`
  query getProducts($type: String!) {
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
    console.log(data.category.products)
    return data.category.products.map((product) =><ProductCard key={product.id} data={product} currency={this.props.activeCurrency}/>);
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
  activeCurrency: state.currency.activeCurrency
}))(
  graphql(getNewProducts, {
    options: (props) => {
      return {
        variables: {
          type: props.categoryName,
          fetchPolicy: "no-cache" 
        },
      };
    },
  })(ProductListing)
);
