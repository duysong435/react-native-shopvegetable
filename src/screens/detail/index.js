import { useState } from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

import {
    colors, fontSizes, icons, images
} from '../../constants'
import { MainButton } from "../../components";

const Detail = (props) => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    const { item } = route.params;

    const [amount, setAmount] = useState(1);

    const storeData = async () => {
        try {
            let cartData = await AsyncStorage.getItem("cartData");
            if (cartData) {
                cartData = JSON.parse(cartData);
                cartData.push({
                    id: item.id,
                    img: item.img,
                    title: item.title,
                    price: item.price,
                    details: item.details,
                    amount: amount
                });
            } else {
                cartData = [];
                cartData.push({
                    id: item.id,
                    img: item.img,
                    title: item.title,
                    price: item.price,
                    details: item.details,
                    amount: amount
                });
            }
            AsyncStorage.setItem("cartData", JSON.stringify(cartData));
            navigation.navigate("Cart");
        } catch (e) {
            alert(e)
        }
    }
    return (
        <View style={{
            flex: 100
        }}>
            <View style={{
                flex: 40,
                backgroundColor: 'white',
                position: 'relative'
            }}>
                <TouchableOpacity
                    onPress={() => {
                        goBack();
                    }}
                    style={{
                        backgroundColor: '#ccc',
                        height: 40,
                        width: 40,
                        marginTop: 30,
                        marginStart: 20,
                        padding: 10,
                        borderRadius: 10
                    }}>
                    <Image
                        style={{
                            height: 20,
                            width: 20
                        }}
                        source={icons.goBack} />
                </TouchableOpacity>
                <View style={{
                    alignItems: 'center',
                    backgroundColor: 'red',
                }}>
                    <Image
                        style={{
                            position: 'absolute',
                            top: 10,
                            flex: 1,
                            height: 300,
                            width: 400,
                        }}
                        resizeMode="cover"
                        source={{ uri: item.img }} />
                </View>
            </View>
            <View style={{
                flex: 60,
                backgroundColor: '#f6f6f6',
                paddingLeft: 20,
                paddingRight: 20
            }}>
                <View>
                    <Text style={{
                        fontSize: fontSizes.h2,
                        fontWeight: 'bold',
                        marginTop: 20
                    }}>{item.details}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15,
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',

                        }}>
                            <Text style={{
                                fontSize: fontSizes.h2,
                                color: colors.main,
                                fontWeight: 'bold'
                            }}>${item.price}</Text>
                            <Text style={{
                                fontSize: fontSizes.h5,
                                marginLeft: 3
                            }}>(1kg)</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>

                            <AntDesign
                                onPress={() => {
                                    if (amount > 1) setAmount((val) => val - 1);
                                }}
                                name="minussquare" size={26} color={colors.main} />
                            <Text style={{
                                fontSize: fontSizes.h2,
                                paddingHorizontal: 10
                            }}>{amount}</Text>
                            <AntDesign
                                onPress={() => {
                                    setAmount(amount + 1);
                                }}
                                name="plussquare"
                                size={26}
                                color={colors.main} />
                        </View>
                    </View>

                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                }}>
                    <Image
                        style={{
                            height: 15,
                            width: 15,
                            marginRight: 2
                        }}
                        source={icons.star} />
                    <Text>(262)</Text>
                </View>
                <ScrollView
                    style={{
                        maxHeight: 150
                    }}>
                    <Text style={{
                        textAlign: 'justify',
                        marginTop: 10,
                        fontSize: fontSizes.h4
                    }}>{item.description}</Text>
                </ScrollView>

                {/* Review: Begin */}
                <View>
                    <Text style={{
                        fontSize: fontSizes.h2
                    }}>Reviews</Text>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            height: 40,
                            width: 40,
                            backgroundColor: 'red',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            borderRadius: 5
                        }}>
                            <Image source={icons.person} />
                        </View>
                        <View style={{
                            paddingLeft: 10,
                        }}>
                            <Text style={{
                                fontSize: fontSizes.h3,
                                fontWeight: 'bold',
                            }}>Novican</Text>
                            <View style={{
                                width: 300,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Image
                                        style={{
                                            height: 15,
                                            width: 15,
                                            marginRight: 2
                                        }}
                                        source={icons.star} />
                                    <Text>(262)</Text>
                                </View>
                                <Text>Apr 29, 2021</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: fontSizes.h4,
                        textAlign: 'justify'
                    }}>
                        Nó là một sanr phẩm thực sự rất tốt về chất lượng lẫn hình ảnh mọi người mua về sẽ không bao giờ thất vọnh
                    </Text>
                    {/* Review: end */}
                </View>

                {/* Button: begin */}
                <View style={{
                    flexDirection: 'row',
                    marginTop: 50,
                    alignItems: 'center'
                }}>
                    <MainButton
                        onPress={() => storeData()}
                        name='Thêm giỏ hàng'
                        styles={{ width: '100%' }}
                    />
                </View>
                {/* Butotn: end */}
            </View>
        </View>
    )
}

export default Detail;