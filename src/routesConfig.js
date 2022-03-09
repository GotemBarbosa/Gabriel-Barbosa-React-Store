import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ProductListing from './route/ProductListing';
import ProductDescription from './route/ProductDescription'
import Cart from './route/Cart'

class RoutesConfig extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Routes location={this.props.location}>
                    <Route path = "/" exact element = {<ProductListing/>}/>
                    <Route path = "/productdescription/:id" element = {<ProductDescription/>}/>
                    <Route path = "/Cart" element = {<Cart/>}/>

                    <Route
                        path="/*"
                        element={
                            <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                            </main>
                        }
                    />
                    
                </Routes>
            </BrowserRouter>
        )
    }
}
export default RoutesConfig
