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
import {
    colors,
    fontSizes,
    icons,
    images
} from '../../constants'

import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Ionicons } from '@expo/vector-icons';
import { MainButton, CartItem } from "../../components";


const Cart = (props) => {
    const isFocused = useIsFocused();
    const { navigation, route } = props;
    const { navigate, goBack } = navigation

    const [cartList, setcartList] = useState([]);


    const onFinish = async () => {
        if (cartList.length > 0) {
            alert("Thanh Toán Thành Công!");
            let cartData = [];
            await AsyncStorage.setItem("cartData", JSON.stringify(cartData));
            setcartList([]);
        }
    };
    const getCartData = async () => {
        let cartData = await AsyncStorage.getItem("cartData");
        if (cartData) {
            cartData = JSON.parse(cartData);
        } else {
            cartData = [];
        }
        setcartList(cartData);
    };
    const getTotal = () => {
        let total = 0;
        cartList.map((value) => (total += value.price * value.amount));
        return total;
    };

    useEffect(() => {
        getCartData();
        console.log(cartList)
    }, [isFocused])

    return <View style={{
        flex: 100,
        marginTop: 30,
        position: 'relative',
        paddingHorizontal: 20
    }}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <Text style={{
                fontSize: fontSizes.h3,
                fontWeight: 'bold',
                color: colors.main
            }}>GIỎ HÀNG</Text>
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontSize: fontSizes.h3,
                    fontWeight: 'bold',
                    color: colors.main
                }}>TỔNG:
                </Text>
                <Text style={{
                    fontSize: fontSizes.h3,
                    fontWeight: 'bold',
                    paddingLeft: 2
                }}>
                    {getTotal()}$
                </Text>
            </View>
        </View>

        {cartList.length > 0 ? (
            <FlatList
                style={{
                    marginBottom: 80
                }}
                data={cartList}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item + index}
                numColumns={1}
                renderItem={({ item, index }) => {
                    return <CartItem item={item} index={index} onChange={setcartList} />;
                }}
            />
        ) : (
            <View
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <Ionicons name="cart-outline" size={130} color="gray" />
                <Text style={{ color: "gray", fontSize: 20 }}>Giỏ hàng đang trống</Text>
            </View>
        )}


        <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: 10,
            paddingLeft: 30,
            paddingTop: 10,
            backgroundColor: 'white'
        }}>
            <MainButton
                onPress={onFinish}
                styles={{

                }}
                name={"Thanh Toán"}
            />
        </View>
    </View>
}

export default Cart;