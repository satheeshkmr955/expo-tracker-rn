import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(auth)/sign-in/index"
        options={{
          title: "Sign In",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(auth)/sign-up/index"
        options={{
          title: "Sign Up",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(auth)/sign-out/index"
        options={{
          title: "Sign Out",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
