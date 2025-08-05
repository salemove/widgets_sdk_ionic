### Running this example application

To run the provided example application, complete the following steps:

1. Clone the repository:
 ```bash
 git clone https://github.com/salemove/widgets_sdk_ionic.git
 ```
2. Navigate to the project directory:
 ```bash
 cd widgets_sdk_ionic
 ```
3. Install dependencies:
 ```bash
 npm install
 ```
4. Build the SDK:
 ```bash
 npm run build
 ```
5. Navigate to the example app directory:
 ```bash
 cd example-app
 ```
6. Create the environment file and add your Glia credentials:
    - Create the file: `example-app/src/environments/environment.ts`.
    - Refer to the [How to use environment variables?](#how-to-use-environment-variables) section for the instructions on how to add your Glia credentials.
7. Install dependencies for the example app:
 ```bash
 npm install --legacy-peer-deps
 ```
8. Build the example app:
 ```bash
 npm run build
 ```
9. Sync with Capacitor:
 ```bash
 npx cap sync
 ```
10. Open the Android project (`widgets_sdk_ionic/example-app/android`) in Android Studio:
    - Sync the project with Gradle.
    - Run the Android app.
11. Open the iOS project (`widgets_sdk_ionic/example-app/ios`) in Xcode:
    - Run the iOS app.

### How to use environment variables?

- Create an `environments` folder inside the `src` folder, and then create the `environment.ts` file inside it: `example-app/src/environments/environment.ts`.
- Add all environment variables to the `environment.ts` (replace the example values with your data):

```typescript
export const environment = {
  IONIC_API_KEY: 'site-api-key',
  IONIC_API_SECRET: 'site-api-secret',
  IONIC_SITE_ID: 'site-identifier',
  IONIC_REGION: 'us',
  IONIC_COMPANY_NAME: 'IonicCompany',
};
```

After environment variables are defined:

1. Open the `example-app` folder.
2. Run `npm run build`.
3. Run `npx cap sync`.

ℹ️ Since Ionic is built on top of Angular, the example app project uses Angular’s built-in mechanism for managing environment variables. You can refer to the official Angular documentation [here](https://v17.angular.io/guide/build).

### Troubleshooting

To be sure that environment variables have been applied correctly, open the `public` folder and find the `index-#{some_hash}.js` file. If the variables were applied correctly, you should see something like this in Android Studio and Xcode, respectively:
![image](/image/406754853-aff92ca8-14e1-4ba3-a89c-c20569880d55.png)
![image](/image/406755039-3cf54cb1-fb3c-4eab-a494-3c92cb13cbfa.png)

