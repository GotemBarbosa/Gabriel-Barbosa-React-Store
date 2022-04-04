import React from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import parse from "html-react-parser";

import Notification from "../../component/Notification";
import * as CartActions from "../../store/actions/Cart";
import ItemAttribute from "../../component/ItemAttribute";
import { withRouter } from "../../utils/withRouter";
import { getProduct } from "../../graphql/Queries";

import errorIcon from "../../assets/images/error.png";
import checkIcon from "../../assets/images/check.png";

import "./ProductPage.style.scss";

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      notificationData: {},
      showNotification: false,
    };
    this.attributes = [];
  }

  closeNotification() {
    this.setState({ showNotification: false });
  }

  showProductImages(data) {
    return data.product.gallery.map((imageURL, key) => (
      <img
        src={imageURL}
        key={key}
        className="ProductPage-ImageArea-ShowcaseOptions-Image"
        alt="ShowCase Option"
        onClick={() => {
          this.setState({ currentImage: key });
        }}
      />
    ));
  }

  getSelections(selection) {
    let sameId = false; //get if a value is already stored, to overwrite it later
    let itemKey = null; //index of this repeated attribute

    if (this.attributes.length !== 0) {
      this.attributes.forEach((item, key) => {
        if (item.id === selection.id) {
          sameId = true;
          itemKey = key;
        }
      });
      if (sameId) {
        const tempAttributes = [...this.attributes];
        tempAttributes.splice(itemKey, 1, selection);
        this.attributes = tempAttributes;
      } else {
        this.attributes = [...this.attributes, selection];
      }
    } else {
      this.attributes = [selection];
    }
  }

  showAttributes(data) {
    const dataAttributes = data.product.attributes;
    if (dataAttributes.length !== 0) {
      return dataAttributes.map((attribute, key) => {
        return (
          <ItemAttribute
            key={key}
            attribute={attribute}
            getSelections={(selection) => {
              this.getSelections(selection);
            }}
          />
        );
      });
    }
  }

  handleAddToCart(data) {
    const initialQuantity = 1;
    //there is no attribute on product
    if (data.product.attributes.length === 0) {
      this.props.dispatch(
        CartActions.addToCart({
          productId: data.product.id,
          attributes: [],
          quantity: initialQuantity,
        })
      );
    } else {
      if (data.product.attributes.length !== this.attributes.length) {
        //user did not selected all attributes
        return this.setState({
          notificationData: {
            title: "Error",
            description: "Do not forget to choose all posible options ",
            color: "#d9534f",
            icon: errorIcon,
          },
          showNotification: true,
        });
      } else {
        // when user removed the selection from the attribute
        let error = false;

        this.attributes.map((attribute) => {
          if (attribute.selected === null) {
            error = true;
            return this.setState({
              notificationData: {
                title: "Error",
                description: "Do not forget to choose all posible options",
                color: "#d9534f",
                icon: errorIcon,
              },
              showNotification: true,
            });
          }
          return null;
        });
        if (error === false) {
          this.props.dispatch(
            CartActions.addToCart({
              productId: data.product.id,
              attributes: this.attributes,
              quantity: initialQuantity,
            })
          );
          this.setState({
            notificationData: {
              title: "Success",
              description: ` ${data.product.name} added to the cart`,
              color: "#5ece7b",
              icon: checkIcon,
            },
            showNotification: true,
          });
        }
      }
    }
  }

  render() {
    const data = this.props.data;
    if (data.loading) {
      return <p>LOADING...</p>;
    }
    return (
      <div className="ProductPage">
        {this.state.showNotification ? (
          <Notification
            data={this.state.notificationData}
            onClose={() => {
              this.closeNotification();
            }}
          />
        ) : null}

        <div className="ProductPage-ImageArea">
          <div className="ProductPage-ImageArea-ShowcaseOptions">
            {this.showProductImages(data)}
          </div>
          <div className="ProductPage-ImageArea-ShowcaseBig">
            <img
              className="ProductPage-ImageArea-ShowcaseBig-Image"
              alt="ShowCase Big"
              src={data.product.gallery[this.state.currentImage]}
            />
          </div>
        </div>
        <div className="ProductPage-ProductInformation">
          <div className="ProductPage-ProductInformation-Identification">
            <p className="ProductPage-ProductInformation-Identification-Brand">
              {data.product.brand}
            </p>
            <p className="ProductPage-ProductInformation-Identification-Name">
              {data.product.name}
            </p>
          </div>
          <div className="ProductPage-ProductInformation-Attributes">
            {this.showAttributes(data)}
          </div>
          <div className="ProductPage-ProductInformation-PurchaseArea">
            <p className="ProductPage-ProductInformation-PurchaseArea-Price">
              PRICE:
            </p>
            <p className="ProductPage-ProductInformation-PurchaseArea-PriceValue">
              {data.product.prices[this.props.activeCurrency].currency.symbol}
              {data.product.prices[this.props.activeCurrency].amount}
            </p>
            {data.product.inStock ? (
              <button
                className="ProductPage-ProductInformation-PurchaseArea-Button"
                onClick={() => {
                  this.handleAddToCart(data);
                }}
              >
                ADD TO CART
              </button>
            ) : (
              <button className="ProductPage-ProductInformation-PurchaseArea-Button-OutOfStock">
                OUT OF STOCK
              </button>
            )}
          </div>
          <div className="ProductPage-ProductInformation-Description">
            {parse(data.product.description)}
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
          fetchPolicy: "no-cache",
        };
      },
    })(ProductPage)
  )
);
