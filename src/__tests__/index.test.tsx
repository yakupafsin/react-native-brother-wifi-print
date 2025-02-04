import { printImage } from '../index';

describe('printImage', () => {
  it('should call the native module method', () => {
    const printerIp = '192.168.1.100';
    const imagePath = '/path/to/image.png';
    const options = {
      printerModel: 'QL_810W',
      labelSize: 'RollW62RB',
      isAutoCut: true,
      isCutAtEnd: true,
      autoCutForEachPageCount: 1,
      quality: 'HighResolution', // Add quality option
    };
    printImage(printerIp, imagePath, options);
    // Add assertions to verify the behavior
  });
});

it.todo('write a test');
