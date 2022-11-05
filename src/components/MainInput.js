import React from "react";
import { View, Text, TextInput } from "react-native";

const MainInput = (props) => {
    const {
        title,
        value,
        onChangeText,
        placeholder,
        onEndEditing,
        secureTextEntry,
    } = props;
    return (
        <View>
            <Text style={{ color: "#2FDBBC", fontWeight: "bold", marginLeft: 20 }}>
                {title}
            </Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                style={{
                    backgroundColor: "#f4f4f4",
                    paddingVertical: 6,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    marginBottom: 14,
                    width: '95%',
                    marginLeft: 10
                }}
                placeholder={placeholder}
                onEndEditing={onEndEditing}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

export default MainInput;