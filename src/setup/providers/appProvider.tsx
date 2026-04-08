import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../services/apiclient/store'

interface AppProviderProps {
  children: React.ReactNode
}

const appProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default appProvider