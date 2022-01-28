import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Image,
  ImageBackground,
  ScrollView,
  View,
  TouchableHighlight,
  Alert,
} from "react-native";
import {
  Button,
  Text,
  List,
  FAB,
  TextInput,
  Avatar,
  Card,
  Modal,
  Portal,
  TouchableRipple,
  DataTable,
} from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";
import { FlatList } from "react-native-gesture-handler";
import { postRequest } from "../Services/RequestServices";
import LottieView from "lottie-react-native";
import MaleAvatar from "../assets/Animations/42842-male-avatar.json";
import FemaleAvatar from "../assets/Animations/50019-female-avatar.json";
import DropDown from "../Components/DropDown";
import DatePicker from "../Components/DatePicker";
import { LinearGradient } from "expo-linear-gradient";
import BadgeRibbon from "../Components/BadgeRibbon";
import * as Linking from "expo-linking";
import Loading from "../Components/Loading";
import TimePicker from "../Components/TimePicker";

const ProfileList = (props) => {
  return (
    <View style={MyStyles.container}>
      <FlatList
        data={[{}]}
        renderItem={({ item, index }) => (
          <List.Item
            key={index}
            style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
            title="Rahul"
            titleStyle={{ fontWeight: "bold" }}
            description="971612244"
            left={(props) => (
              <List.Icon
                {...props}
                icon="account"
                onPress={() => props.navigation.navigate("CustomerForm")}
              />
            )}
            right={() => {
              return <List.Icon {...props} icon="chevron-right" />;
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Profile = (props) => {
  const Tab = createMaterialTopTabNavigator();
  const { userToken, customer_id, customer_mobile } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [param, setparam] = useState({
    customer_id: "",
    full_name: "",
    gender: "",
    category_id: "",
    category_name: "",
    mobile: "",
    doa: "",
    dob: "",
    area_id: "",
    area_name: "",
    profession: "",
    staff_id: "",
    staff_name: "",
    ref_id: "",
    ref_full_name: "",
    ref_mobile: "",
    totalwishlist: "",
    totaltrials: "",
    totalvcalls: "",
    catalogs: "",
  });

  React.useEffect(() => {
    let data = { customer_id: customer_id };
    postRequest("customers/customer/profile", data, userToken).then((resp) => {
      if (resp.status == 200) {
        console.log(resp.data[0]);
        param.customer_id = resp.data[0].customer_id;
        param.full_name = resp.data[0].full_name;
        param.gender = resp.data[0].gender;
        param.category_id = resp.data[0].category_id;
        param.category_name = resp.data[0].category_name;
        param.mobile = resp.data[0].mobile;
        param.doa = resp.data[0].doa;
        param.dob = resp.data[0].dob;
        param.area_id = resp.data[0].area_id;
        param.area_name = resp.data[0].area_name;
        param.profession = resp.data[0].profession;
        param.staff_id = resp.data[0].staff_id;
        param.staff_name = resp.data[0].staff_name;
        param.ref_id = resp.data[0].ref_id;
        param.ref_full_name = resp.data[0].ref_full_name;
        param.ref_mobile = resp.data[0].ref_mobile;
        param.totalwishlist = resp.data[0].totalwishlist;
        param.totaltrials = resp.data[0].totaltrials;
        param.totalvcalls = resp.data[0].totalvcalls;
        param.catalogs = resp.data[0].catalogs;
        setparam({ ...param });
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
      setLoading(false);
    });

  }, []);

  return (
    <View style={MyStyles.container}>
      <Loading isloading={loading} />
      <View
        style={[
          MyStyles.row,
          {
            justifyContent: "center",
            marginTop: 10,
          },
        ]}
      >

        {param.gender !== null ? (<LottieView
          source={param.gender === "male" ? MaleAvatar : FemaleAvatar}
          autoPlay
          loop
          resizeMode="cover"
          style={{ width: 100, margin: -10, marginRight: -30 }}
        />
        ) : null}

        <View style={[MyStyles.profile_row, { marginRight: 30 }]}>
          <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {param.totalwishlist}
            </Text>
            <Text>Wishlist</Text>
          </View>
          <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {param.totaltrials}
            </Text>
            <Text>Trials</Text>
          </View>
          <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {param.totalvcalls}
            </Text>
            <Text>Calls</Text>
          </View>
          <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {param.catalogs}
            </Text>
            <Text>Catalogs</Text>
          </View>
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {param.full_name} {(param.gender === "male" ? "♂️" : "♀️") + "      "}
          <Text style={{ color: "green" }}>{param.category_name}</Text>
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableRipple onPress={() => Linking.openURL("tel:9874561230")}>
            <Text>{param.mobile}</Text>
          </TouchableRipple>
          <Icon2
            name="whatsapp"
            size={25}
            style={{ color: "green", marginHorizontal: 5, marginLeft: "auto" }}
            onPress={() => {
              Linking.openURL("whatsapp://send?text=&phone=91" + param.mobile);
            }}
          />
        </View>
        <Text>DOB: {param.dob == null ? 'N/A' : moment(param.dob).format("Do MMM YYYY")} </Text>
        <Text>DOA: {param.doa == null ? 'N/A' : moment(param.doa).format("Do MMM YYYY")}</Text>
        <Text>{param.area_name}</Text>
        <Text>{param.profession}</Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ color: "#F33A6A" }}>Staff: {param.staff_id}</Text>
        <Text style={{ color: "#F33A6A" }}>
          REF. BY: {param.ref_full_name} - {param.ref_mobile}
        </Text>
      </View>
      <View style={[MyStyles.row, { justifyContent: "space-evenly" }]}>
        <Button
          mode="outlined"
          compact
          uppercase={false}
          color="black"
          onPress={() =>
            props.navigation.navigate("CustomerForm", {
              customer_id: param.customer_id,
            })
          }
        >
          Edit Profile
        </Button>
        <Button
          mode="outlined"
          compact
          uppercase={false}
          color="black"
          onPress={() => props.navigation.navigate("Catalogs")}
        >
          Create Catalog
        </Button>
        <Button
          mode="outlined"
          compact
          uppercase={false}
          color="black"
          onPress={() =>
            props.navigation.navigate("CustomerVoucherList", {
              customer_id: param.customer_id,
            })
          }
        >
          Vouchers
        </Button>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          style: { backgroundColor: "rgba(0,0,0,0)" },
        }}
      >
        <Tab.Screen
          name="Wishlist"
          component={Wishlist}
          options={{
            tabBarIcon: () => <Icon name="heart" size={20} />,
          }}
          initialParams={{ userToken: userToken, customer_id: customer_id }}
        />
        <Tab.Screen
          name="Uploaded"
          component={Uploaded}
          options={{
            tabBarIcon: () => <Icon name="upload" size={20} />,
          }}
          initialParams={{ userToken: userToken, customer_id: customer_id }}
        />
        <Tab.Screen
          name="Exhibition"
          component={Exhibition}
          options={{
            tabBarIcon: () => <Icon name="star" size={20} />,
          }}
          initialParams={{ userToken: userToken, customer_id: customer_id }}
        />
        <Tab.Screen
          name="VideoCallRequest"
          component={VideoCallRequest}
          options={{
            tabBarIcon: () => <Icon name="video" size={20} />,
          }}
          initialParams={{
            userToken: userToken,
            customer_id: customer_id,
            customer_mobile: customer_mobile,
          }}
        />
        <Tab.Screen
          name="CallRequest"
          component={CallRequest}
          options={{
            tabBarIcon: () => <Icon name="phone-call" size={20} />,
          }}
          initialParams={{ userToken: userToken, customer_id: customer_id,customer_mobile: customer_mobile }}
        />
      </Tab.Navigator>
    </View>
  );
};

const Wishlist = (props) => {
  const { userToken, customer_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [wishlist, setwishlist] = useState([]);

  React.useEffect(() => {
    let data = { customer_id: customer_id };
    postRequest("customers/customer/profile", data, userToken).then((resp) => {
      if (resp.status == 200) {
        let param = [];
        param = resp.data[0].wishlist;
        setwishlist(param);
        //console.log(wishlist);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
    setLoading(false);
  }, []);

  return (
    <View style={MyStyles.container}>
      {wishlist.length > 0
        ? wishlist.map((resp, index) => {
          return (
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "#AAA",
                marginHorizontal: 10,
              }}
            >
              <Text style={{ marginVertical: 5 }}>{resp.date}</Text>
              <FlatList
                //key={index}
                data={resp.products}
                renderItem={({ item }) => (
                  <Card
                    style={{
                      margin: 5,
                      borderRadius: 10,
                      width: 120,
                      alignItems: "center",
                    }}
                    onPress={() =>
                      props.navigation.navigate("ProductsPreview", {
                        product_id: item.product_id,
                      })
                    }
                  >
                    {item.exhibition ? (
                      <BadgeRibbon text="E" position="left" color="red" />
                    ) : null}
                    {item.trial ? (
                      <BadgeRibbon text="T" position="right" />
                    ) : null}
                    <Image
                      source={{ uri: item.urlImage + "" + item.image_path }}
                      style={{
                        width: 120,
                        height: 120,
                        zIndex: -50,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                    />

                    <View style={{ padding: 5, paddingVertical: 10 }}>
                      <Text numberOfLines={2} style={{ color: "#333" }}>
                        {item.name}
                      </Text>
                      {/* <Text style={{ color: "#333" }}>{item.product_code}</Text> */}
                    </View>
                  </Card>
                )}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          );
        })
        : null}
    </View>
  );
};

const Uploaded = (props) => {
  const { userToken, customer_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [uploadlist, setuploadlist] = useState([]);

  React.useEffect(() => {
    let data = { customer_id: customer_id };
    postRequest("customers/customer/profile", data, userToken).then((resp) => {
      if (resp.status == 200) {
        let param = [];
        param = resp.data[0].uploads;
        setuploadlist(param);
        //console.log(wishlist);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
    setLoading(false);
  }, []);

  return (
    <View style={MyStyles.container}>
      {uploadlist.length > 0
        ? uploadlist.map((resp, index) => {
          return (
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "#AAA",
                marginHorizontal: 10,
              }}
            >
              <Text style={{ marginVertical: 5 }}>{resp.date}</Text>
              <FlatList
                key={index}
                data={resp.products}
                renderItem={({ item }) => (
                  <Card
                    style={{
                      margin: 5,
                      borderRadius: 10,
                      width: 120,
                      alignItems: "center",
                    }}
                  // onPress={() =>
                  //   props.navigation.navigate("ProductsPreview", {
                  //     product_id: item.product_id,
                  //   })
                  // }
                  >
                    <Image
                      source={{ uri: item.urlImage + "" + item.image_path }}
                      style={{
                        width: 120,
                        height: 120,
                        zIndex: -50,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                    />

                    {/*<View style={{ padding: 5, paddingVertical: 10 }}>
                      <Text numberOfLines={2} style={{ color: "#333" }}>
                        {item.name}
                      </Text>
                      <Text style={{ color: "#333" }}>{item.product_code}</Text>
                    </View> */}
                  </Card>
                )}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          );
        })
        : null}
    </View>
  );
};

const Exhibition = (props) => {
  const { userToken, customer_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [exhibitionlist, setexhibitionlist] = useState([]);

  React.useEffect(() => {
    let data = { customer_id: customer_id };
    postRequest("customers/customer/profile", data, userToken).then((resp) => {
      if (resp.status == 200) {
        let param = [];
        param = resp.data[0].trials;
        setexhibitionlist(param);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
    setLoading(false);
  }, []);

  return (
    <View style={MyStyles.container}>
      {exhibitionlist.length > 0
        ? exhibitionlist.map((resp, index) => {
          return (
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: "#AAA",
                marginHorizontal: 10,
              }}
            >
              <Text style={{ marginVertical: 5 }}>{resp.date}</Text>
              <FlatList
                key={index}
                data={resp.products}
                renderItem={({ item }) => (
                  <Card
                    style={{
                      margin: 5,
                      borderRadius: 10,
                      width: 120,
                      alignItems: "center",
                    }}
                    onPress={() =>
                      props.navigation.navigate("ProductsPreview", {
                        product_id: item.product_id,
                      })
                    }
                  >
                    {item.exhibition ? (
                      <BadgeRibbon text="E" position="left" color="red" />
                    ) : null}
                    {item.trial ? (
                      <BadgeRibbon text="T" position="right" />
                    ) : null}
                    <Image
                      source={{ uri: item.urlImage + "" + item.image_path }}
                      style={{
                        width: 120,
                        height: 120,
                        zIndex: -50,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                      }}
                    />

                    <View style={{ padding: 5, paddingVertical: 10 }}>
                      <Text numberOfLines={2} style={{ color: "#333" }}>
                        {item.name}
                      </Text>
                      {/* <Text style={{ color: "#333" }}>{item.product_code}</Text> */}
                    </View>
                  </Card>
                )}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          );
        })
        : null}
    </View>
  );
};

const VideoCallRequest = (props) => {
  const { userToken, customer_id, customer_mobile } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [vcallslist, setvcallslist] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [requestParam, setrequestParam] = useState({
    tran_id: "",
    status: "accept",
    accept_date: "",
    accept_time: "",
    remarks: "",
  });
  const [newrequestParam, setnewrequestParam] = useState({
    tran_id: "0",
    name: "request",
    visit_type: "video call",
    mobile: customer_mobile,
    customer_id: customer_id,
  });
  React.useEffect(() => {
    Refresh();
    setLoading(false);
  }, []);

  const Refresh = () => {
    postRequest(
      "customers/customer/profile",
      { customer_id: customer_id },
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        let param = [];
        param = resp.data[0].vcalls;
        setvcallslist(param);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
  };
  return (
    <View style={MyStyles.container}>
      <Card
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingHorizontal: 10,
        }}
      >
        <Card.Title
          title="Create Request"
          titleStyle={{ marginLeft: -10 }}
          right={() => (
            <View>
              <Button
                mode="contained"
                compact
                uppercase={false}
                onPress={() => {
                  setVisible2(true);
                }}
              >
                <Icon name="plus" color="black" size={20} />
              </Button>
            </View>
          )}
        />
      </Card>
      <FlatList
        data={vcallslist}
        initialNumToRender={10}
        renderItem={({ item, index }) => (
          <Card key={index}>
            <Card.Title
              title={item.status}
              right={() => (
                <View style={{ marginHorizontal: 10, marginVertical: 8 }}>
                  <Text style={{ color: "green", marginLeft: "auto" }}>
                    {item.date}
                  </Text>
                  {item.status == "request" ? (
                    <Button
                      mode="contained"
                      compact
                      style={{ marginTop: 5 }}
                      uppercase={false}
                      onPress={() => {
                        setrequestParam({
                          ...requestParam,
                          tran_id: item.tran_id,
                          status: "accept",
                        });
                        setVisible(true);
                      }}
                    >
                      Accept
                    </Button>
                  ) : null}
                  {item.status == "accept" ? (
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Button
                        mode="contained"
                        uppercase={false}
                        style={{ marginHorizontal: 10 }}
                        onPress={() => {

                          Alert.alert("Alert", "Are you sure you want to complete this query ?", [
                            {
                              text: "No",
                              onPress: () => { },
                              style: "cancel",
                            },
                            {
                              text: "Yes",
                              onPress: () => {
                                setLoading(true);
                                let done_param = {
                                  tran_id: item.tran_id,
                                  status: "done",
                                  accept_date: moment().format("YYYY-MM-DD"),
                                  accept_time: moment().format("HH:mm"),
                                  remarks: "",
                                };
                                postRequest(
                                  "transactions/customer/vcall/update",
                                  done_param,
                                  userToken
                                ).then((resp) => {
                                  if (resp.status == 200) {
                                    Refresh();
                                    setLoading(false);
                                  }
                                });

                              },
                              {
                                text: "Yes",
                                onPress: () => {
                                  setLoading(true);
                                  let done_param = {
                                    tran_id: item.tran_id,
                                    status: "done",
                                    accept_date: moment().format("YYYY-MM-DD"),
                                    accept_time: moment().format("HH:mm"),
                                    remarks: "",
                                  };
                                  postRequest(
                                    "transactions/customer/vcall/update",
                                    done_param,
                                    userToken
                                  ).then((resp) => {
                                    if (resp.status == 200) {
                                      Refresh();
                                      setLoading(false);
                                    }
                                  });
                                },
                              },
                            ]
                          );
                        }}
                      >
                        Done
                      </Button>
                      <Button
                        mode="contained"
                        uppercase={false}
                        onPress={() => {
                          requestParam.tran_id = item.tran_id;
                          requestParam.status = "accept";
                          requestParam.accept_date = item.accept_date;
                          requestParam.accept_time = item.accept_time;
                          setrequestParam({ ...requestParam });
                          setVisible(true);
                          console.log(requestParam);
                        }}
                      >
                        Edit
                      </Button>
                    </View>
                  ) : null}
                </View>
              )}
            />
            <View
              style={{
                borderTopWidth: 0.5,
                borderTopColor: "#AAA",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                marginHorizontal: 10,
              }}
            >
              <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
                {item.accept_date !== null ? (
                  <Button
                    mode="outlined"
                    color="black"
                    compact
                    uppercase={false}
                    style={{ marginHorizontal: 5 }}
                  >
                    {moment(item.accept_date).format("DD-MM-YYYY")}
                  </Button>
                ) : null}

                {item.accept_time !== null ? (
                  <Button
                    mode="outlined"
                    color="black"
                    compact
                    uppercase={false}
                    style={{ marginHorizontal: 5 }}
                  >
                    {item.accept_time}
                  </Button>
                ) : null}
              </View>
              <View>
                {item.remarks.length > 0
                  ? item.remarks.map((item) => {
                    return (
                      <Text style={{ color: "#888" }}>{item.remarks}</Text>
                    );
                  })
                  : null}
                <Text style={{ color: "#888" }}>View All Remarks</Text>
              </View>
            </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            margin: 10,
          }}
        >
          <View>
            <View style={MyStyles.row}>
              <DatePicker
                label="Accept Date"
                inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "48%" }}
                value={requestParam.accept_date}
                onValueChange={(date) => {
                  setrequestParam({ ...requestParam, accept_date: date });
                }}
              />
              <TimePicker
                label="Accept Time"
                style={{ backgroundColor: "rgba(0,0,0,0)", width: "100%" }}
                value={`2022-01-27T${requestParam.accept_time}`}
                onValueChange={(dateTime) => {
                  setrequestParam({
                    ...requestParam,
                    accept_time: moment(dateTime).format("HH:MM:SS"),
                  });
                }}
              />
              {/* <TextInput
                mode="outlined"
                placeholder="Accept Time"
                style={{ backgroundColor: "rgba(0,0,0,0)", width: "48%" }}
                value={requestParam.accept_time}
                keyboardType={"number-pad"}
                onChangeText={(e) => {
                  setrequestParam({
                    ...requestParam,
                    accept_time:
                      e.length == 2
                        ? e.substring(0, 2) + ":" + e.substring(2, 5)
                        : e,
                  });
                }}
                maxLength={5}
              /> */}
            </View>
            <TextInput
              mode="outlined"
              placeholder="Remarks"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={requestParam.remarks}
              onChangeText={(text) => {
                setrequestParam({ ...requestParam, remarks: text });
              }}
              multiline
              numberOfLines={4}
            />
            <View style={[MyStyles.row, { marginTop: 20 }]}>
              <Button
                mode="contained"
                compact
                uppercase={false}
                color="red"
                style={{ width: "48%" }}
                onPress={() => {
                  setrequestParam({
                    ...requestParam,
                    tran_id: "",
                    status: "",
                    accept_date: "",
                    accept_time: "",
                    remarks: "",
                  });
                  setVisible(false);
                }}
              >
                Close
              </Button>
              <Button
                mode="contained"
                compact
                uppercase={false}
                style={{ width: "48%" }}
                onPress={() => {
                  setLoading(true);
                  postRequest(
                    "transactions/customer/vcall/update",
                    requestParam,
                    userToken
                  ).then((resp) => {
                    if (resp.status == 200) {
                      Refresh();
                      setVisible(false);
                      setrequestParam({
                        ...requestParam,
                        tran_id: "",
                        status: "",
                        accept_date: "",
                        accept_time: "",
                        remarks: "",
                      });
                      setLoading(false);
                    }
                  });
                }}
              >
                Submit
              </Button>
            </View>
          </View>
        </Modal>

        <Modal
          visible={visible2}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            margin: 10,
          }}
        >
          <View>
            <TextInput
              mode="outlined"
              placeholder="Mobile"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={newrequestParam.mobile}
              onChangeText={(text) => {
                setnewrequestParam({ ...newrequestParam, mobile: text });
              }}
              disabled
            />
            <View style={[MyStyles.row, { marginTop: 20 }]}>
              <Button
                mode="contained"
                compact
                uppercase={false}
                color="red"
                style={{ width: "48%" }}
                onPress={() => {
                  setVisible2(false);
                }}
              >
                Close
              </Button>
              <Button
                mode="contained"
                compact
                uppercase={false}
                style={{ width: "48%" }}
                onPress={() => {
                  setLoading(true);
                  postRequest(
                    "session/Insert_appointment_app",
                    newrequestParam,
                    userToken
                  ).then((resp) => {
                    if (resp.status == 200) {
                      Refresh();
                      setVisible2(false);
                      setLoading(false);
                    }
                  });
                }}
              >
                Submit
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};
const CallRequest = (props) => {
  const { userToken, customer_id, customer_mobile } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [misscallslist, setmisscallslist] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [requestParam, setrequestParam] = useState({
    tran_id: "",
    status: "",
    accept_date: "",
    accept_time: "",
    remarks: "",
  });
  const [newrequestParam, setnewrequestParam] = useState({
    tran_id: "0",
    name: "request",
    visit_type: "miss call",
    mobile: customer_mobile,
    customer_id: customer_id,
  });
  React.useEffect(() => {
    Refresh();
    setLoading(false);
  }, []);
  const Refresh = () => {
    postRequest(
      "customers/customer/profile",
      { customer_id: customer_id },
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        let param = [];
        param = resp.data[0].mcalls;
        setmisscallslist(param);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
  };
  return (
    <View style={MyStyles.container}>
       <Card
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          paddingHorizontal: 10,
        }}
      >
        <Card.Title
          title="Create Request"
          titleStyle={{ marginLeft: -10 }}
          right={() => (
            <View>
              <Button
                mode="contained"
                compact
                uppercase={false}
                onPress={() => {
                  setVisible2(true);
                }}
              >
                <Icon name="plus" color="black" size={20} />
              </Button>
            </View>
          )}
        />
      </Card>
      <FlatList
        data={misscallslist}
        initialNumToRender={10}
        renderItem={({ item, index }) => (
          <Card key={index}>
            <Card.Title
              title={item.status}
              right={() => (
                <View style={{ marginHorizontal: 10, marginVertical: 8 }}>
                  <Text style={{ color: "green", marginLeft: "auto" }}>
                    {item.date}
                  </Text>
                  {item.status == "request" ? (
                    <Button
                      mode="contained"
                      compact
                      style={{ marginTop: 5 }}
                      uppercase={false}
                      onPress={() => {
                        setrequestParam({
                          ...requestParam,
                          tran_id: item.tran_id,
                          status: "accept",
                        });
                        setVisible(true);
                      }}
                    >
                      Accept
                    </Button>
                  ) : null}
                  {item.status == "accept" ? (
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Button
                        mode="contained"
                        style={{ marginHorizontal: 10 }}
                        uppercase={false}
                        onPress={() => {
                          Alert.alert("Alert", "Are you sure you want to complete this query ?", [
                            {
                              text: "No",
                              onPress: () => { },
                              style: "cancel",
                            },
                            {
                              text: "Yes",
                              onPress: () => {
                                setLoading(true);
                                let done_param = {
                                  tran_id: item.tran_id,
                                  status: "done",
                                  accept_date: moment().format("YYYY-MM-DD"),
                                  accept_time: moment().format("HH:mm"),
                                  remarks: "",
                                };
                                postRequest(
                                  "transactions/customer/missCall/update",
                                  done_param,
                                  userToken
                                ).then((resp) => {
                                  if (resp.status == 200) {
                                    Refresh();
                                    setLoading(false);
                                  }
                                });

                              },
                            ]
                          );
                        }}
                      >
                        Done
                      </Button>
                      <Button
                        mode="contained"
                        uppercase={false}
                        onPress={() => {
                          requestParam.tran_id = item.tran_id;
                          requestParam.status = "accept";
                          requestParam.accept_date = item.accept_date;
                          requestParam.accept_time = item.accept_time;
                          setrequestParam({ ...requestParam });
                          setVisible(true);
                          console.log(requestParam);
                        }}
                      >
                        Edit
                      </Button>
                    </View>
                  ) : null}
                </View>
              )}
            />
            <View
              style={{
                borderTopWidth: 0.5,
                borderTopColor: "#AAA",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                marginHorizontal: 10,
              }}
            >
              <View style={[MyStyles.row, { justifyContent: "flex-start" }]}>
                {item.accept_date !== null ? (
                  <Button
                    mode="outlined"
                    color="black"
                    compact
                    uppercase={false}
                    style={{ marginHorizontal: 5 }}
                  >
                    {moment(item.accept_date).format("DD-MM-YYYY")}
                  </Button>
                ) : null}

                {item.accept_time !== null ? (
                  <Button
                    mode="outlined"
                    color="black"
                    compact
                    uppercase={false}
                    style={{ marginHorizontal: 5 }}
                  >
                    {item.accept_time}
                  </Button>
                ) : null}
              </View>
              <View>
                {item.remarks.length > 0
                  ? item.remarks.map((item) => {
                    return (
                      <Text style={{ color: "#888" }}>{item.remark}</Text>
                    );
                  })
                  : null}
                <Text style={{ color: "#888" }}>View All Remarks</Text>
              </View>
            </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Portal>
        <Modal
          visible={visible}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            margin: 10,
          }}
        >
          <View>
            <View style={MyStyles.row}>
              <DatePicker
                label="Accept Date"
                inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "48%" }}
                value={requestParam.accept_date}
                onValueChange={(date) => {
                  setrequestParam({ ...requestParam, accept_date: date });
                }}
              />
              <TimePicker
                label="Accept Time"
                style={{ backgroundColor: "rgba(0,0,0,0)", width: "100%" }}
                onValueChange={(dateTime) => {
                  setrequestParam({
                    ...requestParam,
                    accept_time: moment(dateTime).format("HH:MM:SS"),
                  });
                }}
              />
              {/* <TextInput
                mode="outlined"
                placeholder="Accept Time"
                style={{ backgroundColor: "rgba(0,0,0,0)", width: "48%" }}
                value={requestParam.accept_time}
                keyboardType={"number-pad"}
                onChangeText={(e) => {
                  setrequestParam({
                    ...requestParam,
                    accept_time:
                      e.length == 2
                        ? e.substring(0, 2) + ":" + e.substring(2, 5)
                        : e,
                  });
                }}
                maxLength={5}
              /> */}
            </View>
            <TextInput
              mode="outlined"
              placeholder="Remarks"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={requestParam.remarks}
              onChangeText={(text) => {
                setrequestParam({ ...requestParam, remarks: text });
              }}
              multiline
              numberOfLines={4}
            />
            <View style={[MyStyles.row, { marginTop: 20 }]}>
              <Button
                mode="contained"
                compact
                uppercase={false}
                style={{ backgroundColor: "red", width: "48%" }}
                onPress={() => {
                  setrequestParam({
                    ...requestParam,
                    tran_id: "",
                    status: "",
                    accept_date: "",
                    accept_time: "",
                    remarks: "",
                  });
                  setVisible(false);
                }}
              >
                Close
              </Button>
              <Button
                mode="contained"
                compact
                uppercase={false}
                style={{ width: "48%" }}
                onPress={() => {
                  setLoading(true);
                  postRequest(
                    "transactions/customer/missCall/update",
                    requestParam,
                    userToken
                  ).then((resp) => {
                    if (resp.status == 200) {
                      Refresh();
                      setVisible(false);
                      setrequestParam({
                        ...requestParam,
                        tran_id: "",
                        status: "",
                        accept_date: "",
                        accept_time: "",
                        remarks: "",
                      });
                      setLoading(false);
                    }
                  });
                }}
              >
                Submit
              </Button>
            </View>
          </View>
        </Modal>
     
        <Modal
          visible={visible2}

          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            margin: 10,
          }}
        >
          <View>
            <TextInput
              mode="outlined"
              placeholder="Mobile"
              style={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={newrequestParam.mobile}
              onChangeText={(text) => {
                setnewrequestParam({ ...newrequestParam, mobile: text });
              }}
              disabled
            />
            <View style={[MyStyles.row, { marginTop: 20 }]}>
              <Button
                mode="contained"
                compact
                uppercase={false}
                color="red"
                style={{ width: "48%" }}
                onPress={() => {
                  setVisible2(false);
                }}
              >
                Close
              </Button>
              <Button
                mode="contained"
                compact
                uppercase={false}
                style={{ width: "48%" }}
                onPress={() => {
                  setLoading(true);
                  postRequest(
                    "session/Insert_appointment_app",
                    newrequestParam,
                    userToken
                  ).then((resp) => {
                    if (resp.status == 200) {
                      Refresh();
                      setVisible2(false);
                      setLoading(false);
                    }
                  });
                }}
              >
                Submit
              </Button>

            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const CustomerVoucherList = (props) => {
  const { userToken, customer_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, []);

  const Browse = () => {
    postRequest(
      "customervisit/getCustomerVoucherList",
      { customer_id: customer_id },
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

  return (
    <View style={MyStyles.container}>
      <FlatList
        data={griddata}
        style={{ marginVertical: 10 }}
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
            {item.disable ? (
              <BadgeRibbon
                text="Active"
                color="green"
                position="voucherRight"
                textStyle={{ top: 20, left: -20 }}
              />
              :

              <BadgeRibbon
                text="Expire"
                color="red"
                position="voucherRight"
                textStyle={{ top: 20, left: -20 }}
              />
            )}
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
                    {item.details}
                  </Text>
                  <Text style={{ marginBottom: 20 }}>
                    {"Value => "}
                    {item.amount}
                  </Text>
                  <Text>
                    {"Red. End Date => "}
                    {item.end_date}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export { Profile, ProfileList, CustomerVoucherList };
