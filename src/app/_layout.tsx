import { Stack } from "expo-router";
import '../globals.css';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Provider } from "react-redux";
import { store } from "@/src/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="onboard" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  )
}
