import React from 'react';
import './Minicart.styles.css'

class Minicart extends React.Component{
    render(){
        return(
            <div className='Minicart'>
                <div className='Minicart-ScreenBackground' onClick={this.props.onOutClick}>
                    <div className='Minicart-ScreenBackground-Overlay' onClick={(e)=>{e.stopPropagation()}}/>
                </div>
                
            </div>
        )
    }
}

export default Minicart