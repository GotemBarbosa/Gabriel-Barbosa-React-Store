import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import RoutesConfig from "./routesConfig";
import Header from "./component/Header";
import './styles/global.scss'

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Header />
          <RoutesConfig />
        </Provider>
      </div>
    );
  }
}

export default App;
