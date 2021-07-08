import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  FlatList,
  Alert,
} from "react-native";
import {
  Button,
  Checkbox,
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
import moment from "moment";

const CustomerReviewList = (props) => {
  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <FlatList
        data={[{}]}
        renderItem={({ item, index }) => (
          <Card
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
              borderRadius: 10,
            }}
          >
            <Card.Title
              style={{ marginTop: 10 }}
              title="Rahul"
              titleStyle={{ marginLeft: 20 }}
              left={() => (
                <Avatar.Image source={require("../../assets/upload.png")} />
              )}
              right={() => <IconButton icon="pencil" />}
            />
            <Card.Content style={{ height: 180, marginTop: 20 }}>
              <Text>Review Review Review</Text>
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
          props.navigation.navigate("CustomerReview", { voucher_id: 0 })
        }
      />
    </View>
  );
};

const CustomerReview = (props) => {
  const [param, setParam] = useState({});
  const [loading, setLoading] = useState(true);
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
            value={param.voucher_name}
            onChangeText={(text) => {
              setParam({ ...param, voucher_name: text });
            }}
          />
          <TextInput
            mode="flat"
            label="Customer Review"
            placeholder="Customer Review"
            multiline
            numberOfLines={3}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.address}
            onChangeText={(text) => {
              setParam({ ...param, address: text });
            }}
          />
          <ImageUpload
            label="Upload Image :"
            source={require("../../assets/upload.png")}
            onClearImage={() => {}}
            onUploadImage={() => {}}
          />
          <View
            style={[
              MyStyles.row,
              { justifyContent: "center", marginVertical: 40 },
            ]}
          >
            <Button mode="contained" uppercase={false} onPress={() => {}}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { CustomerReviewList, CustomerReview };
