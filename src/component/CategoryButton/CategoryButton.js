import React from 'react';
import './CategoryButton.style.css'

class CategoryButton extends React.Component{
    render(){
        return(
            <div className='CategoryButton'>
                <button className={this.props.active===true?'CategoryButton-btn-active':'CategoryButton-btn'} onClick={()=>{this.props.onClick()}}>
                    {this.props.name}    
                </button>
                
                {this.props.active===true?<div className='Border'/>:null}
            </div>
        )
    }
}

export default CategoryButton