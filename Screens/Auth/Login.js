import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
} from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { AuthContext } from "../../Components/Context";
import { authRequest } from "../../Services/RequestServices";
import MyStyles from "../../Styles/MyStyles";

const Login = () => {
  const { signIn } = React.useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [param, setParam] = useState({
    user_name: "",
    password: "",
    otp: "",
  });

  return (
    <ImageBackground style={{ flex: 1 }} source={require("../../assets/login-bg.jpg")}>
      <SafeAreaView style={[MyStyles.container, { paddingTop: "40%", backgroundColor: "" }]}>
        <View style={{ alignContent: "center" }}>
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 350, resizeMode: "contain", marginBottom: 40 }}
          />
          <KeyboardAvoidingView style={{ paddingHorizontal: 40 }}>
            <TextInput
              mode="outlined"
              placeholder="Mobile"
              maxLength={10}
              keyboardType="number-pad"
              disabled={loading}
              style={{
                //  backgroundColor: "rgba(255,255,255,0)",
                marginBottom: 20,
              }}
              left={
                <TextInput.Icon color="#555" size={25} style={{ marginBottom: 0 }} name="phone" />
              }
              value={param.user_name}
              onChangeText={(text) => setParam({ ...param, user_name: text })}
            />

            <TextInput
              mode="outlined"
              placeholder="Password"
              secureTextEntry={secureText}
              disabled={loading}
              style={{
                //  backgroundColor: "rgba(255,255,255,0)",
                marginBottom: 20,
              }}
              left={
                <TextInput.Icon color="#555" size={25} style={{ marginBottom: 0 }} name="lock" />
              }
              right={
                <TextInput.Icon
                  color="#aaa"
                  size={25}
                  style={{ marginBottom: 0 }}
                  name={secureText ? "eye" : "eye-off"}
                  onPress={() => setSecureText(!secureText)}
                  forceTextInputFocus={false}
                />
              }
              value={param.password}
              onChangeText={(text) => setParam({ ...param, password: text })}
            />
            {otp && (
              <TextInput
                mode="outlined"
                placeholder="Otp"
                maxLength={6}
                keyboardType="name-phone-pad"
                disabled={loading}
                secureTextEntry={false}
                // style={{ backgroundColor: "rgba(255,255,255,0)" }}
                left={
                  <TextInput.Icon color="#555" size={25} style={{ marginBottom: 0 }} name="lock" />
                }
                value={param.otp}
                onChangeText={(text) => setParam({ ...param, otp: text })}
              />
            )}
            <View style={[MyStyles.row, { justifyContent: "center", marginTop: 20 }]}>
              <Button
                color="#ffba3c"
                mode="contained"
                uppercase={false}
                loading={loading}
                disabled={loading}
                onPress={() => {
                  setLoading(true);
                  if (otp) {
                    authRequest("branch/token", param).then((resp) => {
                      if (resp.status == 200) {
                        signIn({
                          userToken: resp.data.access_token,
                          userName: resp.data.company_name,
                          branchId: resp.data.branch_id,
                        });
                      } else {
                        Alert.alert("Error !", "Oops! \nSeems like we run into some Server Error");
                      }
                      setLoading(false);
                    });
                  } else {
                    authRequest("branch/login", param).then((resp) => {
                      if (resp.status == 200) {
                        if (resp.data[0].valid) {
                          setOtp(true);
                        } else {
                          Alert.alert("Error !", resp.error);
                        }
                      } else {
                        Alert.alert("Error !", "Oops! \nSeems like we run into some Server Error");
                      }
                      setLoading(false);
                    });
                  }
                }}
              >
                {!otp ? "Send Otp" : "Login"}
              </Button>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
