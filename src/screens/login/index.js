import { useEffect, useRef } from "react";
import { Animated, Easing, Image, ImageBackground, Text, View } from "react-native";
import Header from "./header";
import Footer from "./footer";
import { images } from '../../constants'
const Login = () => {
    const topMotion = useRef(new Animated.Value(800)).current;
    useEffect(() => {
        Animated.timing(
            topMotion,
            {
                toValue: 0,
                duration: 2000,
                useNativeDriver: false,
                easing: Easing.linear
            }
        ).start();
    }, [])
    return (
        <View style={{
            flex: 100
        }}>
            <View style={{
                height: 444,
                backgroundColor: 'red',

            }}>
                {/* <Header /> */}
                <Image
                    source={images.backgroundLogin}
                    resizeMode='stretch'
                    style={{
                        width: '100%',
                        // maxWidth: '100%'
                    }}
                />

            </View>
            <Animated.View style={{
                paddingTop: topMotion,
                flex: 30,
                height: 400,
                width: '100%'
            }}>
                <Footer />
            </Animated.View>
        </View>)
}

export default Login;