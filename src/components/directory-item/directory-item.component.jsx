import "./directory-item.styles.jsx"
import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles.jsx";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({category}) => {

    const {imageUrl, title, route} = category;
    const navigate = useNavigate();
    const onNavigateHandler = ()=> navigate(route);

    return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
        <BackgroundImage 
        //instead of passing the style property, we're passing it as a property that styled-components can access
        imageUrl={imageUrl}
        />
        <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
        </Body>
    </DirectoryItemContainer>
);
};

export default DirectoryItem;