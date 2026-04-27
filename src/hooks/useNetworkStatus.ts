import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online =
        state.isConnected === true &&
        (state.isInternetReachable ?? true); // 🔥 fallback

      console.log("NET:", online);

      setIsConnected(online);
    });

    return () => unsubscribe();
  }, []);

  return isConnected;
};

export default useNetworkStatus;