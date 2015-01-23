CRM Mobile Apps
===============

Mobile apps for CRM - Android &amp; iOS

Date 23/1/2015

- Framework under ionic & angularjs
- Compatible with phone and tablet
- Branch version starting 0.5.0


## Plugins ##

**Ionic Keyboard**

- command
 

>     cordova plugin add com.ionic.keyboard

- Edit in config.xml

>     <feature name="Keyboard">
>     <param name="ios-package" value="IonicKeyboard" onload="true" />
>     </feature>

**Cordova Splash Screen**

- command

>     cordova plugin add org.apache.cordova.splashscreen

- Edit in config.xml

>     <preference name="SplashScreen" value="screen" />
>     <preference name="SplashScreenDelay" value="3000" />

**Barcode Scanner**

- command

>     cordova plugin add http://github.com/phonegap-build/BarcodeScanner.git

- Edit in config.xml

>     <feature name="BarcodeScanner">
>         <param name="android-package" value="com.phonegap.plugins.barcodescanner.BarcodeScanner" />
>         <param name="ios-package" value="com.phonegap.plugins.barcodescanner.BarcodeScanner" />
>     </feature>

