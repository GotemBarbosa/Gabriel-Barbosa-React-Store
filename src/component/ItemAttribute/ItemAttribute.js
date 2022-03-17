import React from "react";
import "./ItemAttribute.style.css";

class ItemAttribute extends React.Component {
  constructor() {
    super();
    this.state = {
      selected:null,
    };
  }
  changeSelection(key, type){
        if(this.state.selected === key){
            this.setState({ selected: null })
            this.props.attributesData({id: this.props.id, type: type,selected: null })
        }else{
            this.setState({ selected: key }) 
            this.props.attributesData({id: this.props.id, type: type, selected: key })
        }
  }

  render() {
    if (this.props.attribute.type === "text") {
      return (
        <div className="Attribute">
          <p className="Attribute-Title">{this.props.attribute.name}:</p>
          <div className="AttributeText">
            {this.props.attribute.items.map((item, key) => (
              <button
                className={this.state.selected === key?"AttributeText-Option-Selected":"AttributeText-Option"}
                onClick={()=>{this.changeSelection(key, 'text')}}
                key={key}
              >
                <p className="AttributeText-Option-Text">{item.value}</p>
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
          <div className="AttributeSwatch">
            {this.props.attribute.items.map((item, key) => (
              <div className="AttributeSwatch-Option" key={key}>
                <button
                  className={this.state.selected === key?"AttributeSwatch-Option-Color-Selected":"AttributeSwatch-Option-Color"}
                  style={{ backgroundColor: `${item.value}` }}
                  onClick={(()=>{this.changeSelection(key, 'swatch')})}
                  key={key}
                />
                <p className="AttributeSwatch-Option-Text">
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
