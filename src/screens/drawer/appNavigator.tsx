import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View, Text } from "react-native";
import HomeScreen from "../home/home";

import DrawerContent from "./drawerContent";
import { useGetPokemonTypesQuery } from "../../services/slices/pokemonApi";
import { styles } from "./drawerContent.style";
import { Type_Meta } from "../../setup/theme";
import { PokemonPage } from "../../components";

export type RootStackParamList = {
  Home: { selectedType: string };
  PokemonDetail: { id: number; name: string; url: string };
};

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Each drawer item renders this stack
// so detail screen is reachable from any type tab
const HomeStack = ({ route }: any) => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: "ios_from_right" }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      initialParams={{ selectedType: route.params?.selectedType ?? "all" }}
    />
    <Stack.Screen name="PokemonDetail" component={PokemonPage} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  const { data, isLoading } = useGetPokemonTypesQuery();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(20,20,30,1)",
        }}
      >
        <ActivityIndicator size="large" color="#fb1b1b" />
      </View>
    );
  }

  const pokemonTypes = data?.results || [];

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={({ route }) => ({
          headerShown: false,
          drawerType: "slide",
          drawerStyle: styles.drawerWindow,
          overlayColor: "rgba(0,0,0,0.7)",
          drawerActiveBackgroundColor:
            Type_Meta[route.name]?.color + "50" || "rgba(255,255,255,0.2)",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "rgba(255,255,255,0.7)",
          drawerItemStyle: styles.item,
          drawerLabelStyle: styles.label,
        })}
      >
        <Drawer.Screen
          name="All"
          component={HomeStack}
          initialParams={{ selectedType: "all" }}
          options={{
            drawerIcon: () => <Text>🔘</Text>,
          }}
        />
        {pokemonTypes.map((type: any) => (
          <Drawer.Screen
            key={type.name}
            name={type.name}
            component={HomeStack}
            initialParams={{ selectedType: type.name }}
            options={{
              title: type.name,
              drawerIcon: () => (
                <Text style={{ fontSize: 16 }}>
                  {Type_Meta[type.name]?.emoji ?? "❓"}
                </Text>
              ),
            }}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
