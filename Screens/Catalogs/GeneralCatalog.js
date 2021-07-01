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
import SelectCustomersMultiple from "../../Components/SelectCustomersMultiple";
import DatePicker from "../../Components/DatePicker";
import moment from "moment";
import Loading from "../../Components/Loading";

const GeneralCatalogList = (props) => {
  return <View style={MyStyles.container}></View>;
};

const GeneralCatalog = (props) => {
  const [param, setParam] = useState({});
  const [product, setProduct] = useState(false);
  const [contact, setContact] = useState(false);
  const [remarks, setRemarks] = useState(false);
  const [productList, setProductList] = useState([{}, {}, {}, {}, {}]);
  const [customerList, setCustomerList] = useState([{}, {}, {}, {}, {}]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
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
              data={[
                { label: "Demo", value: "Demo" },
                { label: "Demo1", value: "Demo1" },
              ]}
              ext_val="value"
              ext_lbl="label"
              value={param.subCategory}
              onChange={(val) => {
                setParam({ ...param, subCategory: val });
              }}
              placeholder="SubCategory"
            />
            <TextInput
              mode="flat"
              label="Min. Amount"
              placeholder="Min. Amount"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={param.full_name}
              onChangeText={(text) => {
                setparam({ ...param, full_name: text });
              }}
            />
            <TextInput
              mode="flat"
              label="Max. Amount"
              placeholder="Max. Amount"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={param.full_name}
              onChangeText={(text) => {
                setparam({ ...param, full_name: text });
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
            subCategory: param.subCategory,
            data: items,
          });
          setSelectedProducts([...selectedProducts]);
        }}
        onClose={() => setProduct(false)}
      />
      <SelectCustomersMultiple
        visible={contact}
        data={productList}
        onDone={(items) => {
          setSelectedContacts(items);
          setRemarks(true);
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
                  onValueChange={(date) => {}}
                />
                <TextInput
                  mode="flat"
                  label="Remarks"
                  placeholder="Remarks"
                  multiline
                  numberOfLines={3}
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                />
                <View
                  style={[
                    MyStyles.row,
                    { justifyContent: "center", marginVertical: 40 },
                  ]}
                >
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
