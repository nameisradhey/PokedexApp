import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { styles } from './viewToggle.styles'
import type { ViewToggleProps } from './viewToggle.types'

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onToggle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, viewMode === 'grid' && styles.btnActive]}
        onPress={() => onToggle('grid')}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>⊞</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, viewMode === 'list' && styles.btnActive]}
        onPress={() => onToggle('list')}
        activeOpacity={0.7}
      >
        <Text style={styles.icon}>☰</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ViewToggle