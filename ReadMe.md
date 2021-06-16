# CryptoCurrencies

<p align="center">
  <img src="https://tinyimg.io/i/yoAvdAE.png">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://tinyimg.io/i/UBXkhAA.png">
  <img src="https://tinyimg.io/i/6jnVRRX.png">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://tinyimg.io/i/Um9gH8b.png">
</p>

---
Thank you for being interested in reading this 🥰🥰🥰🥰🥰

---

**CryptoCurrencies** is a React Native app, it follows the design of the Crypto Wallet App, located in [mockittapp wondershare](https://mockittapp.wondershare.com/community/mtkk714ek03lp18?title=crypto-wallet-app)

It was developed as a bare react native app using **React Native CLI**

Although some of the features don't work, it shows a general overview of what an app like this should have

## Installation

In order to install it in your computer, clone the project from [GitHub](https://github.com/rafaelsoteldosilva/CryptoCurrencies), then run the following in the containing folder, in order to add the corresponding dependencies

"Install React-NativeCLI" (npm install -g react-native-cli)  
npm install @react-navigation/native  
npm install react-native-gesture-handler -native-screens react-native-safe-area-context @react-native-community/masked-view  
npm install @react-navigation/stack  
npm install react-native-screens  
npm install react-redux redux redux-thunk  
npm install axios  

## React Native Debugger

npm install --save-dev react-devtools  
add *"devtools": "react-devtools"* under scripts in package.json  
npm run devtools  
Make sure you install the **Stand-alone React Native Debugger** for a better debugging experience.

[Here you can download the debugger](https://github.com/jhen0409/react-native-debugger/releases)

## Components and folders

The main folders are

* assets
* components
* constants
* helpers
* navigation
* screens
* stores

## The App

The App creates a Stack Navigator with one screen, tabs.js, which in turn creates a ButtonTabNavigator with 4 screens, Home, Portfolio, trade, Market and Profile, which corresponds to each of the button tabs

Those screens are located in the screens folder

Each of them are wrapped in a MainLayout component:

```js
        <MainLayout>
            <View>
                The component...
            </View>
        </MainLayout>
```

This MainLayout is there to detect when the central button tab was pressed, in that case, a redux state flag was set (in tabs.js), then MainLayout dims the background and animates the presentation of two bottom buttons, transfer and withdraw

## Libraries and API used in this project

I used most of the libraries React Native Projects use

React Native Navigation, Gestures and so on  
Redux  
Axios  

And I used the [CoinGecko](https://www.coingecko.com/en/api) API to get the current values of the market CryptoCurrencies. It doesn't require API keys 😀😀

Specifically, I used /coins/markets to get the CryptoCurrencies values:

id  
symbol  
name  
image  
current price  
price percentage change in the last 7 days  
spark line in 7 days (it is useful for drawing the line charts)

## Notes

The components **Home**, **Portfolio** and **Market** should show line charts, in this version I couldn't show them since I kept getting library related errors (like @rainbow-me/animated-charts, and others)

In a next version I'll have this issues solved. In the meantime, I showed a message "Here goes the chart", and in **Market** I showed "LineChart" in the place where a little line chart should be shown

It also hard codes the current wallet of the user, in the constant dummyData.holdings I place what should be that current wallet.

In another version of the app, it will keep it in a database, that could be PostgreSql, in conjunction with express and sequelize to ease the construction of the queries. It will bring the buttons transfer and withdraw to life
<br />
<br />
<br />

Although the **Trade** button should be black according to the general design, I liked it white better 😀😀😀😀😀
<br />
<br />
<br />

Rafael Soteldo