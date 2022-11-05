import { useEffect, useState } from "react";
import {
    Image,
    Text,
    TextInput,
    View
} from "react-native";

import { colors, fontSizes, images } from '../../constants'
import { MainButton } from "../../components";
import { isValiEmail, isValiPassord } from '../../utilies/Validation'



const Login = (props) => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;

    const [email, setEmail] = useState('long@gmail.com');
    const [password, setPassword] = useState('12345');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const isValidationOK = () => email.length > 0 && password.length > 0
        && isValiEmail(email) == true
        && isValiPassord(password) == true

    const setData = async (array) => {
        try {
            await AsyncStorage.setItem('UserName', JSON.stringify(array));
        } catch (error) {
            console.log(error)
        }
    }

    const getApiData = async () => {
        await axios.post(`https://d298-2402-9d80-24a-b9b4-aced-f42c-62e1-2086.ap.ngrok.io/login`, {
            Email: email,
            Password: password
        })
            .then((response) => {
                // console.log(response?.data?.response[0].UserName);
                navigate('TabUI');
                // setData(response?.data?.response[0].UserName);
                setData();

            })
            .catch((error) => {
                // console.log(error);
                Alert.alert(
                    "Tài khoản hoặc mật khẩu sai",
                    "Bạn có đăng kí tài khoản mới không?",
                    [
                        {
                            text: "Cancel"
                        },
                        {
                            text: "OK",
                            onPress: () => navigate('Register')
                        }
                    ]
                );
            })

    }


    return (
        <View style={{
            flex: 100,
            backgroundColor: 'white'
        }}>
            <View style={{
                height: 444,

            }}>
                <Image
                    source={images.backgroundLogin}
                    resizeMode='stretch'
                    style={{
                        width: '100%',
                    }} />
            </View>

            <View>
                <View>
                    <Text style={{
                        color: colors.main,
                        fontWeight: "bold",
                        marginLeft: 20
                    }}>
                        Email
                    </Text>
                    <TextInput
                        secureTextEntry={false}
                        style={{
                            backgroundColor: "#f4f4f4",
                            paddingVertical: 6,
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            width: '95%',
                            marginLeft: 10
                        }}
                        placeholder={'Enter your email'}
                        value={email}
                        onChangeText={(text) => {
                            setErrorEmail(isValiEmail(text) == true ? '' : 'Email not in corret format');
                            setEmail(text)
                        }}
                    />
                    <Text style={{
                        color: "red",
                        marginLeft: 20
                    }}>{errorEmail}</Text>
                </View>
                <View>
                    <Text style={{
                        color: colors.main,
                        fontWeight: "bold",
                        marginLeft: 20
                    }}>
                        Password
                    </Text>
                    <TextInput
                        secureTextEntry={true}
                        style={{
                            backgroundColor: "#f4f4f4",
                            paddingVertical: 6,
                            borderRadius: 20,
                            paddingHorizontal: 20,
                            marginBottom: 4,
                            width: '95%',
                            marginLeft: 10
                        }}
                        placeholder={'Enter your password'}
                        value={password}
                        onChangeText={(text) => {
                            setErrorPassword(isValiPassord(text) == true ? '' : 'Password must be at least 3 characters');
                            setPassword(text)
                        }}
                    />
                    <Text style={{
                        color: "red",
                        marginLeft: 20
                    }}>{errorPassword}</Text>
                </View>
                <MainButton
                    onPress={() => {
                        navigate('TabUI')
                    }}
                    name='Login'
                    styles={{
                        marginLeft: 20,
                        marginTop: 20
                    }}
                    disabled={isValidationOK() == false}
                    isValidation={isValidationOK() == false ? 0.5 : 1}
                />
                <View style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    justifyContent: 'center'
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
                    <Text
                        onPress={() => {
                            navigate('Register')
                        }}
                        style={{
                            marginLeft: 5,
                            color: colors.main,
                            fontSize: fontSizes.h4
                        }}>
                        Register
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Login;