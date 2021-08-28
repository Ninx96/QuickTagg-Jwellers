import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  configureFonts,
} from "react-native-paper";
import AppLoading from "expo-app-loading";
import * as SecureStore from "expo-secure-store";
import * as Font from "expo-font";

import { AuthContext } from "./Components/Context";

import Login from "./Screens/Auth/Login";
import DrawerComponent from "./Components/DrawerComponent";

export default function App() {
  const [fontsLoaded, setFontLoaded] = React.useState(false);

  const getFonts = () =>
    Font.loadAsync({
      "helvetica-regular": require("./assets/fonts/regular.otf"),
      "helvetica-medium": require("./assets/fonts/medium.otf"),
      "helvetica-bold": require("./assets/fonts/bold.otf"),
    });

  const fontConfig = {
    default: {
      regular: {
        fontFamily: "helvetica-regular",
      },
      medium: {
        fontFamily: "helvetica-medium",
      },
      bold: {
        fontFamily: "helvetica-bold",
      },
    },
  };

  const PaperTheme = {
    ...PaperDefaultTheme,
    mode: "adaptive",

    colors: {
      ...PaperDefaultTheme.colors,
      primary: "#ffba3c",
      accent: "#ffba3c",
    },
    fonts: configureFonts(fontConfig),
  };

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    branchId: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          branchId: action.branch_id,
          userName: action.user_name,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          branchId: action.branch_id,
          userName: action.user_name,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          branchId: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async ({ userToken, userName, branchId }) => {
        try {
          await SecureStore.setItemAsync("userToken", userToken);
          await SecureStore.setItemAsync("userName", userName);
          await SecureStore.setItemAsync("branchId", String(branchId));
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: "LOGIN",
          user_name: userName,
          token: userToken,
          branch_id: branchId,
        });
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      userToken: async () => {
        try {
          const userToken = await SecureStore.getItemAsync("userToken");
          return userToken;
        } catch (e) {
          console.log(e);
        }
      },
    }),
    []
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      let userName = null;
      let branchId = null;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
        userName = await SecureStore.getItemAsync("userName");
        branchId = await SecureStore.getItemAsync("branchId");
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: "RETRIEVE_TOKEN",
        token: userToken,
        user_name: userName,
        branch_id: branchId,
      });
    }, 1000);
  }, []);

  if (!loginState.loading && fontsLoaded) {
    return (
      <PaperProvider theme={PaperTheme}>
        <AuthContext.Provider value={authContext}>
          <StatusBar hidden={false} style="light" barStyle={"default"} />
          <NavigationContainer>
            {loginState.userToken !== null ? (
              <DrawerComponent userDetails={loginState} />
            ) : (
              <Login />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onError={console.warn}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
}
