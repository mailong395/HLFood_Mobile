import { TableContextProvider } from "./TableContext";
import { FoodContextProvider } from './FoodContext';
import { SocketContextProvider } from "./SocketIOContext";

function AppContext({ children }) {
  return (
    <SocketContextProvider>
      <TableContextProvider>
        <FoodContextProvider>
          {children}
        </FoodContextProvider>
      </TableContextProvider>
    </SocketContextProvider>
  );
}

export default AppContext;