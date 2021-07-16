import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Card, DataTable, Text } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";

const Wishlist = () => {
  return (
    <View style={MyStyles.container}>
      <ScrollView>
        <Card
          style={{
            backgroundColor: "#dc3545",
            marginHorizontal: 20,
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
          }}
        >
          <View>
            <View
              style={[
                MyStyles.row,
                {
                  justifyContent: "center",
                  borderBottomColor: "#FFF",
                  borderBottomWidth: 1,
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#FFF",
                  fontSize: 20,
                  marginVertical: 5,
                }}
              >
                Total Customers
              </Text>
            </View>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>E-Store</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>Visits</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>
                    Exhibition
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>200</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>200</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>200</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        </Card>

        <Card
          style={{
            backgroundColor: "#dc3545",
            marginHorizontal: 20,
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
          }}
        >
          <View>
            <View
              style={[
                MyStyles.row,
                {
                  justifyContent: "center",
                  borderBottomColor: "#FFF",
                  borderBottomWidth: 1,
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#FFF",
                  fontSize: 20,
                  marginVertical: 5,
                }}
              >
                Total Customers
              </Text>
            </View>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>E-Store</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>Visits</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>
                    Exhibition
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>200</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>200</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>200</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default Wishlist;
