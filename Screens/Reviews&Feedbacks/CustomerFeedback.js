import React from "react";
import { View, FlatList } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomHeader from "../../Components/CustomHeader";
import MyStyles from "../../Styles/MyStyles";

const CustomerFeedback = (props) => {
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
        data={[{}, {}, {}]}
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
                <Text style={{ fontSize: 15, color: "#FFF" }}>Name</Text>
                <View
                  style={[
                    MyStyles.row,
                    { justifyContent: "flex-start", marginVertical: 0, color: "#FFF" },
                  ]}
                >
                  <Text style={{ fontSize: 15, color: "#FFF" }}>9874563210</Text>
                  <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                    {ratingStar(5)}
                  </View>
                </View>
              </View>

              <View style={[MyStyles.row, { marginVertical: 0 }]}>
                <Button
                  mode="contained"
                  color="#4297FE"
                  uppercase={false}
                  style={{ borderColor: "#FFF", borderWidth: 1 }}
                  labelStyle={{ color: "#FFF" }}
                >
                  Service
                </Button>
              </View>

              <View style={{ height: 70 }}>
                <Text style={{ fontSize: 15, color: "#FFF" }}>Remarks Remarks Remarks</Text>
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
