# react-native-brother-wifi-print

Brother printers

## Installation

```sh
npm install react-native-brother-wifi-print
```

## Usage

### printImage

```js
import { printImage } from 'react-native-brother-wifi-print';

const printerIp = '192.168.1.100';
const imagePath = '/path/to/image.png';
const options = {
  printerModel: 'QL_810W',
  labelSize: 'RollW62RB',
  isAutoCut: true,
  isCutAtEnd: true,
  autoCutForEachPageCount: 1,
  quality: 'HighResolution',
};

printImage(printerIp, imagePath, options);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
