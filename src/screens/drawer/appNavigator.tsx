import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View, Text } from "react-native";
import HomeScreen from "../home/home";
import DrawerContent from "./drawerContent";
import { useGetPokemonTypesQuery } from "../../services/slices/pokemonApi";
import { styles } from "./drawerContent.style";
import { TYPE_META } from "../../setup/theme/type";

const Drawer = createDrawerNavigator();

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
          drawerStyle: styles.drawerWindow, // Applying style from your stylesheet
          overlayColor: "rgba(0,0,0,0.7)",
          drawerActiveBackgroundColor:
            (TYPE_META[route.name]?.color + '50') || "rgba(255, 255, 255, 0.2)",
          drawerActiveTintColor: "#fff",
          drawerActiveBorderColor: TYPE_META[route.name]?.color || "transparent",
          drawerInactiveTintColor: "rgba(255,255,255,0.7)",
          drawerItemStyle: styles.item,
          drawerLabelStyle: styles.label,
        })}
      >
        {/* Main Route */}
        <Drawer.Screen
          name="All"
          component={HomeScreen}
          initialParams={{ selectedType: "all" }}
          options={{
            drawerIcon: () => <Text>🔘</Text>,
          }}
        />

        {/* Dynamic Type Routes */}
        {pokemonTypes.map((type: any) => (
          <Drawer.Screen
            key={type.name}
            name={type.name}
            component={HomeScreen}
            initialParams={{ selectedType: type.name }}
            options={{
              title: type.name, // The text shown in the drawer
              drawerIcon: () => (
                <Text style={{ fontSize: 16 }}>
                  {TYPE_META[type.name]?.emoji ?? "❓"}
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
