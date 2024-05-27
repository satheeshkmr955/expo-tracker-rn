import Reactotron, { networking } from "reactotron-react-native";
import reactotronZustand from "reactotron-plugin-zustand";
import type { ReactotronReactNative } from "reactotron-react-native";
import mmkvPlugin from "reactotron-react-native-mmkv";

import { useSession, sessionStorage } from "@/store/use-session";

Reactotron.configure({
  name: "React Native Demo",
})
  .use(mmkvPlugin<ReactotronReactNative>({ storage: sessionStorage }))
  .use(
    //add this line 🙌
    reactotronZustand({ stores: [{ name: "session", store: useSession }] })
  )
  .use(networking())
  .useReactNative({
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    errors: { veto: () => false }, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .connect();
