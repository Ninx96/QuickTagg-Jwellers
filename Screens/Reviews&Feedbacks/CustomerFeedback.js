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
      resp.push(<Icon key={i} name="star" color="#ffba3c" size={20} />);
    }
    return resp;
  };
  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <FlatList
        data={[{}, {}, {}]}
        renderItem={({ item, index }) => (
          <Card
            style={{
              marginHorizontal: 20,
              marginVertical: 5,
              borderRadius: 10,
              padding: 20,
            }}
          >
            <View>
              <View>
                <Text>Name</Text>
                <View style={MyStyles.row}>
                  <Text>9874563210</Text>
                  <View style={{ flexDirection: "row" }}>{ratingStar(5)}</View>
                </View>
              </View>

              <View style={MyStyles.row}>
                <Button mode="contained" uppercase={false}>
                  Service
                </Button>
              </View>

              <View style={{ height: 100 }}>
                <Text>Remarks Remarks Remarks</Text>
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
