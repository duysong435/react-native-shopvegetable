import { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import {
    colors,
    fontSizes,
    icons,
    images
} from '../../constants'
import { MainButton } from "../../components";


const Profile = (props) => {
    const { navigation, route } = props;
    // const { navigate, goBack } = navigation;
    const logOut = async () => {
        // await AsyncStorage.removeItem("curUser");
        navigation.reset({
            // index: 0,
            routes: [{ name: "Login" }],
        });
    };
    return <View
        style={{
            backgroundColor: "#fff",
            flex: 1,
            width: "100%",
            // paddingTop: StatusBar.currentHeight + 30,
            paddingHorizontal: 12,
            paddingTop: 20
        }}
    >
        <View style={{ flex: 1, alignItems: "center" }}>
            <Image
                style={{
                    height: 120,
                    width: 120,
                    borderRadius: 100,
                }}
                source={{ uri: "https://i.pravatar.cc/300" }}
            />
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                }}
            >
                {/* {user && user.name} */}
            </Text>
            <Text
                style={{
                    fontSize: 12,
                }}
            >
                {/* {user && user.email} */}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    marginTop: 20,
                    paddingBottom: 12,
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                }}
            >
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    {"Đang Giao"}
                </Text>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    {"Đã Giao"}
                </Text>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    {"Đã Hủy"}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        color: "#2FDBBC",
                        fontSize: 25,
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    {"01"}
                </Text>
                <Text
                    style={{
                        color: "#2FDBBC",
                        fontSize: 25,
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    {"02"}
                </Text>
                <Text
                    style={{
                        color: "#2FDBBC",
                        fontSize: 25,
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    {"00"}
                </Text>
            </View>
        </View>
        <MainButton
            onPress={logOut}
            styles={{ backgroundColor: "red", width: '100%' }}
            name={"Đăng Xuất"}
        />
    </View>
}

export default Profile;