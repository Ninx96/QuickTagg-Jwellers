import React, { useState, useEffect } from "react";
import { View, ImageBackground, ScrollView, FlatList, Alert } from "react-native";
import { Button, FAB, List, TextInput, TouchableRipple } from "react-native-paper";
import CustomHeader from "../../Components/CustomHeader";
import MyStyles from "../../Styles/MyStyles";
import { postRequest } from "../../Services/RequestServices";
const BranchAreaList = (props) => {
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, []);

  const Browse = (id) => {
    let param = {};
    postRequest("masters/area/browse", param, userToken).then((resp) => {
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
    let data = { area_id: id };
    postRequest("masters/area/delete", data, userToken).then((resp) => {
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
            title={item.area_name}
            titleStyle={{ fontWeight: "bold" }}
            right={() => {
              return (
                <>
                  <TouchableRipple
                    style={{ zIndex: 0 }}
                    onPress={() => {
                      props.navigation.navigate("BranchArea", {
                        area_id: item.area_id,
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
                            Delete(item.area_id);
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
        onPress={() => props.navigation.navigate("BranchArea", { area_id: 0 })}
      />
    </View>
  );
};

const BranchArea = (props) => {
  const { area_id } = props.route.params;
  const { userToken } = props.route.params;
  const [loading, setLoading] = useState(true);

  const [param, setparam] = useState({
    area_id: "0",
    area_name: "",
  });

  React.useEffect(() => {
    if (area_id != 0) {
      let param = {
        area_id: area_id,
      };
      postRequest("masters/area/preview", param, userToken).then((resp) => {
        if (resp.status == 200) {
          param.area_id = resp.data[0].area_id;
          param.area_name = resp.data[0].area_name;
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
            placeholder="Branch Area"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            value={param.area_name}
            onChangeText={(text) => {
              setparam({ ...param, area_name: text });
            }}
          />
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => {
              setLoading(true);

              postRequest("masters/area/insert", param, userToken).then((resp) => {
                if (resp.status == 200) {
                  if (resp.data[0].valid) {
                    props.navigation.navigate("BranchAreaList");
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

export { BranchArea, BranchAreaList };
