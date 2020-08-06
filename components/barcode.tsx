import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

interface barcodeProps {
    valueSetter: React.Dispatch<React.SetStateAction<string>>;
    onScanned: Function;
}

export default (props:barcodeProps)=> {
    const [hasPermission, setHasPermission] = useState<boolean|null>(null);

    useEffect(() => {
        (
            async () => {
                const { status } = await BarCodeScanner.requestPermissionsAsync()
                setHasPermission(status === 'granted')
            }
        )()
    },[])

    const handleBarCodeScanned = ({ type, data }: { type:String, data:string }) => {
        type === '32'
        ?
        props.valueSetter(data)
        :null;
        props.onScanned()
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View>
        <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={{
                height: 500
            }}
        />
        </View>
    )
}