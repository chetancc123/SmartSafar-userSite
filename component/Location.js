import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  SearchBar,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import DateTimePicker from "@react-native-community/datetimepicker";

const Location = (props) => {
  // const Search = () => {
  //   console.log("button clicked");
  //   alert("clicked");
  // };
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputValue, setInputValue] = useState("");
  const [showList, setShowList] = useState(false);
  const [items, setItems] = useState([
    { id: "1", name: "Suv" },
    { id: "2", name: "Taxi" },
    { id: "3", name: "7 Seater " },
    { id: "4", name: "3 Seater " },
  ]);
  const toggleList = () => {
    setShowList(!showList);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(Platform.OS === "ios"); // Hide date picker on iOS
    setSelectedDate(currentDate);
    setInputValue(currentDate.toDateString()); // Format the date as per your requirements
  };
  // searching logic
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Sample data, replace it with your actual data
  const data = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    // ... more data
  ];
  useEffect(() => {
    const filteredResult = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResult);
  }, [query]);

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <View style={Styles.main}>
            <View style={Styles.upper_right}>
              <Text
                style={{
                  fontSize:24,
                  fontWeight: 700,
                  color: "white",
                  marginRight: wp("1%"),
                  marginTop:hp("5%"),
                  height:hp("4%")
                }}
              >
                Smart Safar
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: 700, color: "white" }}
              >
                Safety Sharing Ride
              </Text>
            </View>
            <View style={Styles.big_container}>
              <Text style={{ fontSize: 30, marginLeft:wp("8%"), marginTop:hp("2%") }}>
                Where
              </Text>
              <TextInput
                placeholder="Enter Location"
                style={Styles.input}
                value={query}
                onChangeText={(text) => setQuery(text)}
              />

              <TouchableOpacity
                onPress={() => {
                  alert("clicked");
                }}
              >
                <Image
                  style={{
                    width: wp("5%"),
                    height:wp("5%"),
                    position: "absolute",
                    bottom:hp("3%"),
                    marginLeft:wp("80%"),
                  }}
                  source={require("../img/search.png")}
                />
              </TouchableOpacity>
              <View style={Styles.Current}>
                <Image
                  style={{ width:wp("3%"), height: wp("3%") }}
                  source={require("../img/locaton_pin.png")}
                />
                {/* <FlatList
                    data={filteredData}
                    scrollEnabled={false}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                      <View>
                        <Text>{item.name}</Text>
                      </View>
                    )}
                  /> */}
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("map")}
                >
                  <Text style={{ fontSize: 20, color: "white" }}>
                    {" "}
                    Current Location
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 17,
                  marginLeft: wp("10%"),
                  marginTop:hp("2%"),
                  color: "white",
                }}
              >
                Top Cities
              </Text>
              <Image
                style={{
                  width: wp("90%"),
                  height: hp("13%"),
                  alignSelf: "center",
                  marginTop:hp("2%"),
                }}
                source={require("../img/cities.png")}
              />
            </View>
            <View style={Styles.picker}>
              <View style={Styles.first}>
                <TouchableOpacity onPress={showDatepicker}>
                  <Text style={{ fontSize: 16 }}>Select Date</Text>
                </TouchableOpacity>

                <TextInput
                  style={{ height:hp("3%"), width:wp("20%") }}
                  placeholder="Selected Date"
                  value={inputValue}
                  editable={false}
                />

                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onDateChange}
                  />
                )}
              </View>
              <View style={Styles.second}>
                <Text style={{ fontSize: 16 }}>Cab Type</Text>

                <TouchableOpacity onPress={toggleList}>
                  <Image
                    style={{ width:wp("7%") }}
                    source={require("../img/Down.png")}
                  />
                </TouchableOpacity>
                {showList && (
                  <View style={Styles.listContainer}>
                    <FlatList
                      data={items}
                      keyExtractor={(item) => item.id}
                      scrollEnabled={false}
                      renderItem={({ item }) => (
                        <View style={Styles.item}>
                          <Text>{item.name}</Text>
                        </View>
                      )}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={Styles.last}>
              <TouchableOpacity
                onPress={() => {
                  alert("clicked");
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 25,
                    width: wp("90%"),
                    height: hp("6%"),
                    backgroundColor: "#13C39C",
                    textAlignVertical: "center",
                    textAlign: "center",
                    borderRadius: 10,
                    marginBottom:hp("4%"),
                  }}
                >
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const Styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#BDE6D9",
    
    
  },
  upper_right: {
    alignItems: "flex-end",
    marginRight: wp("7%"),
    height:hp("5%") ,
  },
  big_container: {
    marginTop:hp("8%"),
    alignSelf: "center",
    borderRadius: 20,
    width:wp("95%"),
    height:hp("42%"),
    backgroundColor: "#13C39C",
  },
  input: {
    height: hp("6%"),
    margin: hp("1%"),
    borderWidth: 1,
    padding: hp("2%"),
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
  },
  Current: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  picker: {
    marginTop:hp("5%"),
    //   marginLeft:25,
    alignItems: "center",
    padding: wp("2%"),
  },
  first: {
    width: wp("85%"),
    height: hp("6%"),
    borderRadius: 9,
    //   textAlign:"center",
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding:hp("1%"),
    marginBottom:hp("3%"),
  },
  second: {
    width: wp("85%"),
    height: hp("6%"),
    borderRadius: 9,
    textAlign: "center",
    alignItems: "center",
    padding:hp("1%"),

    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    // marginLeft:20
  },
  listContainer: {
    position: "absolute",
    top: 30,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    padding: wp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: wp("35%"),
    alignItems: "center",
  },
  last: {
    display: "flex",
    height: hp("28%"),

    justifyContent: "flex-end",
  },
});
export default Location;
