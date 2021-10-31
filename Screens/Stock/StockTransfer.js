import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Image,
  FlatList,
  Alert,
  TextInput as Input,
} from "react-native";
import {
  Button,
  Text,
  FAB,
  TextInput,
  IconButton,
  Card,
  Portal,
  Modal,
  Subheading,
  ToggleButton,
} from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import DropDown from "../../Components/DropDown";
import MultipleImages from "../../Components/MultipleImages";
import CustomHeader from "../../Components/CustomHeader";
import SelectMultiple from "../../Components/SelectMultiple";
import SelectCustomer from "../../Components/SelectCustomer";
import DatePicker from "../../Components/DatePicker";
import moment from "moment";
import Loading from "../../Components/Loading";
import { postRequest } from "../../Services/RequestServices";
import { LinearGradient } from "expo-linear-gradient";

const StockTransfer = (props) => {
  const { userToken, branchId, tran_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [param, setparam] = useState({
    tran_id: "0",
    subcategory_id: "",
    min_amount: "",
    max_amount: "",
    customer_name: "",
    customer_id: "",
    title: "",
    entry_no: "",
    remarks: "",
    customer_session_products: [],
  });
  const [product, setProduct] = useState(false);
  const [contact, setContact] = useState(false);
  const [remarks, setRemarks] = useState(false);
  const [productList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([
    {
      data: [
        {
          category_id: 8,
          gender: "Women",
          image_path: "image-8240f2e1-5048-449e-bbf5-e93a822b6a9d.jpg",
          mtran_id: 350,
          no_of_customers: 107,
          no_of_product: 12,
          price: 40000,
          product_code: "10056",
          product_id: 57,
          product_name: "Jjd",
          subcategory_id: 4,
          text: "Engagment(Earings)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
        {
          category_id: 8,
          gender: "Women",
          image_path: "image-6dc6f56d-0f79-460d-be70-0396ea7f6912.jpg",
          mtran_id: 351,
          no_of_customers: 107,
          no_of_product: 12,
          price: 100,
          product_code: "10047",
          product_id: 48,
          product_name: "Alocasia Leaf Drop Earrings",
          subcategory_id: 4,
          text: "Engagment(Earings)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
        {
          category_id: 8,
          gender: "Women",
          image_path: "image-8240f2e1-5048-449e-bbf5-e93a822b6a9d.jpg",
          mtran_id: 352,
          no_of_customers: 107,
          no_of_product: 12,
          price: 65000,
          product_code: "10048",
          product_id: 49,
          product_name: "Reveka",
          subcategory_id: 4,
          text: "Engagment(Earings)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
        {
          category_id: 8,
          gender: "Women",
          image_path: "image-6dc6f56d-0f79-460d-be70-0396ea7f6912.jpg",
          mtran_id: 353,
          no_of_customers: 107,
          no_of_product: 12,
          price: 100,
          product_code: "10046",
          product_id: 47,
          product_name: "Alocasia Leaf Drop Earrings",
          subcategory_id: 4,
          text: "Engagment(Earings)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
        {
          category_id: 8,
          gender: "Women",
          image_path: "image-6dc6f56d-0f79-460d-be70-0396ea7f6912.jpg",
          mtran_id: 354,
          no_of_customers: 107,
          no_of_product: 12,
          price: 100,
          product_code: "10011",
          product_id: 12,
          product_name: "Alocasia Leaf Drop Earrings",
          subcategory_id: 4,
          text: "Engagment(Earings)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
        {
          category_id: 8,
          gender: "Women",
          image_path: "image-ce2a4009-fbf7-4483-af7c-746413874630.jpg",
          mtran_id: 355,
          no_of_customers: 107,
          no_of_product: 12,
          price: 1000,
          product_code: "10037",
          product_id: 38,
          product_name: "Testing",
          subcategory_id: 4,
          text: "Engagment(Earings)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
      ],
      subcategory_name: "Engagment(Earings)",
    },
    {
      data: [
        {
          category_id: 4,
          gender: "Kid",
          image_path: "image-1ad31595-4808-4c27-ab8d-83888e3f0514.png",
          mtran_id: 356,
          no_of_customers: 107,
          no_of_product: 12,
          price: 600,
          product_code: "10041",
          product_id: 42,
          product_name: "testing 1",
          subcategory_id: 8,
          text: "Beating Heart Ring(Ring)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
        {
          category_id: 4,
          gender: "Man",
          image_path: "image-8240f2e1-5048-449e-bbf5-e93a822b6a9d.jpg",
          mtran_id: 357,
          no_of_customers: 107,
          no_of_product: 12,
          price: 500,
          product_code: "1234",
          product_id: 59,
          product_name: "test",
          subcategory_id: 8,
          text: "Beating Heart Ring(Ring)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
        {
          category_id: 4,
          gender: "Women",
          image_path: "image-a4426398-7a7d-4635-b591-d597cb443279.png",
          mtran_id: 358,
          no_of_customers: 107,
          no_of_product: 12,
          price: 324,
          product_code: "12312",
          product_id: 58,
          product_name: "12312",
          subcategory_id: 8,
          text: "Beating Heart Ring(Ring)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
        {
          category_id: 4,
          gender: "Kid",
          image_path: "image-1ad31595-4808-4c27-ab8d-83888e3f0514.png",
          mtran_id: 359,
          no_of_customers: 107,
          no_of_product: 12,
          price: 600,
          product_code: "10041",
          product_id: 42,
          product_name: "testing 1",
          subcategory_id: 8,
          text: "Beating Heart Ring(Ring)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
        {
          category_id: 4,
          gender: "Man",
          image_path: "image-8240f2e1-5048-449e-bbf5-e93a822b6a9d.jpg",
          mtran_id: 360,
          no_of_customers: 107,
          no_of_product: 12,
          price: 500,
          product_code: "1234",
          product_id: 59,
          product_name: "test",
          subcategory_id: 8,
          text: "Beating Heart Ring(Ring)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
        {
          category_id: 4,
          gender: "Women",
          image_path: "image-a4426398-7a7d-4635-b591-d597cb443279.png",
          mtran_id: 361,
          no_of_customers: 107,
          no_of_product: 12,
          price: 324,
          product_code: "12312",
          product_id: 58,
          product_name: "12312",
          subcategory_id: 8,
          text: "Beating Heart Ring(Ring)",
          url_image: "https://jewellerapi.quickgst.in/Images/",
        },
      ],
      subcategory_name: "Beating Heart Ring(Ring)",
    },
  ]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [subcategorylist, setsubcategorylist] = useState([]);

  React.useEffect(() => {
    postRequest(
      "transactions/customer/session/getSubcategory",
      { branch_id: branchId },
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        var _subcategoryList = [];
        resp.data.map((item, index) => {
          _subcategoryList.push({
            subcategory_id: item.subcategory_id,
            subcategory_name:
              item.subcategory_name + " (" + item.category_name + ")",
          });
        });
        setsubcategorylist(_subcategoryList);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
    if (tran_id == 0) {
      postRequest(
        "transactions/customer/customerListMob",
        { branch_id: branchId },
        userToken
      ).then((resp) => {
        if (resp.status == 200) {
          setCustomerList(resp.data);
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      });
    }

    postRequest(
      "transactions/customer/session/preview",
      { tran_id: tran_id },
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        if (tran_id == 0) {
          param.entry_no = resp.data[0].entry_no;
          setparam({ ...param });
        } else {
          param.tran_id = resp.data[0].tran_id;
          param.customer_id = resp.data[0].customer_id;
          param.customer_name = resp.data[0].customer_name;
          param.title = resp.data[0].title;
          param.entry_no = resp.data[0].entry_no;
          param.remarks = resp.data[0].remarks;
          param.subcategory_id = resp.data[0].products[0].subcategory_id;
          param.customer_session_products = resp.data[0].products;
          setparam({ ...param });

          postRequest(
            "transactions/customer/customerListMob",
            { branch_id: branchId },
            userToken
          ).then((items) => {
            if (items.status == 200) {
              let listData = [];
              listData = items.data;
              listData.map((item, index) => {
                listData[index].selected =
                  item.customer_id === resp.data[0].customer_id ? true : false;
              });
              setCustomerList(listData);
            } else {
              Alert.alert(
                "Error !",
                "Oops! \nSeems like we run into some Server Error"
              );
            }
          });

          let tempData = Object.values(
            param.customer_session_products.reduce((acc, item) => {
              if (!acc[item.text])
                acc[item.text] = {
                  subcategory_name: item.text,
                  data: [],
                };
              acc[item.text].data.push(item);
              return acc;
            }, {})
          );

          setSelectedProducts(tempData);
        }
      }
    });
    setLoading(false);
  }, []);

  const ProductList = () => {
    let data = {
      subcategory_id: param.subcategory_id,
      min_amount: param.min_amount == "" ? "0" : param.min_amount,
      max_amount: param.max_amount == "" ? "0" : param.max_amount,
    };
    postRequest(
      "transactions/customer/session/getProducts",
      data,
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        setProductList(resp.data);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
    setLoading(false);
  };
  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
      <Loading isloading={false} />
      <View style={MyStyles.cover}>
        <ScrollView>
          <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
            <DropDown
              data={subcategorylist}
              ext_val="subcategory_id"
              ext_lbl="subcategory_name"
              value={param.subCategory}
              onChange={(val) => {
                param.subcategory_id = val;
                setparam({ ...param });
                ProductList();
              }}
              placeholder="SubCategory"
            />
            <TextInput
              mode="outlined"
              placeholder="Min. Amount"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={param.min_amount}
              keyboardType={"number-pad"}
              onChangeText={(text) => {
                setparam({ ...param, min_amount: text });
                ProductList();
              }}
            />
            <TextInput
              mode="outlined"
              placeholder="Max. Amount"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={param.max_amount}
              keyboardType={"number-pad"}
              onChangeText={(text) => {
                setparam({ ...param, max_amount: text });
                ProductList();
              }}
            />
            <View
              style={[
                MyStyles.row,
                { justifyContent: "space-evenly", marginVertical: 40 },
              ]}
            >
              <Button
                mode="contained"
                uppercase={false}
                onPress={() => {
                  if (param.subcategory_id == "") {
                    Alert.alert("select subcategory!");
                  } else if (param.min_amount == "") {
                    Alert.alert("select min. amount!");
                  } else if (param.max_amount == "") {
                    Alert.alert("select max. amount!");
                  } else {
                    setProduct(true);
                  }
                }}
              >
                Add Products
              </Button>
              <Button
                mode="contained"
                uppercase={false}
                onPress={() => {
                  if (selectedProducts.length == "0") {
                    Alert.alert("add products!");
                  } else {
                    setContact(true);
                  }
                }}
              >
                Next
              </Button>
            </View>
          </View>

          {selectedProducts.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Subheading style={{ width: "100%", color: "#000" }}>
                  {item.subcategory_name}
                </Subheading>
                {item.data.map((item, i) => (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      marginVertical: 5,
                    }}
                  >
                    <Image
                      source={{ uri: item.url_image + "" + item.image_path }}
                      style={{
                        height: 100,
                        width: 80,
                        marginHorizontal: 5,
                        borderRadius: 5,
                      }}
                    />
                    <View>
                      <Text numberOfLines={1} style={{ paddingRight: 120 }}>
                        {item.product_name}
                      </Text>
                      <Text numberOfLines={1}>{item.product_code}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 20,
                        }}
                      >
                        <ToggleButton
                          icon="minus"
                          style={{
                            borderWidth: 1,
                            borderRightWidth: 0,
                            borderColor: "#000",
                          }}
                          onPress={() => {}}
                        />

                        <Input
                          mode="outlined"
                          style={{
                            borderWidth: 1,
                            height: 42,
                            width: 60,
                            marginHorizontal: -2,
                            textAlign: "center",
                          }}
                          value="100"
                        />

                        <ToggleButton
                          icon="plus"
                          style={{
                            borderWidth: 1,
                            borderColor: "#000",
                            borderLeftWidth: 0,
                          }}
                          onPress={() => {}}
                        />
                      </View>
                    </View>
                    <IconButton
                      icon="close"
                      size={15}
                      style={{ marginLeft: "auto" }}
                      onPress={() => {
                        selectedProducts[index].data.splice(i, 1);
                        setSelectedProducts([...selectedProducts]);
                        param.customer_session_products[index].data.splice(
                          i,
                          1
                        );
                        setparam([...param]);
                      }}
                    />
                  </View>
                ))}
              </View>
            );
          })}
        </ScrollView>
      </View>

      <SelectMultiple
        visible={product}
        data={productList}
        onDone={(items) => {
          items.map((item, i) => {
            let checkproduct =
              param.customer_session_products.findIndex(
                (e) => e.product_id == item.product_id
              ) > -1
                ? false
                : true;
            if (checkproduct) {
              param.customer_session_products.push(item);
            }
          });
          setparam({
            ...param,
            customer_session_products: param.customer_session_products,
          });

          let tempData = Object.values(
            param.customer_session_products.reduce((acc, item) => {
              if (!acc[item.subcategory_name])
                acc[item.subcategory_name] = {
                  subcategory_name: item.subcategory_name,
                  data: [],
                };
              acc[item.subcategory_name].data.push(item);
              return acc;
            }, {})
          );

          setSelectedProducts(tempData);
        }}
        onClose={() => setProduct(false)}
      />

      <Portal>
        <Modal visible={remarks} contentContainerStyle={{ flex: 1 }}>
          <ImageBackground
            style={MyStyles.container}
            source={require("../../assets/login-bg.jpg")}
          >
            <View style={{ flex: 1 }}>
              <View
                style={[MyStyles.row, MyStyles.primaryColor, { marginTop: 0 }]}
              >
                <IconButton
                  icon="chevron-left"
                  size={30}
                  color="black"
                  onPress={() => {
                    setContact(true);
                    setRemarks(false);
                  }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 18, flexGrow: 1 }}>
                  Enter Remarks
                </Text>
              </View>
              <View style={MyStyles.cover}>
                <TextInput
                  mode="outlined"
                  placeholder="Entry No"
                  value={param.entry_no}
                  disabled={true}
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                />
                <DatePicker
                  label=" Date"
                  inputStyles={{
                    backgroundColor: "rgba(0,0,0,0)",
                  }}
                  value={param.start_date}
                  onValueChange={(date) => {
                    setparam({ ...param, start_date: date });
                  }}
                />

                <DropDown
                  data={[]}
                  ext_val="subcategory_id"
                  ext_lbl="subcategory_name"
                  value={param.subCategory}
                  onChange={(val) => {
                    param.subcategory_id = val;
                    setparam({ ...param });
                    ProductList();
                  }}
                  placeholder="To Branch"
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
                <View
                  style={[
                    MyStyles.row,
                    { justifyContent: "center", marginVertical: 40 },
                  ]}
                >
                  <Button
                    mode="contained"
                    uppercase={false}
                    onPress={() => {
                      if (param.title == "") {
                        Alert.alert("please fill title !");
                      } else {
                        setLoading(true);
                        postRequest(
                          "transactions/customer/session/insert",
                          param,
                          userToken
                        ).then((resp) => {
                          if (resp.status == 200) {
                            if (resp.data[0].valid) {
                              props.navigation.navigate("CustomerCatalogList");
                            }
                            setLoading(false);
                          }
                        });
                      }
                    }}
                  >
                    Submit
                  </Button>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Modal>
      </Portal>
    </ImageBackground>
  );
};

export { StockTransfer };
