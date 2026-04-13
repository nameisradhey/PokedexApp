# PokedexAppClean

A React Native Pokedex app built with Expo, TypeScript, React Navigation, and Redux Toolkit Query.

The app lets users browse Pokemon, filter them by type, switch between grid and list layouts, search by name, and open a dedicated Pokemon detail page.

## Features

- Browse Pokemon in a clean mobile-first UI
- Filter Pokemon by type using a drawer navigation menu
- Toggle between grid view and list view
- Search Pokemon by name
- Infinite scrolling for the main Pokemon list
- View detailed Pokemon information on a separate screen
- Fetch data from the [PokeAPI](https://pokeapi.co/)

## Tech Stack

- Expo
- React Native
- TypeScript
- React Navigation
  - Drawer Navigator
  - Native Stack Navigator
- Redux Toolkit
- RTK Query

## Project Structure

```text
PokedexAppClean
├── App.tsx
├── index.ts
├── src
│   ├── assets
│   ├── components
│   │   ├── pokemonCard
│   │   ├── pokemonPage
│   │   ├── searchBar
│   │   └── viewToggle
│   ├── screens
│   │   ├── drawer
│   │   └── home
│   ├── services
│   │   ├── apiclient
│   │   ├── response
│   │   ├── slices
│   │   └── urls
│   └── setup
│       ├── providers
│       └── theme
└── package.json
```

## How It Works

- The app starts with Expo and mounts `App.tsx`
- Redux store setup is provided globally through the app provider
- Drawer navigation is generated using Pokemon types fetched from the API
- The home screen handles listing, filtering, searching, and pagination
- Each Pokemon card fetches detail data and can navigate to the Pokemon detail page

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repository-url>
cd PokedexAppClean
npm install
```

## Run the App

Start the Expo development server:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Run on web:

```bash
npm run web
```

## API

This project uses the public PokeAPI:

- Base URL: `https://pokeapi.co/api/v2`

Main endpoints used:

- `/pokemon`
- `/type`
- `/type/:type`

## Screens

### Home Screen

- Shows Pokemon in grid or list form
- Supports pagination
- Supports search
- Shows current type filter

### Pokemon Detail Page

- Opens when a Pokemon card is tapped
- Displays Pokemon identity and fetched detail data

## Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run Android build
- `npm run ios` - Run iOS build
- `npm run web` - Run web build

## Future Improvements

- Add stronger type coverage for navigation and API models
- Add unit and integration tests
- Add favorites or caught Pokemon tracking
- Improve detail screen with more stats and abilities
- Add image placeholders and better error states

## Author

Built by Shalin Prajapati.
