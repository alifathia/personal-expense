import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  AsyncStorage,
  RefreshControl,
  Text
} from "react-native";
import Pie from "react-native-pie";
import CenterView from "../components/CenterView";
import TextComponentBold from "../components/TextComponentBold";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [expenses, setExpenses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [foodPercentage, setFoodPercentage] = useState(25);
  const [billsPercentage, setBillsPercentage] = useState(25);
  const [entertainmentPercentage, setEntertainmentPercentage] = useState(25);
  const [transportationPercentage, setTransportationPercentage] = useState(25);

  useEffect(() => {
    if (refreshing === true) {
      retrieveDataRefresh();
    }
  }, [refreshing]);

  useEffect(() => {
    retrieveData();
  }, []);

  const deleteItem = async index => {
    console.log("clicked on item #", index);

    console.log(expenses);
    expenses.splice(index, 1);

    console.log("after splice", expenses);
    try {
      await AsyncStorage.setItem(
        "listOfTransactions",
        JSON.stringify(expenses)
      );
      await setExpenses(expenses);
      console.log("Data is deleted");
    } catch (error) {
      console.log("Error deleting data");
    }
  };

  const updatePieChart = () => {
    setFoodPercentage(getFoodPercentage());
    setBillsPercentage(getBillsPercentage());
    setTransportationPercentage(getTransportationPercentage());
    setEntertainmentPercentage(getEntertainmentPercentage());
  };

  //initial render
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("listOfTransactions");
      if (value !== null) {
        const expenses = JSON.parse(value);
        setExpenses(expenses);
      }
    } catch (error) {
      console.log("Error retrieving data");
    }
  };

  //refresh
  const retrieveDataRefresh = async () => {
    try {
      const value = await AsyncStorage.getItem("listOfTransactions");
      setRefreshing(false);
      if (value !== null) {
        const expenses = JSON.parse(value);
        setExpenses(expenses);
      }
    } catch (error) {
      console.log("Error retrieving data");
    }
  };

  const getFoodPercentage = () => {
    let sum = 0;

    expenses.map(i => {
      return i.type === "food"
        ? (sum = sum + parseInt(i.number))
        : (sum = sum + 0);
    });
    return (sum / getTotalExpense()) * 100;
  };

  const getEntertainmentPercentage = () => {
    let sum = 0;

    expenses.map(i => {
      return i.type === "entertainment"
        ? (sum = sum + parseInt(i.number))
        : (sum = sum + 0);
    });
    return (sum / getTotalExpense()) * 100;
  };

  const getBillsPercentage = () => {
    let sum = 0;

    expenses.map(i => {
      return i.type === "bills"
        ? (sum = sum + parseInt(i.number))
        : (sum = sum + 0);
    });
    return (sum / getTotalExpense()) * 100;
  };

  const getTransportationPercentage = () => {
    let sum = 0;

    expenses.map(i => {
      return i.type === "transportation"
        ? (sum = sum + parseInt(i.number))
        : (sum = sum + 0);
    });
    return (sum / getTotalExpense()) * 100;
  };

  const getTotalExpense = () => {
    let letTotalExpense = 0;

    expenses.map(i => {
      return (letTotalExpense = letTotalExpense + parseInt(i.number));
    });
    return letTotalExpense;
  };

  return (
    <React.Fragment>
      {expenses.length > 0 ? (
        <React.Fragment>
          <TouchableOpacity onPress={updatePieChart}>
            <View style={styles.pieContainer}>
              <Pie
                radius={100}
                innerRadius={20}
                series={[
                  foodPercentage,
                  billsPercentage,
                  entertainmentPercentage,
                  transportationPercentage
                ]}
                colors={["#fb5968", "#fea82f", "#ffeaa7", "#b6c1ce"]}
              />
              <View style={styles.pieLegend}>
                <View
                  style={{
                    width: 85,
                    height: 25,
                    backgroundColor: "#fb5968",
                    alignItems: "center"
                  }}
                >
                  <Text>Makanan</Text>
                </View>
                <View
                  style={{
                    width: 85,
                    height: 25,
                    backgroundColor: "#fea82f",
                    alignItems: "center"
                  }}
                >
                  <Text>Tagihan</Text>
                </View>
                <View
                  style={{
                    width: 85,
                    height: 25,
                    backgroundColor: "#ffeaa7",
                    alignItems: "center"
                  }}
                >
                  <Text>Hiburan</Text>
                </View>
                <View
                  style={{
                    width: 85,
                    height: 25,
                    backgroundColor: "#b6c1ce",
                    alignItems: "center"
                  }}
                >
                  <Text>Transportasi</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                }}
              />
            }
          >
            <CenterView>
              {expenses.map((i, index) => (
                <TouchableOpacity key={index} onPress={() => deleteItem(index)}>
                  <TextComponentBold
                    title={i.title}
                    number={i.number}
                    transaction={i.transaction}
                    type={i.type}
                    date={i.date}
                  />
                </TouchableOpacity>
              ))}
            </CenterView>
          </ScrollView>
        </React.Fragment>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          }
        >
          <View style={styles.warningTextContainer}>
            <Text>Tarik untuk memuat kembali</Text>
          </View>
        </ScrollView>
      )}
    </React.Fragment>
  );
}

HomeScreen.navigationOptions = {
  title: "Laporan Pengeluaran"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  pieContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 20,
    marginTop: 20
  },
  pieLegend: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginHorizontal: 25,
    marginBottom: 10
  },
  warningTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
});
