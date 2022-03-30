import React from "react";
import { Routes, Route } from "react-router-dom";

import CategoryPage from "./route/CategoryPage";
import ProductPage from "./route/ProductPage";
import CartPage from "./route/CartPage";

class RoutesConfig extends React.Component {
  render() {
    return (
      <div>
        <Routes location={this.props.location}>
          <Route path="/" exact element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    );
  }
}
export default RoutesConfig;
