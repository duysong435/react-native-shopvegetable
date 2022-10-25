import { Text, TouchableOpacity } from "react-native";
import { colors } from "../constants";
const MainButton = (props) => {
    const { styles, name, onPress } = props;
    return <TouchableOpacity
        onPress={onPress}
        style={{
            width: '90%',
            height: 60,
            backgroundColor: colors.main,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles,
        }}>
        <Text style={{
            fontSize: 20,
            color: 'white'
        }}>{name}</Text>
    </TouchableOpacity>
}

export default MainButton;