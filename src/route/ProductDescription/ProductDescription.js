import React from "react";

import { graphql } from "react-apollo";

import { connect } from "react-redux";
import * as CartActions from "../../store/actions/Cart";

import { withRouter } from "../../utils/withRouter";
import ItemAttribute from "../../component/ItemAttribute";
import "./ProductDescription.style.scss";
import errorIcon from "../../assets/images/error.png";
import checkIcon from "../../assets/images/check.png";
import Notification from "../../component/Notifcation";
import { getProduct } from "../../graphql/Queries";

class ProductDescription extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      notificationData: {},
      showNotification: false,
    };
    this.attributes = [];
    
  }

  handleCloseNotification() {
    this.setState({ showNotification: false });
  }

  showProductImages(data) {
    return data.product.gallery.map((imageURL, key) => (
      <img
        src={imageURL}
        key={key}
        className="ProductDescription-ImageArea-ShowcaseOptions-Image"
        alt="ShowCase Option image"
        onClick={() => {
          this.setState({ currentImage: key });
        }}
      />
    ));
  }

  getSelections(selection){
    let sameId = false //get if a value is already stored, to overwrite it later
    let itemKey = null //index of this repeated attribute

    if(this.attributes.length != 0){
      this.attributes.map((item, key)=>{
        if(item.id === selection.id){
          sameId = true;
          itemKey = key;
        }
      })
      if(sameId){
        const tempAttributes = [...this.attributes];
        tempAttributes.splice(itemKey,1, selection)
        this.attributes = tempAttributes

      }else{
        this.attributes = [...this.attributes, selection]
      }
    }else{
      this.attributes = [selection]
    }

    // this.attributes = [{selection: selection}]

  }

  showAttributes(data){
    //there is attributes
    const dataAttributes = data.product.attributes
    if(dataAttributes.length !== 0){
      
      return dataAttributes.map((attribute, key)=>{
        return(
          <ItemAttribute
            key={key}  
            attribute={attribute}
            getSelections={(selection)=>{
              this.getSelections(selection)
            }}
          />
        )
      })
    }
  }

  handleAddToCart(data){
    //there is no attribute on product
    if(data.product.attributes.length === 0){
      this.props.dispatch(
        CartActions.addToCart({
          productId: data.product.id,
          attributes: [],
          quantity: 1,
        })
        );

    }else{
      if(data.product.attributes.length !== this.attributes.length){
        //user did not selected all attributes
        return this.setState({
          notificationData:{
            title: "Error",
            description: "Do not forget to choose all posible attributes ",
            color: "#d9534f",
            icon: errorIcon,
          },
          showNotification: true
        })
      }else{
        // when user removed the selection from the attribute
        let error = false;

        this.attributes.map((attribute)=>{
          if( attribute.selected === null){
            error = true
            return this.setState({
              notificationData: {
                title: "Error",
                description: "Do not forget to choose all posible attributes",
                color: "#d9534f", 
                icon: errorIcon,
              },
              showNotification: true,
            });
          }
        })
        if(error === false){

          this.props.dispatch(CartActions.addToCart({
            productId: data.product.id,
            attributes: this.attributes,
            quantity: 1,
          }))
          this.setState({
            notificationData: {
              title: "Success",
              description: ` ${data.product.name} added to the cart`,
              color: "#5ece7b",
              icon: checkIcon,
            },
            showNotification: true,
          })
        }
      }
    }
  }


  render() {
    const data = this.props.data;
    if (data.loading) {
      return <div>LOADING...</div>;
    }
    return (
      <div className="ProductDescription">
        {this.state.showNotification ? (
          <Notification
            data={this.state.notificationData}
            onClose={() => {
              this.handleCloseNotification();
            }}
          />
        ) : null}

        <div className="ProductDescription-ImageArea">
          <div className="ProductDescription-ImageArea-ShowcaseOptions">
            {this.showProductImages(data)}
          </div>
          <div className="ProductDescription-ImageArea-ShowcaseBig">
            <img
              className="ProductDescription-ImageArea-ShowcaseBig-Image"
              alt="ShowCase Big"
              src={data.product.gallery[this.state.currentImage]}
            />
          </div>
        </div>
        <div className="ProductDescription-ProductInformation">
          <div className="ProductDescription-ProductInformation-Identification">
            <p className="ProductDescription-ProductInformation-Identification-Brand">
              {data.product.brand}
            </p>
            <p className="ProductDescription-ProductInformation-Identification-Name">
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
            {data.product.inStock ? (
              <button
                className="ProductDescription-ProductInformation-PurchaseArea-Button"
                onClick={() => {
                  this.handleAddToCart(data);
                }}
              >
                ADD TO CART
              </button>
            ) : (
              <button className="ProductDescription-ProductInformation-PurchaseArea-Button-OutOfStock">
                OUT OF STOCK
              </button>
            )}
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
  cartItems: state.cart.cartItems,
}))(
  withRouter(
    graphql(getProduct, {
      options: (props) => {
        return {
          variables: {
            id: props.match.params.id,
          },
          fetchPolicy: "no-cache",
        };
      },
    })(ProductDescription)
  )
);
