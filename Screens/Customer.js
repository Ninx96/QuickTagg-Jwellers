import moment from "moment";
import React, { useState, useEffect } from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { Button, Text, List, FAB, TextInput } from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import DatePicker from "../Components/DatePicker";
import DropDown from "../Components/DropDown";
import MyStyles from "../Styles/MyStyles";

const CustomerList = (props) => {
  const [state, setstate] = useState(null);

  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <ScrollView>
        <List.Item
          style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
          title="Rahul"
          titleStyle={{ fontWeight: "bold" }}
          description="9716612244"
          left={(props) => <List.Icon {...props} icon="account" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </ScrollView>
      <FAB
        style={{
          position: "absolute",
          bottom: 5,
          right: 5,
        }}
        icon="plus"
        onPress={() => props.navigation.navigate("CustomerForm")}
      />
    </View>
  );
};

const CustomerForm = (props) => {
  const [state, setstate] = useState(null);
  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../assets/login-bg.jpg")}
    >
      <CustomHeader {...props} />
      <ScrollView>
        <View style={MyStyles.cover}>
          <TextInput
            mode="flat"
            label="Full Name"
            placeholder="Full Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <TextInput
            mode="flat"
            label="Mobile No."
            placeholder="Full Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <TextInput
            mode="flat"
            label="Email"
            placeholder="Full Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <View style={MyStyles.row}>
            <DatePicker
              label="DOB"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={moment()}
              onValueChange={(date) => {}}
            />
            <DatePicker
              label="DOA"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={moment()}
              onValueChange={(date) => {}}
            />
          </View>
          <DropDown data={[]} placeholder="Customer Category" />
          <View style={MyStyles.row}>
            <DropDown data={[]} placeholder="Staff" style={{ width: "45%" }} />
            <DropDown data={[]} placeholder="Area" style={{ width: "45%" }} />
          </View>
          <TextInput
            mode="flat"
            label="Profession"
            placeholder="Profession"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <TextInput
            mode="flat"
            label="Address"
            placeholder="Address"
            multiline
            numberOfLines={3}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <View
            style={[
              MyStyles.row,
              { justifyContent: "center", marginVertical: 40 },
            ]}
          >
            <Button mode="contained" la uppercase={false}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { CustomerList, CustomerForm };
