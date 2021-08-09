import React, { useState, useEffect } from "react";

const Live = (props) => {
  return (
    <View style={[MyStyles.container, { backgroundColor: "#FFF" }]}>
      <View style={[MyStyles.row, { justifyContent: "flex-end" }]}>
        <Button mode="text" uppercase={false} compact color="blue" onPress={() => setModal(false)}>
          Close
        </Button>
      </View>

      <FlatList
        data={[{}]}
        renderItem={({ item, index }) => (
          <List.Item
            style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
            title={"Karan"}
            titleStyle={{ fontWeight: "bold" }}
            description={9876543210}
            left={() => (
              <TouchableRipple
                style={MyStyles.squarefixedRatio}
                onPress={() => {
                  props.navigation.navigate("Profile", {
                    customer_id: item.customer_id,
                  });
                }}
              >
                <Text style={{ color: "red" }}>S</Text>
              </TouchableRipple>
            )}
            right={() => (
              <View style={MyStyles.row}>
                <Icon name="cake" size={20} style={{ marginHorizontal: 2 }} />
                <Icon name="inbox" size={20} style={{ marginHorizontal: 2 }} />
                <Icon name="video" size={20} style={{ marginHorizontal: 2 }} />
                <Icon name="heart" size={20} style={{ marginHorizontal: 2 }} />
                <Icon name="phone" size={20} style={{ marginHorizontal: 2 }} />

                <Text
                  style={{
                    fontSize: 12,
                    color: "#888",
                    alignSelf: "flex-start",
                  }}
                >
                  22/05/2021
                </Text>
              </View>
            )}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Live;
