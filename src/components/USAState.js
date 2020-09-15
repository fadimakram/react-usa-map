import React from "react";
import { useState, useLayoutEffect } from "react";

function useDims(ref, isSvg = false) {
  const [dim, setDim] = useState({
    height: 0,
    width: 0,
    top: 0,
    left: 0
  });

  useLayoutEffect(() => {
    if (ref && ref.current) {
      const {height, width, x, y} = ref.current.getBBox();
      setDim({
        height,
        width,
        top: y,
        left: x
      });
    }
  }, [ref]);

  return dim;
};

const USAState = (props) => {
  // pull translation from dimensions first Move command
  let dimensions = props.dimensions.split(" ")
  let groupOffset = dimensions[0].replace("M","")
  let groupDimensions = "M0,0 "+dimensions.slice(1).join(" ")

  // get rendered dimensions
  const stateRef = React.useRef(null)
  const {width, height, top, left} = useDims(stateRef)

  // combine with offset to align text label
  const { offset } = props
  var textX, textY
  if (offset) {
    textX = left+width/2+offset.x
    textY = top+height/2+offset.y
  } else {
    textX = left+width/2
    textY = top+height/2
  }

  return (
    <g ref={stateRef} id={props.state} transform={`translate(${groupOffset})`} width={width} height={height}>
      <path d={groupDimensions} fill={props.fill} stroke={props.stroke} data-name={props.state} className={`${props.state} state`} onClick={props.onClickState} onMouseOver={props.onMouseOverState}>
        <title>{props.stateName}</title>
      </path>
      <text textAnchor="middle" style={{pointerEvents: "none"}} x={textX} y={textY}>{props.state}</text>
    </g>
  );
}
export default USAState;
