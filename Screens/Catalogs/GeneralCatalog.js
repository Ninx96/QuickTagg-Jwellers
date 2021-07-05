import React, { useState } from "react";
import { ImageBackground, ScrollView, View, Image, FlatList, TouchableOpacity } from "react-native";
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
import DatePicker from "../../Components/DatePicker";
import moment from "moment";
import Loading from "../../Components/Loading";
import SelectCustomer from "../../Components/SelectCustomer";
import { postRequest } from "../../Services/RequestServices";

const GeneralCatalogList = (props) => {
  return <View style={MyStyles.container}></View>;
};

const GeneralCatalog = (props) => {
  const { userToken, branchId } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [param, setparam] = useState({
    subcategory_id: '',
    min_amount: '',
    max_amount: '',
    title: '',
    entry_no: '',
    remarks: '',
    customer_session_products: []
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
    let data = { branch_id: branchId }
    postRequest("transactions/customer/session/getSubcategory", data, userToken).then((resp) => {
      if (resp.status == 200) {
        setsubcategorylist(resp.data);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });

    postRequest("transactions/customer/customerListMob", data, userToken).then((resp) => {
      if (resp.status == 200) {
        setCustomerList(resp.data);
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
      max_amount: param.max_amount
    }
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
  }

  return (
    <ImageBackground style={MyStyles.container} source={require("../../assets/login-bg.jpg")}>
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
            <View style={[MyStyles.row, { justifyContent: "space-evenly", marginVertical: 40 }]}>
              <Button mode="contained" uppercase={false} onPress={() => setProduct(true)}>
                Add Products
              </Button>
              <Button mode="contained" uppercase={false} onPress={() => setContact(true)}>
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
                <Subheading style={{ width: "100%", color: "#000" }}>{item.subCategory}</Subheading>
                {item.data.map((item, i) => (
                  <Image
                    key={index + i}
                    source={require("../../assets/upload.png")}
                    style={{ height: 80, width: 80, margin: 2 }}
                  />
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
            subcategory_id: param.subcategory_id,
            data: items,
          });
          setSelectedProducts([...selectedProducts]);
        }}
        onClose={() => setProduct(false)}
      />

      <SelectCustomer
        visible={contact}
        data={customerList}
        onDone={(items) => {
          setSelectedContacts(items);
          setRemarks(true);
        }}
        onClose={() => setContact(false)}
      />
      <Portal>
        <Modal visible={remarks} contentContainerStyle={{ flex: 1 }}>
          <ImageBackground style={MyStyles.container} source={require("../../assets/login-bg.jpg")}>
            <View style={{ flex: 1 }}>
              <View style={MyStyles.row}>
                <IconButton
                  icon="chevron-left"
                  size={30}
                  color="black"
                  onPress={() => {
                    setProduct(true);
                    setRemarks(false);
                  }}
                />
              </View>
              <View style={MyStyles.cover}>
                <DatePicker
                  label="Start Date"
                  inputStyles={{ backgroundColor: "rgba(0,0,0,0)" }}
                  value={moment()}
                  onValueChange={(date) => { }}
                />
                <TextInput
                  mode="flat"
                  label="Remarks"
                  placeholder="Remarks"
                  multiline
                  numberOfLines={3}
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                />
                <View style={[MyStyles.row, { justifyContent: "center", marginVertical: 40 }]}>
                  <Button mode="contained" uppercase={false}>
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
