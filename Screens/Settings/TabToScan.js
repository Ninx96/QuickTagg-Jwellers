import React, { useState, useEffect } from "react";
import { View, ImageBackground, ScrollView } from "react-native";
import { Button, Subheading, Text } from "react-native-paper";
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
            imageStyle={{ alignSelf: "center", width: "60%" }}
            source={require("../../assets/upload.png")}
            onClearImage={() => {}}
            onUploadImage={() => {}}
            label="Choose Logo :"
          />

          <Subheading style={{ marginTop: 40 }}>
            Choose Cover Images :
          </Subheading>
          <MultipleImages onSelect={(files) => {}} data={[]} />

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
