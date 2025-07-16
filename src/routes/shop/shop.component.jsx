import { Fragment, useContext } from "react";
import "./shop.styles.scss"
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const Shop = () =>{
    const {categoriesMap} = useContext(CategoriesContext);
    return (
        <div className="shop-container">
        {
            //Object.keys will return array of keys
            Object.keys(categoriesMap).map((title)=>(
                <Fragment key={title}>
                <h2>{title}</h2>
                <div className='products-container'>
                {categoriesMap[title].map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
                </Fragment>
            ))
        }
        </div>
    );
};

export default Shop;
    