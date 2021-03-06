import React from "react";
import PropTypes from "prop-types";
import data from "./data/usa-map-dimensions";
import USAState from "./components/USAState";

class USAMap extends React.Component {

  clickHandler = (stateAbbreviation) => {
    this.props.onClick(stateAbbreviation);
  };

  mouseOverHandler = (stateAbbreviation) => {
    this.props.onMouseOver(stateAbbreviation);
  };

  fillStateColor = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].fill) {
      return this.props.customize[state].fill;
    }

    return this.props.defaultFill;
  };

  strokeStateColor = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].stroke) {
      return this.props.customize[state].stroke;
    }

    return this.props.defaultStroke;
  };

  stateClickHandler = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].clickHandler) {
      return this.props.customize[state].clickHandler
    }
    return this.clickHandler;
  }

  stateMouseOverHandler = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].mouseOverHandler) {
      return this.props.customize[state].mouseOverHandler
    }
    return this.mouseOverHandler;
  }

  buildPaths = () => {
    let paths = [];
    for (let stateKey in data) {
      const path = <USAState key={stateKey} stateName={data[stateKey].name} dimensions={data[stateKey]["dimensions"]} offset={data[stateKey]["offset"]} state={stateKey} fill={this.fillStateColor(stateKey)} stroke={this.strokeStateColor(stateKey)} onClickState={this.stateClickHandler(stateKey)} onMouseOverState={this.stateMouseOverHandler(stateKey)} />
      paths.push(path);
    };
    return paths;
  };

  render() {
    return (
      <svg className="us-state-map" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 959 593">
        <title>{this.props.title}</title>
        <g className="outlines">
          {this.buildPaths()}
          <g className="DC state" transform="translate(801.8,253.8)">
            <path className="DC1" fill={this.fillStateColor("DC1")} d="M0,0 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z" />
            <circle className="DC2" onClick={this.clickHandler} onMouseOver={this.mouseOverHandler} data-name={"DC"} fill={this.fillStateColor("DC2")} stroke="#FFFFFF" strokeWidth="1.5" cx="801.3" cy="251.8" r="5" opacity="1">
              <title>District of Columbia</title>
            </circle>
            {/*<text x="-5" y="-5">DC</text>*/}
          </g>
        </g>
      </svg>
    );
  }
}

USAMap.propTypes = {
  onClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.number,
  title: PropTypes.string,
  defaultFill: PropTypes.string,
  defaultStroke: PropTypes.string,
  customize: PropTypes.object
};

USAMap.defaultProps = {
  onClick: () => {},
  onMouseOver: () => {},
  width: 959,
  height: 593,
  defaultFill: "#D3D3D3",
  defaultStroke: "",
  title: "Blank US states map",
  customize: {}
};

export default USAMap;
