import React, { useState } from 'react';
import { ViewStyle } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
export default ({ placeholder, style }: { placeholder: string; style?: ViewStyle; }) => {
    const [value, setValue] = useState(placeholder);
    return (<>
        <TextInput
            value={value}
            onChangeText={(val) => setValue(val)}
            style={[{ backgroundColor: '#CCCCCC', borderRadius: 7, padding: 10, paddingVertical: 8, marginBottom: 10, flexGrow: 1 }, style]}
        />
    </>);
};
