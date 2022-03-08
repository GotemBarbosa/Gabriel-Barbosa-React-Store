import React from 'react';

import { connect } from 'react-redux';

import './ProductListing.style.css'

class ProductListing extends React.Component{
    render(){
        return(
            <div className='ProductListing'>
                <div className='ProductListing-CategoryTitle'>{this.props.categoryName}</div>
            </div>
        )
    }
}

export default connect(state=>({
    categoryName: state.category.activeCategoryName
}))(ProductListing)