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
  Checkbox
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
import { color } from "react-native-reanimated";

const StockAcceptance = (props) => {
  const { userToken, branchId, tran_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [isSelected, setSelected] = useState(false);
  const [param, setparam] = useState({
    tran_id: "0",
    st_id: "",
    date: "",
    entry_no: "",
    to_branch_id: "",
    remarks: "",
    status: "",
    stock_acceptance_products: [],
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [acceptanceProducts, setAcceptanceProducts] = useState([]);
  const [branchlist, setbranchlist] = useState([]);

  React.useEffect(() => {
    BranchList();

    postRequest("transactions/stockAcceptance/preview", { tran_id: tran_id }, userToken).then((item) => {
      let resp = item[0];
      let resp1 = item[1];
      param.st_id = resp[0].tran_id;
      param.date = resp[0].date;
      param.entry_no = resp[0].entry_no;
      param.to_branch_id = resp[0].to_branch_id;
      param.remarks = resp[0].remarks;
      param.status = resp[0].status;
      setparam({ ...param });

      setSelectedProducts(resp1);
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

  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
      <Loading isloading={loading} />
      <View style={MyStyles.cover}>
        <ScrollView>
          <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>

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

            </View>
          </View>
          {selectedProducts.map((resp, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
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
                      {resp.product}
                    </Text>
                    <Text numberOfLines={1}>{resp.product_code}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 20,
                      }}
                    >

                      <Text>QTY: {resp.qty}</Text>

                      <Checkbox
                        status={resp.qty == resp.accept ? "checked" : "unchecked"}
                        style={{ alignSelf: "center" }}
                        onPress={() => {
                          let sel = !isSelected;
                          setSelected(sel);
                                               
                            if (isSelected) {
                              resp.accept = resp.qty;
                              setSelectedProducts([...selectedProducts]);
                              acceptanceProducts.push({ product_id: resp.product_id, stp_id: resp.tran_id, qty: resp.qty });
                              setAcceptanceProducts([...acceptanceProducts]);
                              setparam({ ...param, stock_acceptance_products: acceptanceProducts });
                               console.log(acceptanceProducts);
                            }
                            else {
                              resp.accept = 0;
                              setSelectedProducts([...selectedProducts]);                            
                          }
                        }}
                      />
                    </View>

                  </View>

                </View>

              </View>
            );
          })}
        </ScrollView>
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
              console.log(param);
              setLoading(true);
              postRequest(
                "transactions/stockAcceptance/insert",
                param,
                userToken
              ).then((resp) => {                          
                  if (resp.valid) {
                    props.navigation.navigate("StockAcceptanceList");
                  }
                  setLoading(false);
                
              });
            }}
          >
            Submit
          </Button>
        </View>
      </View>

    </ImageBackground>
  );
};
export default StockAcceptance;
