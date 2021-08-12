import React, { useState, useEffect } from "react";
import { View, ImageBackground, ScrollView, FlatList, Alert } from "react-native";
import { Button, FAB, List, TextInput, TouchableRipple } from "react-native-paper";
import CustomHeader from "../../Components/CustomHeader";
import MyStyles from "../../Styles/MyStyles";
import { postRequest } from "../../Services/RequestServices";
const CustomerCategoryList = (props) => {
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, []);

  const Browse = (id) => {
    let param = {};
    postRequest("masters/customer/category/browse", param, userToken).then((resp) => {
      if (resp.status == 200) {
        setgriddata(resp.data);
      } else {
        Alert.alert("Error !", "Oops! \nSeems like we run into some Server Error");
      }
    });
    setLoading(false);
  };

  const Delete = (id) => {
    setLoading(true);
    let data = { category_id: id };
    postRequest("masters/customer/category/delete", data, userToken).then((resp) => {
      if (resp.status == 200) {
        if (resp.data[0].valid) {
          Browse();
        }
        setLoading(false);
      }
    });
  };
  return (
    <View style={MyStyles.container}>
      <FlatList
        data={griddata}
        renderItem={({ item, index }) => (
          <List.Item
            key={index}
            style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
            title={item.category_name}
            titleStyle={{ fontWeight: "bold" }}
            right={() => {
              return (
                <>
                  <TouchableRipple
                    style={{ zIndex: 0 }}
                    onPress={() => {
                      props.navigation.navigate("CustomerCategory", {
                        category_id: item.category_id,
                      });
                    }}
                  >
                    <List.Icon {...props} icon="pencil" color="#AAA" />
                  </TouchableRipple>
                  <TouchableRipple
                    style={{ zIndex: 0 }}
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
                            Delete(item.category_id);
                          },
                        },
                      ]);
                    }}
                  >
                    <List.Icon {...props} icon="delete" color="#AAA" />
                  </TouchableRipple>
                </>
              );
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FAB
        style={{
          position: "absolute",
          bottom: 15,
          right: 15,
          zIndex: 100,
        }}
        icon="plus"
        onPress={() => props.navigation.navigate("CustomerCategory", { category_id: 0 })}
      />
    </View>
  );
};

const CustomerCategory = (props) => {
  const { category_id } = props.route.params;
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);

  const [param, setparam] = useState({
    category_id: "0",
    category_name: "",
  });

  React.useEffect(() => {
    if (category_id != 0) {
      let param = {
        category_id: category_id,
      };
      postRequest("masters/customer/category/preview", param, userToken).then((resp) => {
        if (resp.status == 200) {
          param.category_id = resp.data[0].category_id;
          param.category_name = resp.data[0].category_name;
          setparam({ ...param });
        } else {
          Alert.alert("Error !", "Oops! \nSeems like we run into some Server Error");
        }
      });
    }
    setLoading(false);
  }, []);

  return (
    <ImageBackground style={MyStyles.container} source={require("../../assets/login-bg.jpg")}>
      <View style={[MyStyles.cover, { backgroundColor: "" }]}>
        <TextInput
          mode="outlined"
          placeholder="Customer Category"
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
          value={param.category_name}
          onChangeText={(text) => {
            setparam({ ...param, category_name: text });
          }}
        />
        <View style={[MyStyles.row, { justifyContent: "center", marginVertical: 40 }]}>
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => {
              setLoading(true);

              postRequest("masters/customer/category/insert", param, userToken).then((resp) => {
                if (resp.status == 200) {
                  if (resp.data[0].valid) {
                    props.navigation.navigate("CustomerCategoryList");
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
    </ImageBackground>
  );
};

export { CustomerCategory, CustomerCategoryList };
