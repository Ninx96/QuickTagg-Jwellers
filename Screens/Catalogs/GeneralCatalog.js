import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
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
  Divider,
} from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import DropDown from "../../Components/DropDown";
import MultipleImages from "../../Components/MultipleImages";
import CustomHeader from "../../Components/CustomHeader";
import SelectMultiple from "../../Components/SelectMultiple";
import DatePicker from "../../Components/DatePicker";
import moment from "moment";
import Loading from "../../Components/Loading";
import SelectCustomer from "../../Components/SelectCustomer";
import { postRequest } from "../../Services/RequestServices";
import { LinearGradient } from "expo-linear-gradient";

const GeneralCatalogList = (props) => {
  const { userToken, search } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, [search]);

  const Browse = (id) => {
    postRequest(
      "transactions/customer/generalsession/browse_app",
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
  };
  const Delete = (id) => {
    setLoading(true);
    postRequest(
      "transactions/customer/generalsession/delete",
      { tran_id: id },
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        if (resp.data[0].valid) {
          Browse();
        }
        setLoading(false);
      }
    });
  };
  return (
    <View style={MyStyles.container}>
      <Loading isloading={loading} />
      <FlatList
        style={{ marginVertical: 10 }}
        data={griddata}
        renderItem={({ item, index }) => (
          <Card
            key={item.voucher_id}
            style={{
              marginHorizontal: 20,
              padding: 0,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <LinearGradient
              colors={["#F6356F", "#FF5F50"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "pink",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                margin: 0,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </Text>
            </LinearGradient>
            <Card.Content>
              <View style={MyStyles.row}>
                <View style={{ maxWidth: "80%" }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.entry_no} {"                "} {item.date}
                  </Text>

                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.no_of_customer} {"Customers"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {item.no_of_product} {"Products"}
                  </Text>
                  <Text>{item.remarks}</Text>
                </View>
                <View>
                  <IconButton
                    icon="pencil"
                    color="#AAA"
                    onPress={() =>
                      props.navigation.navigate("GeneralCatalog", {
                        tran_id: item.tran_id,
                      })
                    }
                    color="#aaa"
                  />
                  <IconButton
                    icon="delete"
                    color="#AAA"
                    onPress={() => {
                      Alert.alert("Alert", "You want to delete?", [
                        {
                          text: "No",
                          onPress: () => { },
                          style: "cancel",
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            Delete(item.tran_id);
                          },
                        },
                      ]);
                    }}
                    color="#aaa"
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <FAB
        style={{
          position: "absolute",
          bottom: 20,
          right: 80,
        }}
        color="#000"
        icon="plus"
        onPress={() =>
          props.navigation.navigate("GeneralCatalog", { tran_id: 0 })
        }
      />
    </View>
  );
};

const GeneralCatalog = (props) => {
  const { userToken, branchId, tran_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [param, setparam] = useState({
    subcategory_id: "",
    min_amount: "",
    max_amount: "",
    title: "",
    entry_no: "",
    remarks: "",
    customer_session_products: [],
    customers: [],
  });
  const [product, setProduct] = useState(false);
  const [contact, setContact] = useState(false);
  const [remarks, setRemarks] = useState(false);
  const [productList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [subcategorylist, setsubcategorylist] = useState([]);
  const [testlist, settestlist] = useState([]);
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
      "transactions/customer/generalsession/preview",
      { tran_id: tran_id },
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        if (tran_id == 0) {
          param.entry_no = resp.data[0].entry_no;
          setparam({ ...param });
        } else {
          param.tran_id = resp.data[0].tran_id;
          param.title = resp.data[0].title;
          param.entry_no = resp.data[0].entry_no;
          param.remarks = resp.data[0].remarks;

          param.customer_session_products = resp.data[0].products;

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
                  resp.data[0].customers.findIndex(
                    (e) => e.customer_id === item.customer_id
                  ) > -1
                    ? true
                    : false;
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
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
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
      <Loading isloading={loading} />
      <View style={[MyStyles.cover]}>
        <ScrollView>
          <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
            <DropDown
              data={subcategorylist}
              ext_val="subcategory_id"
              ext_lbl="subcategory_name"
              value={param.subcategory_id}
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
                  }
                  // else if (param.min_amount == "") {
                  //   Alert.alert("select min. amount!");
                  // } else if (param.max_amount == "") {
                  //   Alert.alert("select max. amount!");
                  // } 
                  else {
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
                  //borderBottomWidth: 0.8,
                  borderBottomColor: "#AAA",
                }}
              >
                <Subheading style={{ width: "100%", color: "#000" }}>
                  {item.subcategory_name}
                </Subheading>

                {item.data.map((item, i) => (
                  <View key={i}>
                    <IconButton
                      icon="close"
                      style={{
                        backgroundColor: "red",
                        position: "relative",
                        left: 85,
                        top: 18,
                        zIndex: 10,
                      }}
                      size={10}
                      onPress={() => {
                        selectedProducts[index].data.splice(i, 1);
                        if (selectedProducts[index].data.length == "0") {
                          selectedProducts[index].subcategory_name = '';
                        }
                        setSelectedProducts([...selectedProducts]);
                        const newObj = param.customer_session_products.filter(task => task.product_id !== item.product_id);
                        param.customer_session_products = newObj;
                        console.log(param);
                      }}
                      color="#aaa"
                    />
                    <View
                      key={i}
                      style={{
                        backgroundColor: "#FFF",
                        margin: 5,
                        borderRadius: 10,
                        width: 100,
                        alignItems: "center",
                        zIndex: 1,
                        borderWidth: 0.5,
                        borderColor: "#AAA",
                      }}
                    >
                      <Card.Cover
                        source={{ uri: item.url_image + "" + item.image_path }}
                        style={{ width: 98, height: 80, borderRadius: 10 }}
                      />

                      <View style={{ padding: 5 }}>
                        <Text>
                          {item.product_name} {item.product_code}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* ImagePath change direct Component se kr lena */}

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

      <SelectCustomer
        visible={contact}
        data={customerList}
        onDone={(items) => {
          setSelectedContacts(items);
          setRemarks(true);
          if (items.length == 0) {
            setparam({ ...param, customers: [] });
          } else {
            setparam({ ...param, customers: items });
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
                style={[
                  MyStyles.row,
                  { backgroundColor: "#ffba3c", marginTop: 0 },
                ]}
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
              <View style={[MyStyles.cover, { backgroundColor: "" }]}>
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
                    setparam({ ...param, title: text });
                  }}
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
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
                          "transactions/customer/generalsession/insert",
                          param,
                          userToken
                        ).then((resp) => {
                          if (resp.status == 200) {
                            if (resp.data[0].valid) {
                              props.navigation.navigate("GeneralCatalogList");
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

export { GeneralCatalog, GeneralCatalogList };
