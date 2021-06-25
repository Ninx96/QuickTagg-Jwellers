import React, { useState, useEffect } from "react";
import moment from "moment";
import { Image, ImageBackground, ScrollView, View } from "react-native";
import {
  Button,
  Text,
  List,
  FAB,
  TextInput,
  Avatar,
  Card,
} from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Feather";

import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";
import { FlatList } from "react-native-gesture-handler";

const ProfileList = (props) => {
  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <FlatList
        data={[{}]}
        renderItem={({ item, index }) => (
          <List.Item
            key={index}
            style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
            title="Rahul"
            titleStyle={{ fontWeight: "bold" }}
            description="971612244"
            left={(props) => (
              <List.Icon
                {...props}
                icon="account"
                onPress={() => props.navigation.navigate("CustomerForm")}
              />
            )}
            right={() => {
              return <List.Icon {...props} icon="chevron-right" />;
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Bhai isme lists mai Flatlist lagao direct loop ka hisab mat bithao */}
    </View>
  );
};

const Profile = (props) => {
  const Tab = createMaterialTopTabNavigator();
  const { userToken } = props.route.params;
  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <View
        style={[
          MyStyles.row,
          { justifyContent: "space-evenly", marginTop: 10 },
        ]}
      >
        <Avatar.Icon icon="account" size={80} />
        <View style={MyStyles.row}>
          <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>4</Text>
            <Text>Wishlist</Text>
          </View>
          <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>4</Text>
            <Text>Trials</Text>
          </View>
          <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>4</Text>
            <Text>V Calls</Text>
          </View>
          <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>4</Text>
            <Text>Catalogs</Text>
          </View>
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Rahul {(true ? "♂️" : "♀️") + "      "}
          <Text style={{ color: "green" }}>STAR</Text>
        </Text>
        <Text>9716612244</Text>
        <Text>DOB:09-02-1999 </Text>
        <Text>DOA: 09-02-1999</Text>
        <Text>Ramesh Nagar</Text>
        <Text>IT</Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ color: "pink" }}>Staff: 1</Text>
        <Text style={{ color: "pink" }}>REF. BY: Rahul - 971661224</Text>
      </View>
      <View style={[MyStyles.row, { justifyContent: "space-evenly" }]}>
        <Button mode="outlined" compact uppercase={false} color="black">
          Edit Profile
        </Button>
        <Button mode="outlined" compact uppercase={false} color="black">
          Create Catalog
        </Button>
        <Button mode="outlined" compact uppercase={false} color="black">
          Vouchers
        </Button>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          style: { backgroundColor: "rgba(0,0,0,0)" },
        }}
      >
        <Tab.Screen
          name="Uploaded"
          component={Uploaded}
          options={{
            tabBarIcon: () => <Icon name="heart" size={20} />,
          }}
          initialParams={{ userToken: userToken }}
        />
        <Tab.Screen
          name="Wishlist"
          component={Wishlist}
          options={{
            tabBarIcon: () => <Icon name="upload" size={20} />,
          }}
        />
        <Tab.Screen
          name="Exhibition"
          component={Exhibition}
          options={{
            tabBarIcon: () => <Icon name="star" size={20} />,
          }}
        />
        <Tab.Screen
          name="CallRequest"
          component={CallRequest}
          options={{
            tabBarIcon: () => <Icon name="video" size={20} />,
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarIcon: () => <Icon name="bell" size={20} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const Uploaded = () => {
  //const { userToken } = props.route.params;
  return (
    <View style={MyStyles.container}>
      <FlatList
        data={[
          { path: require("../assets/upload.png") },
          { path: require("../assets/upload.png") },
          { path: require("../assets/upload.png") },
        ]}
        renderItem={({ item, index }) => (
          <Image
            source={item.path}
            style={{ width: 120, height: 120, margin: 2 }}
          />
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Wishlist = () => {
  return (
    <View style={MyStyles.container}>
      <FlatList
        data={[
          { path: require("../assets/upload.png") },
          { path: require("../assets/upload.png") },
          { path: require("../assets/upload.png") },
        ]}
        renderItem={({ item, index }) => (
          <Image
            source={item.path}
            style={{ width: 120, height: 120, margin: 2 }}
          />
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Exhibition = () => {
  return (
    <View style={MyStyles.container}>
      <FlatList
        data={[
          { path: require("../assets/upload.png") },
          { path: require("../assets/upload.png") },
          { path: require("../assets/upload.png") },
        ]}
        renderItem={({ item, index }) => (
          <Image
            source={item.path}
            style={{ width: 120, height: 120, margin: 2 }}
          />
        )}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const CallRequest = () => {
  return (
    <View style={MyStyles.container}>
      <ScrollView>
        <Card style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
          <Card.Title
            title="Call Requested"
            right={() => (
              <View>
                <Text style={{ color: "green" }}>22-06-2021</Text>
                <Button mode="contained" compact uppercase={false}>
                  Accept
                </Button>
              </View>
            )}
          />
          <View>
            <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
              <Button
                mode="outlined"
                color="black"
                compact
                uppercase={false}
                style={{ marginHorizontal: 5 }}
              >
                22-06-2021
              </Button>
              <Button
                mode="outlined"
                color="black"
                compact
                uppercase={false}
                style={{ marginHorizontal: 5 }}
              >
                12:20 PM
              </Button>
            </View>
            <View>
              <Text style={{ color: "#888" }}>View All Remarks</Text>
              <Text>Remark 1 - RRRR AADLK</Text>
              <Text>Remark 2 - RRRR AADLK</Text>
            </View>
          </View>
        </Card>
        <Card style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
          <Card.Title
            title="Call Requested"
            right={() => (
              <View>
                <Text style={{ color: "green" }}>22-06-2021</Text>
                <Button mode="contained" compact uppercase={false}>
                  Accept
                </Button>
              </View>
            )}
          />
          <View>
            <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
              <Button
                mode="outlined"
                color="black"
                compact
                uppercase={false}
                style={{ marginHorizontal: 5 }}
              >
                22-06-2021
              </Button>
              <Button
                mode="outlined"
                color="black"
                compact
                uppercase={false}
                style={{ marginHorizontal: 5 }}
              >
                12:20 PM
              </Button>
            </View>
            <View>
              <Text style={{ color: "#888" }}>View All Remarks</Text>
              <Text>Remark 1 - RRRR AADLK</Text>
              <Text>Remark 2 - RRRR AADLK</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const Notification = () => {
  return (
    <View style={MyStyles.container}>
      <Text>Notification</Text>
    </View>
  );
};

export { Profile, ProfileList };
