import moment from "moment";
import React, { useState, useEffect } from "react";
import { ImageBackground, ScrollView, View, Alert } from "react-native";
import {
  Button,
  Text,
  List,
  FAB,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import DatePicker from "../Components/DatePicker";
import DropDown from "../Components/DropDown";
import MyStyles from "../Styles/MyStyles";
import { postRequest } from "../Services/RequestServices";
import { FlatList } from "react-native-gesture-handler";
import Loading from "../Components/Loading";

const CustomerList = (props) => {
  const { userToken, search } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    postRequest(
      "masters/customer/browse_app",
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
      setLoading(false);
    });
  
  }, [search]);

  return (
    <View style={MyStyles.container}>
      <Loading isloading={loading} />
      <FlatList
        data={griddata}
        initialNumToRender={10}
        renderItem={({ item, index }) => (
          <List.Item
            key={item.customer_id}
            style={{ borderBottomWidth: 0.5, borderBottomColor: "#CCC" }}
            title={
              <Text
                onPress={() => {
                  props.navigation.navigate("Profile", {
                    customer_id: item.customer_id,
                    customer_mobile: item.mobile,
                  });
                }}
              >
                {item.full_name}
              </Text>
            }
            titleStyle={{ fontWeight: "bold" }}
            description={item.mobile + "          " + item.category_name}
            left={() => {
              return (
                <TouchableRipple
                  style={MyStyles.squarefixedRatio}
                  onPress={() => {
                    props.navigation.navigate("Profile", {
                      customer_id: item.customer_id,
                      customer_mobile: item.mobile,
                    });
                  }}
                >
                  <Text style={{ color: "red", textTransform: "uppercase" }}>
                    {item.type == null ? "" : item.type.charAt(0)}
                  </Text>
                </TouchableRipple>
              );
            }}
            right={() => {
              return (
                <TouchableRipple
                  style={{ zIndex: 0 }}
                  onPress={() => {
                    props.navigation.navigate("CustomerForm", {
                      customer_id: item.customer_id,
                    });
                  }}
                >
                  <List.Icon {...props} icon="pencil" color="#aaa" />
                </TouchableRipple>
              );
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FAB
        style={{
          position: "absolute",
          bottom: 5,
          right: 50,
          zIndex: 100,
        }}
        color="#000"
        icon="plus"
        onPress={() =>
          props.navigation.navigate("CustomerForm", { customer_id: 0 })
        }
      />
    </View>
  );
};

const CustomerForm = (props) => {
  const { customer_id } = props.route.params;
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [categorylist, setcategorylist] = useState([]);
  const [stafflist, setstafflist] = useState([]);
  const [arealist, setarealist] = useState([]);
  const [genderlist, setgenderlist] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);

  const [param, setparam] = useState({
    customer_id: "0",
    address: "",
    email: "",
    full_name: "",
    gender: "",
    mobile: "",
    area_id: "",
    category_id: "",
    doa: "",
    dob: "",
    profession: "",
    ref_id: "",
    staff_id: "",
  });

  React.useEffect(() => {
    postRequest("masters/customer/category/browse", param, userToken).then(
      (resp) => {
        if (resp.status == 200) {
          setcategorylist(resp.data);
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
        setLoading(false);
      }
    );
    postRequest("masters/staff/browse", param, userToken).then((resp) => {
      if (resp.status == 200) {
        setstafflist(resp.data);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });

    postRequest("masters/area/browse", param, userToken).then((resp) => {
      if (resp.status == 200) {
        setarealist(resp.data);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });

    if (customer_id != 0) {
      postRequest(
        "masters/customer/preview",
        { customer_id: customer_id },
        userToken
      ).then((resp) => {
        if (resp.status == 200) {
          param.customer_id = resp.data.customer_id;
          param.address = resp.data.address;
          param.email = resp.data.email;
          param.full_name = resp.data.full_name;
          param.gender = resp.data.gender;
          param.mobile = resp.data.mobile;
          param.area_id = resp.data.area_id;
          param.category_id = resp.data.category_id;
          param.doa = resp.data.doa;
          param.dob = resp.data.dob;
          param.profession = resp.data.profession;
          param.ref_id = resp.data.ref_id;
          param.staff_id = resp.data.staff_id;
          setparam({ ...param });
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      });
    }
  
  }, []);

  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../assets/login-bg.jpg")}
    >
      <Loading isloading={loading} />
      <ScrollView>
        <View style={MyStyles.cover}>
          <TextInput
            mode="outlined"
            placeholder="Full Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Mobile No."
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            keyboardType={"number-pad"}
            maxLength={10}
            value={param.mobile}
            onChangeText={(text) => {
              setparam({ ...param, mobile: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Email"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.email}
            onChangeText={(text) => {
              setparam({ ...param, email: text });
            }}
          />
          <View style={MyStyles.row}>
            <DatePicker
              label="DOB"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "48%" }}
              value={param.dob}
              onValueChange={(date) => {
                setparam({ ...param, dob: date });
              }}
            />
            <DatePicker
              label="DOA"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)", width: "48%" }}
              value={param.doa}
              onValueChange={(date) => {
                setparam({ ...param, doa: date });
              }}
            />
          </View>

          <View style={MyStyles.row}>
            <DropDown
              data={genderlist}
              ext_val="value"
              ext_lbl="label"
              value={param.gender}
              onChange={(val) => {
                setparam({ ...param, gender: val });
              }}
              placeholder="Gender"
              style={{ width: "36%" }}
            />
            <DropDown
              data={categorylist}
              ext_val="category_id"
              ext_lbl="category_name"
              value={param.category_id}
              onChange={(val) => {
                setparam({ ...param, category_id: val });
              }}
              placeholder="Customer Category"
              style={{ width: "60%" }}
            />
          </View>
          <View style={MyStyles.row}>
            <DropDown
              data={stafflist}
              ext_val="staff_id"
              ext_lbl="name"
              value={param.staff_id}
              onChange={(val) => {
                setparam({ ...param, staff_id: val });
              }}
              placeholder="Staff"
              style={{ width: "48%" }}
            />
            <DropDown
              data={arealist}
              ext_val="area_id"
              ext_lbl="area_name"
              value={param.area_id}
              onChange={(val) => {
                setparam({ ...param, area_id: val });
              }}
              placeholder="Area"
              style={{ width: "48%" }}
            />
          </View>
          <TextInput
            mode="outlined"
            placeholder="Profession"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.profession}
            onChangeText={(text) => {
              setparam({ ...param, profession: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Address"
            multiline
            numberOfLines={3}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.address}
            onChangeText={(text) => {
              setparam({ ...param, address: text });
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
                setLoading(true);

                postRequest("masters/customer/insert", param, userToken).then(
                  (resp) => {
                    if (resp.status == 200) {
                      if (resp.data[0].valid) {
                        props.navigation.navigate("CustomerList");
                      }
                      setLoading(false);
                    }
                  }
                );
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

export { CustomerList, CustomerForm };
