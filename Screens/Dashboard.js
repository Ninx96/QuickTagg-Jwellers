import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { Text } from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";
const Dashboard = (props) => {
  return (
    <ImageBackground style={MyStyles.container} source={require("../assets/login-bg.jpg")}>
      <CustomHeader {...props} />
      <Text>Welcome</Text>
    </ImageBackground>
  );
};

export default Dashboard;
