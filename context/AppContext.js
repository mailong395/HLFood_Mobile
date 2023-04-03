import { TableContextProvider } from "./TableContext";
import { FoodContextProvider } from './FoodContext';

function AppContext({ children }) {
  return (
    <TableContextProvider>
      <FoodContextProvider>
        {children}
      </FoodContextProvider>
    </TableContextProvider>
  );
}

export default AppContext;