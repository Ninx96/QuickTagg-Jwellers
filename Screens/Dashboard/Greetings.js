import React, { useState, useEffect } from "react";
import { FlatList, View, Linking } from "react-native";
import { List, Text, TouchableRipple, } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { postRequest } from "../../Services/RequestServices";
import MyStyles from "../../Styles/MyStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
const Greetings = (props) => {
    const { userToken, branchId } = props.route.params;
    const [loading, setLoading] = useState(true);
    const [recentdobdoa, setrecentdobdoa] = useState([]);
    React.useEffect(() => {
        postRequest("masters/dashboard/dobAndDoa", { branch_id: branchId }, userToken).then((resp) => {
            if (resp.status == 200) {
                setrecentdobdoa(resp.data);
            } else {
                Alert.alert(
                    "Error !",
                    "Oops! \nSeems like we run into some Server Error"
                );
            }
        });
        setLoading(false);
    }, []);

    return (
        <View>
            <FlatList
                data={recentdobdoa}
                initialNumToRender={10}
                renderItem={({ item, index }) => (
                    <List.Item
                        style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}
                        title={item.full_name}
                        titleStyle={{ fontWeight: "bold" }}
                        description={item.mobile + "          " + item.category_name}
                        left={() => (
                            <TouchableRipple
                                style={MyStyles.squarefixedRatio}
                                onPress={() => {
                                    props.navigation.navigate("Profile", {
                                        customer_id: item.customer_id,
                                    });
                                }}
                            >
                                <Text style={{ color: "red", textTransform: 'uppercase' }}> {item.type == null ? "" : item.type.charAt(0)}</Text>
                            </TouchableRipple>
                        )}
                        right={() => (
                            <View style={MyStyles.row}>
                                {item.doa == 'true' ? <Icon
                                    name="alpha-a-circle-outline"
                                    size={25}
                                    style={{ marginHorizontal: 2, color: 'gold' }}
                                /> : null}
                                {item.dob == 'true' ? <Icon
                                    name="alpha-b-circle-outline"
                                    size={25}
                                    style={{ marginHorizontal: 2, color: 'gold' }}
                                /> : null}
                                <Icon
                                    name="whatsapp"
                                    size={30}
                                    style={{ marginHorizontal: 2, color: 'green', marginLeft: 20 }}
                                    onPress={() => {
                                        Linking.openURL('whatsapp://send?text=&phone=91' + item.mobile);
                                    }}
                                />

                            </View>
                        )}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default Greetings;
