import React, { useState, useEffect } from "react";
import { FlatList, View, Linking } from "react-native";
import { List, Text, TouchableRipple } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { postRequest } from "../../Services/RequestServices";
import MyStyles from "../../Styles/MyStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
const RecentActivity = (props) => {
  const { userToken, branchId } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [recentactivity, setrecentactivity] = useState([]);
  React.useEffect(() => {
    postRequest(
      "masters/dashboard/recentActivity",
      { branch_id: branchId, from_date: "2020/01/01", to_date: "2021/08/30" },
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        setrecentactivity(resp.data);
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
    <View style={{ backgroundColor: "#FFF" }}>
      <FlatList
        data={recentactivity}
        initialNumToRender={10}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
              title={item.full_name}
              titleStyle={{ fontWeight: "bold" }}
              //description={item.mobile}
              description={() => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 14, color: "#777", marginRight: 50 }}
                  >
                    {item.mobile}
                  </Text>
                  {item.dob == "true" && (
                    <Icon
                      name="cake"
                      size={20}
                      style={{ marginHorizontal: 2, color: "gold" }}
                    />
                  )}
                  {item.doa == "true" && (
                    <Icon
                      name="cake"
                      size={20}
                      style={{ marginHorizontal: 2, color: "gold" }}
                    />
                  )}
                  {item.missCall == "true" && (
                    <Icon
                      name="inbox"
                      size={20}
                      style={{ marginHorizontal: 2 }}
                    />
                  )}
                  {item.vcall == "true" && (
                    <Icon
                      name="video"
                      size={20}
                      style={{ marginHorizontal: 2 }}
                    />
                  )}
                  {item.wish == "true" && (
                    <Icon
                      name="heart"
                      size={20}
                      style={{ marginHorizontal: 2, color: "red" }}
                    />
                  )}
                </View>
              )}
              left={() => (
                <>
                  {item.type == "New Customer" ? (
                    <Icon
                      name="brightness-1"
                      size={10}
                      style={{
                        marginHorizontal: 2,
                        color: "lightgreen",
                        alignSelf: "center",
                      }}
                    />
                  ) : (
                    <Text> </Text>
                  )}

                  <TouchableRipple
                    style={MyStyles.squarefixedRatio}
                    onPress={() => {
                      props.navigation.navigate("Profile", {
                        customer_id: item.customer_id,
                      });
                    }}
                  >
                    <Text style={{ color: "red", textTransform: "uppercase" }}>
                      {item.customer_type == null
                        ? ""
                        : item.customer_type.charAt(0)}
                    </Text>
                  </TouchableRipple>
                </>
              )}
              right={() => (
                <View style={MyStyles.row}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#888",
                      alignSelf: "flex-start",
                      alignSelf: "center",
                      marginLeft: 20,
                    }}
                  >
                    {moment(item.datetime).format("DD/MM/YYYY") ===
                    moment().format("DD/MM/YYYY")
                      ? moment(item.datetime).format("hh:mm")
                      : moment(item.datetime).format("DD/MM/YYYY")}
                  </Text>
                </View>
              )}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default RecentActivity;
