import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

interface barcodeProps {
    valueSetter: React.Dispatch<React.SetStateAction<string>>;
    onScanned?: Function;
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
        props.valueSetter(data)
        props.onScanned?
        props.onScanned()
        :null
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={{
                flex: 1
            }}
        />
    )
}