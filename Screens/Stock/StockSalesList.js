import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput as Input,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  Portal,
  TextInput,
  ToggleButton,
} from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import { postRequest } from "../../Services/RequestServices";
const StockSalesList = (props) => {
  const { userToken, search } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);
  React.useEffect(() => {
    Refresh();
    setLoading(false);
  }, [search]);

  const Refresh = () => {
    postRequest("transactions/stockSales/browse_app", { search: search == undefined ? "" : search }, userToken).then((resp) => {
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
          <Card
            key={item.tran_id}
            style={{
              marginHorizontal: 20,
              padding: 0,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <LinearGradient
              colors={["#F6356F", "#FF5F50"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "pink",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                margin: 0,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </Text>
            </LinearGradient>

            <Card.Content>
              <View style={[MyStyles.row, { margin: 0 }]}>
                <Text style={{ marginRight: "auto" }}>{item.entry_no}</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginRight: "auto",
                  }}
                >
                  {item.date}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {item.customer_name}({item.mobile})
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    No of Products {item.no_of_product}
                  </Text>
                </View>
                <View>
                  <IconButton
                    icon="pencil"
                    color="#AAA"
                    onPress={() =>
                      props.navigation.navigate("StockSales", {
                        tran_id: item.tran_id,
                      })
                    }
                    color="#aaa"
                  />
                  {/* <IconButton
                    icon="delete"
                    onPress={() => {
                      Alert.alert("Alert", "You want to delete?", [
                        {
                          text: "No",
                          onPress: () => { },
                          style: "cancel",
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            Delete(item.tran_id);
                          },
                        },
                      ]);
                    }}
                    color="#aaa"
                  /> */}
                </View>
              </View>

              <Divider style={{ height: 1, marginVertical: 10 }} />
              <Text>{item.remarks}</Text>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(_, idx) => "key" + idx}
      />
    </View>
  );
};

export default StockSalesList;
