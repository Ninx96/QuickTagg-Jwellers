import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Text } from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";
import Wishlist from "./Dashboard/Wishlist";
import Notification from "./Dashboard/Notification";
import DatePicker from "../Components/DatePicker";
import { TouchableOpacity } from "react-native-gesture-handler";
const Dashboard = (props) => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <View style={MyStyles.row}>
        <DatePicker mode="text" />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            borderRadius: 10,
            backgroundColor: "orange",

            marginRight: 10,
          }}
        >
          <Icon name="circle-medium" color="red" size={20} />
          <Text style={{ color: "#FFF" }}>Live</Text>
        </TouchableOpacity>
      </View>
      <Tab.Navigator barStyle={MyStyles.primaryColor}>
        <Tab.Screen
          name="Wishlist"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="heart" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          component={Wishlist}
        />
        <Tab.Screen
          name="Notification"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="bell" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          component={Notification}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Dashboard;
