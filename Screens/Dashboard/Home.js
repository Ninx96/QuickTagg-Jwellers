import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions, Alert } from "react-native";
import { Button, Card, DataTable, IconButton, Text, List } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import MyStyles from "../../Styles/MyStyles";
import { LineChart, PieChart } from "react-native-chart-kit";
import DatePicker from "../../Components/DatePicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { postRequest } from "../../Services/RequestServices";
import moment from "moment";
import { LinearGradient } from 'expo-linear-gradient';

const Home = (props) => {
    const { userToken, branchId } = props.route.params;
    const [loading, setLoading] = useState(true);
    const [param, setparam] = useState({
        from_date: moment(),
        to_date: moment(),
    });
    const [visible, setVisible] = useState({
        customers_graph: false,
        new_customer_chart: false,
        not_response_chart: false,
        cart_graph: false,
        voucher_graph: false,
        video_call_graph: false,
        missed_call_graph: false,
        cart_graph: false,
        stock_graph: false,
    });
    const [figures, setfigures] = useState({
        total_customers: '',
        total_customer_visits: '',
        total_customer_estore: '',
        total_customer_exhibition: '',
        new_customers: '',
        total_notVisitCustomer: '',
        total_cart: '',
        total_cart_exhibition: '',
        total_cart_upload: '',
        total_cart_wishlist: '',
        new_customer_estore: '',
        new_customer_visits: '',
        new_customer_exhibition: '',
        total_notVisitCustomer_estore: '',
        total_notVisitCustomer_visits: '',
        total_notVisitCustomer_exhibition: '',
        total_voucher_active: '',
        total_voucher_redeem: '',
        total_voucher_expired: '',
        today_sms_count: '',
        total_sms_count: '',
        vCall_request: '',
        vCall_accept: '',
        vCall_done: '',
        missedCall_request: '',
        missedCall_accept: '',
        missedCall_done: '',
        total_products_count: '',
        total_products_qty_count: '',
    });
    const [categoryscountlist, setcategoryscountlist] = useState([]);
    const [chartData1, setChartData1] = React.useState({
        chartDataLabels: [0],
        chartDataEstore: [0],
        chartDataVisits: [0],
        chartDataExhibition: [0],
    });
    const [chartData2, setChartData2] = React.useState({
        chartDataLabels: [0],
        chartDataWishlist: [0],
        chartDataUploads: [0],
        chartDataExhibition: [0],
    });
    const [chartData3, setChartData3] = React.useState({
        chartDataLabels: [0],
        chartDataActive: [0],
        chartDataRedeem: [0],
        chartDataExpired: [0],
    });
    const [chartData4, setChartData4] = React.useState({
        chartDataLabels: [0],
        chartDataRequest: [0],
        chartDataAccept: [0],
        chartDataDone: [0],
    });
    const [chartData5, setChartData5] = React.useState({
        chartDataLabels: [0],
        chartDataRequest: [0],
        chartDataAccept: [0],
        chartDataDone: [0],
    });
    React.useEffect(() => {
        Refresh();
    }, []);
    const Refresh = () => {
        AllFigures();
        CustomersGraphFigures();
        CartGraphFigures();
        VoucherGraphFigures();
        VideoGraphFigures();
        MissedGraphFigures();
        ProductCategorysCountList();
        setLoading(false);
    }

    const AllFigures = () => {
        postRequest("masters/dashboard/figures", { branch_id: branchId, from_date: param.from_date, to_date: param.to_date }, userToken).then((resp) => {
            if (resp.status == 200) {
                // console.log(resp.data[0]);
                figures.total_customers = resp.data[0].total_customers;
                figures.total_customer_visits = resp.data[0].total_customer_visits;
                figures.total_customer_estore = resp.data[0].total_customer_estore;
                figures.total_customer_exhibition = resp.data[0].total_customer_exhibition;

                figures.new_customers = resp.data[0].new_customers;

                figures.total_notVisitCustomer = resp.data[0].total_notVisitCustomer;

                figures.total_cart = resp.data[0].total_cart;
                figures.total_cart_exhibition = resp.data[0].total_cart_exhibition;
                figures.total_cart_upload = resp.data[0].total_cart_upload;
                figures.total_cart_wishlist = resp.data[0].total_cart_wishlist;

                figures.new_customer_estore = resp.data[0].new_customer_estore;
                figures.new_customer_visits = resp.data[0].new_customer_visits;
                figures.new_customer_exhibition = resp.data[0].new_customer_exhibition;
                figures.total_notVisitCustomer_estore = resp.data[0].total_notVisitCustomer_estore;
                figures.total_notVisitCustomer_visits = resp.data[0].total_notVisitCustomer_visits;
                figures.total_notVisitCustomer_exhibition = resp.data[0].total_notVisitCustomer_exhibition;

                figures.total_voucher_active = resp.data[0].total_voucher_active;
                figures.total_voucher_redeem = resp.data[0].total_voucher_redeem;
                figures.total_voucher_expired = resp.data[0].total_voucher_expired;
                figures.today_sms_count = resp.data[0].today_sms_count;
                figures.total_sms_count = resp.data[0].total_sms_count;

                figures.vCall_request = resp.data[0].vCall_request;
                figures.vCall_accept = resp.data[0].vCall_accept;
                figures.vCall_done = resp.data[0].vCall_done;
                figures.missedCall_request = resp.data[0].missedCall_request;
                figures.missedCall_accept = resp.data[0].missedCall_accept;
                figures.missedCall_done = resp.data[0].missedCall_done;

                figures.total_products_count = resp.data[0].total_products_count;
                figures.total_products_qty_count = resp.data[0].total_products_qty_count;
                setfigures({ ...figures });

            } else {
                Alert.alert(
                    "Error !",
                    "Oops! \nSeems like we run into some Server Error"
                );
            }
        });
    }

    const ProductCategorysCountList = () => {
        postRequest("masters/dashboard/productCategorysCountList?", { branch_id: branchId, from_date: param.from_date, to_date: param.to_date }, userToken).then((resp) => {
            if (resp.status == 200) {
                setcategoryscountlist(resp.data);
            } else {
                Alert.alert(
                    "Error !",
                    "Oops! \nSeems like we run into some Server Error"
                );
            }
        });
    }
    //---------------Customer Graph Data--------------------------//
    const CustomersGraphFigures = () => {
        postRequest("masters/dashboard/customer_graph", { branch_id: branchId, from_date: param.from_date, to_date: param.to_date }, userToken).then((resp) => {
            if (resp.status == 200) {
                chartData1.chartDataLabels = [0];
                chartData1.chartDataEstore = [0];
                chartData1.chartDataVisits = [0];
                chartData1.chartDataExhibition = [0];
                for (const itemObj of resp.data) {
                    chartData1.chartDataLabels.push(itemObj.date);
                    chartData1.chartDataEstore.push(itemObj.estore);
                    chartData1.chartDataVisits.push(itemObj.visits);
                    chartData1.chartDataExhibition.push(itemObj.exhibitions);
                }
            } else {
                Alert.alert(
                    "Error !",
                    "Oops! \nSeems like we run into some Server Error"
                );
            }
        });
    }

    const customergraphdata = {
        labels: chartData1.chartDataLabels,
        datasets: [
            {
                data: chartData1.chartDataEstore,
                color: (opacity = 1) => `rgba(122, 30, 120, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
            {
                data: chartData1.chartDataVisits,
                color: (opacity = 1) => `rgba(10, 65, 244, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
            {
                data: chartData1.chartDataExhibition,
                color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
        ],
        legend: ["E-Store", "Visits", "Exhibition"], // optional
    };
    //-------------------------End--------------------------------//

    //---------------Cart Graph Data--------------------------//
    const CartGraphFigures = () => {
        postRequest("masters/dashboard/cart_graph", { branch_id: branchId, from_date: param.from_date, to_date: param.to_date }, userToken).then((resp) => {
            if (resp.status == 200) {
                chartData2.chartDataLabels = [0];
                chartData2.chartDataWishlist = [0];
                chartData2.chartDataUploads = [0];
                chartData2.chartDataExhibition = [0];
                for (const itemObj of resp.data) {
                    chartData2.chartDataLabels.push(itemObj.date);
                    chartData2.chartDataWishlist.push(itemObj.visits);
                    chartData2.chartDataUploads.push(itemObj.designs);
                    chartData2.chartDataExhibition.push(itemObj.exhibition);
                }
            } else {
                Alert.alert(
                    "Error !",
                    "Oops! \nSeems like we run into some Server Error"
                );
            }
        });
    }

    const cartgraphdata = {
        labels: chartData2.chartDataLabels,
        datasets: [
            {
                data: chartData2.chartDataWishlist,
                color: (opacity = 1) => `rgba(122, 30, 120, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
            {
                data: chartData2.chartDataUploads,
                color: (opacity = 1) => `rgba(10, 65, 244, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
            {
                data: chartData2.chartDataExhibition,
                color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
        ],
        legend: ["Wishlist", "Uploads", "Exhibition"], // optional
    };
    //-------------------------End--------------------------------//

    //---------------Voucher Graph Data--------------------------//
    const VoucherGraphFigures = () => {
        postRequest("masters/dashboard/voucher_graph", { branch_id: branchId, from_date: param.from_date, to_date: param.to_date }, userToken).then((resp) => {
            if (resp.status == 200) {
                chartData3.chartDataLabels = [0];
                chartData3.chartDataActive = [0];
                chartData3.chartDataRedeem = [0];
                chartData3.chartDataExpired = [0];
                for (const itemObj of resp.data) {
                    chartData3.chartDataLabels.push(itemObj.date);
                    chartData3.chartDataActive.push(itemObj.active);
                    chartData3.chartDataRedeem.push(itemObj.redeem);
                    chartData3.chartDataExpired.push(itemObj.expired);
                }

            } else {
                Alert.alert(
                    "Error !",
                    "Oops! \nSeems like we run into some Server Error"
                );
            }
        });
    }

    const vouchergraphdata = {
        labels: chartData3.chartDataLabels,
        datasets: [
            {
                data: chartData3.chartDataActive,
                color: (opacity = 1) => `rgba(122, 30, 120, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
            {
                data: chartData3.chartDataRedeem,
                color: (opacity = 1) => `rgba(10, 65, 244, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
            {
                data: chartData3.chartDataExpired,
                color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
        ],
        legend: ["Active", "Redeem", "Expired"], // optional
    };
    //-------------------------End--------------------------------//

    //---------------Video Call Graph Data--------------------------//
    const VideoGraphFigures = () => {
        postRequest("masters/dashboard/video_call_graph", { branch_id: branchId, from_date: param.from_date, to_date: param.to_date }, userToken).then((resp) => {
            if (resp.status == 200) {
                chartData4.chartDataLabels = [0];
                chartData4.chartDataRequest = [0];
                chartData4.chartDataAccept = [0];
                chartData4.chartDataDone = [0];
                for (const itemObj of resp.data) {
                    chartData4.chartDataLabels.push(itemObj.date);
                    chartData4.chartDataRequest.push(itemObj.active);
                    chartData4.chartDataAccept.push(itemObj.accept);
                    chartData4.chartDataDone.push(itemObj.done);
                }

            } else {
                Alert.alert(
                    "Error !",
                    "Oops! \nSeems like we run into some Server Error"
                );
            }
        });
    }

    const videocallgraphdata = {
        labels: chartData4.chartDataLabels,
        datasets: [
            {
                data: chartData4.chartDataRequest,
                color: (opacity = 1) => `rgba(122, 30, 120, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
            {
                data: chartData4.chartDataAccept,
                color: (opacity = 1) => `rgba(10, 65, 244, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
            {
                data: chartData4.chartDataDone,
                color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
        ],
        legend: ["Request", "Accept", "Done"], // optional
    };
    //-------------------------End--------------------------------//
    //---------------Missed Call Graph Data--------------------------//
    const MissedGraphFigures = () => {
        postRequest("masters/dashboard/miss_call_graph", { branch_id: branchId, from_date: param.from_date, to_date: param.to_date }, userToken).then((resp) => {
            if (resp.status == 200) {
                chartData5.chartDataLabels = [0];
                chartData5.chartDataRequest = [0];
                chartData5.chartDataAccept = [0];
                chartData5.chartDataDone = [0];
                for (const itemObj of resp.data) {
                    chartData5.chartDataLabels.push(itemObj.date);
                    chartData5.chartDataRequest.push(itemObj.active);
                    chartData5.chartDataAccept.push(itemObj.accept);
                    chartData5.chartDataDone.push(itemObj.done);
                }

            } else {
                Alert.alert(
                    "Error !",
                    "Oops! \nSeems like we run into some Server Error"
                );
            }
        });
    }

    const missedcallgraphdata = {
        labels: chartData5.chartDataLabels,
        datasets: [
            {
                data: chartData5.chartDataRequest,
                color: (opacity = 1) => `rgba(122, 30, 120, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
            {
                data: chartData5.chartDataAccept,
                color: (opacity = 1) => `rgba(10, 65, 244, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
            {
                data: chartData5.chartDataDone,
                color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
                strokeWidth: 1, // optional
            },
        ],
        legend: ["Request", "Accept", "Done"], // optional
    };
    //-------------------------End--------------------------------//
    //---------------New Cusomer Chart Data--------------------------//
    const newcustomerchartdata = [
        {
            name: "E-Store",
            population: figures.new_customer_estore,
            color: "#800080",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "Visits",
            population: figures.new_customer_visits,
            color: "#0000FF",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "Exhibition",
            population: figures.new_customer_exhibition,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        }
    ];
    //------------------------End--------------------------------//

    //---------------New Cusomer Chart Data--------------------------//
    const notresponsecustomerchartdata = [
        {
            name: "E-Store",
            population: figures.total_notVisitCustomer_estore,
            color: "#800080",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "Visits",
            population: figures.total_notVisitCustomer_visits,
            color: "#0000FF",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        },
        {
            name: "Exhibition",
            population: figures.total_notVisitCustomer_exhibition,
            color: "#800080",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        }
    ];
    //------------------------End--------------------------------//
    return (
        <View style={MyStyles.container}>
            <View style={MyStyles.row}>
                <DatePicker mode="text" value={param.from_date}
                    onValueChange={(date) => {
                        param.from_date = date;
                        setparam({ ...param });
                        Refresh();
                    }} />
                <DatePicker mode="text" value={param.to_date}
                    onValueChange={(date) => {
                        param.to_date = date;
                        setparam({ ...param });
                        Refresh();
                    }} />
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        backgroundColor: "orange",

                        marginRight: 10,
                    }}
                    onPress={() => { props.navigation.navigate("RecentActivity"); }}
                >
                    <Icon name="circle-medium" color="red" size={20} />
                    <Text style={{ color: "#FFF" }}>Live</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>

                {/* <LinearGradient colors={['#F6356F', '#FF5F50']}   start={{x: 0, y: 0.5}}
                end={{x: 1, y: 1}}  locations={[0,0.5,0.6]} style={{
                    marginHorizontal: 15,
                    borderRadius: 10,
                    padding: 0,
                    marginVertical: 5,
                }}> */}
                <LinearGradient colors={['#F6356F', '#FF5F50']}  style={{
                    marginHorizontal: 15,
                    borderRadius: 10,
                    padding: 0,
                    marginVertical: 5,
                }}>
                <View>
                    <View
                        style={[
                            MyStyles.row,
                            {
                                justifyContent: "center",
                                borderBottomColor: "#FFF",
                                borderBottomWidth: 1,
                            },
                        ]}
                    >
                        <View style={{ flexGrow: 1 }}></View>
                        <Text
                            style={{
                                textAlign: "center",
                                color: "#FFF",
                                fontSize: 20,
                                marginVertical: 5,
                                width: "50%"
                            }}
                        >
                            Total Customers
                        </Text>
                        <IconButton
                            icon="trending-up"
                            color="white"
                            style={{
                                backgroundColor: "#F6356F",
                                flex: 1,
                                borderColor: "#FFF",
                                borderWidth: 1,
                            }}
                            onPress={() => setVisible({ ...visible, customers_graph: !visible.customers_graph })}
                        />
                    </View>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>E-Store</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Visits</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Exhibition</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_customer_estore}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_customer_visits}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_customer_exhibition}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
                </LinearGradient>


            <CustomerGraphView visible={visible.customers_graph} data={customergraphdata} />

            <View style={[MyStyles.row, { paddingHorizontal: 20 }]}>
                <Button
                    mode="contained"
                    color="#F6356F"
                    uppercase={false}
                    style={{ borderRadius: 5, borderColor: "#FFF", borderWidth: 1 }}
                    onPress={() => setVisible({ ...visible, new_customer_chart: !visible.new_customer_chart, not_response_chart: false })}
                >
                    New
                </Button>
                <Button
                    mode="contained"
                    color="#F6356F"
                    uppercase={false}
                    style={{ borderRadius: 5, borderColor: "#FFF", borderWidth: 1 }}
                    onPress={() => setVisible({ ...visible, new_customer_chart: false, not_response_chart: !visible.not_response_chart })}
                >
                    No Res.
                </Button>
            </View>
            <NewCustomersChartView visible={visible.new_customer_chart} data={newcustomerchartdata} />
            <NotResposeCustomersChartView visible={visible.not_response_chart} data={notresponsecustomerchartdata} />

            <LinearGradient colors={['#F6356F', '#FF5F50']} style={{
                marginHorizontal: 15,
                borderRadius: 10,
                padding: 0,
                marginVertical: 5,
            }}>
                <View>
                    <View
                        style={[
                            MyStyles.row,
                            {
                                justifyContent: "center",
                                borderBottomColor: "#FFF",
                                borderBottomWidth: 1,
                            },
                        ]}
                    >
                        <View style={{ flexGrow: 1 }}></View>
                        <Text
                            style={{
                                textAlign: "center",
                                color: "#FFF",
                                fontSize: 20,
                                marginVertical: 5,
                                width: "50%"
                            }}
                        >
                            Cart
                        </Text>
                        <IconButton
                            icon="trending-up"
                            color="white"
                            style={{
                                backgroundColor: "#F6356F",
                                flex: 1,
                                borderColor: "#FFF",
                                borderWidth: 1
                            }}
                            onPress={() => setVisible({ ...visible, cart_graph: !visible.cart_graph })}
                        />
                    </View>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Wish List</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Uploads</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Exhibition</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_cart_wishlist}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_cart_upload}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_cart_exhibition}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </LinearGradient>
            <CartGraphView visible={visible.cart_graph} data={cartgraphdata} />


            <LinearGradient colors={['#F6356F', '#FF5F50']} style={{
                marginHorizontal: 15,
                borderRadius: 10,
                padding: 0,
                marginVertical: 5,
            }}>
                <View>
                    <View
                        style={[
                            MyStyles.row,
                            {
                                justifyContent: "center",
                                borderBottomColor: "#FFF",
                                borderBottomWidth: 1,
                            },
                        ]}
                    >
                        <View style={{ flexGrow: 1 }}></View>
                        <Text
                            style={{
                                textAlign: "center",
                                color: "#FFF",
                                fontSize: 20,
                                marginVertical: 5,
                                width: "50%"
                            }}
                        >
                            Voucher
                        </Text>
                        <IconButton
                            icon="trending-up"
                            color="white"
                            style={{
                                backgroundColor: "#F6356F",
                                flex: 1,
                                borderColor: "#FFF",
                                borderWidth: 1
                            }}
                            onPress={() => setVisible({ ...visible, voucher_graph: !visible.voucher_graph })}
                        />
                    </View>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Active</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Redeem</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Expired</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_voucher_active}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_voucher_redeem}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_voucher_expired}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </LinearGradient>
            <VoucherGraphView visible={visible.voucher_graph} data={vouchergraphdata} />

            <LinearGradient colors={['#F6356F', '#FF5F50']} style={{
                marginHorizontal: 15,
                borderRadius: 10,
                padding: 0,
                marginVertical: 5,
            }}>
                <View>
                    <View
                        style={[
                            MyStyles.row,
                            {
                                justifyContent: "center",
                                borderBottomColor: "#FFF",
                                borderBottomWidth: 1,
                            },
                        ]}
                    >
                        <View style={{ flexGrow: 1 }}></View>
                        <Text
                            style={{
                                textAlign: "center",
                                color: "#FFF",
                                fontSize: 20,
                                marginVertical: 5,
                                width: "50%"
                            }}
                        >
                            Video Call
                        </Text>
                        <IconButton
                            icon="trending-up"
                            color="white"
                            style={{
                                backgroundColor: "#F6356F",
                                flex: 1,
                                borderColor: "#FFF",
                                borderWidth: 1
                            }}
                            onPress={() => setVisible({ ...visible, video_call_graph: !visible.video_call_graph })}
                        />
                    </View>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Request</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Accept</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Done</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.vCall_request}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.vCall_accept}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.vCall_done}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </LinearGradient>
            <VideoCallGraphView visible={visible.video_call_graph} data={videocallgraphdata} />

            <LinearGradient colors={['#F6356F', '#FF5F50']} style={{
                marginHorizontal: 15,
                borderRadius: 10,
                padding: 0,
                marginVertical: 5,
            }}>
                <View>
                    <View
                        style={[
                            MyStyles.row,
                            {
                                justifyContent: "center",
                                borderBottomColor: "#FFF",
                                borderBottomWidth: 1,
                            },
                        ]}
                    >
                        <View style={{ flexGrow: 1 }}></View>
                        <Text
                            style={{
                                textAlign: "center",
                                color: "#FFF",
                                fontSize: 20,
                                marginVertical: 5,
                                width: "50%"
                            }}
                        >
                            Missed Call
                        </Text>
                        <IconButton
                            icon="trending-up"
                            color="white"
                            style={{
                                backgroundColor: "#F6356F",
                                flex: 1,
                                borderColor: "#FFF",
                                borderWidth: 1
                            }}
                            onPress={() => setVisible({ ...visible, missed_call_graph: !visible.missed_call_graph })}
                        />
                    </View>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Request</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Accept</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Done</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.missedCall_request}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.missedCall_accept}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.missedCall_done}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </LinearGradient>
            <MissedCallGraphView visible={visible.missed_call_graph} data={missedcallgraphdata} />

            <LinearGradient colors={['#F6356F', '#FF5F50']} style={{
                marginHorizontal: 15,
                borderRadius: 10,
                padding: 0,
                marginVertical: 5,
            }}>
                <View>
                    <View
                        style={[
                            MyStyles.row,
                            {
                                justifyContent: "center",
                                borderBottomColor: "#FFF",
                                borderBottomWidth: 1,
                            },
                        ]}
                    >
                        <View style={{ flexGrow: 1 }}></View>
                        <Text
                            style={{
                                textAlign: "center",
                                color: "#FFF",
                                fontSize: 20,
                                marginVertical: 5,
                                width: "50%"
                            }}
                        >
                            Stock
                        </Text>
                        <IconButton
                            icon="trending-up"
                            color="white"
                            style={{
                                backgroundColor: "#F6356F",
                                flex: 1,
                                borderColor: "#FFF",
                                borderWidth: 1
                            }}
                            onPress={() => setVisible({ ...visible, stock_graph: !visible.stock_graph })}
                        />
                    </View>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Transfer</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Accept</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_cart_wishlist}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_cart_upload}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </LinearGradient>

            <List.Section>
                <List.Accordion title={"Products      (" + figures.total_products_count + ")"}>
                    <FlatList
                        data={categoryscountlist}
                        renderItem={({ item, index }) =>
                        (
                            <List.Section>
                                <List.Accordion title={item.category_name + "     (" + item.product + ")"} style={{ backgroundColor: "#fff", }}>
                                    {item.innerTable.length > 0
                                        ? item.innerTable.map((item2, index) => {
                                            return (
                                                <List.Item title={item2.subcategory_name + "      (" + item.product + ")"} style={{ backgroundColor: "#f0f0f0", }} />
                                            )
                                        }) : null}
                                </List.Accordion>
                            </List.Section>

                        )
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </List.Accordion>
            </List.Section>

            <LinearGradient colors={['#F6356F', '#FF5F50']} style={{
                marginHorizontal: 15,
                borderRadius: 10,
                padding: 0,
                marginVertical: 5,
            }}>
                <View>
                    <View
                        style={[
                            MyStyles.row,
                            {
                                justifyContent: "center",
                                borderBottomColor: "#FFF",
                                borderBottomWidth: 1,
                            },
                        ]}
                    >
                        <View style={{ flexGrow: 1 }}></View>
                        <Text
                            style={{
                                textAlign: "center",
                                color: "#FFF",
                                fontSize: 20,
                                marginVertical: 5,
                                width: "50%"
                            }}
                        >
                            SMS
                        </Text>
                        <IconButton
                            icon="trending-up"
                            color="white"
                            style={{
                                backgroundColor: "#F6356F",
                                flex: 1,
                                borderColor: "#FFF",
                                borderWidth: 1
                            }}
                            onPress={() => setVisible({ ...visible, stock_graph: !visible.stock_graph })}
                        />
                    </View>
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Daily</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>Total</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.total_sms_count}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontSize: 20 }}>{figures.today_sms_count}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </LinearGradient>

            </ScrollView>
        </View >
    );
};

const CustomerGraphView = ({ visible = false, data }) => {
    const screenWidth = Dimensions.get("window").width - 60;

    const chartConfig = {
        backgroundGradientFrom: "#000",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#000",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true, // optional
        //decimalPlaces: 0

    };

    if (visible) {
        return (
            <View
                style={{
                    backgroundColor: "#f0f0f0",
                    marginHorizontal: 15,
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 10,
                }}
            >
                <LineChart data={data} width={screenWidth} height={220} verticalLabelRotation={30} segments={4} chartConfig={chartConfig} bezier />
            </View>
        );
    }

    return null;
};

const NewCustomersChartView = ({ visible = false, data }) => {
    const screenWidth = Dimensions.get("window").width - 60;

    const chartConfig = {
        backgroundColor: "#1cc910",
        backgroundGradientFrom: "#eff3ff",
        backgroundGradientTo: "#efefef",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(34, 53, 106, ${opacity})`,
        style: {
            borderRadius: 10,
        },
    };


    if (visible) {
        return (
            <View
                style={{
                    backgroundColor: "#f0f0f0",
                    marginHorizontal: 15,
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 10,
                }}
            >
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={10}
                    center={[0, 0]}
                    absolute
                />
            </View>
        );
    }
    return null;
};
const NotResposeCustomersChartView = ({ visible = false, data }) => {
    const screenWidth = Dimensions.get("window").width - 60;

    const chartConfig = {
        backgroundColor: "#1cc910",
        backgroundGradientFrom: "#eff3ff",
        backgroundGradientTo: "#efefef",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(34, 53, 106, ${opacity})`,
        style: {
            borderRadius: 10,
        },
    };


    if (visible) {
        return (
            <View
                style={{

                    backgroundColor: "#f0f0f0",
                    marginHorizontal: 15,
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 10,
                }}
            >
                <PieChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={10}
                    center={[0, 0]}
                    absolute
                />
            </View>
        );
    }
    return null;
};
const CartGraphView = ({ visible = false, data }) => {
    const screenWidth = Dimensions.get("window").width - 60;

    const chartConfig = {
        backgroundGradientFrom: "#000",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#000",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true, // optional
    };

    if (visible) {
        return (
            <View
                style={{
                    backgroundColor: "#f0f0f0",
                    marginHorizontal: 15,
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 10,
                }}
            >
                <LineChart data={data} width={screenWidth} height={220} verticalLabelRotation={30} segments={4} chartConfig={chartConfig} bezier />
            </View>
        );
    }

    return null;
};

const VoucherGraphView = ({ visible = false, data }) => {
    const screenWidth = Dimensions.get("window").width - 60;

    const chartConfig = {
        backgroundGradientFrom: "#000",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#000",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true, // optional
    };

    if (visible) {
        return (
            <View
                style={{
                    backgroundColor: "#f0f0f0",
                    marginHorizontal: 15,
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 10,
                }}
            >
                <LineChart data={data} width={screenWidth} height={220} verticalLabelRotation={30} segments={4} chartConfig={chartConfig} bezier />
            </View>
        );
    }

    return null;
};

const VideoCallGraphView = ({ visible = false, data }) => {

    const screenWidth = Dimensions.get("window").width - 60;

    const chartConfig = {
        backgroundGradientFrom: "#000",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#000",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true, // optional
    };

    if (visible) {
        return (
            <View
                style={{
                    backgroundColor: "#f0f0f0",
                    marginHorizontal: 15,
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 10,
                }}
            >
                <LineChart data={data} width={screenWidth} height={220} verticalLabelRotation={30} segments={4} chartConfig={chartConfig} bezier />
            </View>
        );
    }

    return null;
};

const MissedCallGraphView = ({ visible = false, data }) => {
    const screenWidth = Dimensions.get("window").width - 60;

    const chartConfig = {
        backgroundGradientFrom: "#000",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#000",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true, // optional
    };

    if (visible) {
        return (
            <View
                style={{
                    backgroundColor: "#f0f0f0",
                    marginHorizontal: 15,
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 10,
                }}
            >
                <LineChart data={data} width={screenWidth} height={220} verticalLabelRotation={30} segments={4} chartConfig={chartConfig} bezier />
            </View>
        );
    }

    return null;
};

export default Home;
