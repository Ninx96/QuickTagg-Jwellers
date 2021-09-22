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

const SelectCustomer = ({
  visible,
  multiple = true,
  data = [],
  onDone,
  onClose,
}) => {
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
          <View
            style={[MyStyles.row, { backgroundColor: "#ffba3c", marginTop: 0 }]}
          >
            <IconButton
              icon="chevron-left"
              size={30}
              color="black"
              onPress={onClose}
            />
            {show ? (
              <TextInput
                mode="flat"
                theme={{ colors: { primary: "black" } }}
                style={{
                  backgroundColor: "rgba(0,0,0,0)",
                  height: 45,
                  width: "60%",
                }}
                left={<TextInput.Icon name="magnify" />}
                onChangeText={(text) => {
                  const keyword = new RegExp(text.toLowerCase());
                  const filter = data.filter((item, index) => {
                    if (
                      (item.full_name &&
                        item.full_name.toLowerCase().match(keyword)) ||
                      item.mobile.toLowerCase().match(keyword)
                    ) {
                      return true;
                    }
                    return false;
                  });
                  setListData(filter);
                }}
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
                        const isSelected = !item.selected;
                        item.selected = isSelected;
                        data[index].selected = isSelected;
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
                        {item.category_name == null
                          ? ""
                          : item.category_name.charAt(0)}
                      </Text>
                    </TouchableRipple>
                  );
                }}
                right={() =>
                  multiple ? (
                    <Checkbox
                      status={item.selected ? "checked" : "unchecked"}
                    />
                  ) : (
                    <Checkbox
                      status={selectedIndex == index ? "checked" : "unchecked"}
                    />
                  )
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <FAB
          style={{ position: "absolute", bottom: 20, right: 40 }}
          icon="check"
          color="#000"
          onPress={
            multiple
              ? () => {
                  const selectedCustomers = data.filter(
                    (item) => item.selected
                  );
                  onDone(selectedCustomers);
                  onClose();
                }
              : () => {
                  const selectedCustomer = data.filter(
                    (item, index) => index == selectedIndex
                  );
                  onDone(selectedCustomer);
                  onClose();
                }
          }
        />
        <FAB
          style={{ position: "absolute", bottom: 20, right: 110 }}
          icon="select-all"
          color="#000"
          onPress={() => {
            let _selecteddata = [];
            listData.map((resp, index) => {
              _selecteddata.push({
                category_name: resp.category_name,
                customer_id: resp.customer_id,
                full_name: resp.full_name,
                mobile: resp.mobile,
                type: resp.type,
                selected: true,
              });
            });
            setListData(_selecteddata);
          }}
        />
      </Modal>
    </Portal>
  );
};

export default SelectCustomer;
