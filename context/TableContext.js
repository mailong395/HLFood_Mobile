import { createContext, useState } from "react";

const TableContext = createContext();

function TableContextProvider({ children }) {
    const [table, setTable] = useState({});
    const [getData, setGetData] = useState(false);

    const value = { table, setTable, getData, setGetData };

    return <TableContext.Provider value={value}>
        {children}
    </TableContext.Provider>;
}

export { TableContext, TableContextProvider };