import React, { useState, useEffect } from "react";
import { FlatList, View, Linking, ImageBackground } from "react-native";
import { List, Text, TouchableRipple } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { postRequest } from "../../Services/RequestServices";
import MyStyles from "../../Styles/MyStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import Loading from "../../Components/Loading";
const Greetings = (props) => {
  const { userToken, branchId } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [recentdobdoa, setrecentdobdoa] = useState([]);
  React.useEffect(() => {
    postRequest(
      "masters/dashboard/dobAndDoa",
      { branch_id: branchId, search: "" },
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        setrecentdobdoa(resp.data);
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
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
       <Loading isloading={loading} />
      {/* <View style={MyStyles.container}> */}
        <FlatList
          data={recentdobdoa}
          initialNumToRender={10}
          renderItem={({ item, index }) => (
            <List.Item
              style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
              title={item.full_name}
              titleStyle={{ fontWeight: "bold" }}
              description={item.mobile + "          " + item.category_name}
              left={() => (
                <TouchableRipple
                  style={MyStyles.squarefixedRatio}
                  onPress={() => {
                    props.navigation.navigate("Profile", {
                      customer_id: item.customer_id,
                      customer_mobile: item.mobile,
                    });
                  }}
                >
                  <Text style={{ color: "red", textTransform: "uppercase" }}>
                    {item.type == null ? "" : item.type.charAt(0)}
                  </Text>
                </TouchableRipple>
              )}
              right={() => (
                <View style={MyStyles.row}>
                  {item.doa == "true" ? (
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        color: "gold",
                        marginHorizontal: 10,
                      }}
                    >
                      A
                    </Text>
                  ) : // <Icon name="alpha-a" size={40} style={{ marginHorizontal: 2, color: "gold" }} />
                    null}
                  {item.dob == "true" ? (
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        color: "red",
                        marginHorizontal: 10,
                      }}
                    >
                      B
                    </Text>
                  ) : // <Icon name="alpha-b" size={40} style={{ marginHorizontal: 2, color: "red" }} />
                    null}
                  <Icon
                    name="whatsapp"
                    size={30}
                    style={{
                      marginHorizontal: 2,
                      color: "green",
                      marginLeft: 20,
                    }}
                    onPress={() => {
                      Linking.openURL(
                        "whatsapp://send?text=&phone=91" + item.mobile
                      );
                    }}
                  />
                </View>
              )}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      {/* </View> */}
    </ImageBackground>
  );
};

export default Greetings;
