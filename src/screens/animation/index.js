import { useEffect, useRef } from "react";
import { Animated, Easing, SafeAreaView, Text, View } from "react-native";


const Animation = () => {
    const topMotion = useRef(new Animated.Value(1000)).current;
    useEffect(() => {
        Animated.timing(
            topMotion,
            {
                toValue: 500,
                duration: 2000,
                useNativeDriver: false,
                easing: Easing.linear
            }
        ).start();
    },[])
    return <SafeAreaView style={{
        flex: 1
    }}>
        <View style={{
            flex: 1,
            borderWidth: 5,
            borderColor: 'red'
        }}>
            <Animated.View style={{
                marginTop: topMotion,
                // marginBottom: -1000,
                backgroundColor: 'blue',
                width: 150,
                height: 150,

            }}>
            </Animated.View>
        </View>

    </SafeAreaView>
}

export default Animation;