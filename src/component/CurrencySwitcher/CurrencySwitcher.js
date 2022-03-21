import React from "react";

import { gql } from "apollo-boost";

import { graphql } from "react-apollo";

import { connect } from "react-redux";

import * as CurrencyActions from "../../store/actions/Currency";

import "./CurrencySwitcher.style.css";

const getCurrencies = gql`
  {
    currencies {
      symbol
      label
    }
  }
`;

class CurrencySwitcher extends React.Component {
  handleChangeActiveCurrency(key, symbol) {
    this.props.dispatch(CurrencyActions.changeCurrency(key, symbol));
  }

  displayCurrencies() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading...</div>;
    }
    return data.currencies.map((currency, key) => {
      return (
        <button
          key={key}
          className={
            key === this.props.currency.activeCurrency
              ? "CurrencySwitcher-Overlay-Active-btn"
              : "CurrencySwitcher-Overlay-btn"
          }
          onClick={() => {
            this.handleChangeActiveCurrency(key, currency.symbol);
          }}
        >
          {currency.symbol} {currency.label}
        </button>
      );
    });
  }
  render() {
    return (
      <div className="CurrencySwitcher">
        <div
          className="CurrencySwitcher-Background"
          onClick={this.props.onOutClick}
        >
          <div
            className="CurrencySwitcher-Overlay"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {this.displayCurrencies()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ currency: state.currency }))(
  graphql(getCurrencies)(CurrencySwitcher)
);
