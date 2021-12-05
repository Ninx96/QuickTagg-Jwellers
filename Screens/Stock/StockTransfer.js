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
    date: moment(),
    entry_no: "",
    to_branch_id: "",
    remarks: "",
    stock_transfer_products: [],
  });
  const [product, setProduct] = useState(false);
  const [remarks, setRemarks] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [branchlist, setbranchlist] = useState([]);

  React.useEffect(() => {  
       
    ProductList();
    postRequest("transactions/stockTransfer/preview", { tran_id: tran_id }, userToken).then((resp) => {
      if (resp.status == 200) {
        BranchList();
        if (tran_id == 0) {
          param.entry_no = resp.data[0].entry_no;
          setparam({ ...param });
        } else {
         
          param.tran_id = resp.data[0].tran_id;
          param.to_branch_id = resp.data[0].to_branch_id;
          param.entry_no = resp.data[0].entry_no;
          param.remarks = resp.data[0].remarks;        
          param.stock_transfer_products = resp.data[1];
          setparam({ ...param });

          let tempData = Object.values(
            param.stock_transfer_products.reduce((acc, item) => {
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
      }
      setLoading(false);
    });
   
  }, []);

  const BranchList = () => {
    postRequest(
      "transactions/stockin/getbranchlist",
      {},
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        setbranchlist(resp.data);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
  }
  const ProductList = () => {

    postRequest(
      "transactions/stockTransfer/getProducts",
      { search: "" },
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
            {/* <DropDown
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
            /> */}
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
                    setRemarks(true);
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
                        param.stock_transfer_products[index].data.splice(
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
              param.stock_transfer_products.findIndex(
                (e) => e.product_id == item.product_id
              ) > -1
                ? false
                : true;
            if (checkproduct) {
              param.stock_transfer_products.push(item);
            }
          });
          setparam({
            ...param,
            stock_transfer_products: param.stock_transfer_products,
          });

          let tempData = Object.values(
            param.stock_transfer_products.reduce((acc, item) => {
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
                  value={param.date}
                  onValueChange={(date) => {
                    setparam({ ...param, date: date });
                  }}
                />

                <DropDown
                  data={branchlist}
                  ext_val="branch_id"
                  ext_lbl="company_name"
                  value={param.to_branch_id}
                  onChange={(val) => {
                    param.to_branch_id = val;
                    setparam({ ...param });
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
                      if (param.to_branch_id == "") {
                        Alert.alert("please select To Branch !");
                      } else {
                        //console.log(param);
                        setLoading(true);
                        postRequest(
                          "transactions/stockTransfer/insert",
                          param,
                          userToken
                        ).then((resp) => {
                          if (resp.status == 200) {
                            if (resp.data[0].valid) {
                              props.navigation.navigate("StockList");
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
