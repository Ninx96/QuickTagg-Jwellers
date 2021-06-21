import React, { useState, useEffect } from "react";
import { ImageBackground, View } from "react-native";
import { Button, Text, List } from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";

const CustomerList = (props) => {
  const [state, setstate] = useState(null);

  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <View>
        <List.Item
          style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
          title="Rahul"
          titleStyle={{ fontWeight: "bold" }}
          description="9716612244"
          left={(props) => <List.Icon {...props} icon="account" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </View>
    </View>
  );
};

const CustomerForm = (props) => {
  const [state, setstate] = useState(null);
  return (
    <ImageBackground style={MyStyles.container} source={require("../assets/login-bg.jpg")}>
      <CustomHeader {...props} />
      <View style={MyStyles.cover}></View>
    </ImageBackground>
  );
};

export { CustomerList, CustomerForm };
