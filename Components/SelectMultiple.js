import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { Portal, Modal, IconButton, Button, Text, Card, FAB, TextInput } from "react-native-paper";
import MyStyles from "../Styles/MyStyles";

const SelectMultiple = ({ visible, data = [], onDone, onClose }) => {
  const [show, setShow] = useState(false);
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
              <Text style={{ fontWeight: "bold", fontSize: 18, flexGrow: 1 }}>Select Products</Text>
            )}
            <IconButton
              icon={show ? "close" : "magnify"}
              size={25}
              onPress={() => setShow(!show)}
            />
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
                <View>
                  {item.selected ? (
                    <IconButton
                      icon="check"
                      style={{
                        backgroundColor: "blue",
                        position: "relative",
                        left: 85,
                        top: 18,
                        zIndex: 10,
                      }}
                      color="#FFF"
                      size={10}
                    />
                  ) : (
                    <View style={{ height: 27 }}></View>
                  )}
                  <View
                    key={index}
                    style={{
                      borderWidth: 0.5,
                      borderColor: "#000",
                      backgroundColor: "#FFF",
                      marginHorizontal: 5,
                      borderRadius: 10,
                      width: 100,
                      alignItems: "center",
                      zIndex: 1,
                    }}
                  >
                    <Card.Cover
                      source={{ uri: item.url_image + "" + item.image_path }}
                      style={{ width: 98, height: 80, borderRadius: 10 }}
                    />

                    <View style={{ padding: 5 }}>
                      <Text numberOfLines={2}>{item.product_name}</Text>
                      <Text>{item.product_code}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <FAB
          style={{ position: "absolute", bottom: 20, right: 20 }}
          icon="check"
          onPress={() => {
            const selected = listData.filter((item) => item.selected);
            onDone(selected);
            onClose();
          }}
        />
      </Modal>
    </Portal>
  );
};

export default SelectMultiple;
