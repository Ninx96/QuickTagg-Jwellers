import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Alert,
  FlatList,
} from "react-native";
import {
  Button,
  Text,
  FAB,
  TextInput,
  Checkbox,
  Card,
} from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import DropDown from "../../Components/DropDown";
import MultipleImages from "../../Components/MultipleImages";

const GeneralCatalogList = (props) => {
  return <View style={MyStyles.container}></View>;
};

const GeneralCatalog = (props) => {
  const [param, setParam] = useState({});
  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
      <CustomHeader {...props} />
      <ScrollView>
        <View
          style={[
            MyStyles.cover,
            { borderBottomColor: "black", borderBottomWidth: 1 },
          ]}
        >
          <DropDown
            data={[]}
            ext_val="value"
            ext_lbl="label"
            value={param.gender}
            onChange={(val) => {
              setparam({ ...param, gender: val });
            }}
            placeholder="SubCategory"
          />
          <TextInput
            mode="flat"
            label="Min. Amount"
            placeholder="Min. Amount"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Max. Amount"
            placeholder="Max. Amount"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <View
            style={[
              MyStyles.row,
              { justifyContent: "center", marginVertical: 40 },
            ]}
          >
            <Button mode="contained" uppercase={false}>
              Add Products
            </Button>
            <Button mode="contained" uppercase={false}>
              Next
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { GeneralCatalog, GeneralCatalogList };
