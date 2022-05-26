
const SoupSalad = (props) => {
  const soupSaladItems =
    props.fetchedData.map((card, i) => {
      if (card.category === "Soup & Salad") {
        return (
          <div key={i} className='menuCard'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  return (
    <div className='menuCardContainer'>
      <h2 className='menuCardTitle1'>Soup & Salad</h2>
      {soupSaladItems}
    </div>
  );
}
export default SoupSalad;