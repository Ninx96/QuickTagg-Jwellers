import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import {
  Portal,
  Modal,
  IconButton,
  Button,
  Text,
  List,
  Checkbox,
  Avatar,
} from "react-native-paper";
import MyStyles from "../Styles/MyStyles";

const SelectCustomersMultiple = ({ visible, data = [], onDone, onClose }) => {
  const [listData, setListData] = useState(data);
  useEffect(() => {
    setListData(data);
  }, [data]);
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={{ flex: 1, backgroundColor: "#fff" }}
      >
        <View style={{ flex: 1 }}>
          <View style={MyStyles.row}>
            <IconButton
              icon="chevron-left"
              size={30}
              color="black"
              onPress={onClose}
            />
            <Text style={{ fontWeight: "bold", fontSize: 18, flexGrow: 1 }}>
              Select Customers
            </Text>
            <Button
              mode="text"
              compact
              uppercase={false}
              color="blue"
              style={{ marginRight: 5 }}
              onPress={() => {
                const selected = listData.filter((item) => item.selected);
                onDone(selected);
                onClose();
              }}
            >
              Done
            </Button>
          </View>
          <FlatList
            data={listData}
            renderItem={({ item, index }) => (
              <List.Item
                onPress={() => {
                  item.selected = !item.selected;
                  setListData([...listData]);
                }}
                title="Rahul"
                titleStyle={{ fontWeight: "bold" }}
                description="9716612244"
                left={(props) => <Avatar.Icon icon="account" />} //iski jagah Avatar.Image use krna jab photu lagani ho
                right={() => (
                  <Checkbox status={item.selected ? "checked" : "unchecked"} />
                )}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default SelectCustomersMultiple;
