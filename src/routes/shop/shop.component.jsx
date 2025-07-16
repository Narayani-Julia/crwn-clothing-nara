import "./shop.styles.scss"
import {Routes, Route} from 'react-router-dom'
import CategoriesPreview from "../categories-preview/categories-preview.component";

const Shop = () =>{
    //const {categoriesMap} = useContext(CategoriesContext);
    return (
        <Routes>
            <Route index element = {<CategoriesPreview/>}/>
        </Routes>
    );
};

export default Shop;
    