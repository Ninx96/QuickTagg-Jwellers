import React, { useState, useEffect } from "react";
import moment from "moment";
import { Image, ImageBackground, ScrollView, View } from "react-native";
import { Button, Text, List, FAB, TextInput, Avatar, Card, } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Feather";
import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";
import { FlatList } from "react-native-gesture-handler";
import { postRequest } from "../Services/RequestServices";
import LottieView from 'lottie-react-native';
import MaleAvatar from "../assets/Animations/42842-male-avatar.json";
import FemaleAvatar from "../assets/Animations/50019-female-avatar.json";
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
  const { userToken, customer_id } = props.route.params;
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
    });
    setLoading(false);
  }, []);

  return (
    <View style={MyStyles.container}>
      <View
        style={[
          MyStyles.row,
          { justifyContent: "space-evenly", marginTop: 10 },
        ]}
      >
        {param.gender === 'male' ? <LottieView source={MaleAvatar} autoPlay loop height={90} width={90} /> : <LottieView source={FemaleAvatar} autoPlay loop height={90} width={90} />}

        <View style={MyStyles.profile_row}>
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
            <Text>V Calls</Text>
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
          {param.full_name} {(true ? "♂️" : "♀️") + "      "}
          <Text style={{ color: "green" }}>{param.category_name}</Text>
        </Text>
        <Text>{param.mobile}</Text>
        <Text>DOB:{param.dob} </Text>
        <Text>DOA:{param.doa}</Text>
        <Text>{param.area_name}</Text>
        <Text>{param.profession}</Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ color: "pink" }}>Staff: {param.staff_id}</Text>
        <Text style={{ color: "pink" }}>
          REF. BY: {param.ref_full_name} - {param.ref_mobile}
        </Text>
      </View>
      <View style={[MyStyles.row, { justifyContent: "space-evenly" }]}>
        <Button mode="outlined" compact uppercase={false} color="black">
          Edit Profile
        </Button>
        <Button mode="outlined" compact uppercase={false} color="black">
          Create Catalog
        </Button>
        <Button mode="outlined" compact uppercase={false} color="black">
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
          name="CallRequest"
          component={CallRequest}
          options={{
            tabBarIcon: () => <Icon name="video" size={20} />,
          }}
          initialParams={{ userToken: userToken, customer_id: customer_id }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarIcon: () => <Icon name="bell" size={20} />,
          }}
          initialParams={{ userToken: userToken, customer_id: customer_id }}
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
            <>
              <Text>{resp.date}</Text>
              <FlatList
                key={index}
                data={resp.products}
                renderItem={({ item }) => (
                  <Image
                    key={item.product_id}
                    source={{ uri: item.urlImage + "" + item.image_path }}
                    style={{ width: 120, height: 120, margin: 2 }}
                  />
                )}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
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
            <>
              <Text>{resp.date}</Text>
              <FlatList
                key={index}
                data={resp.products}
                renderItem={({ item }) => (
                  <Image
                    key={item.product_id}
                    source={{ uri: item.urlImage + "" + item.image_path }}
                    style={{ width: 120, height: 120, margin: 2 }}
                  />
                )}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
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
            <>
              <Text>{resp.date}</Text>
              <FlatList
                key={index}
                data={resp.products}
                renderItem={({ item }) => (
                  <Image
                    key={item.product_id}
                    source={{ uri: item.urlImage + "" + item.image_path }}
                    style={{ width: 120, height: 120, margin: 2 }}
                  />
                )}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          );
        })
        : null}
    </View>
  );
};

const CallRequest = (props) => {
  const { userToken, customer_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [vcallslist, setvcallslist] = useState([]);

  React.useEffect(() => {
    let data = { customer_id: customer_id };
    postRequest("customers/customer/profile", data, userToken).then((resp) => {
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
    setLoading(false);
  }, []);

  return (
    <View style={MyStyles.container}>
      <ScrollView>
        {vcallslist.length > 0
          ? vcallslist.map((resp, index) => {
            return (
              <Card
                style={{ borderBottomColor: "black", borderBottomWidth: 1 }}
                key={index}
              >
                <Card.Title
                  title={resp.status}
                  right={() => (
                    <View>
                      <Text style={{ color: "green" }}>{resp.date}</Text>
                      <Button mode="contained" compact uppercase={false}>
                        Accept
                      </Button>
                    </View>
                  )}
                />
                <View>
                  <View
                    style={[MyStyles.row, { justifyContent: "flex-start" }]}
                  >
                    <Button
                      mode="outlined"
                      color="black"
                      compact
                      uppercase={false}
                      style={{ marginHorizontal: 5 }}
                    >
                      {resp.accept_date}
                    </Button>
                    <Button
                      mode="outlined"
                      color="black"
                      compact
                      uppercase={false}
                      style={{ marginHorizontal: 5 }}
                    >
                      {resp.accept_time}
                    </Button>
                  </View>
                  <View>
                    <Text style={{ color: "#888" }}>View All Remarks</Text>
                    {resp.remarks.length > 0
                      ? resp.remarks.map((item) => {
                        <Text style={{ color: "#888" }}>
                          {item.remarks}
                        </Text>;
                      })
                      : null}
                  </View>
                </View>
              </Card>
            );
          })
          : null}
      </ScrollView>
    </View>
  );
};

const Notification = () => {
  return (
    <View style={MyStyles.container}>
      <Text>Notification</Text>
    </View>
  );
};

export { Profile, ProfileList };
