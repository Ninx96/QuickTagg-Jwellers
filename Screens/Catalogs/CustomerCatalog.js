import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
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

const CustomerCatalogList = (props) => {
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, []);

  const Browse = (id) => {  
    postRequest("transactions/customer/session/browse", {}, userToken).then(
      (resp) => {
        if (resp.status == 200) {
          setgriddata(resp.data);
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      }
    );
    setLoading(false);
  };
  const Delete = (id) => {
    setLoading(true);
    postRequest("transactions/customer/session/delete", { tran_id: id }, userToken).then(
      (resp) => {
        if (resp.status == 200) {
          if (resp.data[0].valid) {
            Browse();
          }
          setLoading(false);
        }
      }
    );
  };
  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />

      <FlatList
        data={griddata}
        renderItem={({ item, index }) => (
          <Card
            key={item.tran_id}
            style={{
              marginHorizontal: 20,
              padding: 0,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <Card.Title
              style={{
                backgroundColor: "pink",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              title={item.title}
              titleStyle={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
              }}
            />
            <Card.Content>
              <View style={MyStyles.row}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.entry_no}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.no_of_customer}  {"Customers"}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                    {item.no_of_product}  {"Products"}
                  </Text>
                  <Text>
                    {item.remarks}
                  </Text>
                </View>
                <View>
                  <IconButton
                    icon="pencil"
                    onPress={() =>
                      props.navigation.navigate("CustomerCatalog", {
                        tran_id: item.tran_id,
                      })
                    }
                  />
                  <IconButton
                    icon="delete"
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
          right: 20,
        }}
        icon="plus"
        onPress={() =>
          props.navigation.navigate("CustomerCatalog", { tran_id: 0 })
        }
      />
    </View>
  );
};

const CustomerCatalog = (props) => {
  const { userToken, branchId } = props.route.params;
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


  React.useEffect(() => {
    postRequest("transactions/customer/session/getSubcategory", { branch_id: branchId }, userToken).then((resp) => {
      if (resp.status == 200) {
        setsubcategorylist(resp.data);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });

    postRequest("transactions/customer/customerListMob", { branch_id: branchId }, userToken).then(
      (resp) => {
        if (resp.status == 200) {
          setCustomerList(resp.data);
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      }
    );

    postRequest("transactions/customer/session/preview", { tran_id: 0 }, userToken).then((resp) => {
      if (resp.status == 200) {
        param.entry_no = resp.data[0].entry_no;
        setparam({ ...param });
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
      min_amount: param.min_amount,
      max_amount: param.max_amount,
    };
    postRequest("transactions/customer/session/getProducts", data, userToken).then((resp) => {
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
      <CustomHeader {...props} />
      <ScrollView>
        <View style={MyStyles.cover}>
          <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
            <DropDown
              data={subcategorylist}
              ext_val="subcategory_id"
              ext_lbl="subcategory_name"
              value={param.subCategory}
              onChange={(val) => {
                setparam({ ...param, subcategory_id: val });
                ProductList();
              }}
              placeholder="SubCategory"
            />
            <TextInput
              mode="flat"
              label="Min. Amount"
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
              mode="flat"
              label="Max. Amount"
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
                onPress={() => setProduct(true)}
              >
                Add Products
              </Button>
              <Button
                mode="contained"
                uppercase={false}
                onPress={() => setContact(true)}
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
                  {item.subCategory}
                </Subheading>
                {item.data.map((item, i) => (
                  <View>
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
                        setSelectedProducts([...selectedProducts]);
                        param.customer_session_products[index].data.splice(i, 1);
                        setparam([...param]);
                      }}
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
        </View>
      </ScrollView>

      {/* ImagePath change direct Component se kr lena */}

      <SelectMultiple
        visible={product}
        data={productList}
        onDone={(items) => {
          selectedProducts.push({
            subCategory: param.subCategory,
            data: items,
          });
          setSelectedProducts([...selectedProducts]);
          items.map((item, index) => {
            param.customer_session_products.push({
              subcategory_id: item.subcategory_id,
              category_id: item.category_id,
              product_id: item.product_id
            });
            setparam({ ...param, customer_session_products: param.customer_session_products });
          });
        }}
        onClose={() => setProduct(false)}
      />
      <SelectCustomer
        visible={contact}
        data={customerList}
        multiple={false}
        onDone={(items) => {
          setSelectedContacts(items);
          setRemarks(true);
          if (items.length == 0) {
            setparam({ ...param, customers: [] });
          }
          else {
            items.map((item, index) => {
              param.customers.push({
                customer_id: item.customer_id,
                mobile: item.mobile,
                customer_name: item.full_name
              });
              setparam({ ...param, customers: param.customers });
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
              <View style={MyStyles.row}>
                <IconButton
                  icon="chevron-left"
                  size={30}
                  color="black"
                  onPress={() => {
                    setContact(true);
                    setRemarks(false);
                  }}
                />
              </View>
              <View style={MyStyles.cover}>
              <TextInput
                  mode="flat"
                  label="Entry No"
                  placeholder="Entry No"
                  value={param.entry_no}
                  disabled={true}
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                />
                <TextInput
                  mode="flat"
                  label="Title"
                  placeholder="Title"
                  value={param.title}
                  onChangeText={(text) => {
                    setparam({ ...param, title: text });
                  }}
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                />
                <TextInput
                  mode="flat"
                  label="Remarks"
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
                  <Button mode="contained" uppercase={false}
                    onPress={() => {
                      //console.log(param);
                      setLoading(true);
                      postRequest("transactions/customer/session/insert", param, userToken).then((resp) => {
                        if (resp.status == 200) {
                          if (resp.data[0].valid) {
                            props.navigation.navigate("CustomerCatalogList");
                          }
                          setLoading(false);
                        }
                      });
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

export { CustomerCatalog, CustomerCatalogList };
