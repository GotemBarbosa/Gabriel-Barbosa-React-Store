import React from "react";

import { gql } from "@apollo/client";
import { graphql } from "react-apollo";

import { connect } from "react-redux";

import { withRouter } from "../../utils/withRouter";
import "./ProductDescription.style.css";

const getProduct = gql`
  query ($id: String!) {
    product(id: $id) {
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
`;

class ProductDescription extends React.Component {

  constructor(){
    super()
    this.state={
        currentImage: 0,
        attributes:[]
    }
  }

  showProductImages(data) {
    return data.product.gallery.map((imageURL, key) => (
      <img src={imageURL} key={key} className="ShowcaseOptions-Image" onClick={()=>{this.setState({currentImage: key})}} />
    ));
  }

  showAttributes(data) {
    if (data.product.attributes) {
      return data.product.attributes.map((attribute) => {
        //   const obj = Object.create({id: attribute.id, selected: null})
        if (attribute.type === "text") {
          return (
              <div className="Attribute">
              <p className="Attribute-Title">{attribute.name}:</p>
              <div className="AttributeText">
              {attribute.items.map((item) => (
                <div className="AttributeText-Option">
                  <p className="AttributeText-Option-Text">
                    {item.displayValue}
                  </p>
                </div>
              ))}
              </div>
              </div>
          );
        }
        if (attribute.type === "swatch") {
          return (
            <div className="Attribute" >
            <p className="Attribute-Title">{attribute.name}:</p>
            <div className="AttributeSwatch">
              {attribute.items.map((item) => (
                <div className="AttributeSwatch-Option">
                  <div className="AttributeSwatch-Option-Color" style={{backgroundColor: `${item.value}`}} />
                  <p className="AttributeSwatch-Option-Text">
                    {item.displayValue}
                  </p>
                </div>
              ))}
            </div>
            </div>
          );
        }
      });
    }
    return;
  }

  render() {
    //console.log(this.props.data.product.attributes) //APAGAR DEPOIS ---------------------------------------
    const data = this.props.data;
    if (data.loading) {
      return <div>LOADING...</div>;
    }
    return (
      <div className="ProductDescription">
        <div className="ProductDescription-ImageArea">
          <div className="ProductDescription-ImaegeArea-ShowcaseOptions">
            {this.showProductImages(data)}
          </div>
          <div className="ProductDescription-ImageArea-ShowcaseBig">
            <img
              className="ProductDescription-ShowcaseBig-Image"
              src={data.product.gallery[this.state.currentImage]}
            />
          </div>
        </div>
        <div className="ProductDescription-ProductInformation">
          <div className="ProductDescription-ProductInformation-Indentification">
            <p className="ProductDescription-ProductInformation-Indentification-Brand">
              {data.product.brand}
            </p>
            <p className="ProductDescription-ProductInformation-Indentification-Name">
              {data.product.name}
            </p>
          </div>
          <div className="ProductDescription-ProductInformation-Attributes">
            {this.showAttributes(data)}
          </div>
          <div className="ProductDescription-ProductInformation-PurchaseArea">
            <p className="ProductDescription-ProductInformation-PurchaseArea-Price">
              PRICE:
            </p>
            <p className="ProductDescription-ProductInformation-PurchaseArea-PriceValue">
              {data.product.prices[this.props.activeCurrency].currency.symbol}
              {data.product.prices[this.props.activeCurrency].amount}
            </p>
            <button className="ProductDescription-ProductInformation-PurchaseArea-Button">
              ADD TO CART
            </button>
          </div>
          <div className="ProductDescription-ProductInformation-Description">
            <p
              className="ProductDescription-ProductInformation-Description-Text"
              dangerouslySetInnerHTML={{ __html: data.product.description }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state)=>({
  activeCurrency: state.currency.activeCurrency
}))(withRouter(
  graphql(getProduct, {
    options: (props) => {
      return {
        variables: {
          id: props.match.params.id,
        },
      };
    },
  })(ProductDescription))
);

