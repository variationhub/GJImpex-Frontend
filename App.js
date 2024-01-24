import { NavigationContainer } from "@react-navigation/native";

import "react-native-gesture-handler";

import AppStack from "./Stack/AppStack";

export default App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};
