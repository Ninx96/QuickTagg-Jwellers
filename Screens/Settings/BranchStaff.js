import React, { useState, useEffect } from "react";
import { View, ImageBackground, ScrollView, FlatList, Alert } from "react-native";
import { Button, FAB, List, TextInput, TouchableRipple } from "react-native-paper";
import CustomHeader from "../../Components/CustomHeader";
import MyStyles from "../../Styles/MyStyles";
import { postRequest } from "../../Services/RequestServices";

const BranchStaffList = (props) => {
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, []);

  const Browse = (id) => {
    let param = {};
    postRequest("masters/staff/browse", param, userToken).then((resp) => {
      if (resp.status == 200) {
        setgriddata(resp.data);
      } else {
        Alert.alert("Error !", "Oops! \nSeems like we run into some Server Error");
      }
    });

    setLoading(false);
  };

  const Delete = (id) => {
    setLoading(true);
    let data = { staff_id: id };
    postRequest("masters/staff/delete", data, userToken).then((resp) => {
      if (resp.status == 200) {
        if (resp.data[0].valid) {
          Browse();
        }
        setLoading(false);
      }
    });
  };

  return (
    <View style={MyStyles.container}>
      <FlatList
        data={griddata}
        renderItem={({ item, index }) => (
          <List.Item
            key={index}
            style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
            title={item.name}
            titleStyle={{ fontWeight: "bold" }}
            description={item.mobile}
            right={() => {
              return (
                <>
                  <TouchableRipple
                    style={{ zIndex: 0 }}
                    onPress={() => {
                      props.navigation.navigate("BranchStaff", {
                        staff_id: item.staff_id,
                      });
                    }}
                  >
                    <List.Icon {...props} icon="pencil" />
                  </TouchableRipple>
                  <TouchableRipple
                    style={{ zIndex: 0 }}
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
                            Delete(item.staff_id);
                          },
                        },
                      ]);
                    }}
                  >
                    <List.Icon {...props} icon="delete" />
                  </TouchableRipple>
                </>
              );
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FAB
        style={{
          position: "absolute",
          bottom: 15,
          right: 15,
          zIndex: 100,
        }}
        icon="plus"
        onPress={() => props.navigation.navigate("BranchStaff", { staff_id: 0 })}
      />
    </View>
  );
};

const BranchStaff = (props) => {
  const { staff_id } = props.route.params;
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);

  const [param, setparam] = useState({
    staff_id: "0",
    name: "",
    mobile: "",
  });

  React.useEffect(() => {
    if (staff_id != 0) {
      let param = {
        staff_id: staff_id,
      };
      postRequest("masters/staff/preview", param, userToken).then((resp) => {
        if (resp.status == 200) {
          param.staff_id = resp.data[0].staff_id;
          param.name = resp.data[0].name;
          param.mobile = resp.data[0].mobile;
          setparam({ ...param });
        } else {
          Alert.alert("Error !", "Oops! \nSeems like we run into some Server Error");
        }
      });
    }
    setLoading(false);
  }, []);

  return (
    <ImageBackground style={MyStyles.container} source={require("../../assets/login-bg.jpg")}>
      <ScrollView>
        <View style={MyStyles.cover}>
          <TextInput
            mode="outlined"
            placeholder="Staff Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.name}
            onChangeText={(text) => {
              setparam({ ...param, name: text });
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Staff Mobile"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.mobile}
            keyboardType={"number-pad"}
            maxLength={10}
            onChangeText={(text) => {
              setparam({ ...param, mobile: text });
            }}
          />
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => {
              setLoading(true);

              postRequest("masters/staff/insert", param, userToken).then((resp) => {
                if (resp.status == 200) {
                  if (resp.data[0].valid) {
                    props.navigation.navigate("BranchStaffList");
                  }
                  setLoading(false);
                }
              });
            }}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { BranchStaff, BranchStaffList };
