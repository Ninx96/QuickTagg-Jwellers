import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import MyStyles from "../Styles/MyStyles";

export default function BadgeRibbon({
  text,
  position = "right",
  color = "#ffba3c",
  textStyle,
}) {
  return (
    <View>
      <View
        style={[
          {
            width: 0,
            height: 0,
            borderWidth: 24,
            borderColor: "transparent",
            borderBottomColor: color,
            position: "absolute",
          },
          positionStyles[position],
        ]}
      >
        <Text
          style={[
            {
              color: "#FFF",
              fontWeight: "bold",
              position: "absolute",
              top: 5,
              left: -5,
              transform: [
                position == "right"
                  ? { rotate: "-45deg" }
                  : position == "voucherRight"
                  ? { rotate: "0deg" }
                  : { rotate: "45deg" },
              ],
            },
            textStyle,
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

const positionStyles = StyleSheet.create({
  right: {
    top: -25,
    left: 96,
    transform: [{ rotate: "45deg" }],
  },

  left: {
    top: -25,
    left: -25,
    transform: [{ rotate: "-45deg" }],
  },
  voucherRight: {
    zIndex: 10,
    top: -50,
    right: -50,
    borderWidth: 50,
    transform: [{ rotate: "45deg" }],
  },
});
