import { useEffect, useState } from "react";
import { Modal, View, Text, Image, ImageBackground, Touchable, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Popup3 = () => {
    const [show, setShow] = useState(true);
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

                }}
            >
                <View
                    style={{
                        marginBottom: 550,
                        height: "30%",
                        width: "30%",
                        flexShrink: 0,

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
                        {/* <Icon name="close" size={30} color={"black"} /> */}
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <Image source={require("../img/ver.png")}></Image>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default Popup3;
