import React, { useEffect, useState, useRef } from "react";
import { Text, View, Dimensions, Image, Animated, StyleSheet } from "react-native";

export default function BadgeRibbon(props) {
  return (
    <View>
      <View
        style={{
          width: 120,
          padding: 10,
          paddingLeft: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1CCD75",
          height: 40,
          borderTopRightRadius: 3,
          borderBottomRightRadius: 3,
        }}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold" }}>{props.text}</Text>
      </View>
      <View
        style={{
          width: 0,
          height: 0,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderRightWidth: 20,
          borderTopWidth: 20,
          borderRightColor: "transparent",
          borderTopColor: "#232F3B",
          transform: [{ rotate: "90deg" }],
        }}
      />
    </View>
  );
}
