import 'react-native-gesture-handler'
import React from 'react'
import AppProvider from './src/setup/providers/appProvider'
import { AppNavigator } from './src/setup'

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  )
}