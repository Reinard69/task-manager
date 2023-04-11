import { UserProvider } from "./auth";
import { UtilsProvider } from "./util";

const AppProvider = ({ children }: { children: JSX.Element }) => (
  <>
    <UtilsProvider>
      <UserProvider>{children}</UserProvider>
    </UtilsProvider>
  </>
);

export default AppProvider;
