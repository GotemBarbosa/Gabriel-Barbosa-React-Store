import React from "react";
import { graphql } from "react-apollo";

import { connect } from "react-redux";
import { withRouter } from "../../utils/withRouter";

import * as CategoryActions from "../../store/actions/Category";
import CategoryButton from "../CategoryButton";
import Cart from "../../assets/icons/cart.svg";
import CurrencySwitcher from "../CurrencySwitcher";
import Minicart from "../Minicart";
import { getCategories, getCurrencies } from "../../graphql/Queries";

import "./Header.style.scss";
import Logo from "../../assets/images/logo.svg";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import ArrowUp from "../../assets/icons/arrow-up.svg";


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
    localStorage.setItem("FIRST_CATEGORY", data.categories[0].name)
    // localStorage.setItem("FIRST_CURRENCY", data.currency[0])
    console.log(data.currencies)
    return (
      <div className="Header">
        <div className="Header-Categories">{this.displayCategories()}</div>
        <div className="Header-Logo">
          <img className="Header-Logo-Image" src={Logo} alt="Logo image"></img>
        </div>

        <div className="Header-Options">
          <div className="Header-Options-Currency">
            <button
              className="Header-Options-Currency-Button"
              onClick={() => {
                this.showCurrencySwitcherOptions();
              }}
            >
              <div className="Header-Options-Currency-Button-Label">
                {this.props.currency.activeCurrencySymbol}
              </div>
              <div className="Header-Options-Currency-Button-Indicator">
                {this.state.currentSwitcherSelected === true ? (
                  <img
                    className="Header-Options-Currency-Button-Indicator-Arrow"
                    alt="Arrow Up icon"
                    src={ArrowUp}
                  />
                ) : (
                  <img
                    className="Header-Options-Currency-Button-Indicator-Arrow"
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
          <div className="Header-Options-Cart">
            <button
              className="Header-Options-Cart-Button"
              onClick={() => {
                this.showMinicart();
              }}
            >
              <img
                className="Header-Options-Cart-Button-Indicator"
                alt="Cart icon"
                src={Cart}
              />
              {this.props.cartItems.length>0?<div className="Header-Options-Cart-Button-QuantityIndicator"><p className="Header-Options-Cart-Button-QuantityIndicator-Text">{this.props.cartItems.length}</p></div>:null}
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
}))(graphql(getCategories)(withRouter(Header)));
