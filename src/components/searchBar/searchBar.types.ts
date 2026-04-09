export interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  onMenuPress: () => void
  onFocus: () => void
}