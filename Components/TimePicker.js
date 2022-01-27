import React, { useState, useEffect } from "react";

import { TextInputMask } from "react-native-masked-text";
import {
  TouchableRipple,
  TextInput,
  Portal,
  Button,
  IconButton,
} from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const TimePicker = ({
  value,
  onValueChange,
  label,
  style,
  containerStyle,
  disabled,
  error,
  mode = "time",
}) => {
  const [android, setAndroid] = useState(false);
  const [ios, setIos] = useState(false);
  return (
    <View>
      {android && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={mode}
          onChange={(event, selectedDate) => {
            setIos(false);
            setAndroid(false);
            onValueChange(selectedDate);
          }}
        />
      )}
      {ios && (
        <Portal>
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                width: "100%",
                backgroundColor: "#E5E4E2",
              }}
            >
              <Button
                labelStyle={{ fontSize: 18 }}
                mode="text"
                uppercase={false}
                color="#007AFF"
                onPress={() => setIos(false)}
              >
                Done
              </Button>
            </View>
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={mode}
              display="spinner"
              onChange={(event, selectedDate) => {
                onValueChange(selectedDate);
              }}
            />
          </View>
        </Portal>
      )}
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS == "ios") {
            setIos(true);
          } else {
            setAndroid(true);
          }
        }}
      >
        <TextInput
          keyboardType="number-pad"
          maxLength={10}
          mode="flat"
          disabled={disabled}
          error={error ? true : false}
          style={style}
          value={moment(value)
            .format(mode == "date" ? "DD/MM/YYYY" : "hh:mm A")
            .toString()}
          editable={false}
          render={(props) => (
            <TextInputMask
              {...props}
              type={"custom"}
              options={{
                mask: mode == "date" ? "99/99/9999" : "99:99 AA",
              }}
            />
          )}
          right={
            <TextInput.Icon
              disabled={disabled}
              theme={{ colors: { text: "#22356A" } }}
              size={30}
              style={{ marginBottom: 0 }}
              name={mode == "date" ? "calendar" : "clock-outline"}
              forceTextInputFocus={false}
              onPress={() => {
                if (Platform.OS == "ios") {
                  setIos(true);
                } else {
                  setAndroid(true);
                }
              }}
            />
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "#d9534f",
    marginTop: 5,
  },
  label: {
    fontWeight: "bold",
  },
});

export default TimePicker;
