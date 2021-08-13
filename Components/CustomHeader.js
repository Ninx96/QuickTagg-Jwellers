import React from "react";
import { Alert, Image, SafeAreaView, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import MyStyles from "../Styles/MyStyles";
import { AuthContext } from "./Context";
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const CustomHeader = (props) => {
  const { signOut } = React.useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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

      <Menu
        style={{ marginTop: 40 }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" size={25} onPress={() => { openMenu() }} />}>
        <Menu.Item onPress={() => { props.navigation.navigate("Greetings"); }} title="Greetings" />
        <Divider />
        <Menu.Item onPress={() => { }} title="Tab To Scan" />
      </Menu>

      <Text style={{ fontSize: 20, alignSelf: "center", flexGrow: 1, marginLeft: 20 }}>
        {props.title}
      </Text>
      <IconButton icon="dots-vertical" size={25} onPress={() => Alert.alert("Coming Soon...")} />
    </SafeAreaView>
  );
};

export default CustomHeader;
