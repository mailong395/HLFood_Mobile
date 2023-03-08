import { TableContextProvider } from "./TableContext";
import { FoodContextProvider } from './FoodContext';

function AppContext({ children }) {
    return (
        <FoodContextProvider>
            <TableContextProvider>
                {children}
            </TableContextProvider>
        </FoodContextProvider>
    );
}

export default AppContext;