import Animated from "react-native-reanimated";
import { Link } from "expo-router";

import { useSession } from "@/store/use-session";
import { useGraphQL } from "@/hooks/use-graphql";

import { GetSelfByNameDocument } from "@/gql/graphql";

const HomeScreen = () => {
  const { session } = useSession((state) => state);

  console.log("session", session?.user?.slugName);

  const { data } = useGraphQL(GetSelfByNameDocument, {
    input: { name: session?.user?.slugName || "" },
  });
  const self = data?.data?.getSelfByName || null;

  console.log("self", self);

  return (
    <Animated.View className="flex-1">
      <Link href="/(auth)/sign-in" className="mx-8 mt-8">
        <Animated.Text className="text-xl text-blue-700 underline">
          Sign In
        </Animated.Text>
      </Link>
      <Link href="/(auth)/sign-up" className="mx-8 mt-4">
        <Animated.Text className="text-xl text-blue-700 underline">
          Sign Up
        </Animated.Text>
      </Link>
    </Animated.View>
  );
};

export default HomeScreen;
