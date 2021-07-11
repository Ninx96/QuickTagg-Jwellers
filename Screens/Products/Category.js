import React, { useState } from "react";
import { ImageBackground, ScrollView, View, FlatList, Image, Alert} from "react-native";
import { Button, Text,List, FAB, TextInput, Card, IconButton, TouchableRipple } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import CustomHeader from "../../Components/CustomHeader";
import ImageUpload from "../../Components/ImageUpload";
import { postRequest } from "../../Services/RequestServices";
const CategoryList = (props) => {
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, []);
  const Browse = () => {
  let param = {}
    postRequest("masters/product/subcategory/getCategory", param, userToken).then((resp) => {
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
  }
  const Delete = (id) => {
    setLoading(true);    
    postRequest("masters/product/category/delete", { category_id: id }, userToken).then((resp) => {
      console.log(resp);
      if (resp.status == 200) {
        if (resp.data[0].valid) {
          Browse();
        }
        setLoading(false);
      }
    });
  }
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
              marginVertical: 5,
            }}
          >
            <Card.Cover
              source={require("../../assets/upload.png")}
              style={{ height: 150 }}
            />
            <Card.Content>
              <View style={MyStyles.row}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.category_name}</Text>
                <Image
                  source={require("../../assets/upload.png")}
                  style={{ height: 80, width: 150 }}
                />
                <View>
                  {/* <IconButton icon="pencil" /> */}
                  <TouchableRipple
                    style={{ zIndex: 0 }}
                    onPress={() => {
                      Alert.alert(
                        "Alert",
                        "You want to delete?",
                        [
                          {
                            text: "No",
                            onPress: () => {

                            },
                            style: "cancel"
                          },
                          { text: "Yes", onPress: () => { Delete(item.category_id); } }
                        ]
                      );
                    }}
                  >
                    <List.Icon {...props} icon="close" />
                  </TouchableRipple>
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
  const { staff_id } = props.route.params;
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [param, setparam] = useState({
    category_name: "",
    image_path: "",
    banner_path: ""
  });
  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
      <ScrollView>
        <View style={MyStyles.cover}>
          <TextInput
            mode="flat"
            label="Category Name"
            placeholder="Category Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.category_name}
            onChangeText={(text) => {
              setparam({ ...param, category_name: text });
            }}
          />
          <View style={MyStyles.row}>
            <ImageUpload
              label="Choose Image :"
              source={require("../../assets/upload.png")}
              onClearImage={() => { }}
              onUploadImage={() => { }}
            />
            <ImageUpload
              label="Choose Banner :"
              source={require("../../assets/upload.png")}
              onClearImage={() => { }}
              onUploadImage={() => { }}
            />
          </View>
          <View
            style={[
              MyStyles.row,
              { justifyContent: "center", marginVertical: 40 },
            ]}
          >
            <Button mode="contained" uppercase={false}
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
              }}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { CategoryForm, CategoryList };
