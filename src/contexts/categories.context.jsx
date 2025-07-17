//import SHOP_DATA from '../shop-data.js'
import { createContext, useState, useEffect, use } from "react";
//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
import { createAction } from "../utils/reducer/reducer.utils.js";

//Create context needs two parameters, pass the default value for create Context
//actual value tht you want to access
//context should have parallel variables to the value passed in the provider
export const CategoriesContext = createContext({
    categoriesMap: {},
});

//This is the component
export const CategoriesProvider = ({children})=> {
    const [categoriesMap, setCategoriesMap] = useState({});
    useEffect(()=>{
        const getCategoriesMap = async() =>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        //In order to call async functions in useEffect, you need to call it after you define it
        getCategoriesMap();
    }, []);
    const value = {categoriesMap};
    //useEffect(()=>{addCollectionAndDocuments('categories', SHOP_DATA)}, []);
    //value = products, setProducts. This means that the component within the provider can access this value
    return(
        //.Provider will wrap around things to give access
        //value = contextual value, what do you want the children to access. 
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
};