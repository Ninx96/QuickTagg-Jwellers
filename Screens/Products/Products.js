import moment from "moment";
import React, { useState, useEffect } from "react";
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
import DropDown from "../../Components/DropDown";
import MultipleImages from "../../Components/MultipleImages";

const ProductsList = (props) => {
  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <FlatList
        data={[{}]}
        renderItem={({ item, index }) => (
          <Card
            style={{
              margin: 5,
              borderRadius: 10,
              width: 120,
              alignItems: "center",
            }}
          >
            <Card.Cover
              source={require("../../assets/upload.png")}
              style={{ width: 120, height: 110 }}
            />
            <View style={{ padding: 5 }}>
              <Text>Alocasia Leaf Drop 10011</Text>
            </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FAB
        style={{
          position: "absolute",
          bottom: 5,
          right: 5,
        }}
        icon="plus"
        onPress={() => props.navigation.navigate("Products")}
      />
    </View>
  );
};

const Products = (props) => {
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
            label="Product Name"
            placeholder="Product Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Product Code"
            placeholder="Product Code"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <DropDown
            data={[]}
            ext_val="value"
            ext_lbl="label"
            value={param.gender}
            onChange={(val) => {
              setparam({ ...param, gender: val });
            }}
            placeholder="Shop For"
          />
          <DropDown
            data={[]}
            ext_val="value"
            ext_lbl="label"
            value={param.gender}
            onChange={(val) => {
              setparam({ ...param, gender: val });
            }}
            placeholder="Product Category"
          />
          <DropDown
            data={[]}
            ext_val="value"
            ext_lbl="label"
            value={param.gender}
            onChange={(val) => {
              setparam({ ...param, gender: val });
            }}
            placeholder="Product Sub Category"
          />
          <TextInput
            mode="flat"
            label="Price"
            placeholder="Price"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Discoounted Price"
            placeholder="Discoounted Price"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Weight"
            placeholder="Weight"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Size/Length"
            placeholder="Size/Length"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Metal"
            placeholder="Metal"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Material"
            placeholder="Material"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <DropDown
            data={[]}
            ext_val="value"
            ext_lbl="label"
            value={param.gender}
            onChange={(val) => {
              setparam({ ...param, gender: val });
            }}
            placeholder="Product Availablity"
          />
          <TextInput
            mode="flat"
            label="Remarks"
            placeholder="Remarks"
            multiline
            numberOfLines={3}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.address}
            onChangeText={(text) => {
              setparam({ ...param, address: text });
            }}
          />
          <Checkbox.Item label="Exhibition" onPress={() => {}} />
          <Checkbox.Item label="Business" onPress={() => {}} />
          <Checkbox.Item label="Trial at Home" onPress={() => {}} />
          <Checkbox.Item label="Disable" onPress={() => {}} />
          <MultipleImages data={[]} onSelect={(fileArray) => {}} />
          <Button
            mode="contained"
            la
            uppercase={false}
            onPress={() => {
              setLoading(true);
              postRequest("masters/customer/insert", param, token).then(
                (resp) => {
                  if (resp.status == 200) {
                    if (resp.data[0].valid) {
                      props.navigation.navigate("CustomerList");
                    } else {
                      Alert.alert("Error !", resp.error);
                    }
                  } else {
                    Alert.alert(
                      "Error !",
                      "Oops! \nSeems like we run into some Server Error"
                    );
                  }
                  setLoading(false);
                }
              );
            }}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { Products, ProductsList };
