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
                onChangeText={(text) => {
                  const keyword = new RegExp(text.toLowerCase());
                  const filter = data.filter((item, index) => {
                    if (
                      item.product_name.toLowerCase().match(keyword) ||
                      item.product_code.toLowerCase().match(keyword)
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
                  const isSelected = !item.selected;
                  item.selected = isSelected;
                  data[index].selected = isSelected;
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
                  <BadgeRibbon text="E" position="left" color="red" />
                ) : null}
                {item.trial ? <BadgeRibbon text="T" position="right" /> : null}
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
            const selected = data.filter((item) => item.selected);
            onDone(selected);
            onClose();
          }}
        />
        <FAB
          style={{ position: "absolute", bottom: 20, right: 100 }}
          icon="select-all"
          onPress={() => {
            let _selecteddata = [];
            listData.map((resp, index) => {
              _selecteddata.push({
                Metal: resp.Metal,
                category_id: resp.category_id,
                category_name: resp.category_name,
                discounted_price: resp.discounted_price,
                exhibition: resp.exhibition,
                gender: resp.gender,
                image_path: resp.image_path,
                material: resp.material,
                on_demand: resp.on_demand,
                price: resp.price,
                product_code: resp.product_code,
                product_id: resp.product_id,
                product_name: resp.product_name,
                remarks: resp.remarks,
                size_length: resp.size_length,
                subcategory_id: resp.subcategory_id,
                subcategory_name: resp.subcategory_name,
                trial: resp.trial,
                url_image: resp.url_image,
                weight: resp.weight,
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

export default SelectMultiple;
