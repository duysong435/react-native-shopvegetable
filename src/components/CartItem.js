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
} from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { AntDesign } from '@expo/vector-icons';


const CartItem = (props) => {
    const { item, index, onChange } = props;
    const [amount, setamount] = useState(item.amount);
    const handleDelete = async () => {
        let cartData = await AsyncStorage.getItem("cartData");
        cartData = JSON.parse(cartData);
        let arr = [...cartData];
        arr.splice(index, 1);
        AsyncStorage.setItem("cartData", JSON.stringify(arr));
        onChange && onChange(arr);
    };
    const handleOnAdd = async () => {
        let cartData = await AsyncStorage.getItem("cartData");
        cartData = JSON.parse(cartData);
        let arr = [...cartData];
        arr[index].amount = amount + 1;
        AsyncStorage.setItem("cartData", JSON.stringify(arr));
        setamount((val) => val + 1);
        onChange && onChange(arr);
    };
    const handleOnRemove = async () => {
        if (amount > 1) {
            let cartData = await AsyncStorage.getItem("cartData");
            cartData = JSON.parse(cartData);
            let arr = [...cartData];
            arr[index].amount = amount - 1;
            AsyncStorage.setItem("cartData", JSON.stringify(arr));
            setamount((val) => val - 1);
            onChange && onChange(arr);
        }
    };
    return (
        <View
            style={{
                flex: 1,
                width: 340,
                marginTop: 5,
                marginBottom: 7,
                marginLeft: 5,
                marginRight: 5,
                borderRadius: 10,
                borderColor: 'red',
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 10,
                elevation: 4,
            }}>

            <View style={{
                flexDirection: 'row'
            }}>
                <Image
                    source={{ uri: item.img }}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                        borderRadius: 10,
                        margin: 6
                    }}

                />
                <View style={{
                    paddingLeft: 5
                }}>
                    <Text style={{
                        fontSize: fontSizes.h5,
                        // color: colors.main,
                        paddingTop: 10,
                        fontWeight: 'bold'
                    }}>
                        {item.details}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        paddingTop: 5,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: colors.main,
                            paddingEnd: 5,
                            fontWeight: 'bold',
                            fontSize: fontSizes.h4
                        }}>
                            ${item.price}
                        </Text>
                        <Text style={{
                            fontSize: fontSizes.h6
                        }}>
                            (1kg)
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        paddingTop: 5
                    }}>
                        <Image
                            source={icons.star}
                            style={{
                                width: 14,
                                height: 14
                            }}
                        />
                        <Text style={{
                            paddingEnd: 10,
                            paddingLeft: 5
                        }}>
                            5.0 ({item.sold})
                        </Text>

                    </View>

                </View>
            </View>


            <View style={{
                height: 45,
                padding: 5,
                borderRadius: 5,
                marginRight: 10,
                marginTop: 20,
                flexDirection: 'row'
            }}>
                <AntDesign
                    onPress={handleOnRemove}
                    name="minussquare"
                    size={28}
                    color={colors.main} />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 2
                }}>
                    <Text style={{
                        fontSize: fontSizes.h2,
                        paddingHorizontal: 1
                    }}>{item.amount}</Text>
                    <Text>(kg)</Text>
                </View>
                <AntDesign
                    onPress={handleOnAdd}
                    name="plussquare"
                    size={28}
                    color={colors.main} />
                <AntDesign
                    onPress={handleDelete}
                    style={{
                        position: 'relative',
                        top: 50,
                        left: 5
                    }}
                    name="delete"
                    size={30}
                    color="red" />

            </View>

        </View>
    )
}

export default CartItem;