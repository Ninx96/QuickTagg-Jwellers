import React, { useState } from "react";
import { ImageBackground, ScrollView, View, FlatList, Alert } from "react-native";
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
      }
    );
    setLoading(false);
  };
  const Delete = (id) => {
    setLoading(true);
    postRequest("masters/customer/customerreview/delete", { tran_id: id }, userToken).then(
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
      <CustomHeader {...props} />
      <FlatList
        data={griddata}
        renderItem={({ item, index }) => (
          <Card
            style={{
              marginHorizontal: 20,
              marginVertical: 5,
              borderRadius: 10,
            }}
          >
            <Card.Title
              style={{ marginTop: 10 }}
              title={item.customer_name}
              titleStyle={{ marginLeft: 20 }}
              left={() => (
                <Avatar.Image source={require("../../assets/upload.png")} />
              )}
              right={() =>
                <><IconButton icon="pencil" onPress={() => { props.navigation.navigate("CustomerReview", { tran_id: item.tran_id }) }} />
                  <IconButton icon="delete" onPress={() => {
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
                        { text: "Yes", onPress: () => { Delete(item.tran_id); } }
                      ]
                    );
                  }} /></>
              }
            />
            <Card.Content style={{ height: 180, marginTop: 20 }}>
              <Text>{item.review}</Text>
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
    review: ""
  });

  React.useEffect(() => {

    if (tran_id != 0) {
      postRequest("masters/customer/customerreview/preview", { tran_id: tran_id }, userToken).then((resp) => {
        if (resp.status == 200) {
          param.tran_id = resp.data.tran_id;
          param.customer_name = resp.data.customer_name;
          param.review = resp.data.review;
          param.image_path = resp.data.image_path;
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
      source={require("../../assets/login-bg.jpg")}
      style={MyStyles.container}
    >
      <CustomHeader {...props} />
      <ScrollView>
        <View style={MyStyles.cover}>
          <TextInput
            mode="flat"
            label="Customer Name"
            placeholder="Customer Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.customer_name}
            onChangeText={(text) => {
              setparam({ ...param, customer_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Customer Review"
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
            <Button
              mode="contained"
              uppercase={false}
              onPress={() => {
                setLoading(true);

                postRequest("masters/customer/customerreview/insert", param, userToken).then((resp) => {
                  if (resp.status == 200) {
                    if (resp.data[0].valid) {
                      props.navigation.navigate("CustomerReviewList");
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
      </ScrollView>
    </ImageBackground>
  );
};

export { CustomerReviewList, CustomerReview };
