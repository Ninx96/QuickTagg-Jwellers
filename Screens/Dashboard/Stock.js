import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions, Alert } from "react-native";
import { List, Text, TouchableRipple, Portal, Modal, IconButton } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import { FlatList } from "react-native-gesture-handler";
import { postRequest } from "../../Services/RequestServices";
import DatePicker from "../../Components/DatePicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import Loading from "../../Components/Loading";
const Stock = (props) => {
  const { userToken, branchId } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);
  const [param, setparam] = useState({
    from_date: moment(),
    to_date: moment(),
  });
  const [dateModal, setDateModal] = useState(false);
  React.useEffect(() => {
    Refresh();
  }, []);

  const Refresh = () => {
    postRequest(
      "masters/dashboard/stock",
      { from_date: param.from_date, to_date: param.to_date, search: "" },
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
      setLoading(false);
    });
  };

  return (
    <View style={MyStyles.container}>
      <Loading isloading={loading} />
      <Portal>
        <Modal
          visible={dateModal}
          contentContainerStyle={{
            backgroundColor: "#FFF",
            marginHorizontal: 20,
            paddingHorizontal: 10,
          }}
          onDismiss={() => setDateModal(false)}
        >
          <View style={MyStyles.row}>
            <DatePicker
              mode="text"
              value={param.from_date}
              onValueChange={(date) => {
                param.from_date = date;
                setparam({ ...param });
                Refresh();
              }}
            />
            <Text>To</Text>
            <DatePicker
              mode="text"
              value={param.to_date}
              onValueChange={(date) => {
                param.to_date = date;
                setparam({ ...param });
                Refresh();
              }}
            />
          </View>
        </Modal>
      </Portal>
      <View style={MyStyles.row}>
        <TouchableRipple onPress={() => setDateModal(true)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton icon="calendar" />
            <Text>
              {moment(param.from_date).format("DD/MM/YYYY") +
                " - " +
                moment(param.to_date).format("DD/MM/YYYY")}
            </Text>
          </View>
        </TouchableRipple>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            borderRadius: 10,
            backgroundColor: "orange",

            marginRight: 10,
          }}
          onPress={() => {
            props.navigation.navigate("RecentActivity");
          }}
        >
          <Icon name="circle-medium" color="red" size={20} />
          <Text style={{ color: "#FFF" }}>Live</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={griddata}
        initialNumToRender={10}
        renderItem={({ item, index }) => (
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#CCC" }}>
            <List.Item
              key={item.tran_id}
              title={
                <Text>
                  {item.to_branch}
                </Text>
              }
              titleStyle={{ fontWeight: "bold" }}
              description={"#" + item.entry_no + "          " + item.date}
              left={() => (
                <Icon
                  name="brightness-1"
                  size={10}
                  style={[{
                    marginHorizontal: 2,
                    color: item.status == "Pending" ? "red" : "lightgreen",
                    alignSelf: "center",
                  }]}
                />
              )}
              right={() => (
                <Text style={{ color: "#999", alignSelf: "center" }}>
                  {item.status}
                </Text>
              )}
            />
            <Text style={{ marginLeft: 15, marginBottom: 10, fontSize: 15 }}>
              {item.remarks}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Stock;
