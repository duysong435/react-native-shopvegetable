import {
    Image,
    Text,
    View
} from "react-native";
import {
    fontSizes,
    images,
    icons,
    colors
} from '../../constants'
import { MainButton } from '../../components'


const Welcome = (props) => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    return <View style={{
        flex: 100,
        marginTop: 20,
        backgroundColor: '#fff'
    }}>
        <View style={{
            flex: 20
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 50
            }}>
                <Text style={{
                    color: 'yellow',
                    fontSize: fontSizes.h1
                }}>
                    Me
                </Text>
                <Text style={{
                    color: 'green',
                    fontSize: fontSizes.h1,
                    marginLeft: 5,
                    fontWeight: "bold"
                }}>
                    Vegetarian
                </Text>
            </View>

            <Text style={{
                textAlign: 'center',
                fontSize: fontSizes.h3
            }}>
                Choose special Vegetables for you
            </Text>

        </View>
        <View style={{
            flex: 55
        }}>
            <Image
                source={images.welcome}
                resizeMode='stretch'
                style={{
                    height: '100%',
                    width: '100%'
                }}
            />
        </View>
        <View style={{
            flex: 25,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <MainButton
                onPress={() => {
                    navigate('TabUI')
                }}
                styles={{

                }}
                name='Sign In'
            />
            <View style={{
                flexDirection: 'row',
                marginTop: 15
            }}>
                <Text style={{
                    fontSize: fontSizes.h4
                }}>
                    Don't have an account
                </Text>
                <Text style={{
                    marginLeft: 1,
                    fontSize: fontSizes.h4
                }}>?</Text>
                <Text style={{
                    marginLeft: 5,
                    color: colors.main,
                    fontSize: fontSizes.h4
                }}>
                    Register
                </Text>
            </View>

        </View>
    </View>
}

export default Welcome;