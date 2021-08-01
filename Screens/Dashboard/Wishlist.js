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
    total_cart_wishlist: '',
    new_customer_estore: '',
    new_customer_visits: '',
    new_customer_exhibition: '',
    total_notVisitCustomer_estore: '',
    total_notVisitCustomer_visits: '',
    total_notVisitCustomer_exhibition: ''
  });
  const [chartData1, setChartData1] = React.useState({
    chartDataLabels: [0],
    chartDataEstore: [0],
    chartDataVisits: [0],
    chartDataExhibition: [0],
  });
  const [chartData2, setChartData2] = React.useState({
    chartDataLabels: [0],
    chartDataWishlist: [0],
    chartDataUploads: [0],
    chartDataExhibition: [0],
  });

  React.useEffect(() => {
    AllFigures();
    CustomersGraphFigures();
    CartGraphFigures();
    setLoading(false);
  }, []);

  const AllFigures = () => {
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

        figures.new_customer_estore = resp.data[0].new_customer_estore;
        figures.new_customer_visits = resp.data[0].new_customer_visits;
        figures.new_customer_exhibition = resp.data[0].new_customer_exhibition;
        figures.total_notVisitCustomer_estore = resp.data[0].total_notVisitCustomer_estore;
        figures.total_notVisitCustomer_visits = resp.data[0].total_notVisitCustomer_visits;
        figures.total_notVisitCustomer_exhibition = resp.data[0].total_notVisitCustomer_exhibition;
        setfigures({ ...figures });

      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
  }
  //---------------Customer Graph Data--------------------------//
  const CustomersGraphFigures = () => {
    postRequest("masters/dashboard/customer_graph", { branch_id: branchId, from_date: '2021/01/01', to_date: '2021/07/30' }, userToken).then((resp) => {
      if (resp.status == 200) {
        chartData1.chartDataLabels = [0];
        chartData1.chartDataEstore = [0];
        chartData1.chartDataVisits = [0];
        chartData1.chartDataExhibition = [0];
        for (const itemObj of resp.data) {
          chartData1.chartDataLabels.push(itemObj.date);
          chartData1.chartDataEstore.push(itemObj.estore);
          chartData1.chartDataVisits.push(itemObj.visits);
          chartData1.chartDataExhibition.push(itemObj.exhibitions);
        }
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
  }

  const customergraphdata = {
    labels: chartData1.chartDataLabels,
    datasets: [
      {
        data: chartData1.chartDataEstore,
        color: (opacity = 1) => `rgba(122, 30, 120, ${opacity})`, // optional
        strokeWidth: 1, // optional
      },
      {
        data: chartData1.chartDataVisits,
        color: (opacity = 1) => `rgba(10, 65, 244, ${opacity})`, // optional
        strokeWidth: 1, // optional
      },
      {
        data: chartData1.chartDataExhibition,
        color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
        strokeWidth: 1, // optional
      },
    ],
    legend: ["E-Store", "Visits", "Exhibition"], // optional
  };
  //-------------------------End--------------------------------//


  //---------------Cart Graph Data--------------------------//
  const CartGraphFigures = () => {
    postRequest("masters/dashboard/cart_graph", { branch_id: branchId, from_date: '2021/01/01', to_date: '2021/07/30' }, userToken).then((resp) => {
      if (resp.status == 200) {
        chartData2.chartDataLabels = [0];
        chartData2.chartDataWishlist = [0];
        chartData2.chartDataUploads = [0];
        chartData2.chartDataExhibition = [0];
        for (const itemObj of resp.data) {
          chartData2.chartDataLabels.push(itemObj.date);
          chartData2.chartDataWishlist.push(itemObj.visits);
          chartData2.chartDataUploads.push(itemObj.designs);
          chartData2.chartDataExhibition.push(itemObj.exhibition);
        }
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });
  }

  const cartgraphdata = {
    labels: chartData2.chartDataLabels,
    datasets: [
      {
        data: chartData2.chartDataWishlist,
        color: (opacity = 1) => `rgba(122, 30, 120, ${opacity})`, // optional
        strokeWidth: 1, // optional
      },
      {
        data: chartData2.chartDataUploads,
        color: (opacity = 1) => `rgba(10, 65, 244, ${opacity})`, // optional
        strokeWidth: 1, // optional
      },
      {
        data: chartData2.chartDataExhibition,
        color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
        strokeWidth: 1, // optional
      },
    ],
    legend: ["Wishlist", "Uploads", "Exhibition"], // optional
  };
  //-------------------------End--------------------------------//
  //---------------New Cusomer Chart Data--------------------------//
  const newcustomerchartdata = [
    {
      name: "E-Store",
      population: figures.new_customer_estore,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Visits",
      population: figures.new_customer_visits,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Exhibition",
      population: figures.new_customer_exhibition,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }
  ];
  //------------------------End--------------------------------//
  //---------------New Cusomer Chart Data--------------------------//
  const notresponsecustomerchartdata = [
    {
      name: "E-Store",
      population: figures.total_notVisitCustomer_estore,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Visits",
      population: figures.total_notVisitCustomer_visits,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Exhibition",
      population: figures.total_notVisitCustomer_exhibition,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }
  ];
  //------------------------End--------------------------------//
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
          <CustomerGraphView visible={visible.customers_graph} data={customergraphdata} />

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
          <NewCustomersChartView visible={visible.new_customer_chart} data={newcustomerchartdata} />
          <NotResposeCustomersChartView visible={visible.not_response_chart} data={notresponsecustomerchartdata} />
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
          <CartGraphView visible={visible.cart_graph} data={cartgraphdata} />
        </Card>
      </ScrollView>
    </View>
  );
};

const CustomerGraphView = ({ visible = false, data }) => {
  const screenWidth = Dimensions.get("window").width - 60;

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

const NewCustomersChartView = ({ visible = false, data }) => {
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
const NotResposeCustomersChartView = ({ visible = false, data }) => {
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
const CartGraphView = ({ visible = false, data }) => {
  const screenWidth = Dimensions.get("window").width - 60;

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
export default Wishlist;
