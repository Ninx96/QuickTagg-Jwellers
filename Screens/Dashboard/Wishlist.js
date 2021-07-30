import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Button, Card, DataTable, IconButton, Text } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import { LineChart, PieChart } from "react-native-chart-kit";
import { postRequest } from "../../Services/RequestServices";

const Wishlist = (props) => {
  const { userToken, branchId } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState({ customers_graph: false, new_customer_chart: false, not_response_chart: false, cart_graph: false });
  const [figures, setfigures] = useState({
    total_customers: '',
    total_customer_visits: '',
    total_customer_estore: '',
    total_customer_exhibition: '',
    new_customers: '',
    total_notVisitCustomer: '',
    total_cart: '',
    total_cart_exhibition: '',
    total_cart_upload: '',
    total_cart_wishlist: ''
  });

  React.useEffect(() => {
    Figures();
    setLoading(false);
  }, []);

  const Figures = () => {
   
    postRequest("masters/dashboard/figures", { branch_id: branchId, from_date: '', to_date: '' }, userToken).then((resp) => {
      if (resp.status == 200) {
        figures.total_customers = resp.data[0].total_customers;
        figures.total_customer_visits = resp.data[0].total_customers;
        figures.total_customer_estore = resp.data[0].total_customers;
        figures.total_customer_exhibition = resp.data[0].total_customers;
        figures.new_customers = resp.data[0].total_customers;
        figures.total_notVisitCustomer = resp.data[0].total_customers;
        figures.total_cart = resp.data[0].total_customers;
        figures.total_cart_exhibition = resp.data[0].total_customers;
        figures.total_cart_upload = resp.data[0].total_customers;
        figures.total_cart_wishlist = resp.data[0].total_customers;
        setfigures({ ...figures })
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
  }
  return (
    <View style={MyStyles.container}>
      <ScrollView>
        <Card
          style={{
            backgroundColor: "#dc3545",
            marginHorizontal: 15,
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
                  width: "50%"
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
                onPress={() => setVisible({ ...visible, customers_graph: !visible.customers_graph })}
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
                  <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_customer_estore}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_customer_visits}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_customer_exhibition}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
          <GraphView visible={visible.customers_graph}/>

          <View style={[MyStyles.row, { paddingHorizontal: 20 }]}>
            <Button
              mode="contained"
              color="#DC143C"
              uppercase={false}
              style={{ borderRadius: 20, borderColor: "#FFF", borderWidth: 1 }}
              onPress={() => setVisible({ ...visible, new_customer_chart: !visible.new_customer_chart, not_response_chart: false })}
            >
              New
            </Button>
            <Button
              mode="contained"
              color="#DC143C"
              uppercase={false}
              style={{ borderRadius: 20, borderColor: "#FFF", borderWidth: 1 }}
              onPress={() => setVisible({ ...visible, new_customer_chart: false, not_response_chart: !visible.not_response_chart })}
            >
              Not Response
            </Button>
          </View>
          <ChartView visible={visible.new_customer_chart} />
          <ChartView visible={visible.not_response_chart} />
        </Card>


        <Card
          style={{
            backgroundColor: "#dc3545",
            marginHorizontal: 15,
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
                  width: "50%"
                }}
              >
                Cart
              </Text>
              <IconButton
                icon="trending-up"
                color="white"
                style={{
                  backgroundColor: "#DC143C",
                  flex: 1,
                  borderColor: "#FFF",
                  borderWidth: 1
                }}
                onPress={() => setVisible({ ...visible, cart_graph: !visible.cart_graph })}
              />
            </View>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>Wish List</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>Uploads</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>Exhibition</Text>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_cart_wishlist}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_cart_upload}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_cart_exhibition}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
          <GraphView visible={visible.cart_graph} />
        </Card>
      </ScrollView>
    </View>
  );
};

const GraphView = ({ visible = false }) => {
  const screenWidth = Dimensions.get("window").width - 60;
 // const { userToken, branchId } = props.route.params;
  const [chartData, setChartData] = React.useState({
    chartDataLabels: [0],
    chartDataEstore: [0],
    chartDataVisits: [0],
    chartDataExhibition: [0],
  });

  const chartConfig = {
    backgroundGradientFrom: "#000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#000",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional
  };

  
  React.useEffect(() => {   
    GraphFigures();
  }, []);

  const GraphFigures = () => {
    postRequest("masters/dashboard/customer_graph", { branch_id: 2, from_date: '2021/01/01', to_date: '2021/07/30' }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VyX2NvbXBhbnlfaWQiOjIsInRva2VuX2JyYW5jaF9pZCI6MiwiaWF0IjoxNjI3NjQzNzQ3LCJleHAiOjE2Mjc2Nzk3NDd9.gTA1jXdIBOKo9qjXE5zTL83dLXflcs_M6soF5t1tKYw').then((resp) => {
      if (resp.status == 200) {
        chartData.chartDataLabels = [0];
        chartData.chartDataEstore = [0];
        chartData.chartDataVisits = [0];
        chartData.chartDataExhibition = [0];
        for (const itemObj of resp.data) {
          chartData.chartDataLabels.push(itemObj.datetime);
          chartData.chartDataEstore.push(itemObj.estore);
          chartData.chartDataVisits.push(itemObj.visits);
          chartData.chartDataExhibition.push(itemObj.exhibitions);
        }
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
  }

  const data = {
    labels: chartData.chartDataLabels,
    datasets: [
      {
        data: chartData.chartDataEstore,
        color: (opacity = 1) => `rgba(122, 30, 120, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: chartData.chartDataVisits,
        color: (opacity = 1) => `rgba(10, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: chartData.chartDataExhibition,
        color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["E-Store","Visits","Exhibition"], // optional
  };
  if (visible) {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 0,
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
      color: "#000",
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
          backgroundColor: "#fff",
          marginHorizontal: 0,
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
