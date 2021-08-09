import React, { useEffect, useState, useRef } from "react";
import { Text, View, Dimensions, Image, Animated, StyleSheet } from "react-native";
import MyStyles from "../Styles/MyStyles";

export default function BadgeRibbon(props) {
  return (
    <View>
      <View
        style={{
          width: 0,
          height: 0,
          borderWidth: 30,
          borderColor: "transparent",
          borderBottomColor: "red",
          position: "absolute",
          top: -30,
          left: 100,
          transform: [{ rotate: "45deg" }],
        }}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold" }}>{props.text}</Text>
      </View>
    </View>
  );
}
