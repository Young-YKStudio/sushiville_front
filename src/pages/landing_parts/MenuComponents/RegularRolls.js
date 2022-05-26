const RegularRolls = (props) => {
  const regularRollItems = 
    props.fetchedData.map((card, i) => {
  
      if (card.category ==='Regular Rolls') {
        return (
          <div key={i} className='menuCard'>
            <div className='menuCard_top'>
              <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
              <p className='menuCard_description'>{card.description}</p>
            </div>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  
  const vegRollItems = 
    props.fetchedData.map((card, i) => {
  
      if (card.category ==='Vegetable Rolls') {
        return (
          <div key={i} className='menuCard'>
            <div className='menuCard_top'>
              <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
              <p className='menuCard_description'>{card.description}</p>
            </div>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  return (
    <div className='menuCardContainer'>
      <h2 className='menuCardTitle2'>Regular Rolls</h2>
      {regularRollItems}
      <h2 className='menuCardTitle2'>Vegetable Rolls</h2>
      {vegRollItems}
    </div>
  );
}
export default RegularRolls;