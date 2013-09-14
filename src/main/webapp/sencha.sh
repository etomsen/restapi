cd $SENCHA_SDK
sencha generate workspace ~/Documents/prj/edp/eib-webapp/
cd ~/Documents/prj/edp/eib-webapp
sencha -sdk $SENCHA_SDK generate app eib-webapp .
sencha app upgrade $SENCHA_SDK
sencha app build


rm -rf ~/Documents/prj/SenchaTouch2/eib-webapp
cp -r ../eib-webapp ~/Documents/prj/SenchaTouch2/

rm -rf ~/Documents/prj/SenchaTouch2/production
cp -r build/eib-webapp/production ~/Documents/prj/SenchaTouch2