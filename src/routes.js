import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ProductListing from './route/ProductListing';
import ProductDescription from './route/ProductDescription'
import Cart from './route/Cart'

class RoutesConfig extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path = "/" exact element = {<ProductListing/>}/>
                    <Route path = "/ProductDescription:id" element = {<ProductDescription/>}/>
                    <Route path = "/Cart" element = {<Cart/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}
export default RoutesConfig
