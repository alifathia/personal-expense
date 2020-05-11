import React from "react";
import { StyleSheet, Text } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const TextComponentBold = ({ title, number, type, transaction, date }) => {
  return (
    <Text
      style={transaction === "income" ? textStyles.income : textStyles.expense}
    >
      {title} {number} {transaction} {type} {date}
    </Text>
  );
};

const textStyles = StyleSheet.create({
  income: {
    fontWeight: "bold",
    borderColor: "blue",
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 3,
    paddingTop: 3,
    paddingBottom: 3,
    margin: 4
  },
  expense: {
    fontWeight: "bold",
    borderColor: "red",
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 3,
    paddingTop: 3,
    paddingBottom: 3,
    margin: 4
  }
});

export default TextComponentBold;
