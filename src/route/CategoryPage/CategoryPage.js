import React from "react";

import { graphql } from "react-apollo";
import { connect } from "react-redux";

import { getProducts } from "../../graphql/Queries";
import ProductCard from "../../component/ProductCard";

import "./CategoryPage.style.scss";

class CategoryPage extends React.Component {
  displayProducts(data) {
    return data.category.products.map((product) => (
      <ProductCard
        key={product.id}
        data={product}
        currency={this.props.activeCurrency}
      />
    ));
  }

  render() {
    const data = this.props.data;
    if (data.loading) {
      return <p>LOADING...</p>;
    }
    return (
      <div className="CategoryPage">
        <div className="CategoryPage-CategoryTitle">
          {this.props.categoryName}
        </div>

        <div className="CategoryPage-Products">
          {this.displayProducts(data)}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  categoryName: state.category.activeCategoryName,
  activeCurrency: state.currency.activeCurrency,
}))(
  graphql(getProducts, {
    options: (props) => {
      return {
        variables: {
          type: props.categoryName,
        },
        fetchPolicy: "no-cache",
      };
    },
  })(CategoryPage)
);
