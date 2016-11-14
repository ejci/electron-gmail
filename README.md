# Electron Gmail app

Simple [Electron](https://github.com/electron/) wrapper for gmail. Similar to [timche/gmail-desktop](https://github.com/timche/gmail-desktop) or [paulot/gmail](https://github.com/paulot/gmail).
The main difference is support for HTTP authenitifcation (modal window with a callback) as electron has issues with HTTP authentication.
Maybe I will add more functionality if I will get bored again (or pissed by poor support of Outlook and Mail.app for gsuite)

![Screen 1](https://github.com/ejci/electron-gmail/blob/master/resources/screen_1.png?raw=true)
![Screen 2](https://github.com/ejci/electron-gmail/blob/master/resources/screen_2.png?raw=true)
![Screen 3](https://github.com/ejci/electron-gmail/blob/master/resources/screen_3.png?raw=true)

## Test
```
git clone https://github.com/ejci/electron-gmail
cd electron-gmail
npm install
npm install electron -g
electron .
```

## Build
```
git clone https://github.com/ejci/electron-gmail
cd electron-gmail
npm install electron -g
npm install electron-packager -g
electron-packager . Gmail --platform=darwin --arch=x64 --icon=gmail.icns --overwrite
```

## Version
0.0.1

## License
All code is open source and dual licensed under GPL and MIT. Check the individual licenses for more information.
