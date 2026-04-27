import React, { useEffect, useState, useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

import useNetworkStatus from "../../hooks";
import { getStyles } from "./networkBanner.styles";

const NetworkBanner = () => {
  const isConnected = useNetworkStatus();
  const isFirstRun = useRef(true);

  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"offline" | "online" | null>(null);

  const translateY = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (isConnected === null) return;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (!isConnected) {
      setStatus("offline");
      setVisible(true);

      translateY.value = withTiming(0, { duration: 300 });
      return;
    }

    setStatus("online");
    setVisible(true);

    translateY.value = withTiming(0, { duration: 300 });
    translateY.value = withDelay(2000, withTiming(100, { duration: 300 }));

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2300);

    return () => clearTimeout(timer);
  }, [isConnected]);

  if (!visible || !status) return null;

  const styles = getStyles(status === "offline");

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>
        {status === "offline" ? "No Internet Connection" : "Back Online"}
      </Text>

      {status === "offline" && (
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default NetworkBanner;
