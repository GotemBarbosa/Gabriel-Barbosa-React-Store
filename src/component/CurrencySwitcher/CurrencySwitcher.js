import React from "react";

import { graphql } from "react-apollo";
import { connect } from "react-redux";

import * as CurrencyActions from "../../store/actions/Currency";
import { getCurrencies } from "../../graphql/Queries";

import "./CurrencySwitcher.style.scss";

class CurrencySwitcher extends React.Component {
  changeActiveCurrency(key, symbol) {
    this.props.dispatch(CurrencyActions.changeCurrency(key, symbol));
  }

  displayCurrencies(data) {
    return data.currencies.map((currency, key) => {
      return (
        <button
          key={key}
          className={
            key === this.props.currency.activeCurrency
              ? "CurrencySwitcher-Overlay-Button-Active"
              : "CurrencySwitcher-Overlay-Button"
          }
          onClick={() => {
            this.changeActiveCurrency(key, currency.symbol);
            this.props.onOutClick();
          }}
        >
          {currency.symbol} {currency.label}
        </button>
      );
    });
  }

  render() {
    const data = this.props.data;
    if (data.loading) {
      return <p>Loading...</p>;
    }
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
            {this.displayCurrencies(data)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ currency: state.currency }))(
  graphql(getCurrencies)(CurrencySwitcher)
);
