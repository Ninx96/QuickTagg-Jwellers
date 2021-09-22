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
  Portal,
  Modal,
  TouchableRipple,
} from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import DatePicker from "../Components/DatePicker";
import DropDown from "../Components/DropDown";
import ImageUpload from "../Components/ImageUpload";
import MyStyles from "../Styles/MyStyles";
import moment from "moment";
import { postRequest } from "../Services/RequestServices";
import { serviceUrl } from "../Services/Constants";
import { LinearGradient } from "expo-linear-gradient";
import BadgeRibbon from "../Components/BadgeRibbon";

const VoucherList = (props) => {
  const { userToken, search } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, [search]);

  const Browse = () => {
    postRequest(
      "masters/customer/voucher/browse",
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
            <BadgeRibbon
              text="Active"
              color="green"
              position="voucherRight"
              textStyle={{ top: 20, left: -20 }}
            />
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
                {item.voucher_name}
              </Text>
            </LinearGradient>

            <Card.Content>
              <View style={[MyStyles.row, { margin: 0 }]}>
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
                    {moment(item.end_date).format("DD MMM YYYY")}
                  </Text>
                </View>
                <View>
                  <IconButton
                    icon="pencil"
                    color="#AAA"
                    onPress={() =>
                      props.navigation.navigate("VoucherForm", {
                        voucher_id: item.voucher_id,
                      })
                    }
                    color="#aaa"
                  />
                  <IconButton
                    icon="delete"
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
          right: 20,
        }}
        icon="plus"
        color="#000"
        onPress={() =>
          props.navigation.navigate("VoucherForm", { voucher_id: 0 })
        }
      />
    </View>
  );
};

const VoucherForm = (props) => {
  const { userToken, userName, voucher_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [vouchersession, setvouchersession] = useState(null);
  const [vouchersessionlist, setvouchersessionlist] = useState([
    { label: "duration in days", value: "duration in days" },
    { label: "datetime", value: "datetime" },
  ]);
  const [vouchertypelist, setvouchertypelist] = useState([
    { label: "first time", value: "first time" },
    { label: "birthday", value: "birthday" },
    { label: "anniversary", value: "anniversary" },
    { label: "referral", value: "referral" },
    { label: "upload design", value: "upload design" },
    { label: "other", value: "other" },
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

  const [Banner, setBanner] = React.useState(require("../assets/upload.png"));
  const [Image, setImage] = React.useState(require("../assets/upload.png"));
  const [voucheruploads, setvoucheruploads] = useState({
    banner_name: "banner-" + moment().format("YYYYMMDD-hhmmss") + ".png",
    banner_base64: "",
    image_name: "image-" + moment().format("YYYYMMDD-hhmmss") + ".png",
    image_base64: "",
  });
  const [visibletemp, setvisibletemp] = useState(false);
  const [smsparam, setsmsparam] = useState({
    var1: "",
    var2: "",
    var3: "",
    var4: "",
    templete: "",
    var3visible: false,
    var4visible: false,
  });

  React.useEffect(() => {
    if (voucher_id != 0) {
      postRequest(
        "masters/customer/voucher/preview",
        { voucher_id: voucher_id },
        userToken
      ).then((resp) => {
        console.log(resp);

        if (resp.status == 200) {
          param.voucher_id = resp.data.voucher_id;
          param.voucher_session_type = resp.data.voucher_session_type;
          param.duration = resp.data.duration;
          param.banner_image = resp.data.banner_image;
          param.disable = resp.data.disable;
          param.end_date = resp.data.end_date;
          param.image_path = resp.data.image_path;
          param.redeem_end_date = resp.data.redeem_end_date;
          param.redeem_start_date = resp.data.redeem_start_date;
          param.start_date = resp.data.start_date;
          param.voucher_heading = resp.data.voucher_heading;
          param.voucher_name = resp.data.voucher_name;
          param.voucher_sms = resp.data.voucher_sms;
          param.voucher_type = resp.data.voucher_type;
          param.voucher_value = resp.data.voucher_value;

          smsparam.template = resp.data.voucher_sms;

          setImage({ uri: resp.data.image_url + "" + resp.data.image_path });
          setBanner({
            uri: resp.data.banner_url + "" + resp.data.banner_image,
          });
          if (resp.data.voucher_session_type === "duration in days") {
            setvouchersession(true);
            param.redeem_end_date = "";
            param.redeem_start_date = "";
          } else if (val === "datetime") {
            setvouchersession(false);
            param.duration = "";
          }

          if (resp.data.voucher_session_type === "duration in days") {
            setvouchersession(true);
            param.redeem_end_date = "";
            param.redeem_start_date = "";
          } else if (val === "datetime") {
            setvouchersession(false);
            param.duration = "";
          }
        }
      });
    }

    setLoading(false);
  }, []);

  const SmsTemplete = () => {
    smsparam.var3visible = false;
    smsparam.var4visible = false;
    if (param.voucher_type == "first time") {
      smsparam.var3visible = true;
      smsparam.template =
        "you have just got a " +
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        " gift " +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        " from " +
        userName.toUpperCase() +
        ". Validity (" +
        (smsparam.var3 == "" ? "#var3" : smsparam.var3) +
        "). T and C apply.";
      param.voucher_sms =
        "you have just got a " +
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        " gift " +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        " from " +
        userName.toUpperCase() +
        ". Validity (" +
        (smsparam.var3 == "" ? "#var3" : smsparam.var3) +
        "). T and C apply.";
    } else if (param.voucher_type == "birthday") {
      smsparam.template =
        userName.toUpperCase() +
        " wishes u Happy Birthday. Lets make it special by " +
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        ". Validity (" +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        "). T and C apply.";
      param.voucher_sms =
        userName.toUpperCase() +
        " wishes u Happy Birthday. Lets make it special by " +
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        ". Validity (" +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        "). T and C apply.";
    } else if (param.voucher_type == "anniversary") {
      smsparam.template =
        userName.toUpperCase() +
        " wishes u Happy Anniversary. Lets make it special by " +
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        ". Validity (" +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        "). T and C apply.";
      param.voucher_sms =
        userName.toUpperCase() +
        " wishes u Happy Anniversary. Lets make it special by " +
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        ". Validity (" +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        "). T and C apply.";
    } else if (param.voucher_type == "referral") {
      smsparam.var3visible = true;
      smsparam.template =
        "thanks for referring $$MemberName$$ to " +
        userName.toUpperCase() +
        ". To honour, we offer " +
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        " gift " +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        ". Validity (" +
        (smsparam.var3 == "" ? "#var3" : smsparam.var3) +
        "). T and C apply.";
      param.voucher_sms =
        "thanks for referring $$MemberName$$ to " +
        userName.toUpperCase() +
        ". To honour, we offer " +
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        " gift " +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        ". Validity (" +
        (smsparam.var3 == "" ? "#var3" : smsparam.var3) +
        "). T and C apply.";
    } else if (param.voucher_type == "upload design") {
      smsparam.var3visible = true;
      smsparam.template =
        "thanks for sharing designs. We appreciate and offer " +
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        " gift " +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        ". Validity (" +
        (smsparam.var3 == "" ? "#var3" : smsparam.var3) +
        "). Team " +
        userName.toUpperCase() +
        ".";
      param.voucher_sms =
        "thanks for sharing designs. We appreciate and offer " +
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        " gift " +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        ". Validity (" +
        (smsparam.var3 == "" ? "#var3" : smsparam.var3) +
        "). Team " +
        userName.toUpperCase() +
        ".";
    } else if (param.voucher_type == "other") {
      smsparam.var3visible = true;
      smsparam.var4visible = true;
      smsparam.template =
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        " celebrate this special " +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        " with " +
        (smsparam.var3 == "" ? "#var3" : smsparam.var3) +
        ". Validity (" +
        (smsparam.var4 == "" ? "#var4" : smsparam.var4) +
        "). Team " +
        userName.toUpperCase() +
        ". T and C apply.";
      param.voucher_sms =
        (smsparam.var1 == "" ? "#var1" : smsparam.var1) +
        " celebrate this special " +
        (smsparam.var2 == "" ? "#var2" : smsparam.var2) +
        " with " +
        (smsparam.var3 == "" ? "#var3" : smsparam.var3) +
        ". Validity (" +
        (smsparam.var4 == "" ? "#var4" : smsparam.var4) +
        "). Team " +
        userName.toUpperCase() +
        ". T and C apply.";
    }
    setsmsparam({ ...smsparam });
    setparam({ ...param });
  };

  return (
    <ImageBackground
      source={require("../assets/login-bg.jpg")}
      style={MyStyles.container}
    >
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
              param.voucher_type = val;
              setparam({ ...param });
              SmsTemplete();
            }}
            placeholder="Voucher Type"
          />

          <TextInput
            mode="outlined"
            placeholder="Voucher Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.voucher_name}
            onChangeText={(text) => {
              setparam({ ...param, voucher_name: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Voucher Heading"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.voucher_heading}
            onChangeText={(text) => {
              setparam({ ...param, voucher_heading: text });
            }}
          />
          <TextInput
            mode="outlined"
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
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "48%" }}
              value={param.start_date}
              onValueChange={(date) => {
                setparam({ ...param, start_date: date });
              }}
            />
            <DatePicker
              label="End Date"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "48%" }}
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
                inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "48%" }}
                value={param.redeem_start_date}
                onValueChange={(date) => {
                  setparam({ ...param, redeem_start_date: date });
                }}
              />
              <DatePicker
                label="Red. End Date"
                inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "48%" }}
                value={param.redeem_end_date}
                onValueChange={(date) => {
                  setparam({ ...param, redeem_end_date: date });
                }}
              />
            </View>
          ) : (
            <TextInput
              mode="outlined"
              placeholder="Duration"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              keyboardType={"number-pad"}
              value={param.duration}
              onChangeText={(text) => {
                setparam({ ...param, duration: text });
              }}
            />
          )}

          <TouchableRipple
            onPress={() => {
              setvisibletemp(true);
            }}
          >
            <TextInput
              mode="outlined"
              multiline
              numberOfLines={4}
              editable={false}
              value={param.voucher_sms}
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
            />
          </TouchableRipple>
          <Checkbox.Item
            label="Disable"
            status={param.disable ? "checked" : "unchecked"}
            onPress={(e) => {
              setparam({ ...param, disable: !param.disable });
            }}
            labelStyle={{ color: "#000" }}
            color="#000"
          />
          <View style={MyStyles.row}>
            <ImageUpload
              label="Voucher Image :"
              source={Image}
              onClearImage={() => {
                setImage({ uri: "" });
                setparam({
                  ...param,
                  image_path: "",
                });
              }}
              onUploadImage={(result) => {
                setImage({ uri: result.uri });
                // setvoucheruploads({
                //   ...voucheruploads,
                //   image_base64: result.base64,
                // });
                setparam({
                  ...param,
                  image_path:
                    "image-" + moment().format("YYYYMMDD-hhmmss") + ".jpg",
                });
              }}
            />
            <ImageUpload
              label="Voucher Banner :"
              source={Banner}
              onClearImage={() => {
                setBanner({ uri: "" });
                setparam({
                  ...param,
                  banner_image: "",
                });
              }}
              onUploadImage={(result) => {
                setBanner({ uri: result.uri });
                console.log(result.uri);
                // setvoucheruploads({
                //   ...voucheruploads,
                //   banner_base64: result.base64,
                // });
                setparam({
                  ...param,
                  banner_image:
                    "banner-" + moment().format("YYYYMMDD-hhmmss") + ".jpg",
                });
              }}
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
                  if (resp.status == 200) {
                    if (resp.data[0].valid) {
                      if (Banner.uri) {
                        const form_data = new FormData();
                        form_data.append("files", {
                          uri: Banner.uri,
                          type: "image/jpeg",
                          name: param.banner_image,
                        });

                        var xhr = new XMLHttpRequest();
                        xhr.open(
                          "POST",
                          serviceUrl +
                            "masters/customer/UploadvoucherBannerMob",
                          true
                        );
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader(
                          "Content-Type",
                          "multipart/form-data"
                        );
                        xhr.setRequestHeader("auth-token", userToken);

                        xhr.onload = function (e) {
                          const resp = xhr.response;
                          if (resp.status == 200) {
                            if (resp.data[0].valid) {
                              console.log("banner : " + resp.data[0].valid);
                            }
                          }
                        };
                        xhr.send(form_data);
                      }
                      if (Image.uri) {
                        const form_data = new FormData();
                        form_data.append("files", {
                          uri: Image.uri,
                          type: "image/jpeg",
                          name: param.image_path,
                        });

                        var xhr = new XMLHttpRequest();
                        xhr.open(
                          "POST",
                          serviceUrl + "masters/customer/UploadvoucherMob",
                          true
                        );
                        xhr.setRequestHeader("Accept", "application/json");
                        xhr.setRequestHeader(
                          "Content-Type",
                          "multipart/form-data"
                        );
                        xhr.setRequestHeader("auth-token", userToken);

                        xhr.onload = function (e) {
                          const resp = xhr.response;
                          if (resp.status == 200) {
                            if (resp.data[0].valid) {
                              console.log("image : " + resp.data[0].valid);
                            }
                          }
                        };
                        xhr.send(form_data);
                      }

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

      {/* <MessageTemplate
        visible={visibletemp}
        onDone={(vars) => {
          console.log(vars);
          let temp = "Dear (Customer Name), (Brand Name) wish you a wonderful BIRHDAY! May this day be filled with happy hours and life with many birthdays. Team Quicktagg";
          setvisibletemp(false);
        }}
        onClose={() => {
          setvisibletemp(false);
        }}
        type={param.voucher_type}
        company={userName}
      /> */}
      <Portal>
        <Modal visible={visibletemp} contentContainerStyle={MyStyles.container}>
          <View
            style={[
              MyStyles.row,
              MyStyles.primaryColor,
              {
                marginVertical: 0,
              },
            ]}
          >
            <IconButton
              icon="arrow-left"
              onPress={() => {
                param.voucher_sms = smsparam.template;
                smsparam.var1 = "";
                smsparam.var2 = "";
                smsparam.var3 = "";
                smsparam.var4 = "";
                setsmsparam({ ...smsparam });
                setvisibletemp(false);
              }}
            />
          </View>
          <ImageBackground
            source={require("../assets/login-bg.jpg")}
            style={MyStyles.container}
          >
            <View style={MyStyles.cover}>
              <TextInput
                mode="outlined"
                placeholder="Var1"
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
                value={smsparam.var1}
                onChangeText={(text) => {
                  smsparam.var1 = text;
                  setsmsparam({ ...smsparam });
                  SmsTemplete();
                }}
              />
              <TextInput
                mode="outlined"
                placeholder="Var2"
                style={{ backgroundColor: "rgba(0,0,0,0)" }}
                value={smsparam.var2}
                onChangeText={(text) => {
                  smsparam.var2 = text;
                  setsmsparam({ ...smsparam });
                  SmsTemplete();
                }}
              />
              {smsparam.var3visible ? (
                <TextInput
                  mode="outlined"
                  placeholder="Var3"
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                  value={smsparam.var3}
                  onChangeText={(text) => {
                    smsparam.var3 = text;
                    setsmsparam({ ...smsparam });
                    SmsTemplete();
                  }}
                />
              ) : null}
              {smsparam.var4visible ? (
                <TextInput
                  mode="outlined"
                  placeholder="Var4"
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                  value={smsparam.var4}
                  onChangeText={(text) => {
                    smsparam.var4 = text;
                    setsmsparam({ ...smsparam });
                    SmsTemplete();
                  }}
                />
              ) : null}

              <View style={{ marginTop: 50 }}>
                <Text style={{ textAlign: "center" }}>Sms Templete</Text>
                <TextInput
                  mode="outlined"
                  multiline
                  numberOfLines={4}
                  editable={false}
                  value={smsparam.template}
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                />
              </View>
            </View>
            <FAB
              style={{ position: "absolute", bottom: 20, right: 20 }}
              icon="check"
              color="#000"
              onPress={() => {
                param.voucher_sms = smsparam.template;
                smsparam.var1 = "";
                smsparam.var2 = "";
                smsparam.var3 = "";
                smsparam.var4 = "";
                setsmsparam({ ...smsparam });
                setvisibletemp(false);
              }}
            />
          </ImageBackground>
        </Modal>
      </Portal>
    </ImageBackground>
  );
};

const MessageTemplate = ({ visible, onDone, onClose, type, company }) => {
  const [param, setParam] = useState({
    var1: "",
    var2: "",
    var3: "",
    var4: "",
    templete: "",
  });

  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={MyStyles.container}>
        <View
          style={[
            MyStyles.row,
            MyStyles.primaryColor,
            {
              marginVertical: 0,
            },
          ]}
        >
          <IconButton
            icon="arrow-left"
            onPress={() => {
              onClose();
            }}
          />
        </View>
        <ImageBackground
          source={require("../assets/login-bg.jpg")}
          style={MyStyles.container}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.6)",
              margin: 20,
              borderRadius: 10,
              padding: 10,
            }}
          >
            <TextInput
              mode="outlined"
              placeholder="Voucher Name"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={param.var1}
              onChangeText={(text) => {
                setParam({ ...param, var1: text });
              }}
            />
            <TextInput
              mode="outlined"
              placeholder="Voucher Name"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={param.var2}
              onChangeText={(text) => {
                setParam({ ...param, var2: text });
              }}
            />
            <TextInput
              mode="outlined"
              placeholder="Voucher Name"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={param.var3}
              onChangeText={(text) => {
                setParam({ ...param, var3: text });
              }}
            />
            <View style={{ marginTop: 100 }}>
              <Text style={{ textAlign: "center" }}>SMS Templete</Text>
              <View
                style={{ borderColor: "gray", borderWidth: 1, borderRadius: 4 }}
              >
                <Text style={{ margin: 10 }}>{param.templete}</Text>
              </View>
            </View>
          </View>
          <FAB
            style={{ position: "absolute", bottom: 20, right: 20 }}
            icon="check"
            color="#000"
            onPress={() => {
              onDone(param);
            }}
          />
        </ImageBackground>
      </Modal>
    </Portal>
  );
};

export { VoucherList, VoucherForm };
