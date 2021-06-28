import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { List } from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";

const SettingsMenu = (props) => {
  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <ScrollView>
        <List.Item
          onPress={() => props.navigation.navigate("CustomerCatagory")}
          key={index}
          style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
          title="Customer Catagory"
          titleStyle={{ fontWeight: "bold" }}
          right={() => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          onPress={() => props.navigation.navigate("BranchArea")}
          key={index}
          style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
          title="Branch Area"
          titleStyle={{ fontWeight: "bold" }}
          right={() => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          onPress={() => props.navigation.navigate("BranchStaff")}
          key={index}
          style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
          title="Branch Staff"
          titleStyle={{ fontWeight: "bold" }}
          right={() => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          onPress={() => props.navigation.navigate("TabToScan")}
          key={index}
          style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
          title="Tab To Scan"
          titleStyle={{ fontWeight: "bold" }}
          right={() => <List.Icon {...props} icon="chevron-right" />}
        />
      </ScrollView>
    </View>
  );
};

export default SettingsMenu;
