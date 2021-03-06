import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  FlatList,
  Alert,
} from "react-native";
import {
  Button,
  FAB,
  Text,
  TextInput,
  Card,
  IconButton,
  Avatar,
} from "react-native-paper";
import CustomHeader from "../../Components/CustomHeader";
import ImageUpload from "../../Components/ImageUpload";
import MyStyles from "../../Styles/MyStyles";
import { postRequest } from "../../Services/RequestServices";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../../Components/Loading";
import { serviceUrl } from "../../Services/Constants";
const CustomerReviewList = (props) => {
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);
  React.useEffect(() => {
    Browse();
  }, []);

  const Browse = (id) => {
    postRequest("masters/customer/customerreview/browse", {}, userToken).then(
      (resp) => {
        if (resp.status == 200) {         
          setgriddata(resp.data);
        } else {
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
        setLoading(false);
      }
    );

  };
  const Delete = (id) => {
    setLoading(true);
    postRequest(
      "masters/customer/customerreview/delete",
      { tran_id: id },
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
      <Loading isloading={loading} />
      <FlatList
        data={griddata}
        renderItem={({ item, index }) => (
          <LinearGradient
            colors={["#F6356F", "#FF5F50"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              borderRadius: 10,
              //backgroundColor: "#FF3647",
            }}
          >
            <Card.Title
              style={{ marginTop: 0 }}
              title={item.customer_name}
              titleStyle={{ textAlign: "center", color: "#FFF" }}
              left={() => (
                <Avatar.Image
                  //source={require("../../assets/upload.png")}
                  source={{ uri: item.url + "" + item.image_path }}
                  size={85}
                />
              )}
              right={() => (
                <>
                  <IconButton
                    icon="pencil"
                    color="#FFF"
                    onPress={() => {
                      props.navigation.navigate("CustomerReview", {
                        tran_id: item.tran_id,
                      });
                    }}
                  />
                  <IconButton
                    icon="delete"
                    color="#FFF"
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
                            Delete(item.tran_id);
                          },
                        },
                      ]);
                    }}
                  />
                </>
              )}
            />

            <Card.Content style={{ height: 120, marginTop: 20 }}>
              <Text style={{ color: "#FFF", fontSize: 15 }}>{item.review}</Text>
            </Card.Content>
          </LinearGradient>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FAB
        style={{
          position: "absolute",
          bottom: 20,
          right: 70,
        }}
        icon="plus"
        color="#000"
        onPress={() =>
          props.navigation.navigate("CustomerReview", { tran_id: 0 })
        }
      />
    </View>
  );
};

const CustomerReview = (props) => {
  const { userToken, tran_id } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [param, setparam] = useState({
    tran_id: "0",
    customer_name: "",
    image_path: "",
    review: "",
    image_path2: "",
  });
  const [Image, setImage] = React.useState(require("../../assets/upload.png"));
  const [imageuploads, setimageuploads] = useState({
    image_name: "image-" + moment().format("YYYYMMDD-hhmmss") + ".png",
    image_base64: "",
  });

  React.useEffect(() => {
    if (tran_id != 0) {
      postRequest(
        "masters/customer/customerreview/preview",
        { tran_id: tran_id },
        userToken
      ).then((resp) => {
        if (resp.status == 200) {
          param.tran_id = resp.data.tran_id;
          param.customer_name = resp.data.customer_name;
          param.review = resp.data.review;
          param.image_path = resp.data.image_path;
          setparam({ ...param });

          setImage({ uri: `${resp.data.url + "" + resp.data.image_path}` });
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
      source={require("../../assets/login-bg.jpg")}
      style={MyStyles.container}
    >
      <View style={MyStyles.cover}>
        <TextInput
          mode="outlined"
          placeholder="Customer Name"
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
          value={param.customer_name}
          onChangeText={(text) => {
            setparam({ ...param, customer_name: text });
          }}
        />
        <TextInput
          mode="outlined"
          placeholder="Customer Review"
          multiline
          numberOfLines={3}
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
          value={param.review}
          onChangeText={(text) => {
            setparam({ ...param, review: text });
          }}
        />
        <View style={[MyStyles.row, { justifyContent: "center" }]}>
          <ImageUpload
            label="Upload Image :"
            source={Image}
            onClearImage={() => { }}
            onUploadImage={(result) => {
              setImage({ uri: result.uri });
              // setimageuploads({ ...imageuploads, image_base64: result.base64 });
              setparam({
                ...param,
                image_path:
                  "image-" + moment().format("YYYYMMDD-hhmmss") + ".jpg",
                image_path2:
                  "image-" + moment().format("YYYYMMDD-hhmmss"),
              });
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

              postRequest(
                "masters/customer/customerreview/insert",
                param,
                userToken
              ).then((resp) => {
                if (resp.status == 200) {
                  if (resp.data[0].valid) {

                    if (Image.uri) {
                     
                      const form_data = new FormData();
                      form_data.append("files", {
                        uri: Image.uri,
                        type: "image/jpeg",
                        name: param.image_path2,
                      });
                     
                      var xhr = new XMLHttpRequest();
                      xhr.open(
                        "POST",
                        serviceUrl + "masters/customer/UploadCustomerReviewImage",
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
                    props.navigation.navigate("ReviewFeedback");
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

export { CustomerReviewList, CustomerReview };
