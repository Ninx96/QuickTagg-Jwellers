import moment from "moment";
import React, { useState, useEffect } from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { Button, Text, List, FAB, TextInput } from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import DatePicker from "../Components/DatePicker";
import DropDown from "../Components/DropDown";
import MyStyles from "../Styles/MyStyles";
import { AuthContext } from "../Components/Context";
import { postRequest } from "../Services/RequestServices";

const CustomerList = (props) => {
  const [state, setstate] = useState(null);

  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <ScrollView>
        <List.Item
          style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
          title="Rahul"
          titleStyle={{ fontWeight: "bold" }}
          description="9716612244"
          left={(props) => <List.Icon {...props} icon="account" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </ScrollView>
      <FAB
        style={{
          position: "absolute",
          bottom: 5,
          right: 5,
        }}
        icon="plus"
        onPress={() => props.navigation.navigate("CustomerForm")}
      />
    </View>
  );
};

const CustomerForm = (props) => {
  const { userToken } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [categorylist, setcategorylist] = useState([]);
  const [stafflist, setstafflist] = useState([]);
  const [arealist, setarealist] = useState([]);
  const [param, setparam] = useState({
    customer_id: '0',
    address: '',
    email: '',
    full_name: '',
    gender: '',
    mobile: '',
    area_id: '',
    category_id: '',
    date: '',
    doa: moment(),
    dob: moment(),
    profession: '',
    ref_id: '',
    staff_id: ''
  });

  React.useEffect(() => {


    userToken().then((item) => {

      postRequest("masters/customer/category/browse", param, item).then((resp) => {
        if (resp.status == 200) {

          setcategorylist(resp.data);
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      });
      postRequest("masters/staff/browse", param, item).then((resp) => {
        if (resp.status == 200) {
          setstafflist(resp.data);
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      });

      postRequest("masters/area/browse", param, item).then((resp) => {
        if (resp.status == 200) {
          setarealist(resp.data);
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      });
      setLoading(false);
    });

  }, []);


  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../assets/login-bg.jpg")}
    >
      <CustomHeader {...props} />
      <ScrollView>
        <View style={MyStyles.cover}>
          <TextInput
            mode="flat"
            label="Full Name"
            placeholder="Full Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.full_name}
            onChangeText={(text) => { setparam({ ...param, full_name: text }); }}
          />
          <TextInput
            mode="flat"
            label="Mobile No."
            placeholder="Mobile No."
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            keyboardType={'number-pad'}
            value={param.mobile}
            onChangeText={(text) => { setparam({ ...param, mobile: text }); }}
          />
          <TextInput
            mode="flat"
            label="Email"
            placeholder="Email"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.email}
            onChangeText={(text) => { setparam({ ...param, email: text }); }}
          />
          <View style={MyStyles.row}>
            <DatePicker
              label="DOB"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={param.dob}
              onValueChange={(date) => { setparam({ ...param, dob: date }); }}
            />
            <DatePicker
              label="DOA"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={param.doa}
              onValueChange={(date) => { setparam({ ...param, doa: date }); }}
            />
          </View>
          <DropDown data={categorylist} ext_val="category_id" ext_lbl="category_name" value={param.category_id} onChange={(val) => { setparam({ ...param, category_id: val }); }} placeholder="Customer Category" />
          <View style={MyStyles.row}>
            <DropDown data={stafflist} ext_val="staff_id" ext_lbl="name" value={param.staff_id} onChange={(val) => { setparam({ ...param, staff_id: val }); }} placeholder="Staff" style={{ width: "45%" }} />
            <DropDown data={arealist} ext_val="area_id" ext_lbl="area_name" value={param.area_id} onChange={(val) => { setparam({ ...param, area_id: val }); }} placeholder="Area" style={{ width: "45%" }} />
          </View>
          <TextInput
            mode="flat"
            label="Profession"
            placeholder="Profession"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.profession}
            onChangeText={(text) => { setparam({ ...param, profession: text }); }}
          />
          <TextInput
            mode="flat"
            label="Address"
            placeholder="Address"
            multiline
            numberOfLines={3}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.address}
            onChangeText={(text) => { setparam({ ...param, address: text }); }}
          />
          <View
            style={[
              MyStyles.row,
              { justifyContent: "center", marginVertical: 40 },
            ]}
          >
            <Button mode="contained" la uppercase={false}
              onPress={() => {
                setLoading(true);
                authRequest("masters/customer/insert", param).then((resp) => {
                  if (resp.status == 200) {
                    if (resp.data[0].valid) {
                      props.navigation.navigate("CustomerList")
                    } else {
                      Alert.alert("Error !", resp.error);
                    }
                  } else {
                    Alert.alert(
                      "Error !",
                      "Oops! \nSeems like we run into some Server Error"
                    );
                  }
                  setLoading(false);
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

export { CustomerList, CustomerForm };
