import React from "react";
import { gql } from "@apollo/client";
import { graphql } from "react-apollo";

import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";

import * as CategoryActions from "../../store/actions/Category";
import CategoryButton from "../CategoryButton";
import Cart from "../../assets/icons/cart.svg";
import CurrencySwitcher from "../CurrencySwitcher";
import Minicart from "../Minicart";

import "./Header.style.css";
import Logo from "../../assets/images/logo.svg";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import ArrowUp from "../../assets/icons/arrow-up.svg";

const getCatogories = gql`
  {
    categories {
      name
    }
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelected: this.props.category.activeCategory,
      currentSwitcherSelected: false,
      currentMinicartSelected: false,
    };
  }

  handleChangeActiveCategory(key, name) {
    this.setState({ categorySelected: key });
    this.props.dispatch(CategoryActions.changeCategory(key, name));
    if(this.props.location.pathname !== '/'){
      this.props.navigate(`/`)
    }
  }

  displayCategories() {
    const data = this.props.data;
    if (data.loading) {
      return <div>...</div>;
    }
    return data.categories.map((category, key) => {
      return (
        <CategoryButton
          key={key}
          active={this.state.categorySelected === key ? true : false}
          name={category.name}
          onClick={() => {
            this.handleChangeActiveCategory(key, category.name);
          }}
        ></CategoryButton>
      );
    });
  }

  showCurrencySwitcherOptions() {
    this.setState({
      currentSwitcherSelected: !this.state.currentSwitcherSelected,
    });
    if (this.state.currentMinicartSelected)
      this.setState({ currentMinicartSelected: false });
  }
  showMinicart() {
    this.setState({
      currentMinicartSelected: !this.state.currentMinicartSelected,
    });
    if (this.state.currentSwitcherSelected)
      this.setState({ currentSwitcherSelected: false });
  }

  render() {
    const data = this.props.data;
    if (data.loading) {
      return <div>LOADING...</div>;
    }
    return (
      <div className="Header">
        <div className="Categories">{this.displayCategories()}</div>
        <div className="Logo">
          <img className="Logo-Image" src={Logo} alt="Logo image"></img>
        </div>

        <div className="Options">
          <div className="Options-Currency">
            <button
              className="Options-Currency-btn"
              onClick={() => {
                this.showCurrencySwitcherOptions();
              }}
            >
              <div className="Options-Currency-btn-Label">
                {this.props.currency.activeCurrencySymbol}
              </div>
              <div className="Options-Currency-btn-Indicator">
                {this.state.currentSwitcherSelected === true ? (
                  <img
                    className="Options-Currency-btn-Indicator-Arrow"
                    alt="Arrow Up icon"
                    src={ArrowUp}
                  />
                ) : (
                  <img
                    className="Options-Currency-btn-Indicator-Arrow"
                    alt="Arrow Down icon "
                    src={ArrowDown}
                  />
                )}
              </div>
            </button>
            {this.state.currentSwitcherSelected === true ? (
              <CurrencySwitcher
                onOutClick={() => {
                  this.setState({ currentSwitcherSelected: false });
                }}
              />
            ) : null}
          </div>
          <div className="Options-Cart">
            <button
              className="Options-Cart-btn"
              onClick={() => {
                this.showMinicart();
              }}
            >
              <img
                className="Option-Cart-btn-Indicator"
                alt="Cart icon"
                src={Cart}
              />
              {this.props.cartItems.length>0?<div className="Option-Cart-btn-QuantityIndicator"><p className="Option-Cart-btn-QuantityIndicator-Text">{this.props.cartItems.length}</p></div>:null}
            </button>
            {this.state.currentMinicartSelected === true ? (
              <Minicart
                onOutClick={() => {
                  this.setState({ currentMinicartSelected: false });
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  category: state.category,
  currency: state.currency,
  cartItems: state.cart.cartItems,
}))(graphql(getCatogories)(withRouter(Header)));
