import React from 'react';
import './Notification.style.css'

class Notification extends React.Component{
    render(){
        return(
        <div className='Notification-Background' onClick={this.props.onClose}>
            <div className='Notification' style={{ borderColor: this.props.data.color }} onClick={(e) => {
              e.stopPropagation();
            }}>
                <button className='Notification-Button' onClick={this.props.onClose}> X </button>
                <div className='Notification-Image'>
                    <img  src={this.props.data.icon} alt="icon" />
                </div>
                <div>
                    <p className='Notification-Title' >{this.props.data.title}</p>
                    <p className='Notification-Message' >{this.props.data.description}</p>
                </div>
            </div>
        </div> 
        )
    }
}

export default Notification