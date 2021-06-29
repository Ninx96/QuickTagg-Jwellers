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

const GeneralCatalogList = (props) => {
  return <View style={MyStyles.container}></View>;
};

const GeneralCatalog = (props) => {
  const [param, setParam] = useState({});
  const [modal, setModal] = useState(false);
  const [productList, setProductList] = useState([{}, {}, {}, {}, {}]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
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
                onPress={() => setModal(true)}
              >
                Add Products
              </Button>
              <Button mode="contained" uppercase={false}>
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
        visible={modal}
        data={productList}
        onDone={(items) => {
          selectedProducts.push({
            subCategory: param.subCategory,
            data: items,
          });
          setSelectedProducts([...selectedProducts]);
        }}
        onClose={() => setModal(false)}
      />
    </ImageBackground>
  );
};

export { GeneralCatalog, GeneralCatalogList };
