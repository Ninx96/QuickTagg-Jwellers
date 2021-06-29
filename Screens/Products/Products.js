import React, { useState } from "react";
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
  FAB,
  TextInput,
  Checkbox,
  Card,
  IconButton,
} from "react-native-paper";
import Swiper from "react-native-swiper";

import MyStyles from "../../Styles/MyStyles";
import DropDown from "../../Components/DropDown";
import MultipleImages from "../../Components/MultipleImages";

const ProductsList = (props) => {
  return (
    <View style={MyStyles.container}>
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
          bottom: 20,
          right: 20,
        }}
        icon="plus"
        onPress={() => props.navigation.navigate("Products")}
      />
    </View>
  );
};

const ProductsPreview = (props) => {
  const [productImages, setProductImages] = useState([{}, {}, {}]);
  return (
    <View style={MyStyles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="chevron-left"
            size={30}
            color="black"
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View style={[MyStyles.wrapper, { paddingHorizontal: 5 }]}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>
            Aloxasia Leaf Drop Earring
          </Text>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>SKU: 10012</Text>
          <Text style={{ fontSize: 18 }}>
            Price: <Text style={{ fontWeight: "bold" }}>50</Text> {"      "}
            <Text
              style={{
                color: "red",
                textDecorationLine: "line-through",
              }}
            >
              200
            </Text>
          </Text>
        </View>

        <View style={{ height: 300, marginTop: 20 }}>
          <Swiper>
            {productImages.map((item, index) => {
              return (
                <Image
                  key={index}
                  source={require("../../assets/upload.png")}
                  style={[{ height: 250, width: "100%" }]}
                />
              );
            })}
          </Swiper>
        </View>
        <View style={[MyStyles.wrapper, { paddingHorizontal: 5 }]}>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Availablity :</Text>
            <Text>null</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Metal :</Text>
            <Text>null</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Material :</Text>
            <Text>null</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Disable :</Text>
            <Text>null</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Exhibition :</Text>
            <Text>null</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Weight :</Text>
            <Text>null</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Size/Length :</Text>
            <Text>null</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Gender :</Text>
            <Text>null</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Description :</Text>
            <Text>null</Text>
          </View>
        </View>
      </ScrollView>
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

export { Products, ProductsPreview, ProductsList };
