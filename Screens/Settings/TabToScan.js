import React, { useState, useEffect } from "react";
import { View, ImageBackground, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import CustomHeader from "../../Components/CustomHeader";
import ImageUpload from "../../Components/ImageUpload";
import MultipleImages from "../../Components/MultipleImages";
import MyStyles from "../../Styles/MyStyles";

const TabToScan = (props) => {
  return (
    <ImageBackground
      style={MyStyles.container}
      source={require("../../assets/login-bg.jpg")}
    >
      <CustomHeader {...props} />
      <ScrollView>
        <View style={MyStyles.cover}>
          <ImageUpload
            source={require("../../assets/upload.png")}
            onClearImage={() => {}}
            onUploadImage={() => {}}
            label="Choose Logo"
          />
          <Text>Choose Cover Images :</Text>
          <MultipleImages onSelect={(files) => {}} />

          <View
            style={[
              MyStyles.row,
              { justifyContent: "center", marginVertical: 40 },
            ]}
          >
            <Button mode="contained" la uppercase={false} onPress={() => {}}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default TabToScan;
