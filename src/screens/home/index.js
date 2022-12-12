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
import { categories } from '../../data'

const Home = (props) => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    const [search, setSearch] = useState('');

    const [amount, setAmount] = useState(1);
    const [name, setName] = useState('UserName');
    const [products, setProducts] = useState();
    const [cate, setCate] = useState('');

    const filltered = () => products.filter(eachFood => eachFood.title.toLocaleLowerCase().includes(cate.toLocaleLowerCase()));

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_Name')
            if (value !== null) {
                setName(value);
            }
        } catch (e) {

        }
    }

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
        await axios.get('https://1ed9-2402-9d80-211-6d28-310f-c6fb-d469-b743.ap.ngrok.io/products/list')
            .then((response) => {
                setProducts(response?.data?.result);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    useEffect(() => {
        getProducts();
        getData();
    }, []);
    return (
        <ScrollView
            stickyHeaderIndices={[1]}
            style={{
                flex: 100,
                marginTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'white',
                position: 'relative'
            }}>
            <View style={{
                flex: 20,
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: fontSizes.h3,
                        marginTop: 20
                    }}>Hello</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: fontSizes.h3,
                        marginTop: 20,
                        paddingLeft: 5,
                        color: colors.main
                    }}>{name.toUpperCase()}</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: fontSizes.h2,
                        color: colors.yellow,
                        fontWeight: 'bold'
                    }}>
                        Find
                    </Text>
                    <Text style={{
                        fontSize: fontSizes.h2,
                        color: colors.main,
                        paddingLeft: 5,
                        fontWeight: 'bold'
                    }}>
                        Fresh Vegetables
                    </Text>

                </View>
                <View>
                    <Image
                        style={{
                            position: 'relative',
                            top: '50%',
                            left: 10,
                            width: 10,
                            height: 10,
                        }}
                        source={icons.search} />
                    <TextInput
                        onPressIn={() => {
                            navigate('Search')
                        }}
                        value={search}
                        onChangeText={(text) => { setSearch(text) }}
                        placeholder="Search vegetable..."
                        style={{
                            width: '100%',
                            height: 40,
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingStart: 23,
                            borderColor: colors.placeholder
                        }} />
                </View>


            </View>
            <View style={{
                flex: 20
            }}>
                <View style={{
                    height: 100,
                    backgroundColor: 'white'
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: fontSizes.h3
                    }}>Categories</Text>
                    <FlatList
                        style={{
                            // paddingLeft: 10
                        }}
                        data={categories}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => {
                            return <TouchableOpacity
                                onPress={() => {
                                    setCate(item.name)
                                }}
                                style={{
                                    alignItems: 'center',
                                    height: 40,
                                    width: 90,
                                    marginRight: 20,
                                    borderRadius: 10,
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    backgroundColor: 'white',
                                    marginLeft: 3,

                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.23,
                                    shadowRadius: 10,
                                    elevation: 4,
                                }}>

                                <Image style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'cover',
                                    margin: 10
                                }}
                                    source={item.img}
                                />
                                <Text style={{
                                    fontSize: fontSizes.h4,
                                    // color: colors.main
                                    color: 'black',
                                }}>{item.name}</Text>
                            </TouchableOpacity>
                        }}
                    />

                </View>
            </View>
            <View style={{
                flex: 60,
                // backgroundColor: 'pink'
            }}>

                <View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: fontSizes.h3
                        }}>Products</Text>
                        <TouchableOpacity onPress={() => {
                            setCate('')
                        }}>
                            <Text
                                // onPress={() => {
                                //     setSearch('');
                                // }}
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: fontSizes.h3,
                                    marginRight: 10,
                                    color: colors.main
                                }}>Set All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} >
                        <FlatList
                            data={products == undefined ? products : filltered()}
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
                                            paddingLeft: 10
                                        }}>
                                            <Text style={{
                                                fontSize: fontSizes.h4,
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
                                                    5.0 (đã bán:{item.sold})
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
                    </ScrollView>
                </View>
            </View>
        </ScrollView>)
}

export default Home;