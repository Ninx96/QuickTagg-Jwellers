import React, { useState, useEffect } from "react";
import { View, ImageBackground, ScrollView, FlatList } from "react-native";
import { List } from "react-native-paper";
import CustomHeader from "../../Components/CustomHeader";
import MyStyles from "../../Styles/MyStyles";

const BranchStaffList = (props) => {
  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <FlatList
        data={[{}]}
        renderItem={({ item, index }) => (
          <List.Item
            key={index}
            style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
            title="Ayush"
            titleStyle={{ fontWeight: "bold" }}
            description="9654933343"
            right={() => <List.Icon {...props} icon="pencil" />}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const BranchStaff = (props) => {
  const [param, setParam] = useState({});
  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
      <CustomHeader {...props} />
      <ScrollView>
        <View style={MyStyles.cover}>
          <TextInput
            mode="flat"
            label="Staff Name"
            placeholder="Staff Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Staff Mobile"
            placeholder="Staff Mobile"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { BranchStaff, BranchStaffList };
