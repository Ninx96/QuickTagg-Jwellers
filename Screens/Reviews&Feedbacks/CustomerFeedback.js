import React, { useState, useEffect } from "react";
import { View, FlatList,Alert } from "react-native";
import { Text, Card, TouchableRipple, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomHeader from "../../Components/CustomHeader";
import MyStyles from "../../Styles/MyStyles";
import { postRequest } from "../../Services/RequestServices";
import * as Linking from "expo-linking";
import moment from "moment";

const CustomerFeedback = (props) => {
  const { userToken, branchId, search } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);
  React.useEffect(() => {   
    Browse();
  }, [search]);

  const Browse = () => {
    postRequest(
      "masters/dashboard/feedback_app",
      { from_date: "", to_date: "", branch_id: branchId, search: search == undefined ? "" : search },
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

  const ratingStar = (rating) => {
    const resp = [];
    for (let i = 0; i < rating; i++) {
      resp.push(<Icon key={i} name="star" color="#ffba3c" size={25} />);
    }
    return resp;
  };
  return (
    <View style={MyStyles.container}>
      <FlatList
        data={griddata}
        style={{ marginVertical: 10 }}
        renderItem={({ item, index }) => (
          <Card
            style={{
              marginHorizontal: 20,
              marginVertical: 5,
              borderRadius: 10,
              padding: 10,
              backgroundColor: "#FE428D",
            }}
          >
            <View>
              <View>
                <View style={[MyStyles.row, { marginVertical: 0 }]}>
                  <Text
                    style={{ fontSize: 15, color: "#FFF", fontWeight: "bold" }}
                  >
                    {item.full_name}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#FFF" }}>
                    {item.datetime}
                  </Text>
                </View>
                <View
                  style={[
                    MyStyles.row,
                    {
                      justifyContent: "flex-start",
                      marginVertical: 0,
                      color: "#FFF",
                    },
                  ]}
                >
                  <Text style={{ fontSize: 15, color: "#FFF" }}>
                    {item.mobile}
                  </Text>
                  <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                    {ratingStar(item.stars)}
                  </View>
                </View>
              </View>

              <View
                style={[MyStyles.row, { marginVertical: 0, flexWrap: "wrap" }]}
              >
                <View
                  style={{
                    backgroundColor: "#4297FE",
                    padding: 5,
                    borderColor: "#FFF",
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "#FFF", fontSize: 15 }}>
                    {item.service1}
                  </Text>
                </View>
                <TouchableRipple onPress={() => Linking.openURL("whatsapp://send?text=&phone=91" + item.mobile)}>
                  <Avatar.Icon
                    icon="whatsapp"
                    color="#FFF"
                    style={{ backgroundColor: "green" }}
                    size={30}
                  />
                </TouchableRipple>
              </View>

              <View style={{}}>
                <Text style={{ fontSize: 15, color: "#FFF" }}>
                  {item.remarks}
                </Text>
              </View>
            </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default CustomerFeedback;
