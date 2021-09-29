import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  FlatList,
  Alert,
  StyleSheet
} from "react-native";
import {
  Button,
  FAB,
  List,
  TextInput,
  TouchableRipple,
  Text
} from "react-native-paper";
import CustomHeader from "../../Components/CustomHeader";
import MyStyles from "../../Styles/MyStyles";
import { postRequest } from "../../Services/RequestServices";
import Autocomplete from "react-native-autocomplete-input";
const BranchAreaList = (props) => {
  const { userToken, search } = props.route.params;
  const [loading, setLoading] = useState(true);
  const [griddata, setgriddata] = useState([]);

  React.useEffect(() => {
    Browse();
  }, [search]);

  const Browse = () => {
    postRequest(
      "masters/area/browse_app",
      { search: search == undefined ? "" : search },
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
                    <List.Icon {...props} icon="pencil" color="#AAA" />
                  </TouchableRipple>
                  <TouchableRipple
                    style={{ zIndex: 0 }}
                    onPress={() => {
                      Alert.alert("Alert", "You want to delete?", [
                        {
                          text: "No",
                          onPress: () => { },
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
                    <List.Icon {...props} icon="delete" color="#AAA" />
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
        color="#000"
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
  const [filteredData, setFilteredData] = useState([]);
  const [suggestiondata, setSuggestionData] = useState([]);

  React.useEffect(() => {
    postRequest("customervisit/SearchAreaList", { search: "" }, userToken).then((resp) => {
      if (resp.status == 200) {
        setSuggestionData(resp.data);
      } else {
        Alert.alert(
          "Error !",
          "Oops! \nSeems like we run into some Server Error"
        );
      }
    });

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
          Alert.alert(
            "Error !",
            "Oops! \nSeems like we run into some Server Error"
          );
        }
      });
    }
    setLoading(false);
  }, []);

  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
      <View style={[MyStyles.cover, { backgroundColor: "" }]}>
        {/* <TextInput
          mode="outlined"
          placeholder="Branch Area"
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
          value={param.area_name}
          onChangeText={(text) => {
            setparam({ ...param, area_name: text });
          }}
        /> */}
         <Autocomplete
          {...props}
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={{ borderWidth: 0 }}
          containerStyle={{ flex: 0, marginBottom: 20 }}
          value={param.area_name}
          data={filteredData}
          onChangeText={(query) => {
            if (query) {
              const regex = new RegExp(`${query.trim()}`, "i");
              setFilteredData(
                suggestiondata.filter((data) => data.area_name.search(regex) >= 0)
              );
            } else {
              setFilteredData([]);
            }
            setparam({ ...param, area_name: query });
          }}
          flatListProps={{
            keyExtractor: (_, idx) => idx.toString(),
            renderItem: ({ item, index }) => (
              <Text key={index} style={styles.itemText}>
                {item.area_name}
              </Text>
            ),
          }}
          renderTextInput={(props) => (
            <TextInput
              {...props}
              mode="outlined"
              placeholder="Branch Area"
              style={{
                backgroundColor: "rgba(0,0,0,0)",
              }}
            />
          )}
        />
        <View
          style={[
            MyStyles.row,
            { justifyContent: "center", marginVertical: 40 },
          ]}
        >
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => {
              setLoading(true);

              postRequest("masters/area/insert", param, userToken).then(
                (resp) => {
                  if (resp.status == 200) {
                    if (resp.data[0].valid) {
                      props.navigation.navigate("BranchAreaList");
                    }
                    setLoading(false);
                  }
                }
              );
            }}
          >
            Submit
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export { BranchArea, BranchAreaList };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
  },
});

