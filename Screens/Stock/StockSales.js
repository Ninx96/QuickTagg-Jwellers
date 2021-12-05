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

const StockSales = (props) => {
  const { userToken, branchId, tran_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [param, setparam] = useState({
    subcategory_id: "",
    min_amount: "",
    max_amount: "",
    tran_id: "0",
    mobile: "",
    customer_id: "",
    customer_name: "",
    date: moment(),
    entry_no: "",
    title: "",
    remarks: "",
    customer_sale_products: [],
  });
  const [product, setProduct] = useState(false);
  const [contact, setContact] = useState(false);
  const [remarks, setRemarks] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [subcategorylist, setsubcategorylist] = useState([]);
  const [customerList, setCustomerList] = useState([]);

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
    postRequest("transactions/stockSales/preview", { tran_id: tran_id }, userToken).then((resp) => {
      if (resp.status == 200) {

        if (tran_id == 0) {
          param.entry_no = resp.data[0].entry_no;
          setparam({ ...param });
        } else {

          param.tran_id =tran_id;
          param.entry_no = resp.data[0].entry_no;
          param.title = resp.data[0].title;
          param.remarks = resp.data[0].remarks;
          param.customer_sale_products = resp.data[0].products;
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
            param.customer_sale_products.reduce((acc, item) => {
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
        }
        setLoading(false);
      }
    });
 
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
      <Loading isloading={loading} />
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
                  setProduct(true);
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
                {item.data.map((resp, i) => (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      marginVertical: 5,
                    }}
                  >
                    <Image
                      source={{ uri: resp.url_image + "" + resp.image_path }}
                      style={{
                        height: 100,
                        width: 80,
                        marginHorizontal: 5,
                        borderRadius: 5,
                      }}
                    />
                    <View>
                      <Text numberOfLines={1} style={{ paddingRight: 120 }}>
                        {resp.product_name}
                      </Text>
                      <Text numberOfLines={1}>{resp.product_code}</Text>
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
                          onPress={() => {
                            resp.qty = (isNaN(parseFloat(resp.qty)) ? 0 : (parseFloat(resp.qty))) - 1;
                            console.log(resp.qty);
                          }}
                        />

                        <Input
                          mode="outlined"
                          placeholder="QTY"
                          style={{
                            borderWidth: 1,
                            height: 42,
                            width: 60,
                            marginHorizontal: -2,
                            textAlign: "center",
                          }}
                          value={resp.qty}
                          onChangeText={(text) => {
                            resp.qty = text;
                            console.log(resp.qty);
                          }}
                        />

                        <ToggleButton
                          icon="plus"
                          style={{
                            borderWidth: 1,
                            borderColor: "#000",
                            borderLeftWidth: 0,
                          }}
                          onPress={() => {
                            resp.qty = (isNaN(parseFloat(resp.qty)) ? 0 : (parseFloat(resp.qty))) + 1;
                            console.log(resp.qty);
                          }}
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
                        param.customer_sale_products[index].data.splice(
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
              param.customer_sale_products.findIndex(
                (e) => e.product_id == item.product_id
              ) > -1
                ? false
                : true;
            if (checkproduct) {
              param.customer_sale_products.push(item);
            }
          });
          setparam({
            ...param,
            customer_sale_products: param.customer_sale_products,
          });

          let tempData = Object.values(
            param.customer_sale_products.reduce((acc, item) => {
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

      <SelectCustomer
        visible={contact}
        data={customerList}
        multiple={false}
        onDone={(items) => {
          setRemarks(true);
          if (items.length == 0) {
            param.customer_id = "";
            param.customer_name = "";
            param.mobile = "";
            setparam({ ...param });
          } else {
            items.map((item, index) => {
              param.customer_id = item.customer_id;
              param.customer_name = item.full_name;
              param.mobile = item.mobile;
              setparam({ ...param });
            });
          }
        }}
        onClose={() => setContact(false)}
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
                <TextInput
                  mode="outlined"
                  placeholder="Title"
                  value={param.title}
                  onChangeText={(text) => {
                    param.title = text;
                    setparam({ ...param });
                  }}
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                />
                <DatePicker
                  label=" Date"
                  inputStyles={{
                    backgroundColor: "rgba(0,0,0,0)",
                  }}
                  value={param.date}
                  onValueChange={(date) => {
                    setparam({ ...param, date: date });
                  }}
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
                        console.log(param);
                        setLoading(true);
                        postRequest(
                          "transactions/stockSales/insert",
                          param,
                          userToken
                        ).then((resp) => {
                          if (resp.status == 200) {
                            if (resp.data[0].valid) {
                              props.navigation.navigate("StockSalesList");
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

export { StockSales };
