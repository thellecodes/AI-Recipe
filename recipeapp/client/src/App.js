import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Homepage from "./pages/Homepage";
import store from "./store/store";

function App() {
  return (
    <Provider {...{ store }}>
      <ChakraProvider {...{ theme }}>
        <Homepage />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
