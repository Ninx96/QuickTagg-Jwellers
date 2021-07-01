import React, { useState } from "react";
import { ImageBackground, ScrollView, View, FlatList, Image, } from "react-native";
import { Button, Text, FAB, TextInput, Card, IconButton, } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import CustomHeader from "../../Components/CustomHeader";
import ImageUpload from "../../Components/ImageUpload";
import { postRequest } from "../../Services/RequestServices";
const CategoryList = (props) => {
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
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
  }, []);
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
                  <IconButton icon="pencil" />
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
          props.navigation.navigate("SubCategory", {
            category_id: 0,
          });
        }}
      />
    </View>
  );
};

const Category = (props) => {
  const [param, setParam] = useState({});
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
            value={param.full_name}
            onChangeText={(text) => {
              setparam({ ...param, full_name: text });
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
            <Button mode="contained" uppercase={false}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { Category, CategoryList };
