import React from "react";
import { View, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { styles } from "./drawerContent.style";

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Type</Text>

      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* This component handles the logic of which item is "active" 
          based on the current route, satisfying the Drawer.Screen requirement.
        */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{ paddingLeft: 20, paddingTop: 10 }}>
        <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
          Pokedex v1.0
        </Text>
      </View>
    </View>
  );
};

export default DrawerContent;
