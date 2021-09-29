import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Alert,
  FlatList,
  Image,
  StyleSheet
} from "react-native";
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
import Autocomplete from "react-native-autocomplete-input";

const SubCategoryList = (props) => {
  const { userToken, search } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, [search]);
  const Browse = () => {
    postRequest(
      "masters/product/subcategory/browse_app",
      { category_id: 4, search: search == undefined ? "" : search },
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
    postRequest(
      "masters/product/subcategory/delete",
      { subcategory_id: id },
      userToken
    ).then((resp) => {
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
            style={{ borderBottomWidth: 0.5, borderBottomColor: "#AAA" }}
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
                    <List.Icon {...props} icon="pencil" color="#AAA" />
                  </TouchableRipple>
                  <TouchableRipple
                    style={{ zIndex: 0 }}
                    onPress={() => {
                      Alert.alert("Alert", "You want to delete?", [
                        {
                          text: "No",
                          onPress: () => { },
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
          bottom: 20,
          right: 20,
        }}
        icon="plus"
        color="#000"
        onPress={() =>
          props.navigation.navigate("SubCategoryForm", { subcategory_id: 0 })
        }
      />
    </View>
  );
};

const SubCategoryForm = (props) => {
  const { userToken, subcategory_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [categorylist, setcategorylist] = useState([]);
  const [param, setparam] = useState({
    category_id: "",
    subcategory_id: "0",
    subcategory_name: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [suggestiondata, setSuggestionData] = useState([]);

  React.useEffect(() => {
    postRequest("masters/product/subcategory/getCategory", {}, userToken).then(
      (resp) => {
        if (resp.status == 200) {
          setcategorylist(resp.data);
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      }
    );

    if (subcategory_id != 0) {
      postRequest(
        "masters/product/subcategory/preview",
        { subcategory_id: subcategory_id },
        userToken
      ).then((resp) => {
        if (resp.status == 200) {
          param.category_id = resp.data.category_id;
          param.subcategory_id = resp.data.subcategory_id;
          param.subcategory_name = resp.data.subcategory_name;
          setparam({ ...param });
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      });
    }
    setLoading(false);
  }, []);

  const AutoSuggestion = () => {
    postRequest("masters/product/subcategory/getSubcategory", { category_id: param.category_id, search: "" }, userToken).then((resp) => {
      if (resp.status == 200) {
        setSuggestionData(resp.data);
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
      <View style={[MyStyles.cover, { backgroundColor: "" }]}>
        <DropDown
          data={categorylist}
          ext_val="category_id"
          ext_lbl="category_name"
          value={param.category_id}
          onChange={(val) => {
            param.category_id = val;
            setparam({ ...param });
            AutoSuggestion();
          }}
          placeholder="Category"
        />
        <Autocomplete
          {...props}
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={{ borderWidth: 0 }}
          containerStyle={{ flex: 0, marginBottom: 20 }}
          value={param.subcategory_name}
          data={filteredData}
          onChangeText={(query) => {
            if (query) {
              const regex = new RegExp(`${query.trim()}`, "i");
              setFilteredData(
                suggestiondata.filter((data) => data.subcategory_name.search(regex) >= 0)
              );
            } else {
              setFilteredData([]);
            }
            setparam({ ...param, subcategory_name: query });
          }}
          flatListProps={{
            keyExtractor: (_, idx) => idx.toString(),
            renderItem: ({ item, index }) => (
              <Text key={index} style={styles.itemText}>
                {item.subcategory_name}
              </Text>
            ),
          }}
          renderTextInput={(props) => (
            <TextInput
              {...props}
              mode="outlined"
              placeholder="SubCategory Name"
              style={{
                backgroundColor: "rgba(0,0,0,0)",
              }}
            />
          )}
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
              postRequest(
                "masters/product/subcategory/insert",
                param,
                userToken
              ).then((resp) => {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
  },
});
