export interface Pokemon {
  id: number;
  name: string;
  url: string;
}

export interface FavoriteButtonProps {}

export interface FavoriteButtonRef {
  checkDrop: (pokemon: Pokemon, x: number, y: number) => void;
}
