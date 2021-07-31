import React from "react";
import { View, Image } from "react-native";
import { Drawer, Divider } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { AuthContext } from "./Context";
import { createDrawerNavigator } from "@react-navigation/drawer";

//Screen Imports
import Dashboard from "../Screens/Dashboard";
import { CustomerForm, CustomerList } from "../Screens/Customer";
import { VoucherList, VoucherForm } from "../Screens/Voucher";
import { Profile } from "../Screens/Profile";
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
          header: (props) => <TitleBar {...props} title="Customers" />,
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
          header: (props) => <TitleBar {...props} title="Vouchers" />,
        }}
      />
      <Drawer.Screen
        component={SMS}
        name="SMS"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="SMS" />,
        }}
      />
      <Drawer.Screen
        component={Profile}
        name="Profile"
        initialParams={userDetails} // aise krke bhejna hai ok
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="User Profile" />,
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
          header: (props) => <TitleBar {...props} title="Products" />,
        }}
      />
      <Drawer.Screen
        component={ProductsPreview}
        name="ProductsPreview"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Products" />,
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
          header: (props) => <TitleBar {...props} title="Category" />,
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
      />
      <Drawer.Screen
        component={SubCategoryList}
        name="SubCategoryList"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Subcategory" />,
        }}
      />

      {/* --------------------- Catalogs------------------- */}
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
          header: (props) => <TitleBar {...props} title="General Catalog" />,
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
          header: (props) => <TitleBar {...props} title="Exhibition Catalog" />,
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
          header: (props) => <TitleBar {...props} title="Customer Catalog" />,
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
            <TitleBar {...props} title="Try and Buy Catalog" />
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
          header: (props) => <TitleBar {...props} title="Customer Review" />,
        }}
      />
      <Drawer.Screen
        component={CustomerReviewList}
        name="CustomerReviewList"
        initialParams={userDetails}
      />

      <Drawer.Screen
        component={CustomerFeedback}
        name="CustomerFeedback"
        initialParams={userDetails}
      />

      {/* --------------------- Settings------------------- */}
      <Drawer.Screen
        component={SettingsMenu}
        name="SettingsMenu"
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Settings" />,
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
          header: (props) => <TitleBar {...props} title="Customer Category" />,
        }}
      />
      <Drawer.Screen
        component={BranchArea}
        name="BranchArea"
        initialParams={userDetails}
        options={{
          headerShown: true,
          header: (props) => <TitleBar {...props} title="Branch Area" />,
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
          header: (props) => <TitleBar {...props} title="Branch Staff" />,
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
          header: (props) => <TitleBar {...props} title="Tab to Scan" />,
        }}
      />
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
              props.navigation.navigate("GeneralCatalogList");
            }}
          />
          <Drawer.Item
            icon="home"
            label="ExhibitionCatalog"
            onPress={() => {
              props.navigation.navigate("ExhibitionCatalogList");
            }}
          />
          <Drawer.Item
            icon="home"
            label="CustomerCatalog"
            onPress={() => {
              props.navigation.navigate("CustomerCatalogList");
            }}
          />
          <Drawer.Item
            icon="home"
            label="TryAndBuyCatalog"
            onPress={() => {
              props.navigation.navigate("TryAndBuyCatalogList");
            }}
          />
          <Drawer.Item
            icon="home"
            label="Customer Review"
            onPress={() => {
              props.navigation.navigate("CustomerReviewList");
            }}
          />
          <Drawer.Item
            icon="home"
            label="Customer Feedback"
            onPress={() => {
              props.navigation.navigate("CustomerFeedback");
            }}
          />
          <Drawer.Item
            icon="home"
            label="SMS"
            onPress={() => {
              props.navigation.navigate("SMS");
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
