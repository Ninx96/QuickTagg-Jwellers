import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions, Alert } from "react-native";
import { List, Text, TouchableRipple } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import { FlatList } from "react-native-gesture-handler";
import { postRequest } from "../../Services/RequestServices";
import moment from "moment";

const Wishlist = (props) => {
  const { userToken, branchId } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);
  React.useEffect(() => {
    Refresh();
    setLoading(false);
  }, []);

  const Refresh = () => {
    postRequest(
      "masters/dashboard/app_wish_list",
      { branch_id: branchId, from_date: "2020-01-01", to_date: "2021-09-01" },
      userToken
    ).then((resp) => {
      if (resp.status == 200) {
        setgriddata(resp.data);
      } else {
        Alert.alert("Error !", "Oops! \nSeems like we run into some Server Error");
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
                  {/* {moment().format("DD/MM/YYY")} */}
                  {moment().fromNow(true)}
                </Text>
              )}
            />
            <Text style={{ marginLeft: 15, marginBottom: 10, fontSize: 15 }}>
              Interested in a {item.category_name} from{" "}
              <Text style={{ fontWeight: "bold" }}>{item.subcategory_name}</Text>
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Wishlist;

{
  /* <List.Section>
<List.Accordion
  title={item.customer_name}
  description={item.mobile + "          " + item.customer_category}
  left={() => {
    return (
      <TouchableRipple
        style={MyStyles.squarefixedRatio}
        onPress={() => {
          props.navigation.navigate("Profile", {
            customer_id: item.customer_id,
          });
        }}
      >
        <Text style={{ color: "red", textTransform: "uppercase" }}>
          {item.type == null ? "" : item.type.charAt(0)}
        </Text>
      </TouchableRipple>
    );
  }}
>
  <List.Item
    key={item.customer_id}
    style={{
      borderBottomWidth: 0.5,
      borderBottomColor: "#CCC",
      backgroundColor: "#f0f0f0",
    }}
    descriptionStyle={{ fontWeight: "bold" }}
    description={
      "Interested in a " +
      item.category_name +
      " from " +
      item.subcategory_name
    }
  />
</List.Accordion>
</List.Section> */
}
