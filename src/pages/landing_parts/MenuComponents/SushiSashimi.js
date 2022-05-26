const SushiSashimi = (props) => {
  const sushiSetItems =
    props.fetchedData.map((card, i) => {
      if (card.Sub_Category === 'Sushi Sets') {
        return (
          <div key={i} className='menuCard'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  
  const sushiSashimiSetItems =
    props.fetchedData.map((card, i) => {
      if (card.Sub_Category === 'Sushi & Sashimi Sets') {
        return (
          <div key={i} className='menuCard'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  
  const searedSetItems =
    props.fetchedData.map((card, i) => {
      if (card.Sub_Category === 'Special Seared Sushi') {
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
      <h1 className='menuCardTitle1'>Sushi & Sashimi</h1>
      <h2 className='menuCardTitle2'>Sushi Sets</h2>
      {sushiSetItems}
      <h2 className='menuCardTitle2'>Sushi & Sashimi Sets</h2>
      {sushiSashimiSetItems}
      <h2 className='menuCardTitle2'>Special Seared Sushi</h2>
      {searedSetItems}
    </div>
  );
}
export default SushiSashimi;