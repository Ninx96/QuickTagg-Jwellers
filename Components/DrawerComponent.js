import React from "react";
import { View, Image, ScrollView } from "react-native";
import {
  Drawer,
  Divider,
  IconButton,
  Avatar,
  TouchableRipple,
} from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { AuthContext } from "./Context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Linking from "expo-linking";

//Screen Imports
import Dashboard from "../Screens/Dashboard";
import { CustomerForm, CustomerList } from "../Screens/Customer";
import { VoucherList, VoucherForm } from "../Screens/Voucher";
import { CustomerVoucherList, Profile } from "../Screens/Profile";
import {
  ProductsForm,
  ProductsPreview,
  ProductsList,
} from "../Screens/Products/Products";
import { CategoryForm, CategoryList } from "../Screens/Products/Category";
import {
  SubCategoryForm,
  SubCategoryList,
} from "../Screens/Products/SubCategory";
import ProductTabs from "../Screens/ProductTabs";
import {
  GeneralCatalog,
  GeneralCatalogList,
} from "../Screens/Catalogs/GeneralCatalog";
import SettingsMenu from "../Screens/SettingsMenu";
import {
  CustomerCategory,
  CustomerCategoryList,
} from "../Screens/Settings/CustomerCategory";
import { BranchStaff, BranchStaffList } from "../Screens/Settings/BranchStaff";
import { BranchArea, BranchAreaList } from "../Screens/Settings/BranchArea";
import TabToScan from "../Screens/Settings/TabToScan";
import {
  ExhibitionCatalog,
  ExhibitionCatalogList,
} from "../Screens/Catalogs/ExhibitionCatalog";
import {
  CustomerCatalog,
  CustomerCatalogList,
} from "../Screens/Catalogs/CustomerCatalog";
import {
  TryAndBuyCatalog,
  TryAndBuyCatalogList,
} from "../Screens/Catalogs/TryAndBuyCatalog";
import {
  CustomerReview,
  CustomerReviewList,
} from "../Screens/Reviews&Feedbacks/CustomerReview";
import CustomerFeedback from "../Screens/Reviews&Feedbacks/CustomerFeedback";
import SMS from "../Screens/SMS";
import TitleBar from "./TitleBar";
import ReviewTabs from "../Screens/ReviewTabs";
import Greetings from "../Screens/Dashboard/Greetings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RecentActivity from "../Screens/Dashboard/RecentActivity";
import Catalogs from "../Screens/Catalogs";
import MyStyles from "../Styles/MyStyles";

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
      drawerStyle={{ width: "50%" }}
    >
      <Drawer.Screen
        component={Dashboard}
        name="Dashboard"
        initialParams={userDetails}
      />
      <Drawer.Screen
        component={Dashboard}
        name="GraphView"
        initialParams={userDetails}
      />
      <Drawer.Screen
        component={CustomerList}
        name="CustomerList"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Customers" />,
        }}
      />
      <Drawer.Screen
        component={CustomerForm}
        name="CustomerForm"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Add Customer" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={VoucherList}
        name="VoucherList"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Vouchers" />,
        }}
      />
      <Drawer.Screen
        component={VoucherForm}
        name="VoucherForm"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Add Vouchers" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={SMS}
        name="SMS"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="SMS" disableSearch />,
        }}
      />
      <Drawer.Screen
        component={Profile}
        name="Profile"
        initialParams={userDetails} // aise krke bhejna hai ok
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="User Profile" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={CustomerVoucherList}
        name="CustomerVoucherList"
        initialParams={userDetails} // aise krke bhejna hai ok
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Voucher List" />,
        }}
      />
      {/* --------------------- Products------------------- */}
      <Drawer.Screen
        component={ProductTabs}
        name="ProductTabs"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Products" />,
        }}
      />
      <Drawer.Screen
        component={ProductsForm}
        name="ProductsForm"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Add Products" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={ProductsPreview}
        name="ProductsPreview"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Product Details" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={ProductsList}
        name="ProductsList"
        initialParams={userDetails}
      />
      <Drawer.Screen
        component={CategoryForm}
        name="CategoryForm"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Add Category" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={CategoryList}
        name="CategoryList"
        initialParams={userDetails}
      />
      <Drawer.Screen
        component={SubCategoryForm}
        name="SubCategoryForm"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Add Subcategory" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={SubCategoryList}
        name="SubCategoryList"
        initialParams={userDetails}
      />

      {/* --------------------- Catalogs------------------- */}
      <Drawer.Screen
        component={Catalogs}
        name="Catalogs"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Catalog" disableSearch />
          ),
        }}
      />

      <Drawer.Screen
        component={GeneralCatalogList}
        name="GeneralCatalogList"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="General Catalog" />,
        }}
      />
      <Drawer.Screen
        component={GeneralCatalog}
        name="GeneralCatalog"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="General Catalog" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={ExhibitionCatalogList}
        name="ExhibitionCatalogList"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Exhibition Catalog" />,
        }}
      />
      <Drawer.Screen
        component={ExhibitionCatalog}
        name="ExhibitionCatalog"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Exhibition Catalog" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={CustomerCatalogList}
        name="CustomerCatalogList"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Customer Catalog" />,
        }}
      />
      <Drawer.Screen
        component={CustomerCatalog}
        name="CustomerCatalog"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Customer Catalog" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={TryAndBuyCatalogList}
        name="TryAndBuyCatalogList"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Try and Buy Catalog" />
          ),
        }}
      />
      <Drawer.Screen
        component={TryAndBuyCatalog}
        name="TryAndBuyCatalog"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Try and Buy Catalog" disableSearch />
          ),
        }}
      />
      {/* ----------------------Review & FeedBack----------- */}

      <Drawer.Screen
        component={CustomerReview}
        name="CustomerReview"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Customer Review" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={ReviewTabs}
        name="ReviewFeedback"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Reviews" disableSearch />
          ),
        }}
      />

      {/* --------------------- Settings------------------- */}
      <Drawer.Screen
        component={SettingsMenu}
        name="SettingsMenu"
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Settings" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={CustomerCategoryList}
        name="CustomerCategoryList"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Customer Category" />,
        }}
      />
      <Drawer.Screen
        component={CustomerCategory}
        name="CustomerCategory"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Customer Category" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={BranchArea}
        name="BranchArea"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Branch Area" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={BranchAreaList}
        name="BranchAreaList"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Branch Area" />,
        }}
      />
      <Drawer.Screen
        component={BranchStaff}
        name="BranchStaff"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Branch Staff" disableSearch />
          ),
        }}
      />
      <Drawer.Screen
        component={BranchStaffList}
        name="BranchStaffList"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Branch Staff" />,
        }}
      />
      <Drawer.Screen
        component={TabToScan}
        name="TabToScan"
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Tab to Scan" disableSearch />
          ),
        }}
      />

      <Drawer.Screen
        component={Greetings}
        name="Greetings"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <TitleBar {...props} title="Greetings 🎂" disableSearch />
          ),
        }}
      />

      <Drawer.Screen
        component={RecentActivity}
        name="RecentActivity"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Recent Activity" />,
        }}
      />
    </Drawer.Navigator>
  );
};

const DrawerContent = (props) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Section style={{ marginBottom: 20 }}>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={{ width: "100%", height: 150 }}
        />
      </Drawer.Section>

      <ScrollView {...props}>
        <Drawer.Item
          label="Dashboard"
          onPress={() => {
            props.navigation.navigate("Dashboard");
          }}
        />
        <Drawer.Item
          label="Customer"
          onPress={() => {
            props.navigation.navigate("CustomerList");
          }}
        />
        <Drawer.Item
          label="Products"
          onPress={() => {
            props.navigation.navigate("ProductTabs");
          }}
        />

        <Drawer.Item
          label="Catalogs"
          onPress={() => {
            props.navigation.navigate("Catalogs");
          }}
        />

        <Drawer.Item
          label="Voucher"
          onPress={() => {
            props.navigation.navigate("VoucherList");
          }}
        />

        <Drawer.Item
          label="SMS"
          onPress={() => {
            props.navigation.navigate("SMS");
          }}
        />

        <Drawer.Item
          label="Settings"
          onPress={() => {
            props.navigation.navigate("SettingsMenu");
          }}
        />

        <Drawer.Item
          label="Reviews"
          onPress={() => {
            props.navigation.navigate("ReviewFeedback");
          }}
        />

        <Drawer.Item
          label="Log Out"
          onPress={() => {
            signOut();
          }}
        />
      </ScrollView>

      <Drawer.Section title="Quicktagg (1.0.0)">
        <Divider />
        <View style={[MyStyles.row, { justifyContent: "space-evenly" }]}>
          <TouchableRipple onPress={() => Linking.openURL("tel:9874561230")}>
            <Avatar.Icon
              icon="phone"
              size={40}
              style={{ backgroundColor: "#2E86C1" }}
            />
          </TouchableRipple>
          <TouchableRipple
            onPress={() =>
              Linking.openURL("whatsapp://send?text=&phone=91" + "9874561230")
            }
          >
            <Avatar.Icon
              icon="whatsapp"
              size={40}
              style={{ backgroundColor: "green" }}
            />
          </TouchableRipple>
        </View>
      </Drawer.Section>
    </View>
  );
};

export default DrawerComponent;
