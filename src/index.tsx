import BrotherWifiPrint, { type PrintOptions } from './NativeBrotherWifiPrint';

export function multiply(a: number, b: number): number {
  return BrotherWifiPrint.multiply(a, b);
}

export function printImage(
  printerIp: string,
  imagePath: string,
  options: PrintOptions
): void {
  return BrotherWifiPrint.printImage(printerIp, imagePath, options);
}
