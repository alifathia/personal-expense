import React from "react";
import { StyleSheet, View } from "react-native";

const CenterView = ({ children }) => {
  return <View style={viewStyles.centering}>{children}</View>;
};

const viewStyles = StyleSheet.create({
  centering: {
    alignItems: "center"
  }
});

export default CenterView;
