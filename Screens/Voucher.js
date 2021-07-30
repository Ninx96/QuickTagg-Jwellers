import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  FlatList,
  Alert,
} from "react-native";
import {
  Button,
  Checkbox,
  FAB,
  Text,
  TextInput,
  Card,
  IconButton,
} from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import DatePicker from "../Components/DatePicker";
import DropDown from "../Components/DropDown";
import ImageUpload from "../Components/ImageUpload";
import MyStyles from "../Styles/MyStyles";
import moment from "moment";
import { postRequest } from "../Services/RequestServices";

const VoucherList = (props) => {
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, []);

  const Browse = (id) => {
    let param = {};
    postRequest("masters/customer/voucher/browse", param, userToken).then(
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
    let data = { voucher_id: id };
    postRequest("masters/customer/voucher/delete", data, userToken).then(
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
            key={item.voucher_id}
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
              title={item.voucher_name}
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
                    {item.voucher_heading}
                  </Text>
                  <Text style={{ marginBottom: 20 }}>
                    {"Value => "}
                    {item.voucher_value}
                  </Text>
                  <Text>
                    {"Red. End Date => "}
                    {item.voucher_value}
                  </Text>
                </View>
                <View>
                  <IconButton
                    icon="pencil"
                    onPress={() =>
                      props.navigation.navigate("VoucherForm", {
                        voucher_id: item.voucher_id,
                      })
                    }
                  />
                  <IconButton
                    icon="close"
                    onPress={() => {
                      Alert.alert("Alert", "You want to delete?", [
                        {
                          text: "No",
                          onPress: () => {},
                          style: "cancel",
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            Delete(item.voucher_id);
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
          props.navigation.navigate("VoucherForm", { voucher_id: 0 })
        }
      />
    </View>
  );
};

const VoucherForm = (props) => {
  const { customer_id } = props.route.params;
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [vouchersession, setvouchersession] = useState(null);
  const [vouchersessionlist, setvouchersessionlist] = useState([
    { label: "Duration in Days", value: "Duration in Days" },
    { label: "Date Time", value: "Date Time" },
  ]);
  const [vouchertypelist, setvouchertypelist] = useState([
    { label: "First Time", value: "First Time" },
    { label: "Referral", value: "Referral" },
    { label: "Upload Design", value: "Upload Design" },
    { label: "Other", value: "Other" },
  ]);
  const [param, setparam] = useState({
    voucher_id: "0",
    voucher_session_type: "",
    duration: "",
    banner_image: "",
    disable: false,
    end_date: moment(),
    image_path: "",
    redeem_end_date: "",
    redeem_start_date: "",
    start_date: moment(),
    voucher_heading: "",
    voucher_name: "",
    voucher_sms: "",
    voucher_type: "",
    voucher_value: "",
  });

  const template =
    "Dear (Customer Name), (Brand Name) wish you a wonderful BIRHDAY! May this day be filled with happy hours and life with many birthdays. Team Quicktagg";
  return (
    <ImageBackground
      source={require("../assets/login-bg.jpg")}
      style={MyStyles.container}
    >
      <CustomHeader {...props} />
      <ScrollView>
        <View style={MyStyles.cover}>
          <DropDown
            data={vouchersessionlist}
            ext_val="value"
            ext_lbl="label"
            value={param.voucher_session_type}
            onChange={(val) => {
              setparam({ ...param, voucher_session_type: val });
              if (val === "Duration in Days") {
                setvouchersession(true);
                setparam({
                  ...param,
                  redeem_start_date: "",
                  redeem_end_date: "",
                });
              } else if (val === "Date Time") {
                setvouchersession(false);
                setparam({ ...param, duration: "" });
              }
            }}
            placeholder="Voucher Session Type"
          />
          <DropDown
            data={vouchertypelist}
            ext_val="value"
            ext_lbl="label"
            value={param.voucher_type}
            onChange={(val) => {
              setparam({ ...param, voucher_type: val });
            }}
            placeholder="Voucher Type"
          />

          <TextInput
            mode="flat"
            label="Voucher Name"
            placeholder="Voucher Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.voucher_name}
            onChangeText={(text) => {
              setparam({ ...param, voucher_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Voucher Heading"
            placeholder="Voucher Heading"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.voucher_heading}
            onChangeText={(text) => {
              setparam({ ...param, voucher_heading: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Voucher Value"
            placeholder="Voucher Value"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.voucher_value}
            onChangeText={(text) => {
              setparam({ ...param, voucher_value: text });
            }}
          />
          <View style={MyStyles.row}>
            <DatePicker
              label="Start Date"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "40%" }}
              value={param.start_date}
              onValueChange={(date) => {
                setparam({ ...param, start_date: date });
              }}
            />
            <DatePicker
              label="End Date"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "40%" }}
              value={param.end_date}
              onValueChange={(date) => {
                setparam({ ...param, end_date: date });
              }}
            />
          </View>
          {!vouchersession ? (
            <View style={MyStyles.row}>
              <DatePicker
                label="Red. Start Date"
                inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "40%" }}
                value={param.redeem_start_date}
                onValueChange={(date) => {
                  setparam({ ...param, redeem_start_date: date });
                }}
              />
              <DatePicker
                label="Red. End Date"
                inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "40%" }}
                value={param.redeem_end_date}
                onValueChange={(date) => {
                  setparam({ ...param, redeem_end_date: date });
                }}
              />
            </View>
          ) : (
            <TextInput
              mode="flat"
              label="Duration"
              placeholder="Duration"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              keyboardType={"number-pad"}
              value={param.duration}
              onChangeText={(text) => {
                setparam({ ...param, duration: text });
              }}
            />
          )}
          <TextInput
            mode="flat"
            label="SMS Template"
            multiline
            numberOfLines={4}
            editable={false}
            value={template}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <Checkbox.Item
            label="Disable"
            status={param.disable ? "checked" : "unchecked"}
            onPress={(e) => {
              setparam({ ...param, disable: !param.disable });
            }}
          />
          <View style={MyStyles.row}>
            <ImageUpload
              label="Voucher Image :"
              source={require("../assets/upload.png")}
              onClearImage={() => {}}
              onUploadImage={() => {}}
            />
            <ImageUpload
              label="Voucher Banner :"
              source={require("../assets/upload.png")}
              onClearImage={() => {}}
              onUploadImage={() => {}}
            />
          </View>
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
                setLoading(true);
                postRequest(
                  "masters/customer/voucher/insert",
                  param,
                  userToken
                ).then((resp) => {
                  console.log(resp);
                  if (resp.status == 200) {
                    if (resp.data[0].valid) {
                      props.navigation.navigate("VoucherList");
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
      </ScrollView>
    </ImageBackground>
  );
};

export { VoucherList, VoucherForm };
