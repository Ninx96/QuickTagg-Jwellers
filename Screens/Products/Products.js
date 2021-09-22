import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Alert,
  FlatList,
  Image,
  Share,
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyStyles from "../../Styles/MyStyles";
import DropDown from "../../Components/DropDown";
import MultipleImages from "../../Components/MultipleImages";
import { postRequest } from "../../Services/RequestServices";
import BadgeRibbon from "../../Components/BadgeRibbon";
import { serviceUrl } from "../../Services/Constants";

const ProductsList = (props) => {
  const { userToken, search } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    console.log(search);
    postRequest(
      "masters/product/browse_app",
      { search: search == undefined ? "" : search },
      userToken
    ).then((resp) => {
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
  }, [search]);

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
            onPress={() =>
              props.navigation.navigate("ProductsPreview", {
                product_id: item.product_id,
              })
            }
          >
            {item.exhibition ? (
              <BadgeRibbon text="E" position="left" color="red" />
            ) : null}
            {item.trial ? <BadgeRibbon text="T" position="right" /> : null}
            <Image
              source={{ uri: item.url_image + "" + item.image_path }}
              style={{
                width: 120,
                height: 120,
                zIndex: -50,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            />

            <View style={{ padding: 5, paddingVertical: 10 }}>
              <Text numberOfLines={2} style={{ color: "#333" }}>
                {item.product_name}
              </Text>
              <Text style={{ color: "#333" }}>{item.product_code}</Text>
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
        color="#000"
        onPress={() =>
          props.navigation.navigate("ProductsForm", { product_id: 0 })
        }
      />
    </View>
  );
};

const ProductsPreview = (props) => {
  const { userToken } = props.route.params;
  const { product_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [param, setparam] = useState({
    product_id: "",
    product_code: "",
    product_name: "",
    remarks: "",
    price: "",
    disable: "",
    exhibition: "",
    businesses: "",
    trial: "",
    discounted_price: "",
    weight: "",
    size_length: "",
    gender: "",
    Metal: "",
    material: "",
    on_demand: "",
    available: "",
    qty: "",
  });
  const [productImages, setProductImages] = useState([]);
  const [shareOptions, setshareOptions] = useState({
    title: "",
    message: "",
    url: "",
    subject: "",
  });

  React.useEffect(() => {
    let data = { product_id: product_id };
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
        {/* <View
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
        </View> */}
        <View style={[MyStyles.wrapper, { paddingHorizontal: 5 }]}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>
            {param.product_name}
          </Text>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>
            SKU: {param.product_code}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>
              Price: <Text style={{ fontWeight: "bold" }}>{param.price}</Text>{" "}
              {"      "}
              <Text
                style={{
                  fontSize: 14,
                  color: "red",
                  textDecorationLine: "line-through",
                }}
              >
                {param.price}
              </Text>
            </Text>
            <IconButton
              icon="share-variant"
              size={25}
              color="#FFF"
              style={{
                marginHorizontal: 0,
                backgroundColor: "#2874A6",
                textAlign: "right",
                marginLeft: "auto",
              }}
              onPress={() => {
                shareOptions.title = param.product_name;
                shareOptions.message = param.product_name;
                shareOptions.url = "www.google.com/";
                setshareOptions({ ...shareOptions });
                Share.share(shareOptions);
              }}
            />
          </View>
        </View>

        <View style={{ height: 300 }}>
          <Swiper loop={false} activeDotColor="#ffba3c">
            {productImages.length > 0 ? (
              productImages.map((resp, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: resp.url + "" + resp.image_path }}
                    style={[{ height: 250, width: "100%" }]}
                  />
                );
              })
            ) : (
              <Image
                source={require("../../assets/upload.png")}
                style={[{ height: 250, width: "100%" }]}
              />
            )}
          </Swiper>
        </View>
        <View style={[MyStyles.wrapper, { paddingHorizontal: 10 }]}>
          <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
            <Text style={{ fontWeight: "bold", fontSize: 16, width: 150 }}>
              Availablity :
            </Text>
            <Text>{param.available}</Text>
          </View>
          <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
            <Text style={{ fontWeight: "bold", fontSize: 16, width: 150 }}>
              Metal :
            </Text>
            <Text>{param.Metal}</Text>
          </View>
          <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
            <Text style={{ fontWeight: "bold", fontSize: 16, width: 150 }}>
              Material :
            </Text>
            <Text>{param.material}</Text>
          </View>
          <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
            <Text style={{ fontWeight: "bold", fontSize: 16, width: 150 }}>
              Disable :
            </Text>
            <Text>{param.disable}</Text>
          </View>
          <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
            <Text style={{ fontWeight: "bold", fontSize: 16, width: 150 }}>
              Exhibition :
            </Text>
            <Text>{param.exhibition}</Text>
          </View>
          <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
            <Text style={{ fontWeight: "bold", fontSize: 16, width: 150 }}>
              Weight :
            </Text>
            <Text>{param.weight}</Text>
          </View>
          <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
            <Text style={{ fontWeight: "bold", fontSize: 16, width: 150 }}>
              Size/Length :
            </Text>
            <Text>{param.size_length}</Text>
          </View>
          <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
            <Text style={{ fontWeight: "bold", fontSize: 16, width: 150 }}>
              Gender :
            </Text>
            <Text>{param.gender}</Text>
          </View>
          <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
            <Text style={{ fontWeight: "bold", fontSize: 16, width: 150 }}>
              Description :
            </Text>
            <Text>{param.product_code}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const ProductsForm = (props) => {
  const { product_id } = props.route.params;
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [genderlist, setgenderlist] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);
  const [categorylist, setcategorylist] = useState([]);
  const [subcategorylist, setsubcategorylist] = useState([]);
  const [productavailablelist, setproductavailablelist] = useState([
    { label: "In Stock", value: "In Stock" },
    { label: "Make To Order", value: "Make To Order" },
  ]);
  const [param, setparam] = useState({
    product_id: 0,
    product_name: "",
    product_code: "",
    gender: "",
    category_id: "",
    price: "",
    discounted_price: "",
    weight: "",
    size_length: "",
    metal: "",
    material: "",
    available: false,
    remarks: "",
    on_demand: "",
    qty: "",
    Metal: "",
    trial: false,
    businesses: false,
    disable: false,
    exhibition: false,
    product_images: [],
    product_subcategory_list: [],
  });
  const [productsuploads, setproductsuploads] = useState([]);

  React.useEffect(() => {
    postRequest("masters/product/subcategory/getCategory", {}, userToken).then(
      (resp) => {
        if (resp.status == 200) {
          setcategorylist(resp.data);
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      }
    );

    setLoading(false);
  }, []);

  const SubcategoryList = (category_id) => {
    postRequest(
      "masters/product/subcategory/getSubcategory",
      { category_id: category_id },
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        setsubcategorylist(resp.data);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
  };
  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
      <ScrollView>
        <View style={MyStyles.cover}>
          <TextInput
            mode="outlined"
            placeholder="Product Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.product_name}
            onChangeText={(text) => {
              setparam({ ...param, product_name: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Product Code"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.product_code}
            onChangeText={(text) => {
              setparam({ ...param, product_code: text });
            }}
          />
          <DropDown
            data={genderlist}
            ext_val="value"
            ext_lbl="label"
            value={param.gender}
            onChange={(val) => {
              setparam({ ...param, gender: val });
            }}
            placeholder="Shop For"
          />
          <DropDown
            data={categorylist}
            ext_val="category_id"
            ext_lbl="category_name"
            value={param.category_id}
            onChange={(val) => {
              setparam({ ...param, category_id: val });
              SubcategoryList(val);
            }}
            placeholder="Product Category"
          />
          {/* <DropDown
            data={subcategorylist}
            ext_val="subcategory_id"
            ext_lbl="subcategory_name"
            // value={param.gender}
            // onChange={(val) => {
            //   setparam({ ...param, gender: val });
            // }}
            placeholder="Product Sub Category"
          /> */}
          <TextInput
            mode="outlined"
            placeholder="Price"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.price}
            onChangeText={(text) => {
              setparam({ ...param, price: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Discoounted Price"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.discounted_price}
            onChangeText={(text) => {
              setparam({ ...param, discounted_price: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Weight"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.weight}
            onChangeText={(text) => {
              setparam({ ...param, weight: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Size/Length"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.size_length}
            onChangeText={(text) => {
              setparam({ ...param, size_length: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Metal"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.metal}
            onChangeText={(text) => {
              setparam({ ...param, metal: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Material"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.material}
            onChangeText={(text) => {
              setparam({ ...param, material: text });
            }}
          />
          <DropDown
            data={productavailablelist}
            ext_val="value"
            ext_lbl="label"
            value={param.on_demand}
            onChange={(val) => {
              setparam({ ...param, on_demand: val });
            }}
            placeholder="Product Availablity"
          />
          <TextInput
            mode="outlined"
            placeholder="Remarks"
            multiline
            numberOfLines={3}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.remarks}
            onChangeText={(text) => {
              setparam({ ...param, remarks: text });
            }}
          />
          <Checkbox.Item
            label="Exhibition"
            labelStyle={{ color: "#000" }}
            status={param.exhibition ? "checked" : "unchecked"}
            onPress={(e) => {
              setparam({ ...param, exhibition: !param.exhibition });
            }}
          />
          <Checkbox.Item
            label="Business"
            labelStyle={{ color: "#000" }}
            status={param.businesses ? "checked" : "unchecked"}
            onPress={(e) => {
              setparam({ ...param, businesses: !param.businesses });
            }}
          />
          <Checkbox.Item
            label="Trial at Home"
            labelStyle={{ color: "#000" }}
            status={param.trial ? "checked" : "unchecked"}
            onPress={(e) => {
              setparam({ ...param, trial: !param.trial });
            }}
          />
          <Checkbox.Item
            label="Disable"
            labelStyle={{ color: "#000" }}
            status={param.disable ? "checked" : "unchecked"}
            onPress={(e) => {
              setparam({ ...param, disable: !param.disable });
            }}
          />

          <MultipleImages
            data={[]}
            onSelect={(fileArray) => {
              let imagesname = [],
                imagesdata = [];
              fileArray.map((resp, index) => {
                imagesname.push(resp.name);
                imagesdata.push({
                  image_path: resp.uri,
                  image_name: resp.name,
                });
              });
              setparam({ ...param, product_images: imagesname });
              setproductsuploads(imagesdata);
            }}
          />

          <Button
            mode="contained"
            la
            uppercase={false}
            onPress={() => {
              setLoading(true);
              postRequest("masters/product/insert", param, userToken).then(
                (resp) => {
                  if (resp.status == 200) {
                    if (resp.data[0].valid) {
                      if (param.product_images.length !== 0) {
                        productsuploads.map((item, index) => {
                          const form_data = new FormData();
                          form_data.append("files", {
                            uri: item.image_path,
                            type: "image/jpeg",
                            name: item.image_name,
                          });

                          var xhr = new XMLHttpRequest();
                          xhr.open(
                            "POST",
                            serviceUrl + "masters/product/uploadImageMob",
                            true
                          );
                          xhr.setRequestHeader("Accept", "application/json");
                          xhr.setRequestHeader(
                            "Content-Type",
                            "multipart/form-data"
                          );
                          xhr.setRequestHeader("auth-token", userToken);

                          xhr.onload = function (e) {
                            const resp = xhr.response;
                            if (resp.status == 200) {
                              if (resp.data[0].valid) {
                                // console.log("Images : " + resp.data[0].valid);
                              }
                            }
                          };
                          xhr.send(form_data);
                        });
                      }

                      props.navigation.navigate("ProductTabs");
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

export { ProductsForm, ProductsPreview, ProductsList };
