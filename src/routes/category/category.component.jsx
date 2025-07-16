import './category.styles.scss'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    //useParams will get the :category from the Route
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    //To prevent it from re-rendering everytime
    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);
    return(
        <div className="category-container">
            {/* THIS IS IMPORTANT TO DO because of async calls, product will not be defined immediately */}
            {products &&
                products.map((product)=>{
                    return(<ProductCard key = {product.id} product={product}/>);
                })
            }
        </div>
    );
};
export default Category;