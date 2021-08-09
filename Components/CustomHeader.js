import React from "react";
import { Alert, Image, SafeAreaView, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import MyStyles from "../Styles/MyStyles";
import { AuthContext } from "./Context";

const CustomHeader = (props) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <SafeAreaView
      style={{
        paddingTop: MyStyles.barHeight,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        backgroundColor: MyStyles.primaryColor.backgroundColor,
      }}
    >
      <IconButton icon="menu" size={25} onPress={() => props.navigation.openDrawer()} />

      {/* <Image
        style={{ resizeMode: "contain", width: 200, height: 50 }}
        source={require("../assets/logo.png")}
      /> */}
      <Text style={{ fontSize: 20, alignSelf: "center", flexGrow: 1, marginLeft: 20 }}>
        {props.title}
      </Text>
      <IconButton icon="dots-vertical" size={25} onPress={() => Alert.alert("Coming Soon...")} />
    </SafeAreaView>
  );
};

export default CustomHeader;
