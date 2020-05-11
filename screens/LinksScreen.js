import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  TextInput,
  Picker,
  AsyncStorage,
  Image
} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function LinksScreen() {
  const [expenses, setExpenses] = useState([]);
  const [value, setValue] = useState("");
  const [money, setMoney] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const storeData = async () => {
    try {
      //parse to string
      await AsyncStorage.setItem(
        "listOfTransactions",
        JSON.stringify([
          {
            title: value,
            number: parseInt(money),
            transaction: transactionType,
            type: transactionCategory,
            date: date.toLocaleDateString()
          },
          ...expenses
        ])
      );
    } catch (error) {
      console.log("Error inserting data");
    }
  };

  const handleClick = () => {
    setExpenses([
      {
        title: value,
        number: money,
        transaction: transactionType,
        type: transactionCategory,
        date: date.toLocaleDateString()
      },
      ...expenses
    ]);
    setValue("");
    setMoney("");
    setTransactionType("");
    setTransactionCategory("");
    setDate(date);
    storeData();
  };

  const datePickerHandler = (event, date) => {
    if (date === undefined) {
      setDate(prevDate => prevDate);
      setShow(false);
    } else {
      setDate(prevDate => (prevDate, date));
      setShow(false);
    }
  };

  const buttonHandler = () => {
    setShow(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={require("../assets/images/transaction.png")}
          style={{
            width: 75,
            height: 75,
            margin: 5,
            alignItems: "center"
          }}
        />
      </View>
      <View>
        <Button onPress={buttonHandler} title={date.toLocaleDateString()} />
      </View>

      <View style={styles.datepickerContainer}>
        {show && (
          <RNDateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={datePickerHandler}
          />
        )}
      </View>

      <TextInput
        placeholder="Deskripsi transaksi"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 20,
          marginBottom: 10,
          padding: 10
        }}
        onChangeText={text => setValue(text)}
        value={value}
      />
      <TextInput
        placeholder="Jumlah transaksi"
        keyboardType="number-pad"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          padding: 10
        }}
        onChangeText={text => setMoney(text)}
        value={money}
      />

      <Picker
        selectedValue={transactionCategory}
        style={{ height: 50, width: 350 }}
        onValueChange={(itemValue, itemPosition) => {
          return setTransactionCategory(itemValue);
        }}
      >
        <Picker.Item label="Pilih kategori transaksi: " value="" />
        <Picker.Item label="Makanan" value="food" />
        <Picker.Item label="Transportasi" value="transportation" />
        <Picker.Item label="Gaji" value="salary" />
        <Picker.Item label="Tagihan" value="bills" />
        <Picker.Item label="Hiburan" value="entertainment" />
      </Picker>

      <Picker
        selectedValue={transactionType}
        style={{ height: 50, width: 350, marginBottom: 20, marginTop: 10 }}
        onValueChange={(itemValue, itemPosition) => {
          return setTransactionType(itemValue);
        }}
      >
        <Picker.Item label="Pilih jenis transaksi: " value="" />
        <Picker.Item label="Pemasukan" value="income" />
        <Picker.Item label="Pengeluaran" value="expense" />
      </Picker>

      <Button title="Simpan" onPress={handleClick} />
      <View style={styles.pusher}></View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: "Tambah Transaksi"
};

const styles = StyleSheet.create({
  pusher: {
    height: 50
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    padding: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  wrap: {
    textAlign: "center"
  },
  datepickerContainer: {
    alignItems: "center",
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: "salmon"
  }
});
