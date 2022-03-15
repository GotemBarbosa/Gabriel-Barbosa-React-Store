import React from "react";

import { gql } from "@apollo/client";
import { graphql } from "react-apollo";

import { connect } from "react-redux";
import * as CartActions from '../../store/actions/Cart'

import { withRouter } from "../../utils/withRouter";
import ItemAttribute from "../../component/ItemAttribute";
import "./ProductDescription.style.css";

const getProduct = gql`
  query ($id: String!) {
    product(id: $id) {
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
`;

class ProductDescription extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      attributes: [],
    };
    this.attributesData = this.attributesData.bind(this)
  }
  showProductImages(data) {
    return data.product.gallery.map((imageURL, key) => (
      <img
        src={imageURL}
        key={key}
        className="ShowcaseOptions-Image"
        alt="ShowCase Option image"
        onClick={() => {
          this.setState({ currentImage: key });
        }}
      />
    ));
  }
  attributesData(data){
    if(this.state.attributes){
      let getSameItem = false
      let itemKey = null
      this.state.attributes.map((item,key)=>{
        if(item.id === data.id){
          getSameItem = true
          itemKey = key
        }
      })
      if(getSameItem === true){
        const tempAttributes = this.state.attributes
        tempAttributes.splice(itemKey,1,data)
        this.setState({attributes: tempAttributes})
      }else{
        this.setState({
          attributes: [...this.state.attributes, data]
        })
      }
    }else{
      this.setState({
        attributes: [data]
      })
    }

  }

  showAttributes(data) {
      if(data.product.attributes.length === 0){
        return null
      }else{
        return data.product.attributes.map((attribute, key) => {
          return <ItemAttribute attribute={attribute} key={key} id={attribute.id} attributesData={this.attributesData}/>;
        }); 
      }
  }
  addToCart(data){
    let errorFinder = false
    
    if(data.product.attributes.length !== 0){
      if(data.product.attributes.length !== this.state.attributes.length){
        return alert('erro')
      }else{
        this.state.attributes.map((item)=>{
          if(item.selected === null){
            errorFinder = true
            return alert('erro2')
          }
        })
        if(!errorFinder){
          this.props.dispatch(CartActions.addToCart({productId:data.product.id, attributes: this.state.attributes, type: this.state.type, quantity:1}))
        }
      }
    }else{
      this.props.dispatch(CartActions.addToCart({productId:data.product.id, attributes: [], quantity:1}))
    }
  }

  render() {
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
              alt="ShowCase Big"
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
            <button className="ProductDescription-ProductInformation-PurchaseArea-Button" onClick={()=>{this.addToCart(data)}}>
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

export default connect((state) => ({
  activeCurrency: state.currency.activeCurrency,
}))(
  withRouter(
    graphql(getProduct, {
      options: (props) => {
        return {
          variables: {
            id: props.match.params.id,
          },
        };
      },
    })(ProductDescription)
  )
);
