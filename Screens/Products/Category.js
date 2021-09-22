import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Button,
  Text,
  List,
  FAB,
  TextInput,
  Card,
  IconButton,
  TouchableRipple,
} from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import CustomHeader from "../../Components/CustomHeader";
import ImageUpload from "../../Components/ImageUpload";
import { postRequest } from "../../Services/RequestServices";
import { serviceUrl } from "../../Services/Constants";
import moment from "moment";
import Autocomplete from "react-native-autocomplete-input";

const CategoryList = (props) => {
  const { userToken, search } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, [search]);
  const Browse = () => {
    postRequest(
      "masters/product/category/browse_app",
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
    postRequest(
      "masters/product/category/delete",
      { category_id: id },
      userToken
    ).then((resp) => {
      console.log(resp);
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
          <Card
            style={{
              marginHorizontal: 20,
              padding: 0,
              borderRadius: 10,
              marginVertical: 10,
            }}
          >
            <Card.Cover
              source={
                item.image_path != ""
                  ? { uri: item.url_banner + "" + item.banner_path }
                  : require("../../assets/upload.png")
              }
              style={{ height: 140 }}
            />

            <View
              style={[
                MyStyles.row,
                { marginVertical: 0, paddingHorizontal: 10 },
              ]}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.category_name}
              </Text>

              <Image
                source={{ uri: item.url_image + "" + item.image_path }}
                //source={require("../../assets/upload.png")}
                style={{
                  height: 70,
                  width: 130,
                  marginLeft: "auto",
                  alignSelf: "flex-end",
                  marginBottom: 20,
                }}
              />
              <View>
                <TouchableRipple
                  style={{ zIndex: 0 }}
                  onPress={() => {
                    props.navigation.navigate("CategoryForm", {
                      category_id: item.category_id,
                    });
                  }}
                >
                  <List.Icon {...props} icon="pencil" color="#aaa" />
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
                  <List.Icon {...props} icon="delete" color="#aaa" />
                </TouchableRipple>
              </View>
            </View>
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
        onPress={() => {
          props.navigation.navigate("CategoryForm", {
            category_id: 0,
          });
        }}
      />
    </View>
  );
};

const CategoryForm = (props) => {
  const { userToken, category_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [param, setparam] = useState({
    category_name: "",
    image_path: "",
    banner_path: "",
  });
  const [Banner, setBanner] = React.useState(
    require("../../assets/upload.png")
  );
  const [Image, setImage] = React.useState(require("../../assets/upload.png"));

  // For Filtered Data
  const [filteredFilms, setFilteredFilms] = useState([]);

  const [films, setFilms] = useState([
    { userId: 1, id: 1, title: "Rings", completed: false },
    {
      userId: 1,
      id: 2,
      title: "Round",
      completed: false,
    },
    { userId: 1, id: 3, title: "Red", completed: false },
    { userId: 1, id: 3, title: "Rat", completed: false },
  ]);

  React.useEffect(() => {
    if (category_id != 0) {
      postRequest(
        "masters/product/category/preview",
        { category_id: category_id },
        userToken
      ).then((resp) => {
        if (resp.status == 200) {
          param.category_id = resp.data.category_id;
          param.image_path = resp.data.image_path;
          param.banner_path = resp.data.banner_path;
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

  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
      <View style={[MyStyles.cover, { backgroundColor: "" }]}>
        <Autocomplete
          {...props}
          autoCapitalize="none"
          autoCorrect={false}
          //Styles
          inputContainerStyle={{ borderWidth: 0 }}
          containerStyle={{ flex: 0, marginBottom: 20 }}
          //Default Value
          defaultValue={param.category_name}
          //data to show in suggestion
          data={filteredFilms}
          // onchange of the text changing the state of the query
          // which will trigger the findFilm method
          // to show the suggestions
          onChangeText={(query) => {
            // Method called every time when we change the value of the input
            if (query) {
              // Making a case insensitive regular expression
              const regex = new RegExp(`${query.trim()}`, "i");
              // Setting the filtered film array according the query
              setFilteredFilms(
                films.filter((film) => film.title.search(regex) >= 0)
              );
            } else {
              // If the query is null then return blank
              setFilteredFilms([]);
            }
            setparam({ ...param, category_name: query });
          }}
          flatListProps={{
            keyExtractor: (_, idx) => idx.toString(),
            renderItem: ({ item, index }) => (
              <Text key={index} style={styles.itemText}>
                {item.title}
              </Text>
            ),
          }}
          renderTextInput={(props) => (
            <TextInput
              {...props}
              mode="outlined"
              placeholder="Category Name"
              style={{
                backgroundColor: "rgba(0,0,0,0)",
              }}
            />
          )}
        />

        <View style={[MyStyles.row, { justifyContent: "space-evenly" }]}>
          <ImageUpload
            label="Choose Image :"
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
              param.image_path =
                "image-" + moment().format("YYYYMMDD-hhmmss") + ".jpg";
              setparam({ ...param });
              console.log(param.image_path);
            }}
          />
          <ImageUpload
            label="Choose Banner :"
            source={Banner}
            onClearImage={() => {
              setBanner({ uri: "" });
              setparam({
                ...param,
                banner_path: "",
              });
            }}
            onUploadImage={(result) => {
              setBanner({ uri: result.uri });
              param.banner_path =
                "banner-" + moment().format("YYYYMMDD-hhmmss") + ".jpg";
              setparam({ ...param });
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
              console.log(param);
              postRequest(
                "masters/product/category/insert",
                param,
                userToken
              ).then((resp) => {
                if (resp.status == 200) {
                  if (resp.data[0].valid) {
                    if (Banner.uri) {
                      console.log(param.banner_path);
                      console.log(Banner.uri);
                      const form_data = new FormData();
                      form_data.append("files", {
                        uri: Banner.uri,
                        type: "image/jpeg",
                        name: param.banner_path,
                      });

                      var xhr = new XMLHttpRequest();
                      xhr.open(
                        "POST",
                        serviceUrl +
                          "masters/branch/UploadProductCategoryBannerMob",
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
                      console.log(param.image_path);
                      console.log(Image.uri);
                      const form_data = new FormData();
                      form_data.append("files", {
                        uri: Image.uri,
                        type: "image/jpeg",
                        name: param.image_path,
                      });

                      var xhr = new XMLHttpRequest();
                      xhr.open(
                        "POST",
                        serviceUrl + "masters/branch/UploadProductCategoryMob",
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

export { CategoryForm, CategoryList };

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
