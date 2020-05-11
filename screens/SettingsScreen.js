import React from "react";
import { Text, AsyncStorage } from "react-native";
import { ExpoConfigView } from "@expo/samples";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function SettingsScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  const destroyData = async () => {
    try {
      //parse to string
      await AsyncStorage.destroyData("listOfTransactions");
    } catch (error) {
      console.log("Error deleting all data");
    }
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  return (
    <React.Fragment>
      <ExpoConfigView />
      <TouchableHighlight onPress={clearAsyncStorage}>
        <Text>Debug</Text>
      </TouchableHighlight>
    </React.Fragment>
  );
}

SettingsScreen.navigationOptions = {
  title: "Expense Manager by Ayu & Ivy"
};
