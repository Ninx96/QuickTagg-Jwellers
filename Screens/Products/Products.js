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
import { postRequest } from "../../Services/RequestServices";
const ProductsList = (props) => {
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    let param = {}
    postRequest("masters/product/browse", param, userToken).then((resp) => {
      if (resp.status == 200) {
        setgriddata(resp.data);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
    setLoading(false);
  }, []);

  return (
    <View style={MyStyles.container}>
      <FlatList
        data={griddata}
        numColumns={3}
        renderItem={({ item, index }) => (
          <Card
            style={{
              margin: 5,
              borderRadius: 10,
              width: 120,
              alignItems: "center",
            }}
            onPress={() => props.navigation.navigate("ProductsPreview", { product_id: item.product_id })}
          >
            <Card.Cover
              source={{ uri: item.url_image + '' + item.image_path }}
              style={{ width: 120, height: 110 }}
            />
            <View style={{ padding: 5 }}>
              <Text>{item.product_name} {item.product_code}</Text>
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
  const { userToken } = props.route.params;
  const { product_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [param, setparam] = useState({
    product_id: '',
    product_code: '',
    product_name: '',
    remarks: '',
    price: '',
    disable: '',
    exhibition: '',
    businesses: '',
    trial: '',
    discounted_price: '',
    weight: '',
    size_length: '',
    gender: '',
    Metal: '',
    material: '',
    on_demand: '',
    available: '',
    qty: '',
  });

  const [productImages, setProductImages] = useState([{}, {}, {}]);
  React.useEffect(() => {
    let data = { product_id: product_id }
    postRequest("masters/product/preview", data, userToken).then((resp) => {
      if (resp.status == 200) {
        param.product_id = resp.data[0].product_id;
        param.product_code = resp.data[0].product_code;
        param.product_name = resp.data[0].product_name;
        param.remarks = resp.data[0].remarks;
        param.price = resp.data[0].price;
        param.disable = resp.data[0].disable;
        param.exhibition = resp.data[0].exhibition;
        param.businesses = resp.data[0].businesses;
        param.trial = resp.data[0].trial;
        param.discounted_price = resp.data[0].discounted_price;
        param.weight = resp.data[0].weight;
        param.size_length = resp.data[0].size_length;
        param.gender = resp.data[0].gender;
        param.Metal = resp.data[0].Metal;
        param.material = resp.data[0].material;
        param.on_demand = resp.data[0].on_demand;
        param.available = resp.data[0].available;
        param.qty = resp.data[0].qty;
        setparam({ ...param });

        let ImagesList = [];
        ImagesList = resp.data[0].images;
        setProductImages(ImagesList);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
    setLoading(false);
  }, []);

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
            {param.product_name}
          </Text>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>SKU: {param.product_code}</Text>
          <Text style={{ fontSize: 18 }}>
            Price: <Text style={{ fontWeight: "bold" }}>{param.price}</Text> {"      "}
            <Text
              style={{
                color: "red",
                textDecorationLine: "line-through",
              }}
            >
              {param.price}
            </Text>
          </Text>
        </View>

        <View style={{ height: 300, marginTop: 20 }}>
          <Swiper>
            {productImages.length > 0 ? productImages.map((resp, index) => {
              return (
                <Image
                  key={resp.image_id}
                  source={{ uri: resp.url + '' + resp.image_path }}
                  style={[{ height: 250, width: "100%" }]}
                />
              );
            }) :
              <Image
                source={require("../../assets/upload.png")}
                style={[{ height: 250, width: "100%" }]}
              />}
          </Swiper>
        </View>
        <View style={[MyStyles.wrapper, { paddingHorizontal: 5 }]}>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Availablity :</Text>
            <Text>{param.available}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Metal :</Text>
            <Text>{param.Metal}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Material :</Text>
            <Text>{param.material}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Disable :</Text>
            <Text>{param.disable}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Exhibition :</Text>
            <Text>{param.exhibition}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Weight :</Text>
            <Text>{param.weight}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Size/Length :</Text>
            <Text>{param.size_length}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Gender :</Text>
            <Text>{param.gender}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Description :</Text>
            <Text>{param.product_code}</Text>
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
          <Checkbox.Item label="Exhibition" onPress={() => { }} />
          <Checkbox.Item label="Business" onPress={() => { }} />
          <Checkbox.Item label="Trial at Home" onPress={() => { }} />
          <Checkbox.Item label="Disable" onPress={() => { }} />
          <MultipleImages data={[]} onSelect={(fileArray) => { }} />
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
