import React, { useState, useEffect } from "react";
import { ImageBackground, ScrollView, View, FlatList } from "react-native";
import {
  Button,
  Checkbox,
  FAB,
  Text,
  TextInput,
  Card,
  IconButton,
} from "react-native-paper";
import CustomHeader from "../Components/CustomHeader";
import DatePicker from "../Components/DatePicker";
import DropDown from "../Components/DropDown";
import ImageUpload from "../Components/ImageUpload";
import MyStyles from "../Styles/MyStyles";
import moment from "moment";

const VoucherList = (props) => {
  return (
    <View style={MyStyles.container}>
      <CustomHeader {...props} />
      <FlatList
        data={[{}]}
        renderItem={({ item, index }) => (
          <Card
            style={{
              marginHorizontal: 20,
              padding: 0,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <Card.Title
              style={{
                backgroundColor: "pink",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              title="Birthday Voucher"
              titleStyle={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
              }}
            />
            <Card.Content>
              <View style={MyStyles.row}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Flat Rs. 750 Off
                  </Text>
                  <Text style={{ marginBottom: 20 }}>Value => $750</Text>
                  <Text>Red. End Date => 18-02-2021</Text>
                </View>
                <View>
                  <IconButton icon="pencil" />
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FAB
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
        icon="plus"
        onPress={() => props.navigation.navigate("VoucherForm")}
      />
    </View>
  );
};

const VoucherForm = (props) => {
  const template =
    "Dear (Customer Name), (Brand Name) wish you a wonderful BIRHDAY! May this day be filled with happy hours and life with many birthdays. Team Quicktagg";
  return (
    <ImageBackground
      source={require("../assets/login-bg.jpg")}
      style={MyStyles.container}
    >
      <CustomHeader {...props} />
      <ScrollView>
        <View style={MyStyles.cover}>
          <DropDown data={[]} placeholder="Voucher Session Type" />
          <DropDown data={[]} placeholder="Voucher Type" />
          <TextInput
            mode="flat"
            label="Voucher Name"
            placeholder="Voucher Name"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <TextInput
            mode="flat"
            label="Voucher Heading"
            placeholder="Voucher Heading"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <TextInput
            mode="flat"
            label="Voucher Value"
            placeholder="Voucher Value"
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <View style={MyStyles.row}>
            <DatePicker
              label="Start Date"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={moment()}
              onValueChange={(date) => {}}
            />
            <DatePicker
              label="End Date"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={moment()}
              onValueChange={(date) => {}}
            />
          </View>
          <View style={MyStyles.row}>
            <DatePicker
              label="Red. Start Date"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={moment()}
              onValueChange={(date) => {}}
            />
            <DatePicker
              label="Red. End Date"
              inputStyles={{ backgroundColor: "rgba(0,0,0,0)" }}
              value={moment()}
              onValueChange={(date) => {}}
            />
          </View>
          <TextInput
            mode="flat"
            label="SMS Template"
            multiline
            numberOfLines={4}
            editable={false}
            value={template}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <Checkbox.Item label="Disable" onPress={() => {}} />
          <View style={MyStyles.row}>
            <ImageUpload
              label="Voucher Image :"
              source={require("../assets/upload.png")}
              onClearImage={() => {}}
              onUploadImage={() => {}}
            />
            <ImageUpload
              label="Voucher Banner :"
              source={require("../assets/upload.png")}
              onClearImage={() => {}}
              onUploadImage={() => {}}
            />
          </View>
          <View
            style={[
              MyStyles.row,
              { justifyContent: "center", marginVertical: 40 },
            ]}
          >
            <Button mode="contained" uppercase={false}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export { VoucherList, VoucherForm };
