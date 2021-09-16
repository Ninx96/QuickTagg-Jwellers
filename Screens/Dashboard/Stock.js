import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions, Alert } from "react-native";
import MyStyles from "../../Styles/MyStyles";
const Stock = (props) => {

  React.useEffect(() => {
   // alert("h");
    let directory = [
      {
        "id": 37,
        "job": "Electrician",
        "name": "Alan"
      },
      {
        "id": 32,
        "job": "Writer",
        "name": "Mark"
      },
      {
        "id": 37,
        "job": "DIY",
        "name": "Alan"
      },
      {
        "id": 134,
        "job": "Director",
        "name": "Philip"
      },
      {
        "id": 37,
        "job": "Plumber",
        "name": "Alan"
      },
      {
        "id": 85,
        "job": "Teacher",
        "name": "Oliver"
      },
      {
        "id": 86,
        "job": "Teacher",
        "name": "Oliver"
      },
    ]

    let newDirectory = Object.values(directory.reduce((acc, item) => {
      if (!acc[item.name]) acc[item.name] = {
        name: item.name,
        job: []
      };
      acc[item.name].job.push(item.job);
      return acc;
    }, {}))

    console.log(newDirectory)
  }, []);
  return (
    <View style={[MyStyles.container, { backgroundColor: "#FFF" }]}>

    </View>
  );
};

export default Stock;
