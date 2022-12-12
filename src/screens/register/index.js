import { useState } from "react";
import {
    Alert,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { colors, fontSizes, icons, images } from '../../constants'
import { MainButton } from "../../components";
import { isValiEmail, isValiPassord } from '../../utilies/Validation'
import axios from "axios";


const Register = (props) => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const isValidationOK = () => email.length > 0 && password.length > 0
        && isValiEmail(email) == true
        && isValiPassord(password) == true

    const PutData = async () => {
        await axios.post(`https://1ed9-2402-9d80-211-6d28-310f-c6fb-d469-b743.ap.ngrok.io/login/add`, {
            email,
            password,
            userName
        })
            .then((response) => {
                // console.log(response?.data);
                Alert.alert(
                    "Thông báo",
                    "Đăng kí tài khoản mói thành công",
                    [
                        {
                            text: "OK",
                            onPress: () => navigate('Login')
                        }
                    ]
                );
            })
            .catch((error) => {
                console.log(error)
                Alert.alert(
                    "Thông báo",
                    "Đăng kí tài khoản thất bại",
                    [
                        {
                            text: "OK",
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
                height: 444
            }}>

                <Image
                    source={images.backgroundLogin}
                    resizeMode='stretch'
                    style={{
                        width: '100%',
                        position: 'relative'
                    }} />
                <TouchableOpacity
                    onPress={() => {
                        goBack();
                    }}
                    style={{
                        backgroundColor: "#f4f4f4",
                        width: 50,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 100,
                        position: 'absolute',
                        top: 30,
                        left: 10
                    }}>
                    <Image source={icons.goBack} />
                </TouchableOpacity>
            </View>

            <View>
                <View>
                    <Text style={{
                        color: colors.main,
                        fontWeight: "bold",
                        marginLeft: 20
                    }}>
                        UserName
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
                        placeholder={'Enter your user name'}
                        value={userName}
                        onChangeText={(text) => {
                            setUserName(text);
                        }}
                    />
                    <Text style={{
                        color: "red",
                        marginLeft: 20
                    }}>{errorPassword}</Text>
                </View>
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
                        // navigate('TabUI')
                        PutData();
                    }}
                    name='Sign Up'
                    styles={{
                        marginLeft: 20,
                        marginTop: 20
                    }}
                    disabled={isValidationOK() == false}
                    isValidation={isValidationOK() == false ? 0.5 : 1}
                />
            </View>
        </View>
    )
}

export default Register;