import { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    Image,
    ImageBackground,
    Touchable,
    TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Popup2 = ({ isVisible, GoTOHome }) => {
    // const [show, setShow] = useState(false);
    // useEffect(() => {
    //     const delayToShowModal = setTimeout(() => {
    //         setShow(true);
    //     }, 800);

    //     return () => {
    //         clearTimeout(delayToShowModal);
    //     };
    // }, []);

    // const closeModal = () => {
    //     setShow(false);
    // };

    return (
        <Modal
            style={{ justifyContent: "center", alignItems: "center" }}
            transparent={true}
            visible={isVisible}
            animationType="slide"
        >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    flexShrink: 0,
                    backgroundColor: "rgba(128, 128, 128, 0.5)",
                }}
            >
                <View
                    style={{
                        borderWidth: 0.3,
                        borderRadius: 5,
                        height: "55%",
                        width: "77%",
                        flexShrink: 0,
                        backgroundColor: "#fff",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            top: 0,
                            marginTop: 0,
                            alignSelf: "flex-end",
                            marginLeft: 30,
                            marginBottom: 10,
                        }}
                    // onPress={onClose}
                    >
                        {/* <Icon name="close" size={30} color={"black"} /> */}
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <Image source={require("../img/sm.png")}></Image>
                    </View>

                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 20 }}>
                            We're so sad about your cancellation{" "}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 5,
                            marginLeft: 35,
                            marginRight: 35,
                        }}
                    >
                        <Text style={{ fontSize: 14, color: "#A0A0A0", marginBottom: 5 }}>
                            We will continue to improve our service & satify you on the next
                            trip.
                        </Text>
                        <View style={{ alignItems: 'center' }}>


                            <TouchableOpacity
                                onPress={GoTOHome}
                            >
                                <Text style={{ backgroundColor: "#8817EE", width: 200, height: 40, textAlign: "center", verticalAlign: "middle", alignItems: "center", marginRight: 10, fontSize: 12, borderRadius: 3, marginTop: 20, color: '#fff' }}> Back Home</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default Popup2;
