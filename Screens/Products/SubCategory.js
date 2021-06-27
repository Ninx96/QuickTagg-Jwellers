import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Alert,
  FlatList,
  Image,
} from "react-native";
import {
  Button,
  Text,
  List,
  FAB,
  TextInput,
  TouchableRipple,
  Checkbox,
  Card,
  IconButton,
} from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import CustomHeader from "../../Components/CustomHeader";
import ImageUpload from "../../Components/ImageUpload";
import DropDown from "../../Components/DropDown";

const SubCategoryList = (props) => {
  return (
    <View style={MyStyles.container}>
      <FlatList
        data={[{}]}
        renderItem={({ item, index }) => (
          <List.Item
            key={index}
            style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
            title="Engagement Ring"
            titleStyle={{ fontWeight: "bold" }}
            description="Ring"
            right={() => {
              return (
                <TouchableRipple
                  style={{ zIndex: 0 }}
                  onPress={() => {
                    props.navigation.navigate("CustomerForm", {
                      customer_id: item.customer_id,
                    });
                  }}
                >
                  <List.Icon {...props} icon="pencil" />
                </TouchableRipple>
              );
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FAB
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
        icon="plus"
        onPress={() => props.navigation.navigate("SubCategory")}
      />
    </View>
  );
};

const SubCategory = (props) => {
  const [param, setParam] = useState({});
  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
      <ScrollView>
        <View style={MyStyles.cover}>
          <DropDown
            data={[]}
            ext_val="value"
            ext_lbl="label"
            value={param.gender}
            onChange={(val) => {
              setParam({ ...param, gender: val });
            }}
            placeholder="Category"
          />
          <TextInput
            mode="flat"
            label="SubCategory Name"
            placeholder="SubCategory Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setParam({ ...param, full_name: text });
            }}
          />
          <View
            style={[
              MyStyles.row,
              { justifyContent: "center", marginVertical: 40 },
            ]}
          >
            <Button mode="contained" uppercase={false}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { SubCategory, SubCategoryList };