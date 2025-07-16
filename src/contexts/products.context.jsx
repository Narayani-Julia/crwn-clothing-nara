import SHOP_DATA from '../shop-data.json'
import { createContext, useState } from "react";

//Create context needs two parameters, pass the default value for create Context
//actual value tht you want to access
//context should have parallel variables to the value passed in the provider
export const ProductsContext = createContext({
    products: [],
    setProducts: ()=>{}
});

//This is the component
export const ProductsProvider = ({children})=> {
    const [products] = useState(SHOP_DATA);
    const value = {products}
    //value = products, setProducts. This means that the component within the provider can access this value
    return(
        //.Provider will wrap around things to give access
        //value = contextual value, what do you want the children to access. 
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};