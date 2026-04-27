import "react-native-gesture-handler";
import React from "react";
import AppProvider from "./src/setup/providers/appProvider";
import { AppNavigator } from "./src/setup";
import NetworkBanner from "./src/components/networkBanner/networkBanner";

export default function App() {
  return (
    <AppProvider>
        <AppNavigator />
        <NetworkBanner />
    </AppProvider>
  );
}
