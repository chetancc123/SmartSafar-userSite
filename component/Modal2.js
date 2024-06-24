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
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Popup = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const delayToShowModal = setTimeout(() => {
            setShow(true);
        }, 800);

        return () => {
            clearTimeout(delayToShowModal);
        };
    }, []);

    const closeModal = () => {
        setShow(false);
    };

    return (
        <Modal
            style={{ justifyContent: "center", alignItems: "center" }}
            transparent={true}
            visible={show}
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
                        onPress={closeModal}
                    >
                        <MaterialCommunityIcons name="close" size={30} color={"black"} />
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <Image source={require("../img/CheckAll.png")}></Image>
                    </View>

                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 20 }}>
                            Congratulations {" "}
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
                            Your account is ready to use. You will be redirected to the Home Page in a few seconds.
                        </Text>

                        <View style={{ alignItems: "center", marginTop: 30 }}>
                            <Image source={require("../img/Infi.png")}></Image>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default Popup;
