import React, { useEffect } from "react";
import Animated from "react-native-reanimated";
import { useRootNavigationState, useRouter } from "expo-router";

import { useSession } from "@/store/use-session";

const HomeScreen = () => {
  const rootNavigationState = useRootNavigationState();
  const { session } = useSession((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (!!rootNavigationState?.key) {
      if (session) {
        router.navigate("/(private)/account/");
      } else {
        router.navigate("/(auth)/sign-in");
      }
    }
  }, [session, !rootNavigationState?.key]);

  if (!rootNavigationState?.key) {
    return null;
  }

  return <Animated.View></Animated.View>;
};

export default HomeScreen;
