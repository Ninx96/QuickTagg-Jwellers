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

const SelectCustomerSingle = ({ visible, multiple = true, data = [], onDone, onClose }) => {
  const [listData, setListData] = useState(data);
  const [selected, setSelected] = useState(null);

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
            <IconButton icon="chevron-left" size={30} color="black" onPress={onClose} />
            <Text style={{ fontWeight: "bold", fontSize: 18, flexGrow: 1 }}>Select Customers</Text>
            <Button
              mode="text"
              compact
              uppercase={false}
              color="blue"
              style={{ marginRight: 5 }}
              onPress={() => {
                const selectedCustomer = listData.filter((item, index) => index == selected);
                onDone(selectedCustomer);
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
                  if (selected == index) {
                    setSelected(null);
                  } else {
                    setSelected(index);
                  }
                }}
                title="Rahul"
                titleStyle={{ fontWeight: "bold" }}
                description="9716612244"
                left={(props) => <Avatar.Icon icon="account" />} //iski jagah Avatar.Image use krna jab photu lagani ho
                right={() => <Checkbox status={selected == index ? "checked" : "unchecked"} />}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default SelectCustomerSingle;
