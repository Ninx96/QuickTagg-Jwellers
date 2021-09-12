import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomHeader from "../../Components/CustomHeader";
import MyStyles from "../../Styles/MyStyles";
import { postRequest } from "../../Services/RequestServices";
const CustomerFeedback = (props) => {
  const { userToken, branchId } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);
  React.useEffect(() => {
    Browse();
  }, []);

  const Browse = () => {
    postRequest("masters/dashboard/feedback", { from_date: "2020-01-01", to_date: "2021-09-01", branch_id: branchId }, userToken).then((resp) => {
      if (resp.status == 200) {
        console.log(resp);
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
                <Text style={{ fontSize: 15, color: "#FFF" }}>{item.full_name}</Text>
                <View
                  style={[
                    MyStyles.row,
                    { justifyContent: "flex-start", marginVertical: 0, color: "#FFF" },
                  ]}
                >
                  <Text style={{ fontSize: 15, color: "#FFF" }}>{item.mobile}</Text>
                  <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                    {ratingStar(item.stars)}
                  </View>
                </View>
              </View>

              <View style={[MyStyles.row, { marginVertical: 0 }]}>
                <View style={{ backgroundColor: "#4297FE", padding: 5, borderColor: "#FFF", borderWidth: 1, borderRadius: 5 }}>
                  <Text style={{ color: "#FFF", fontSize: 15 }}>{item.service1}</Text>
                </View>
              </View>

              <View style={{ height: 70 }}>
                <Text style={{ fontSize: 15, color: "#FFF" }}>{item.remarks}</Text>
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
