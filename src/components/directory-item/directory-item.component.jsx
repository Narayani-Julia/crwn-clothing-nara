import "./directory-item.styles.jsx"
import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles.jsx";
const DirectoryItem = ({category}) => {

    const {imageUrl, title} = category;
    return (
    <DirectoryItemContainer>
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