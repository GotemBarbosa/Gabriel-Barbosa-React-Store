import React from "react";

import "./CategoryButton.style.scss";

class CategoryButton extends React.Component {
  render() {
    return (
      <div className="CategoryButton">
        <button
          className={
            this.props.active === true
              ? "CategoryButton-Button-Active"
              : "CategoryButton-Button"
          }
          onClick={() => {
            this.props.onClick();
          }}
        >
          {this.props.name}
        </button>

        {this.props.active === true ? (
          <div className="CategoryButton-Border" />
        ) : null}
      </div>
    );
  }
}

export default CategoryButton;
