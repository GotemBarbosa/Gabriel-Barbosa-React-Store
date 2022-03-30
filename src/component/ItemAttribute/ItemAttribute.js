import React from "react";

import "./ItemAttribute.style.scss";

class ItemAttribute extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: null,
    };
  }

  changeSelection(key, type) {
    if (this.state.selected === key) {
      this.setState({ selected: null });
      return this.props.getSelections({
        id: this.props.attribute.id,
        type: type,
        selected: null,
      });
    } else {
      this.setState({ selected: key });
      return this.props.getSelections({
        id: this.props.attribute.id,
        type: type,
        selected: key,
      });
    }
  }

  render() {
    if (this.props.attribute.type === "text") {
      return (
        <div className="Attribute">
          <p className="Attribute-Title">{this.props.attribute.name}:</p>
          <div className="Attribute-AttributeText">
            {this.props.attribute.items.map((item, key) => (
              <button
                className={
                  this.state.selected === key
                    ? "Attribute-AttributeText-Option-Selected"
                    : "Attribute-AttributeText-Option"
                }
                onClick={() => {
                  this.changeSelection(key, "text");
                }}
                key={key}
              >
                <p className="Attribute-AttributeText-Option-Text">
                  {item.value}
                </p>
              </button>
            ))}
          </div>
        </div>
      );
    }
    if (this.props.attribute.type === "swatch") {
      return (
        <div className="Attribute">
          <p className="Attribute-Title">{this.props.attribute.name}:</p>
          <div className="Attribute-AttributeSwatch">
            {this.props.attribute.items.map((item, key) => (
              <div className="Attribute-AttributeSwatch-Option" key={key}>
                <button
                  className={
                    this.state.selected === key
                      ? "Attribute-AttributeSwatch-Option-Color-Selected"
                      : "Attribute-AttributeSwatch-Option-Color"
                  }
                  style={{ backgroundColor: `${item.value}` }}
                  onClick={() => {
                    this.changeSelection(key, "swatch");
                  }}
                  key={key}
                />
                <p className="Attribute-AttributeSwatch-Option-Text">
                  {item.displayValue}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
export default ItemAttribute;
