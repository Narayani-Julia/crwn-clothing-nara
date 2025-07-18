import './category.styles.scss'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.compenent';

const Category = () => {
    //useParams will get the :category from the Route
    const {category} = useParams();
    //console.log("render/re-rendering category component");
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);
    //To prevent it from re-rendering everytime
    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);
    return(
        <>
        <h2 className='category-title'>{category.toUpperCase()}</h2>        
        {isLoading ? (<Spinner />) : (
        <div className="category-container">
            {/* THIS IS IMPORTANT TO DO because of async calls, product will not be defined immediately */}
            {products &&
                products.map((product)=>{
                    return(<ProductCard key = {product.id} product={product}/>);
                })
            }
        
        </div>)
        }
        </>
    );
};
export default Category;