/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import styled from "styled-components";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "#666",
    width: "100%",
    height: 16,
    padding: 0,
    background:
      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%)",
    backgroundColor: "rgba(0, 0, 0, 0)",
    backgroundPositionX: "0%, 0%, 0%, 0%",
    backgroundPositionY: "0%, 0%, 0%, 0%",
    backgroundSize: "auto, auto, auto, auto",
    backgroundSize: "8px 8px",
    backgroundColor: "white",
    backgroundPosition: "0 0, 4px 0, 4px -4px, 0px 4px",
  },

  rail: {
    height: 16,
    opacity: 1,
    background: (props) =>
      `rgba(0, 0, 0, 0) linear-gradient(to right, ${props.color}00 0%, ${props.color} 100%) repeat scroll 0% 0%`,
    borderRadius: 0,
  },

  track: {
    height: 16,
    opacity: 0,
    borderRadius: 4,
  },

  thumb: {
    width: 16,
    height: 16,
    marginTop: 0,
    marginLeft: -8,
    backgroundColor: "#f0f0f0",
    boxShadow: "rgba(0, 0, 0, 0.37) 0px 1px 4px 0px",

    "&:focus": {
      boxShadow: "0px 0px 0px 8px rgba(63, 81, 181, 0.16)",
    },
  },
});

function AlphaSlider({ color, ...rest }) {
  const classes = useStyles({ color });

  return (
    <Slider
      {...rest}
      classes={{
        root: classes.root,
        rail: classes.rail,
        track: classes.track,
        thumb: classes.thumb,
      }}
    />
  );
}

export default AlphaSlider;
