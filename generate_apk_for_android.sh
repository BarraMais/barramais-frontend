#!/bin/bash

BUILDED_APK="platforms/android/build/outputs/apk/android-release-unsigned.apk"
APK_DEST="platforms/android/build/outputs/apk"
APK_NAME="BarraMais"
KEYSTORE_ALIAS="bmaisreleasekey"
KEYSTORE_NAME="bmais-release-key"
OPEN="N"
PWD_FOR_KEYSTORE="vorteX20"

echo -e "Open folder for the new APK? [s/N]"
read OPEN

echo -e "Building cordova for an android release...\n"
cordova build --release android --prod
echo -e "cordova build finished.\n"

if [ ! -s bmais-release-key.keystore ]; then
	echo -e "Generating keystore...\n"
	echo -n "Password for keystore: "
	read PWD_FOR_KEYSTORE

	keytool -genkey -v -keystore $KEYSTORE_NAME.keystore -alias $KEYSTORE_ALIAS -keypass $PWD_FOR_KEYSTORE -keyalg RSA -keysize 2048 -validity 10000
	echo -e "Keystore generated.\n"
fi

echo -e "Signing jar...\n"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE_NAME.keystore -storepass $PWD_FOR_KEYSTORE $BUILDED_APK $KEYSTORE_ALIAS
echo -e "jar signed\n"

echo -e "Zipping APK...\n"
$ANDROID_HOME/build-tools/24.0.0/zipalign -f -v 4 $BUILDED_APK "$APK_DEST/$APK_NAME.apk"
echo -e "\nAPK generated to $APK_DEST/$APK_NAME.apk"

if [ test $OPEN ] && [ $OPEN == 'S' ] || [ $OPEN == 's' ]; then
	nautilus "$APK_DEST/$APK_NAME.apk"
fi
