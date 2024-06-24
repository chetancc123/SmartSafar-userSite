import { React, useEffect } from "react";
// import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "./component/Landing";
import Login from "./component/Login";

import Signwithgoogle from "./component/Signwithgoogle";

import Home from "./component/Home";
import Profile from "./component/Profile";
import ChangePassword from "./component/ChangePassword";
import Privacy from "./component/Privacy";
import ContactUs from "./component/ContactUs";
import Ridecomplete from "./component/Ridecomplete";
import ForgotPassword from "./component/ForgotPassword";
import Otpverified from "./component/Otpverified";
import SetNewPassword from "./component/SetNewPassword";
import History from "./component/History";
import History_Cancelled from "./component/History_Cancelled";
import History_Completed from "./component/History_Completed";
import History_Upcoming from "./component/History_Upcoming";
import Ridebooked from "./component/Ridebooked";
import CancelRide from "./component/CancelRide";

import ScheduleBook1 from "./component/ScheduleBook1";
import BookInitialize from "./component/BookInitialize";

import RentalBooking1 from "./RentalBooking/RentalBooking1";
import RentalBooking2 from "./RentalBooking/RentalBooking2";
import RentalBooking4 from "./RentalBooking/RentalBooking4";
import RentalBooking3 from "./RentalBooking/RentalBooking3";
import RentalBooking5 from "./RentalBooking/RentalBooking5";

import Transport1 from "./transport/Transport1";
import Transport2 from "./transport/Transport2";
import Transport3 from "./transport/Transport3";
import Transport4 from "./transport/Transport4";
import Transport5 from "./transport/Transport5";
import Coupan from "./transport/Transport6";
import Transport7 from "./transport/Transport7";
import Transport8 from "./transport/Transport8";

// import Menu from "./component/Menu";
// import topSection from "./transport/TransportTop";
// import Map from "./transport/Map";

///no needed
// import LocationChooser from "./component/LocationChooser";
// // import Hourly from "./component/Hourly";
// import Airport from "./component/Airport";
// import Location from "./component/Location";
// import Rides from "./component/Rides";
// import NameEntry from "./component/NameEntry";
// import CreateIdPass from "./component/CreateIdPass";
// import ChatBot from "./component/ChatBot";
// import NumberEntry from "./component/NumberEntry";
// import EnableLocation from "./component/EnableLocation";
// import Notified from "./component/Notified";
// import HomeWriten from "./component/HomeWriten";
// import Yourdriver from "./component/Yourdriver";
// import SelectCars from "./component/SelectCars";
// import CreateAccount from "./component/CreateAccount";
// import ShedualRide1 from "./component/ShedualRide1";
// import ShedualRide2 from "./component/ShedualRide2";
// import OtpValidation from "./component/OtpValidation";
// import EmailVerification from "./component/EmailVerification";
// import DeriverConnect from "./component/DeriverConnect";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    // <Text>ishan</Text>
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="ChatBot"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signwithgoogle" component={Signwithgoogle} />
        
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name='Otpverified' component={Otpverified} />
        <Stack.Screen name="SetNewPassword" component={SetNewPassword} />


        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="History" component={History} />

        <Stack.Screen name="History_Cancelled" component={History_Cancelled} />
        <Stack.Screen name="History_Completed" component={History_Completed} />
        <Stack.Screen name="History_Upcoming" component={History_Upcoming} />
        <Stack.Screen name="CancelRide" component={CancelRide} />

        <Stack.Screen name="Ridecomplete" component={Ridecomplete} />
        <Stack.Screen name="Ridebooked" component={Ridebooked} />

        {/* ScheduleBooking */}
        <Stack.Screen name="ScheduleBook1" component={ScheduleBook1} />
        <Stack.Screen name="BookInitialize" component={BookInitialize} />

        {/* RENTAL BOOKING */}

        <Stack.Screen name="RentalBooking1" component={RentalBooking1} />
        <Stack.Screen name="RentalBooking2" component={RentalBooking2} />
        <Stack.Screen name="RentalBooking3" component={RentalBooking3} />
        <Stack.Screen name="RentalBooking5" component={RentalBooking5} />
        {/* <Stack.Screen name="RentalBooking4" component={RentalBooking4} /> */}

        {/* <Stack.Screen name="Menu" component={Menu} /> */}

        {/* Transport side */}
        <Stack.Screen name='Transport1' component={Transport1} />
        <Stack.Screen name='Transport2' component={Transport2} />
        <Stack.Screen name='Transport3' component={Transport3} />
        <Stack.Screen name='Transport4' component={Transport4} />
        <Stack.Screen name='Transport5' component={Transport5} />
        <Stack.Screen name='Transport6' component={Coupan} />
        <Stack.Screen name='Transport7' component={Transport7} />
        <Stack.Screen name='Transport8' component={Transport8} />

        {/* component */}
        {/* <Stack.Screen name='TransportTop' component={topSection} />
        <Stack.Screen name="LocationChooser" component={LocationChooser} />
        <Stack.Screen name='Map' component={Map} /> */}
        {/* <Stack.Screen name="OtpValidation" component={OtpValidation} /> */}

        {/* not need */}
        {/* <Stack.Screen name="Hourly" component={Hourly} />
        <Stack.Screen name="Airport" component={Airport} />
        <Stack.Screen name="Rides" component={Rides} />
        <Stack.Screen name="Location" component={Location} /> */}
        {/* <Stack.Screen name="EnableLocation" component={EnableLocation} /> */}
        {/* <Stack.Screen name="HomeWriten" component={HomeWriten} /> */}
        {/* <Stack.Screen name="Notified" component={Notified} /> */}
        {/* <Stack.Screen name="NameEntry" component={NameEntry} /> */}
        {/* <Stack.Screen name="CreateIdPass" component={CreateIdPass} /> */}
        {/* <Stack.Screen name="NumberEntry" component={NumberEntry} /> */}
        {/* <Stack.Screen name='Yourdriver' component={Yourdriver} /> */}
        {/* <Stack.Screen name="EmailVerification" component={EmailVerification} /> */}
        {/* <Stack.Screen name='SelectCars' component={SelectCars} /> */}
        {/* <Stack.Screen name='ShedualRide1' component={ShedualRide1} /> */}
        {/* <Stack.Screen name='ShedualRide2' component={ShedualRide2} /> */}
        {/* <Stack.Screen name='DeriverConnect' component={DeriverConnect} /> */}
        {/* <Stack.Screen name="CreateAccount" component={CreateAccount} /> */}
        {/* <Stack.Screen name='ChatBot' component={ChatBot} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
