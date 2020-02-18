npm run build
rm -r ./BasicProject/.buildResult
rm -r ./BasicProject/.sign
rm -r ./BasicProject/static/*
rm ./BasicProject/.manifest.tmp
rm ./BasicProject/KartinaTV.wgt
rm ./BasicProject/author-signature.xml
rm ./BasicProject/icon.png
rm ./BasicProject/index.html
rm ./BasicProject/signature1.xml

#cp -v -t ./BasicProject ./build/static/*
cp -v -a -t ./BasicProject/ ./build/*

cd BasicProject
/home/vz/tizen-studio/tools/ide/bin/tizen.sh clean
/home/vz/tizen-studio/tools/ide/bin/tizen.sh build-web
/home/vz/tizen-studio/tools/ide/bin/tizen.sh package -t wgt -s MyProfile3
/home/vz/tizen-studio/tools/sdb connect 192.168.100.133:26101
/home/vz/tizen-studio/tools/ide/bin/tizen.sh uninstall -p p8eTndSvz3.BasicProject -t UE32M5503
/home/vz/tizen-studio/tools/ide/bin/tizen.sh install -n tizen-fileveiw.wgt -t UE32M5503
#/home/vz/tizen-studio/tools/ide/bin/tizen.sh run -t UE32M5503 -p p8eTndSvz3.BasicProject
declare PORT=`/home/vz/tizen-studio/tools/sdb shell 0 debug p8eTndSvz3.BasicProject 0|awk '{print $11}'|tr -d '[:space:]'`
echo 192.168.100.133:$PORT
/opt/google/chrome/chrome --disable-web-security `echo 192.168.100.133:$PORT`
cd ..
