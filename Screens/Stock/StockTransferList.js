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

const StockList = () => {
  return (
    <View>
      <FlatList
        data={[{}, {}, {}]}
        renderItem={({ item, index }) => (
          <Card
            key={item.voucher_id}
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
                asldjkhaklsjd
              </Text>
            </LinearGradient>

            <Card.Content>
              <View style={[MyStyles.row, { margin: 0 }]}>
                <Text style={{ marginRight: "auto" }}>0090</Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginRight: "auto",
                  }}
                >
                  24-08-2021
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
                    PC JWELLERS
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Products 10 (100)
                  </Text>
                </View>
                <View>
                  <IconButton
                    icon="pencil"
                    color="#AAA"
                    onPress={() =>
                      props.navigation.navigate("VoucherForm", {
                        voucher_id: item.voucher_id,
                      })
                    }
                    color="#aaa"
                  />
                  <IconButton
                    icon="delete"
                    onPress={() => {
                      Alert.alert("Alert", "You want to delete?", [
                        {
                          text: "No",
                          onPress: () => {},
                          style: "cancel",
                        },
                        {
                          text: "Yes",
                          onPress: () => {
                            Delete(item.voucher_id);
                          },
                        },
                      ]);
                    }}
                    color="#aaa"
                  />
                </View>
              </View>

              <Divider style={{ height: 1, marginVertical: 10 }} />
              <Text>REMARK</Text>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(_, idx) => "key" + idx}
      />
    </View>
  );
};

export default StockList;
