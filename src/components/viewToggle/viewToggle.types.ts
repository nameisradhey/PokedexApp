import type { ViewMode } from '../../screens/home/home.types'

export interface ViewToggleProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}