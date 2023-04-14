import { createContext, useState } from "react";

const FoodContext = createContext();

function FoodContextProvider({ children }) {
    const [foodOrdered, setFoodOrdered] = useState([]);
    const [foodWaitContext, setFoodWaitContext] = useState([]);

    const value = { foodOrdered, setFoodOrdered, foodWaitContext, setFoodWaitContext };

    return <FoodContext.Provider value={value}>
        {children}
    </FoodContext.Provider>;
}

export { FoodContext, FoodContextProvider };