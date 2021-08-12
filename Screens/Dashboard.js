import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { List, Modal, Portal, Text, TouchableRipple, Button } from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";
import Wishlist from "./Dashboard/Wishlist";
import Notification from "./Dashboard/Notification";
import DatePicker from "../Components/DatePicker";
import { TouchableOpacity } from "react-native-gesture-handler";
const Dashboard = (props) => {
  const Tab = createMaterialBottomTabNavigator();
  const [modal, setModal] = useState(false);

  return (
    <View style={MyStyles.container}>
      <CustomHeader title="QuickTag" {...props} />
      <Portal>
        <Modal
          visible={modal}
          dismissabl
          onDismiss={() => setModal(false)}
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={[MyStyles.container, { backgroundColor: "#FFF" }]}>
            <View style={[MyStyles.row, { justifyContent: "flex-end" }]}>
              <Button
                mode="text"
                uppercase={false}
                compact
                color="blue"
                onPress={() => setModal(false)}
              >
                Close
              </Button>
            </View>

            <FlatList
              data={[{}]}
              renderItem={({ item, index }) => (
                <List.Item
                  style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
                  title={"Karan"}
                  titleStyle={{ fontWeight: "bold" }}
                  description={9876543210}
                  left={() => (
                    <TouchableRipple
                      style={MyStyles.squarefixedRatio}
                      onPress={() => {
                        props.navigation.navigate("Profile", {
                          customer_id: item.customer_id,
                        });
                      }}
                    >
                      <Text style={{ color: "red" }}>S</Text>
                    </TouchableRipple>
                  )}
                  right={() => (
                    <View style={MyStyles.row}>
                      <Icon name="cake" size={20} style={{ marginHorizontal: 2 }} />
                      <Icon name="inbox" size={20} style={{ marginHorizontal: 2 }} />
                      <Icon name="video" size={20} style={{ marginHorizontal: 2 }} />
                      <Icon name="heart" size={20} style={{ marginHorizontal: 2 }} />

                      <Text
                        style={{
                          fontSize: 12,
                          color: "#888",
                          alignSelf: "flex-start",
                        }}
                      >
                        22/05/2021
                      </Text>
                    </View>
                  )}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      </Portal>
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
          onPress={() => setModal(true)}
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
          initialParams={props.route.params}
        />
        <Tab.Screen
          name="Notification"
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon name="bell" color={focused ? "red" : "white"} size={25} />
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
