const SpecialRolls = (props) => {
  const freshRollItems = 
    props.fetchedData.map((card, i) => {
  
      if (card.Sub_Category ==='Fresh Rolls') {
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
  
  const bakedRollItems =  
    props.fetchedData.map((card, i) => {
    if (card.Sub_Category === 'Baked Rolls') {
      return (
        <div key={i} className='menuCard'>
          <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_price'>${card.price}</p>
        </div>
      )
    }
  })
  
  const tempuraRollItems = 
    props.fetchedData.map((card, i) => {
    if (card.Sub_Category === 'Tempura Rolls') {
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
      <h1 className='menuCardTitle1'>Special Rolls</h1>
      <h2 className='menuCardTitle2'>Fresh Rolls</h2>
      {freshRollItems}
      <h2 className='menuCardTitle2'>Baked Rolls</h2>
      {bakedRollItems}
      <h2 className='menuCardTitle2'>Tempura Rolls</h2>
      {tempuraRollItems}
    </div>
  );
}
export default SpecialRolls;