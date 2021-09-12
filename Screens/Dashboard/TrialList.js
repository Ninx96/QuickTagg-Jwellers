import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions, Alert } from "react-native";
import { List, Text, TouchableRipple } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import { FlatList } from "react-native-gesture-handler";
import { postRequest } from "../../Services/RequestServices";
import moment from "moment";

const TrialList = (props) => {
  const { userToken, branchId } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);
  React.useEffect(() => {
    Refresh();
    setLoading(false);
  }, []);

  const Refresh = () => {
    postRequest(
      "masters/dashboard/app_trial_list",
      { branch_id: branchId, from_date: "2020-01-01", to_date: "2021-09-01" },
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
  };

  return (
    <View style={MyStyles.container}>
      <FlatList
        data={griddata}
        initialNumToRender={10}
        renderItem={({ item, index }) => (
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#CCC" }}>
            <List.Item
              key={item.customer_id}
              title={
                <Text
                  onPress={() => {
                    props.navigation.navigate("Profile", {
                      customer_id: item.customer_id,
                      customer_mobile: item.mobile,
                    });
                  }}
                >
                  {item.customer_name}
                </Text>
              }
              titleStyle={{ fontWeight: "bold" }}
              description={item.mobile + "          " + item.customer_category}
              left={() => {
                return (
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
                );
              }}
              right={() => (
                <Text style={{ color: "#999", alignSelf: "center" }}>
                  {moment(item.datetime).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")
                    ? moment(item.datetime).format("hh:mm")
                    : moment(item.datetime).format("DD/MM/YYYY")}
                </Text>
              )}
            />
            <Text style={{ marginLeft: 15, marginBottom: 10, fontSize: 15 }}>
              Interested a trial of a {item.category_name} from{" "}
              <Text style={{ fontWeight: "bold" }}>
                {item.subcategory_name}
              </Text>
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default TrialList;
