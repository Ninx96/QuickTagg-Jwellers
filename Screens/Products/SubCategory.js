import moment from "moment";
import React, { useState, useEffect } from "react";
import { ImageBackground, ScrollView, View, Alert, FlatList, Image } from "react-native";
import {
  Button,
  Text,
  List,
  FAB,
  TextInput,
  TouchableRipple,
  Checkbox,
  Card,
  IconButton,
} from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import CustomHeader from "../../Components/CustomHeader";
import ImageUpload from "../../Components/ImageUpload";
import DropDown from "../../Components/DropDown";
import { postRequest } from "../../Services/RequestServices";

const SubCategoryList = (props) => {
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, []);
  const Browse = () => {
    postRequest("masters/product/subcategory/browse", { category_id: 4 }, userToken).then(
      (resp) => {
        if (resp.status == 200) {
          setgriddata(resp.data);
        } else {
          Alert.alert("Error !", "Oops! \nSeems like we run into some Server Error");
        }
      }
    );
    setLoading(false);
  };
  const Delete = (id) => {
    setLoading(true);
    postRequest("masters/product/subcategory/delete", { subcategory_id: id }, userToken).then(
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
        data={griddata}
        renderItem={({ item, index }) => (
          <List.Item
            key={index}
            style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
            title={item.subcategory_name}
            titleStyle={{ fontWeight: "bold" }}
            description={item.subcategory_name}
            right={() => {
              return (
                <>
                  <TouchableRipple
                    style={{ zIndex: 0 }}
                    onPress={() => {
                      props.navigation.navigate("SubCategoryForm", {
                        subcategory_id: item.subcategory_id,
                      });
                    }}
                  >
                    <List.Icon {...props} icon="pencil" />
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
                            Delete(item.subcategory_id);
                          },
                        },
                      ]);
                    }}
                  >
                    <List.Icon {...props} icon="delete" />
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
          bottom: 20,
          right: 20,
        }}
        icon="plus"
        onPress={() => props.navigation.navigate("SubCategoryForm", { subcategory_id: 0 })}
      />
    </View>
  );
};

const SubCategoryForm = (props) => {
  const { subcategory_id } = props.route.params;
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [categorylist, setcategorylist] = useState([]);
  const [param, setparam] = useState({
    category_id: "",
    subcategory_id: "0",
    subcategory_name: "",
  });

  React.useEffect(() => {
    postRequest("masters/product/subcategory/getCategory", {}, userToken).then((resp) => {
      if (resp.status == 200) {
        setcategorylist(resp.data);
      } else {
        Alert.alert("Error !", "Oops! \nSeems like we run into some Server Error");
      }
    });

    if (subcategory_id != 0) {
      postRequest(
        "masters/product/subcategory/preview",
        { subcategory_id: subcategory_id },
        userToken
      ).then((resp) => {
        console.log(resp);
        if (resp.status == 200) {
          param.category_id = resp.data[0].category_id;
          param.subcategory_id = resp.data[0].subcategory_id;
          param.subcategory_name = resp.data[0].subcategory_name;
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
      <View style={MyStyles.cover}>
        <DropDown
          data={categorylist}
          ext_val="category_id"
          ext_lbl="category_name"
          value={param.category_id}
          onChange={(val) => {
            setparam({ ...param, category_id: val });
          }}
          placeholder="Category"
        />
        <TextInput
          mode="outlined"
          label="SubCategory Name"
          placeholder="SubCategory Name"
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
          value={param.subcategory_name}
          onChangeText={(text) => {
            setparam({ ...param, subcategory_name: text });
          }}
        />
        <View style={[MyStyles.row, { justifyContent: "center", marginVertical: 40 }]}>
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => {
              setLoading(true);
              postRequest("masters/product/category/insert", param, userToken).then((resp) => {
                if (resp.status == 200) {
                  if (resp.data[0].valid) {
                    props.navigation.navigate("ProductTabs");
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

export { SubCategoryForm, SubCategoryList };
