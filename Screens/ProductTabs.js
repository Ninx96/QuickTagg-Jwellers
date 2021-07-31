import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyStyles from "../Styles/MyStyles";
import { ProductsList } from "./Products/Products";
import { CategoryList } from "./Products/Category";
import { SubCategoryList } from "./Products/SubCategory";
import CustomHeader from "../Components/CustomHeader";

const ProductTabs = (props) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={MyStyles.container}>
      <Tab.Navigator
        tabBarOptions={{
          style: { backgroundColor: "#ffba3c" },
        }}
      >
        <Tab.Screen
          name="Products"
          component={ProductsList}
          initialParams={props.route.params}
        />
        <Tab.Screen
          name="Category"
          component={CategoryList}
          initialParams={props.route.params}
        />
        <Tab.Screen
          name="SubCategory"
          component={SubCategoryList}
          initialParams={props.route.params}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ProductTabs;
