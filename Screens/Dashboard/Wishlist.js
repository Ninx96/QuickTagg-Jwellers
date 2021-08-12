import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions, Alert } from "react-native";
import {List, Text, TouchableRipple } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import { LineChart, PieChart } from "react-native-chart-kit";
import { postRequest } from "../../Services/RequestServices";

const Wishlist = (props) => {
  const { userToken, branchId } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);
  React.useEffect(() => {
    AllCustomerWishList();
    setLoading(false);
  }, []);

  const AllCustomerWishList = () => {
    postRequest("masters/customer/browse", {  }, userToken).then((resp) => {
      if (resp.status == 200) {
        setgriddata(resp.data);
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
        {griddata.length > 0
          ? griddata.map((item, index) => {
            return (
              <List.Item
                key={item.customer_id}
                style={{ borderBottomWidth: 0.5, borderBottomColor: "#CCC" }}
                title={item.full_name}
                titleStyle={{ fontWeight: "bold" }}
                description={item.mobile + "          " + item.category_name}
                left={() => {
                  return (
                    <TouchableRipple
                      style={MyStyles.squarefixedRatio}
                      onPress={() => {
                        props.navigation.navigate("Profile", { customer_id: item.customer_id });
                      }}
                    >
                      <Text style={{ color: "red", textTransform: 'uppercase' }}>
                        {item.type == null ? "" : item.type.charAt(0)}
                      </Text>
                    </TouchableRipple>
                  );
                }}
                // right={() => {
                //   return (
                //     <TouchableRipple
                //       style={{ zIndex: 0 }}
                //       onPress={() => {
                //         props.navigation.navigate("CustomerForm", {
                //           customer_id: item.customer_id,
                //         });
                //       }}
                //     >
                     
                //     </TouchableRipple>
                //   );
                // }}
              />
            );
          })
          : null}
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
    //decimalPlaces: 0
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
        <LineChart data={data} width={screenWidth} height={220} verticalLabelRotation={30} segments={4} chartConfig={chartConfig} bezier />
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
        <LineChart data={data} width={screenWidth} height={220} verticalLabelRotation={30} segments={4} chartConfig={chartConfig} bezier />
      </View>
    );
  }

  return null;
};
export default Wishlist;
