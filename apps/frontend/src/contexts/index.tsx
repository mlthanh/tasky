import { PropsWithChildren } from "react";
import AuthProvider from "./AuthProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { LanguageProvider } from "./language/LanguageProvider";
import { ThemeProvider } from "./ThemeProvider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <LanguageProvider language="en">
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
}
