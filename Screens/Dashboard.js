import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { List, Modal, Portal, Text, TouchableRipple, Button } from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";
import Home from "./Dashboard/Home";
import Wishlist from "./Dashboard/Wishlist";
import DatePicker from "../Components/DatePicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { postRequest } from "../Services/RequestServices";
import moment from "moment";
import TrialList from "./Dashboard/TrialList";
import Stock from "./Dashboard/Stock";
import Calls from "./Dashboard/Calls";
import HomeStack from "./Dashboard/Home";
const Dashboard = (props) => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <View style={MyStyles.container}>
      <Tab.Navigator barStyle={MyStyles.primaryColor}>
        <Tab.Screen
          name="HomeStack"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="home" color={focused ? "red" : "white"} size={25} />
            ),
            title: "Home",
          }}
          component={HomeStack}
          initialParams={props.route.params}
        />
        <Tab.Screen
          name="Wishlist"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="heart" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          //component={Wishlist}
          children={(props) => (
            <>
              <CustomHeader title="QuickTag" {...props} />
              <Wishlist {...props} />
            </>
          )}
          initialParams={props.route.params}
        ></Tab.Screen>
        <Tab.Screen
          name="Trial"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="podcast" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          // component={TrialList}
          children={(props) => (
            <>
              <CustomHeader title="QuickTag" {...props} />
              <TrialList {...props} />
            </>
          )}
          initialParams={props.route.params}
        />
        <Tab.Screen
          name="Stock"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="transit-connection-variant" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          //component={Stock}
          children={(props) => (
            <>
              <CustomHeader title="QuickTag" {...props} />
              <Stock {...props} />
            </>
          )}
          initialParams={props.route.params}
        />
        <Tab.Screen
          name="Calls"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="call-made" color={focused ? "red" : "white"} size={25} />
            ),
          }}
          // component={Calls}
          children={(props) => (
            <>
              <CustomHeader title="QuickTag" {...props} />
              <Calls {...props} />
            </>
          )}
          initialParams={props.route.params}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Dashboard;
