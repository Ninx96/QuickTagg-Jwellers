import React, { useState, useEffect } from "react";
import { Alert, ImageBackground, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import MyStyles from "../Styles/MyStyles";

const SMS = (props) => {
  const [param, setParam] = useState({
    var_1: "",
    var_2: "",
  });
  const [selected, setSelected] = useState(false);
  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../assets/login-bg.jpg")}
    >
      <ScrollView>
        <Card
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Card.Title
            title="OTP"
            right={() => (
              <IconButton
                icon="pencil"
                onPress={() => {
                  if (selected != 1) {
                    return setSelected(1);
                  }
                  setSelected(false);
                }}
              />
            )}
          />
          <Card.Content>
            <Text>
              Dear {param?.var_1 || "#VAR1#"},this is your one-time password
              (OTP) for login. Please enter the OTP to proceed. Team{" "}
              {param?.var_2 || "#VAR2#"}.
            </Text>
            <Checkbox.Item
              label="Active"
              status="checked"
              onPress={() => {
                Alert.alert(
                  "Are you sure ?",
                  "This message will not be sent to the users",
                  [
                    {
                      text: "No",
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => {},
                    },
                  ],
                  { cancelable: false }
                );
              }}
            />

            {selected == 1 && (
              <View style={styles.form}>
                <View style={styles.form__control}>
                  <Text style={styles.form__control__label}>Var 1</Text>
                  <TextInput
                    mode="flat"
                    placeholder="Var 1"
                    style={styles.form__control__input}
                    onChangeText={(text) => setParam({ ...param, var_1: text })}
                  />
                </View>

                <View style={styles.form__control}>
                  <Text style={styles.form__control__label}>Var 2</Text>
                  <TextInput
                    mode="flat"
                    placeholder="Var 1"
                    style={styles.form__control__input}
                    onChangeText={(text) => setParam({ ...param, var_2: text })}
                  />
                </View>

                <Button
                  mode="contained"
                  style={styles.form__control__submit}
                  onPress={() => setSelected(false)}
                >
                  Save
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>

        <Card
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Card.Title title="Welcome" />
          <Card.Content>
            <Text>
              Dear #var#, welcome to #var# prestigious #var#, MALIRAM JEWELLERS!
              We honoured and hope you will have a great experience.
            </Text>
            <Checkbox.Item label="Active" status="checked" />
          </Card.Content>
        </Card>

        <Card
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Card.Title title="Birthday" />
          <Card.Content>
            <Text>
              Dear #var#, MALIRAM JEWELLERS wish you a wonderful BIRTHDAY! May
              this day be filled with many happy hours and your life with many
              birthdays
            </Text>
            <Checkbox.Item label="Active" status="checked" />
          </Card.Content>
        </Card>

        <Card
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Card.Title title="ANNIVERSAY" />
          <Card.Content>
            <Text>
              Dear #var#, MALIRAM JEWELLERS wishing you a HAPPY ANNIVERSARY!
              Wishing you all the happiness and love in the world.
              Congratulation.
            </Text>
            <Checkbox.Item label="Active" status="checked" />
          </Card.Content>
        </Card>

        <Card
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Card.Title title="REFERRENCE" />
          <Card.Content>
            <Text>
              Dear #var#, thanks for referring #var# to #var#. We are grateful
              for your love and support. Team MALIRAM JEWELLERS
            </Text>
            <Checkbox.Item label="Active" status="checked" />
          </Card.Content>
        </Card>

        <Card
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Card.Title title="UPLOAD DESIGN" />
          <Card.Content>
            <Text>
              Dear #var#, thank you for sharing designs. We appreciate and will
              try to get back to you with the closet we have. Team MALIRAM
              JEWELLERS.
            </Text>
            <Checkbox.Item label="Active" status="checked" />
          </Card.Content>
        </Card>

        <Card
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Card.Title title="THANK YOU" />
          <Card.Content>
            <Text>
              Dear #var#, thank you for visiting MALIRAM JEWELLERS. Hope you had
              a great experience. Kindly contact us #var# for any assistance.
            </Text>
            <Checkbox.Item label="Active" status="checked" />
          </Card.Content>
        </Card>

        <Card
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Card.Title title="RATE US" />
          <Card.Content>
            <Text>
              Dear #var#, Please rate us at http://j.quicktagg.com/#var#. Team
              MALIRAM JEWELLERS. Thank you
            </Text>
            <Checkbox.Item label="Active" status="checked" />
          </Card.Content>
        </Card>

        <Card
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Card.Title title="GENERAL, TRY AT HOME, BUSINESS CATALOGUE" />
          <Card.Content>
            <Text>
              Dear #var#, just click http://j.quicktagg.com/#var# to check our
              #var#. Team MALIRAM JEWELLERS. Thank you.
            </Text>
            <Checkbox.Item label="Active" status="checked" />
          </Card.Content>
        </Card>

        <Card
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Card.Title title="CUSTOMISED CATALOGUE" />
          <Card.Content>
            <Text>
              Dear #var#, just click http://j.quicktagg.com/#var# to check
              #var#. Team MALIRAM JEWELLERS. Thank you.
            </Text>
            <Checkbox.Item label="Active" status="checked" />
          </Card.Content>
        </Card>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  form: {},
  form__control: {
    marginBottom: 10,
  },
  form__control__input: {
    height: 40,
    backgroundColor: "#FFF",
  },
  form__control__submit: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  form__control__label: {
    paddingLeft: 10,
  },
});

export default SMS;
