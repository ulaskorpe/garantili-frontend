import React from 'react';


const ProductTechSection = (props) => {
    const {
        tabItem = {},
        section={}
    } = props;

    return (
        <>
            <h3 className="tm-attributes-title">{tabItem.title}</h3>
            <table className="shop_attributes">
                <tbody>
                {tabItem?.items?.map((tabItemSub, tabItemSubIDX) => (
                    <tr
                        key={`tab_item_sub_${tabItemSub.id}_${tabItemSubIDX}`}
                    >
                        <th>{tabItemSub.name}</th>
                        <td>{tabItemSub.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

const ProductTech = (props) => {
    const { tab, classes } = props;

    console.log('tab tech', tab);

    return (
        <div className={`${classes}`} id={tab.name} role="tabpanel">
            <div className="tm-shop-attributes-detail like-column columns-3">
                {tab?.content?.map((tabItem, tabItemIDX) => (
                    <ProductTechSection
                        key={`tab_section_${tabItem.id}_${tabItemIDX}`}
                        tabItem={tabItem}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductTech;