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
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      
    </View>
  );
};

export default DrawerContent;
