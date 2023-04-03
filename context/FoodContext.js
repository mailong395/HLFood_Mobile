import { createContext, useState } from "react";

const FoodContext = createContext();

function FoodContextProvider({ children }) {
    const [foodOrdered, setFoodOrdered] = useState([]);
    const [foodWait, setFoodWait] = useState([]);

    const value = { foodOrdered, setFoodOrdered, foodWait, setFoodWait };

    return <FoodContext.Provider value={value}>
        {children}
    </FoodContext.Provider>;
}

export { FoodContext, FoodContextProvider };