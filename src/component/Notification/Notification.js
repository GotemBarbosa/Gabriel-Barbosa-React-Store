import React from "react";

import "./Notification.style.scss";

class Notification extends React.Component {
  render() {
    return (
      <div className="Notification" onClick={this.props.onClose}>
        <div
          className="Notification-Content"
          style={{ borderColor: this.props.data.color }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            className="Notification-Content-Button"
            onClick={this.props.onClose}
          >
            {" "}
            X{" "}
          </button>
          <div className="Notification-Content-ImageArea">
            <img
              className="Notification-Content-ImageArea-Image"
              src={this.props.data.icon}
              alt="icon"
            />
          </div>
          <div>
            <p className="Notification-Content-Title">
              {this.props.data.title}
            </p>
            <p className="Notification-Content-Message">
              {this.props.data.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Notification;
