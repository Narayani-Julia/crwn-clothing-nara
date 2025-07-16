import SHOP_DATA from '../shop-data.js'
import { createContext, useState, useEffect, use } from "react";
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
//Create context needs two parameters, pass the default value for create Context
//actual value tht you want to access
//context should have parallel variables to the value passed in the provider
export const ProductsContext = createContext({
    products: [],
    setProducts: ()=>{}
});

//This is the component
export const ProductsProvider = ({children})=> {
    const [products, setProducts] = useState([]);
    const value = {products};
    useEffect(()=>{
        const getCategoriesMap = async() =>{
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
        }
        getCategoriesMap();
    }, []);

    useEffect(()=>{addCollectionAndDocuments('categories', SHOP_DATA)}, []);
    //value = products, setProducts. This means that the component within the provider can access this value
    return(
        //.Provider will wrap around things to give access
        //value = contextual value, what do you want the children to access. 
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};