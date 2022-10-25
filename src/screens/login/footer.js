import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from '../../constants'
import { MainButton } from '../../components'
const Footer = () => {
    return <View style={{
        flex: 100,
        backgroundColor: colors.main,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }}>
        <MainButton 
            name= 'Login'
        />
    </View>
}

export default Footer;