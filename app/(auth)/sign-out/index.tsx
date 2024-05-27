import { useEffect } from "react";
import Animated from "react-native-reanimated";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";

import { useSession } from "@/store/use-session";
import { SIGN_OUT_URL } from "@/constants/api.constants";

const SignInScreen = () => {
  const router = useRouter();
  const { clearSession, session } = useSession((state) => state);

  useEffect(() => {
    if (session === null) {
      router.replace("/(auth)/sign-in/");
    }
  }, [session]);

  const BASE_WEBVIEW_URL = process.env.EXPO_PUBLIC_BASE_WEBVIEW_URL;

  return (
    <Animated.View className="flex-1">
      <WebView
        style={{ flex: 1 }}
        source={{ uri: `${BASE_WEBVIEW_URL}${SIGN_OUT_URL}` }}
        onMessage={() => {
          clearSession();
        }}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
    </Animated.View>
  );
};

export default SignInScreen;
