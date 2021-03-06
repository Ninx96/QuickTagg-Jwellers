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
import Loading from "../../Components/Loading";
const StockAcceptanceList = (props) => {
  const { userToken, search } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    Refresh();
    setLoading(false);
  }, [search]);

  const Refresh = () => {
    postRequest(
      "transactions/stockAcceptance/browse_app",
      { search: search == undefined ? "" : search },
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
    <View>
      <Loading isloading={loading} />
      <FlatList
        data={griddata}
        renderItem={({ item, index }) => (
          <Card
            key={item.st_tran_id}
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
                {item.status}
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {item.from_branch}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Products {item.accept_product} ({item.transfer_product})
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Button
                  mode="contained"
                  uppercase={false}
                  style={{ marginLeft: "auto" }}
                  onPress={() => {
                    props.navigation.navigate("StockAcceptance", {
                      tran_id: item.st_tran_id,
                    });
                  }}
                >
                  Accept
                </Button>
              </View>
              <Divider style={{ height: 1, marginVertical: 10 }} />
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text>Transfer</Text>
                  <Text style={{ fontWeight: "bold" }}>5</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderColor: "#000",
                  }}
                >
                  <Text>Pending</Text>
                  <Text style={{ fontWeight: "bold" }}>5</Text>
                </View>
                <View>
                  <Button
                    mode="contained"
                    uppercase={false}
                    style={{ flex: 1 }}
                    // onPress={() => {
                    //   props.navigation.navigate("StockAcceptance", {
                    //     tran_id: item.st_tran_id,
                    //   });
                    // }}
                  >
                    Done
                  </Button>
                </View>
              </View>
              <Divider style={{ height: 1, marginVertical: 10 }} />
              <Text> {item.remarks}</Text>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(_, idx) => "key" + idx}
      />
      {/* <Portal>
        <Modal visible={visible}>
          <View
            style={{
              backgroundColor: "#FFF",
              marginHorizontal: 20,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Accept</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <ToggleButton
                    icon="minus"
                    style={{
                      borderWidth: 1,
                      borderRightWidth: 0,
                      borderColor: "#000",
                    }}
                    onPress={() => {}}
                  />

                  <Input
                    mode="outlined"
                    style={{
                      borderWidth: 1,
                      height: 42,
                      width: 60,
                      marginHorizontal: -2,
                      textAlign: "center",
                    }}
                    value="100"
                  />

                  <ToggleButton
                    icon="plus"
                    style={{
                      borderWidth: 1,
                      borderColor: "#000",
                      borderLeftWidth: 0,
                    }}
                    onPress={() => {}}
                  />
                </View>
              </View>

              <View style={{ alignItems: "center", flex: 1 }}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, marginBottom: 25 }}
                >
                  Pending
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>8</Text>
              </View>
            </View>

            <TextInput
              mode="outlined"
              placeholder="Reamrks"
              multiline
              numberOfLines={4}
              style={{ backgroundColor: "rgba(0,0,0,0)", marginBottom: 40 }}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button mode="contained" uppercase={false}  onPress={() => {setVisible(false);}}>
                Close
              </Button>
              <Button mode="contained" uppercase={false}>
                Done
              </Button>
            </View>
          </View>
        </Modal>
      </Portal> */}
    </View>
  );
};

export default StockAcceptanceList;
