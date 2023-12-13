## About

Simple base application for tracking work hours, using @capacitor-community/sqlite for database handling
[https://github.com/capacitor-community/sqlite]

Project contains the jeep-sqlite package for web storage.
[https://github.com/capacitor-community/sqlite/blob/master/docs/Web-Usage.md]

## Getting Started

First, install the packages
```bash
cd WorkingHours
npm i 
```

Start the development server
```bash
npm run start
```

Open 
[http://localhost:4200]


Run project in android studio
```bash
npm run start-mobile
```

## Test data

The test data is located under app/src/mock-data. On native, the data will be added with each restart.

## Learn more

For native optimization, consider removing the jeep-sqlite package.
If you find yourself rebuilding the Android app, ensure you add user permissions for storage.
```bash
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```
Depends on your support for older Android versions.
[https://developer.android.com/training/data-storage/use-cases] 
```bash
    <application android:requestLegacyExternalStorage="true">
```
