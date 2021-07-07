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

const SelectCustomer = ({ visible, multiple = true, data = [], onDone, onClose }) => {
  const [listData, setListData] = useState(data);
  const [selectedIndex, setselectedIndex] = useState(null);

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
              onPress={
                multiple
                  ? () => {
                      const selectedCustomers = listData.filter((item) => item.selected);
                      onDone(selectedCustomers);
                      onClose();
                    }
                  : () => {
                      const selectedCustomer = listData.filter(
                        (item, index) => index == selectedIndex
                      );
                      onDone(selectedCustomer);
                      onClose();
                    }
              }
            >
              Done
            </Button>
          </View>
          <FlatList
            data={listData}
            renderItem={({ item, index }) => (
              <List.Item
                onPress={
                  multiple
                    ? () => {
                        item.selected = !item.selected;
                        setListData([...listData]);
                      }
                    : () => {
                        if (selectedIndex == index) {
                          setselectedIndex(null);
                        } else {
                          setselectedIndex(index);
                        }
                      }
                }
                title={item.full_name}
                titleStyle={{ fontWeight: "bold" }}
                description={item.mobile}
                left={(props) => <Avatar.Icon icon="account" />} //iski jagah Avatar.Image use krna jab photu lagani ho
                right={() =>
                  multiple ? (
                    <Checkbox status={item.selected ? "checked" : "unchecked"} />
                  ) : (
                    <Checkbox status={selectedIndex == index ? "checked" : "unchecked"} />
                  )
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default SelectCustomer;
