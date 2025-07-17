import "./shop.styles.scss"
import {Routes, Route} from 'react-router-dom'
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import userEvent from "@testing-library/user-event";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
const Shop = () =>{
    //const {categoriesMap} = useContext(CategoriesContext);

    return (
        <Routes>
            <Route index element = {<CategoriesPreview/>}/>
            <Route path=":category" element = {<Category/>}/>        
        </Routes>
    );
};

export default Shop;
    