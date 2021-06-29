import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import {
  Drawer,
  Text,
  Divider,
  Subheading,
  useTheme,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "./Context";
import { createDrawerNavigator } from "@react-navigation/drawer";

//Screen Imports
import Dashboard from "../Screens/Dashboard";
import { CustomerForm, CustomerList } from "../Screens/Customer";
import { VoucherList, VoucherForm } from "../Screens/Voucher";
import { Profile, ProfileList } from "../Screens/Profile";
import {
  Products,
  ProductsList,
  ProductsPreview,
} from "../Screens/Products/Products";
import { Category, CategoryList } from "../Screens/Products/Category";
import { SubCategory, SubCategoryList } from "../Screens/Products/SubCategory";
import ProductTabs from "../Screens/ProductTabs";
import { GeneralCatalog } from "../Screens/Catalogs/GeneralCatalog";
import SettingsMenu from "../Screens/SettingsMenu";
import {
  CustomerCategory,
  CustomerCategoryList,
} from "../Screens/Settings/CustomerCategory";
import { BranchArea, BranchAreaList } from "../Screens/Settings/BranchArea";
import { BranchStaff, BranchStaffList } from "../Screens/Settings/BranchStaff";
import TabToScan from "../Screens/Settings/TabToScan";

const DrawerComponent = ({ userDetails }) => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      backBehavior="history"
      detachInactiveScreens
      drawerType="slide"
      edgeWidth={20}
      screenOptions={{
        unmountOnBlur: true,
      }}
      initialRouteName="Dashboard"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen component={Dashboard} name="Dashboard" />
      <Drawer.Screen
        component={CustomerList}
        name="CustomerList"
        initialParams={userDetails}
      />
      <Drawer.Screen
        component={CustomerForm}
        name="CustomerForm"
        initialParams={userDetails}
      />
      <Drawer.Screen component={VoucherList} name="VoucherList" />
      <Drawer.Screen component={VoucherForm} name="VoucherForm" />
      <Drawer.Screen
        component={Profile}
        name="Profile"
        initialParams={userDetails} // aise krke bhejna hai ok
      />
      {/* --------------------- Products------------------- */}
      <Drawer.Screen component={ProductTabs} name="ProductTabs" />
      <Drawer.Screen component={Products} name="Products" />
      <Drawer.Screen component={Category} name="Category" />
      <Drawer.Screen component={SubCategory} name="SubCategory" />
      <Drawer.Screen component={ProductsPreview} name="ProductsPreview" />

      {/* --------------------- Catalogs------------------- */}
      <Drawer.Screen component={GeneralCatalog} name="GeneralCatalog" />

      {/* --------------------- Settings------------------- */}
      <Drawer.Screen component={SettingsMenu} name="SettingsMenu" />
      <Drawer.Screen
        component={CustomerCategoryList}
        name="CustomerCategoryList"
      />
      <Drawer.Screen component={CustomerCategory} name="CustomerCategory" />
      <Drawer.Screen component={BranchArea} name="BranchArea" />
      <Drawer.Screen component={BranchAreaList} name="BranchAreaList" />
      <Drawer.Screen component={BranchStaff} name="BranchStaff" />
      <Drawer.Screen component={BranchStaffList} name="BranchStaffList" />
      <Drawer.Screen component={TabToScan} name="TabToScan" />
    </Drawer.Navigator>
  );
};

const DrawerContent = (props) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Section>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={{ width: "100%", height: 200 }}
        />
      </Drawer.Section>
      <DrawerContentScrollView {...props}>
        <Drawer.Section title="Menu">
          <Drawer.Item
            icon="home"
            label="Dashboard"
            onPress={() => {
              props.navigation.navigate("Dashboard");
            }}
          />
          <Drawer.Item
            icon="home"
            label="Customer"
            onPress={() => {
              props.navigation.navigate("CustomerList");
            }}
          />
          <Drawer.Item
            icon="home"
            label="Voucher"
            onPress={() => {
              props.navigation.navigate("VoucherList");
            }}
          />
          <Drawer.Item
            icon="home"
            label="Profile"
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          />
          <Drawer.Item
            icon="home"
            label="Products"
            onPress={() => {
              props.navigation.navigate("ProductTabs");
            }}
          />
          <Drawer.Item
            icon="home"
            label="Settings"
            onPress={() => {
              props.navigation.navigate("SettingsMenu");
            }}
          />
          <Drawer.Item
            icon="home"
            label="General Catalogs"
            onPress={() => {
              props.navigation.navigate("GeneralCatalog");
            }}
          />
          <Drawer.Item
            icon="home"
            label="Products Preview"
            onPress={() => {
              props.navigation.navigate("ProductsPreview");
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section title="Quicktagg (1.0.0)">
        <Divider />
        <Drawer.Item
          icon="exit-to-app"
          label="Log Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerComponent;
