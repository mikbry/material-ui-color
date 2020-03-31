/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as CommonTypes from '../../helpers/commonTypes';

const getRGB = _h => {
  let rgb;
  const h = _h / 360;
  let v = 255;
  let i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = 0;
  const q = Math.round(v * (1 - f));
  const t = Math.round(v * f);
  v = Math.round(v);
  i %= 6;
  if (i === 0) rgb = [v, t, p];
  if (i === 1) rgb = [q, v, p];
  if (i === 2) rgb = [p, v, t];
  if (i === 3) rgb = [p, q, v];
  if (i === 4) rgb = [t, p, v];
  if (i === 5) rgb = [v, p, q];
  return rgb;
};

const StyledRoot = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  background: ${props => `${props.cssRgb} none repeat scroll 0% 0%`};
  margin: 0;
  & .muicc-hsvgradient-s {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0)) repeat scroll 0%
      0%;
  }
  & .muicc-hsvgradient-v {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0) linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)) repeat scroll 0% 0%;
  }
  & .muicc-hsvgradient-v {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0) linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)) repeat scroll 0% 0%;
  }
  & .muicc-hsvgradient-cursor {
    position: absolute;
    top: 0px;
    left: 0px;
    cursor: ${props => !props.pressed && 'pointer'};
    zindex: 100;
  }
  & .muicc-hsvgradient-cursor-c {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    box-shadow: rgb(255, 255, 255) 0px 0px 0px 1.5px, rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset,
      rgba(0, 0, 0, 0.4) 0px 0px 1px 2px;
    transform: translate(-4px, -4px);
  }
`;

const HSVGradient = ({ className, color, onChange, ...props }) => {
  const latestColor = React.useRef(color);
  React.useEffect(() => {
    latestColor.current = color;
  });
  const box = React.useRef();
  const cursor = React.useRef();
  const rgb = getRGB(color.hsv[0]);
  const cssRgb = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  const [pressed, setPressed] = React.useState(false);

  const setPosition = pos => {
    cursor.current.style.top = `${pos.y}px`;
    cursor.current.style.left = `${pos.x}px`;
  };

  const initPosition = ref => {
    if (ref) {
      const { hsv } = color;
      const pos = { x: (hsv[1] / 100) * (ref.clientWidth - 1), y: (1 - hsv[2] / 100) * (ref.clientHeight - 1) };
      setPosition(pos);
    }
  };

  initPosition(box.current);
  if (box.current) {
    box.current.style.background = `${cssRgb} none repeat scroll 0% 0%`;
  }

  const convertMousePosition = (event, ref) => {
    const { clientX, clientY } = event;
    const { offsetLeft, offsetTop } = ref.offsetParent;
    const pos = { x: clientX - offsetLeft - 6, y: clientY - offsetTop - 6 };
    if (pos.x < 0) {
      pos.x = 0;
    }
    if (pos.y < 0) {
      pos.y = 0;
    }
    if (pos.x >= ref.clientWidth) {
      pos.x = ref.clientWidth - 1;
    }
    if (pos.y >= ref.clientHeight) {
      pos.y = ref.clientHeight - 1;
    }
    setPosition(pos);
    const s = (pos.x / (ref.clientWidth - 1)) * 100;
    const v = (1 - pos.y / (ref.clientHeight - 1)) * 100;
    const c = latestColor.current;
    onChange([c.hsv[0], s, v]);
  };

  React.useEffect(() => {
    const ref = box.current;
    initPosition(ref);
    const handleDown = () => {
      setPressed(true);
    };
    const handleUp = event => {
      convertMousePosition(event, ref);
      setPressed(false);
    };
    const handleMove = event => {
      if (pressed || event.buttons) {
        convertMousePosition(event, ref);
      }
    };
    ref.addEventListener('mousedown', handleDown);
    ref.addEventListener('mouseup', handleUp);
    ref.addEventListener('mousemove', handleMove);
    return () => {
      ref.removeEventListener('mousedown', handleDown);
      ref.removeEventListener('mouseup', handleUp);
      ref.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={className}>
      <StyledRoot {...props} ref={box} cssRgb={cssRgb} data-testid="hsvgradient-color">
        <div className="muicc-hsvgradient-s">
          <div className="muicc-hsvgradient-v">
            <div
              ref={cursor}
              pressed={`${pressed}`}
              data-testid="hsvgradient-cursor"
              className="muicc-hsvgradient-cursor"
            >
              <div className="muicc-hsvgradient-cursor-c" />
            </div>
          </div>
        </div>
      </StyledRoot>
    </div>
  );
};

HSVGradient.propTypes = {
  color: CommonTypes.color.isRequired,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HSVGradient;
