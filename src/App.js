import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import RoutesConfig from "./routesConfig";
import Header from "./component/Header";
import "./global.css";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <RoutesConfig />
        </div>
      </Provider>
    );
  }
}

export default App;
