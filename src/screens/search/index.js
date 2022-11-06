import { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

import { colors, fontSizes, icons } from "../../constants";
import { products } from '../../data'

const Search = (props) => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    const isFocused = useIsFocused();

    const [searchText, setSearchText] = useState('');
    const [amount, setAmount] = useState(1);
    const [products, setProducts] = useState();

    const categories = [
        "Ngô nếp",
        "Ngô nếp trắng",
        "Khoai tây trung quốc",
        "Khoai tây đà lạt",
        "Bắp cải "
    ];

    const filltered = () => products.filter(eachFood => eachFood.details.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));

    const storeData = async (item) => {
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

    const getProducts = async () => {
        try {
            const response = await axios.get('https://b4e6-2402-9d80-22d-6394-9103-573f-3110-bb1b.ap.ngrok.io/products/list');
            setProducts(response?.data?.result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [isFocused])

    return (<View style={{
        flex: 1,
        marginTop: StatusBar.currentHeight + 10,
    }}>
        <View style={{
            backgroundColor: 'white'
        }}>
            <Text style={{
                color: "#2FDBBC",
                fontWeight: "bold",
                marginLeft: 20,
                fontSize: fontSizes.h3
            }}>Tìm kiếm </Text>
            <View>
                <Image
                    style={{
                        position: 'absolute',
                        top: 12,
                        left: 20
                    }}
                    source={icons.search}
                />
                <TextInput
                    autoFocus={true}
                    placeholder="Nhập để tìm kiếm"
                    onChangeText={(text) => {
                        setSearchText(text);
                    }}
                    style={{
                        height: 40,
                        borderRadius: 10,
                        borderWidth: 1,
                        paddingStart: 35,
                        marginHorizontal: 10,
                        marginBottom: 10
                    }}
                    value={searchText}
                />
                {searchText.trim().length > 0 || (
                    <View style={{
                        marginLeft: 20
                    }}>
                        <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 10 }}>
                            GỢI Ý CHO BẠN
                        </Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {categories.map((value, item) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSearchText(value);
                                    }}
                                    style={{
                                        backgroundColor: "#f4f4f4",
                                        paddingHorizontal: 12,
                                        paddingVertical: 8,
                                        marginRight: 12,
                                        marginBottom: 12,
                                        borderRadius: 100,
                                    }}
                                    key={item}
                                >
                                    <Text>{value}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </View>
        {(products == undefined ? products : filltered().length) > 0 ?
            <FlatList
                data={filltered()}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item + index}
                numColumns={1}
                renderItem={({ item }) => {
                    return <TouchableOpacity
                        onPress={() => {
                            navigate('Detail', { item });
                        }}
                        style={{
                            flex: 1,
                            width: 350,
                            marginTop: 5,
                            marginBottom: 7,
                            marginLeft: 20,
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
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                    margin: 6
                                }}

                            />
                            <View style={{
                                paddingLeft: 10
                            }}>
                                <Text style={{
                                    fontSize: fontSizes.h4,
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
                                        fontSize: fontSizes.h3
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


                        <TouchableOpacity
                            onPress={() => storeData(item)}
                            style={{
                                height: 35,
                                backgroundColor: colors.main,
                                padding: 5,
                                borderRadius: 5,
                                marginRight: 10,
                                marginTop: 70
                            }}>
                            <Image
                                source={icons.cart}
                                style={{
                                    tintColor: 'white',
                                }}
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                }}
            />
            : <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: fontSizes.h2
                }}>No Product Found</Text>
            </View>
        }

    </View>
    )
}

export default Search;