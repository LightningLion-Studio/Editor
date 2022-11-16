import { createDiscreteApi,darkTheme } from "naive-ui"

export const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ["message", "dialog", "notification", "loadingBar"],
  {
    configProviderProps: {
      theme: darkTheme
    }
  }
)