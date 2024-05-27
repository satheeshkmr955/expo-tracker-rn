import Animated from "react-native-reanimated";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";
import { useEffect } from "react";

import { Session } from "@/types";
import { useSession } from "@/store/use-session";
import { SIGN_IN_URL } from "@/constants/api.constants";

const SignInScreen = () => {
  const router = useRouter();
  const { setSession, session } = useSession((state) => state);

  useEffect(() => {
    if (session !== null) {
      router.replace("/(private)/account");
    }
  }, [session]);

  const BASE_WEBVIEW_URL = process.env.EXPO_PUBLIC_BASE_WEBVIEW_URL;

  return (
    <Animated.View className="flex-1">
      <WebView
        style={{ flex: 1 }}
        source={{ uri: `${BASE_WEBVIEW_URL}${SIGN_IN_URL}` }}
        onMessage={(event) => {
          setSession(JSON.parse(event.nativeEvent.data) as Session);
        }}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
    </Animated.View>
  );
};

export default SignInScreen;
