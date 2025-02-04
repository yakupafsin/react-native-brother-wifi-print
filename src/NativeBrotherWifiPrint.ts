import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;
  printImage(printerIp: string, imagePath: string, options: PrintOptions): void;
  // Add other functions from Brother SDK here
}

export interface PrintOptions {
  printerModel: string;
  labelSize: string;
  isAutoCut: boolean;
  isCutAtEnd: boolean;
  autoCutForEachPageCount: number;
  quality: string;
  // Add other print options here
}

export default TurboModuleRegistry.getEnforcing<Spec>('BrotherWifiPrint');
