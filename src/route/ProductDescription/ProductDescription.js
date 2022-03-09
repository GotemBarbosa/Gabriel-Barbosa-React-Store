import React from 'react';
import { withRouter } from '../../utils/withRouter';


class ProductDescription extends React.Component{
    render(){
        return(
            <div>
            <h1>
                Olá sou a description page
            </h1>
            <h2>
                {this.props.match.params.id}
            </h2>
            
            </div>
            
        )
    }
}

export default withRouter(ProductDescription)