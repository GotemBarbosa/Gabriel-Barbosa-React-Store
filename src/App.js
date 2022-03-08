import React from 'react';

import RoutesConfig from './routesConfig';
import Header from './component/Header';
import './global.css'


class App extends React.Component{
    render(){
        return(
            <div className='App'>
                <Header/>
                <RoutesConfig/>
            </div>
        )
    }
}

export default App