import Cart from "./Cart";
import Container from "./Container";
import Items from "./Items";

const Category = () => {
    return (
        <div className='explore'>
            <div className='contentHeader'>Explore Categories</div>
            <div className='items-contents'>
                <div className='category-item'>
                    <Items />
                    <Container />
                </div>
                <Cart />
            </div>
        </div>
    )
};

export default Category;