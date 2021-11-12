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
              <View style={{ flexDirection: "row" }}>
                <Button
                  mode="contained"
                  uppercase={false}
                  style={{ marginLeft: "auto" }}
                >
                  Accept
                </Button>
              </View>
              <Divider style={{ height: 1, marginVertical: 10 }} />
              <Text>REMARK</Text>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(_, idx) => "key" + idx}
      />
      <Portal>
        <Modal visible={true}>
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
              <Button mode="contained" uppercase={false}>
                Close
              </Button>
              <Button mode="contained" uppercase={false}>
                Done
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default StockList;
