import React from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { styles } from './searchBar.styles'
import type { SearchBarProps } from './searchBar.types'

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onMenuPress, onFocus }) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.menuBtn} onPress={onMenuPress} activeOpacity={0.7}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          placeholder="Search Pokémon..."
          placeholderTextColor="rgba(255,255,255,0.5)"
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
    </View>
  )
}

export default SearchBar