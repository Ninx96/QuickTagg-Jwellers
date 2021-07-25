import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Button, Card, DataTable, IconButton, Text } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import { LineChart, PieChart } from "react-native-chart-kit";

const Wishlist = () => {
  const [visible, setVisible] = useState({ customers_graph: false, customer_chart: false });
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
              <View style={{ flexGrow: 1 }}></View>
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
              <IconButton
                icon="trending-up"
                color="white"
                style={{
                  backgroundColor: "#DC143C",
                  flex: 1,
                  borderColor: "#FFF",
                  borderWidth: 1,
                }}
                onPress={() => setVisible({ ...visible, customers_graph: true })}
              />
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
                  <Text style={{ color: "#FFF", fontSize: 20 }}>Exhibition</Text>
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

          <View style={[MyStyles.row, { paddingHorizontal: 20 }]}>
            <Button
              mode="contained"
              color="#DC143C"
              uppercase={false}
              style={{ borderRadius: 20, borderColor: "#FFF", borderWidth: 1 }}
              onPress={() => setVisible({ ...visible, customer_chart: true })}
            >
              Not Visting
            </Button>
            <Button
              mode="contained"
              color="#DC143C"
              uppercase={false}
              style={{ borderRadius: 20, borderColor: "#FFF", borderWidth: 1 }}
              onPress={() => setVisible({ ...visible, customer_chart: true })}
            >
              Not Visting
            </Button>
          </View>
        </Card>

        <GraphView visible={visible.customers_graph} />

        <ChartView visible={visible.customer_chart} />

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
              <View style={{ flexGrow: 1 }}></View>
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
              <IconButton
                icon="trending-up"
                color="white"
                style={{
                  backgroundColor: "#DC143C",
                  flex: 1,
                  borderColor: "#FFF",
                  borderWidth: 1,
                }}
              />
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
                  <Text style={{ color: "#FFF", fontSize: 20 }}>Exhibition</Text>
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

          <View style={[MyStyles.row, { paddingHorizontal: 20 }]}>
            <Button
              mode="contained"
              color="#DC143C"
              uppercase={false}
              style={{ borderRadius: 20, borderColor: "#FFF", borderWidth: 1 }}
            >
              Not Visting
            </Button>
            <Button
              mode="contained"
              color="#DC143C"
              uppercase={false}
              style={{ borderRadius: 20, borderColor: "#FFF", borderWidth: 1 }}
            >
              Not Visting
            </Button>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const GraphView = ({ visible = false }) => {
  const screenWidth = Dimensions.get("window").width - 60;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Total Customers"], // optional
  };
  if (visible) {
    return (
      <View
        style={{
          backgroundColor: "#dc3545",
          marginHorizontal: 20,
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
        }}
      >
        <LineChart data={data} width={screenWidth} height={220} chartConfig={chartConfig} />
      </View>
    );
  }

  return null;
};

const ChartView = ({ visible = false }) => {
  const screenWidth = Dimensions.get("window").width - 60;

  const chartConfig = {
    backgroundColor: "#1cc910",
    backgroundGradientFrom: "#eff3ff",
    backgroundGradientTo: "#efefef",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(34, 53, 106, ${opacity})`,
    style: {
      borderRadius: 10,
    },
  };

  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  if (visible) {
    return (
      <View
        style={{
          backgroundColor: "#dc3545",
          marginHorizontal: 20,
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
        }}
      >
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={10}
          center={[0, 0]}
          absolute
        />
      </View>
    );
  }
  return null;
};

export default Wishlist;
