import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { Portal, Modal, IconButton, Button, Text,Card } from "react-native-paper";
import MyStyles from "../Styles/MyStyles";

const SelectMultiple = ({ visible, data = [], onDone, onClose }) => {
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
              Select Products
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
            style={{ alignSelf: "center" }}
            data={listData}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  item.selected = !item.selected;
                  setListData([...listData]);
                }}
              >
                <Card
            style={{
              margin: 5,
              borderRadius: 10,
              width: 120,
              alignItems: "center",
              borderColor:"black",
              borderWidth: item.selected ? 1 : 0
            }}
            
          >
            <Card.Cover
              source={{ uri: item.url_image + '' + item.image_path }}
              style={{ width: 115, height: 110 }}
            />
            <View style={{ padding: 5 }}>
              <Text>{item.product_name} {item.product_code}</Text>
            </View>
          </Card>
              </TouchableOpacity>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default SelectMultiple;
