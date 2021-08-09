import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Wishlist from "./Wishlist";
import Live from "./Live";

const Home = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Wishlist} />
      <Stack.Screen name="live" component={Live} />
    </Stack.Navigator>
  );
};

export default Home;
