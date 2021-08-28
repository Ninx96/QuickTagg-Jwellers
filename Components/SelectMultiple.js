import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import {
  Portal,
  Modal,
  IconButton,
  Button,
  Text,
  Card,
  FAB,
  TextInput,
  Avatar,
} from "react-native-paper";
import MyStyles from "../Styles/MyStyles";
import BadgeRibbon from "./BadgeRibbon";

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
                onChangeText={(text) => {}}
                placeholder="Search"
              />
            ) : (
              <Text style={{ fontWeight: "bold", fontSize: 18, flexGrow: 1 }}>
                Select Products
              </Text>
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
              <Card
                style={{
                  margin: 5,
                  borderRadius: 10,
                  width: 120,
                  alignItems: "center",
                }}
                onPress={() => {
                  item.selected = !item.selected;
                  setListData([...listData]);
                }}
              >
                {item.selected && (
                  <Avatar.Icon
                    icon="check"
                    style={{
                      backgroundColor: "blue",
                      position: "absolute",
                      right: 5,
                      top: 5,
                      zIndex: 10,
                    }}
                    color="#FFF"
                    size={15}
                  />
                )}
                {item.exhibition ? (
                  <BadgeRibbon text="E" position="left" />
                ) : null}
                {item.trial ? <BadgeRibbon text="T" position="left" /> : null}
                <Image
                  source={{ uri: item.url_image + "" + item.image_path }}
                  style={{ width: 120, height: 120, zIndex: -50 }}
                />

                <View style={{ padding: 5, paddingVertical: 10 }}>
                  <Text numberOfLines={2}>{item.product_name}</Text>
                  <Text>{item.product_code}</Text>
                </View>
              </Card>
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
