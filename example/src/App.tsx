import { useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';
import { multiply, printImage } from 'react-native-brother-wifi-print';
import RNFetchBlob from 'rn-fetch-blob';
import ViewShot from 'react-native-view-shot';

const result = multiply(3, 7);

async function requestBluetoothPermissions() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Bluetooth permissions granted');
      } else {
        console.log('Bluetooth permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

export default function App() {
  const priceTagRef = useRef<ViewShot | null>(null);

  useEffect(() => {
    requestBluetoothPermissions();
  }, []);

  const handlePrintImage = async () => {
    try {
      const uri = await priceTagRef.current?.capture?.();
      if (!uri) {
        throw new Error('Failed to capture image');
      }
      const imagePath = `${RNFetchBlob.fs.dirs.DocumentDir}/priceTag.png`;
      console.log(imagePath);
      await RNFetchBlob.fs.cp(uri, imagePath);

      const options = {
        printerModel: 'QL_810W',
        labelSize: 'RollW62RB',
        isAutoCut: true,
        isCutAtEnd: true,
        autoCutForEachPageCount: 1,
        quality: 'Best', // Add quality option
      };

      console.log(printImage('192.168.4.219', imagePath, options));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <ViewShot
        style={styles.viewShot}
        ref={priceTagRef}
        options={{ format: 'png', quality: 0.9 }}
      >
        <View style={styles.priceTag}>
          <Text style={styles.price}>$19.99</Text>
          <Text style={styles.barcode}>|| ||| | |||| ||| | ||</Text>
        </View>
      </ViewShot>
      <Button title="Print Image" onPress={handlePrintImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  priceTag: {
    // padding: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    width: 300,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  barcode: {
    fontSize: 18,
  },
  viewShot: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
