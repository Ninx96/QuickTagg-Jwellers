import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { List, Modal, Portal, Text, TouchableRipple, Button, } from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";
import Home from "./Dashboard/Home";
import Wishlist from "./Dashboard/Wishlist";
import Notification from "./Dashboard/Notification";
import DatePicker from "../Components/DatePicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { postRequest } from "../Services/RequestServices";
import moment from "moment";
const Dashboard = (props) => {
  const { userToken, branchId } = props.route.params;
  const Tab = createMaterialBottomTabNavigator();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recentactivity, setrecentactivity] = useState([]);

  React.useEffect(() => {
    postRequest("masters/dashboard/recentActivity", { branch_id: branchId, from_date: '2020/01/01', to_date: '2021/08/30' }, userToken).then((resp) => {
      if (resp.status == 200) {
        setrecentactivity(resp.data);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
    setLoading(false);
  }, []);
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
          onPress={() => { props.navigation.navigate("RecentActivity"); }}
        >
          <Icon name="circle-medium" color="red" size={20} />
          <Text style={{ color: "#FFF" }}>Live</Text>
        </TouchableOpacity>
      </View>
      <Tab.Navigator barStyle={MyStyles.primaryColor}>
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="home" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          component={Home}
          initialParams={props.route.params}
        />
        <Tab.Screen
          name="Wishlist"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="heart" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          component={Wishlist}
          initialParams={props.route.params}
        />
        <Tab.Screen
          name="Trial"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="podcast" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          component={Notification}
          initialParams={props.route.params}
        />
        <Tab.Screen
          name="Stock"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="transit-connection-variant" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          component={Notification}
          initialParams={props.route.params}
        />
        <Tab.Screen
          name="Calls"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="call-made" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          component={Notification}
          initialParams={props.route.params}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Dashboard;
