import Animated from "react-native-reanimated";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";

import { Session } from "@/types";
import { useSession } from "@/store/use-session";
import { SIGN_UP_URL } from "@/constants/api.constants";

const HomeScreen = () => {
  const router = useRouter();
  const { setSession } = useSession((state) => state);

  const BASE_WEBVIEW_URL = process.env.EXPO_PUBLIC_BASE_WEBVIEW_URL;

  return (
    <Animated.View className="flex-1">
      <WebView
        style={{ flex: 1 }}
        source={{ uri: `${BASE_WEBVIEW_URL}${SIGN_UP_URL}` }}
        onMessage={(event) => {
          setSession(JSON.parse(event.nativeEvent.data) as Session);
          setTimeout(() => {
            router.navigate("/(home)");
          }, 1);
        }}
      />
    </Animated.View>
  );
};

export default HomeScreen;
