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
  FAB,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import MyStyles from "../Styles/MyStyles";

const SelectCustomer = ({ visible, multiple = true, data = [], onDone, onClose }) => {
  const [listData, setListData] = useState(data);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [show, setShow] = useState(false);

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
          <View style={[MyStyles.row, { backgroundColor: "#ffba3c", marginTop: 0 }]}>
            <IconButton icon="chevron-left" size={30} color="black" onPress={onClose} />
            {show ? (
              <TextInput
                mode="flat"
                theme={{ colors: { primary: "black" } }}
                style={{ backgroundColor: "rgba(0,0,0,0)", height: 45, width: "60%" }}
                left={<TextInput.Icon name="magnify" />}
                onChangeText={(text) => {}}
                placeholder="Search"
              />
            ) : (
              <Text style={{ fontWeight: "bold", fontSize: 18, flexGrow: 1 }}>
                Select Customers
              </Text>
            )}
            <IconButton
              icon={show ? "close" : "magnify"}
              size={25}
              onPress={() => setShow(!show)}
            />
          </View>
          <FlatList
            data={listData}
            renderItem={({ item, index }) => (
              <List.Item
                style={{ borderBottomColor: "#aaa", borderBottomWidth: 0.5 }}
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
                description={item.mobile + "          " + item.category_name}
                left={() => {
                  return (
                    <TouchableRipple style={MyStyles.squarefixedRatio}>
                      <Text style={{ color: "red" }}>
                        {item.category_name == null ? "" : item.category_name.charAt(0)}
                      </Text>
                    </TouchableRipple>
                  );
                }}
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
        <FAB
          style={{ position: "absolute", bottom: 20, right: 20 }}
          icon="check"
          color="#000"
          onPress={
            multiple
              ? () => {
                  const selectedCustomers = listData.filter((item) => item.selected);
                  onDone(selectedCustomers);
                  onClose();
                }
              : () => {
                  const selectedCustomer = listData.filter((item, index) => index == selectedIndex);
                  onDone(selectedCustomer);
                  onClose();
                }
          }
        />
      </Modal>
    </Portal>
  );
};

export default SelectCustomer;
