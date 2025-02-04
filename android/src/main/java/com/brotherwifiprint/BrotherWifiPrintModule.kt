package com.brotherwifiprint

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.brother.ptouch.sdk.Printer
import com.brother.ptouch.sdk.PrinterInfo
import android.util.Log
import com.brother.sdk.lmprinter.*
import com.brother.sdk.lmprinter.setting.QLPrintSettings
import java.io.File
import android.os.FileUtils
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import java.io.FileOutputStream
import com.brother.sdk.lmprinter.setting.PrintImageSettings

@ReactModule(name = BrotherWifiPrintModule.NAME)
class BrotherWifiPrintModule(reactContext: ReactApplicationContext) :
  NativeBrotherWifiPrintSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  override fun printImage(printerIp: String, imagePath: String, options: ReadableMap) {
    val channel: Channel = Channel.newWifiChannel(printerIp)
    val result: PrinterDriverGenerateResult = PrinterDriverGenerator.openChannel(channel)
    if (result.error.code !== OpenChannelError.ErrorCode.NoError) {
      Log.e(NAME, "Error - Open Channel: " + result.error.code)
      return
    }
    val printerDriver = result.driver
    val printSettings = QLPrintSettings(PrinterModel.valueOf(options.getString("printerModel")!!))
    printSettings.labelSize = QLPrintSettings.LabelSize.valueOf(options.getString("labelSize")!!)
    printSettings.workPath = reactApplicationContext.filesDir.absolutePath
    printSettings.isAutoCut = options.getBoolean("isAutoCut")
    printSettings.isCutAtEnd = options.getBoolean("isCutAtEnd")
    printSettings.autoCutForEachPageCount = options.getInt("autoCutForEachPageCount")
    printSettings.printQuality = PrintImageSettings.PrintQuality.valueOf(options.getString("quality")!!)

    Log.d(NAME, "Label Size Set: " + printSettings.labelSize)

    try {
      val bitmap = BitmapFactory.decodeFile(imagePath)
      val convertedImagePath = "${reactApplicationContext.cacheDir}/converted_image.png"
      val out = FileOutputStream(convertedImagePath)
      bitmap.compress(Bitmap.CompressFormat.PNG, 100, out)
      out.flush()
      out.close()

      val printError: PrintError = printerDriver.printImage(convertedImagePath, printSettings)
      if (printError.code != PrintError.ErrorCode.NoError) {
        if (printError.code == PrintError.ErrorCode.SetLabelSizeError) {
          Log.d(NAME, "Error - Set Label Size: " + printError)
        } else {
          Log.d(NAME, "Error - Print Image: " + printError.code)
        }
      } else {
        Log.d(NAME, "Success - Print Image")
      }
    } catch (e: Exception) {
      Log.e(NAME, "Error - Image Conversion: " + e.message)
    } finally {
      printerDriver.closeChannel()
    }
  }

  companion object {
    const val NAME = "BrotherWifiPrint"
  }
}
