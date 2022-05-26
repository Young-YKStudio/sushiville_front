const ALaCarte = (props) => {

  const sashimiItems =
  props.fetchedData.map((card, i) => {
      if (card.Sub_Category === "Sashimi") {
        return (
          <div key={i} className='menuCard'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  
  const nigiriItems =
  props.fetchedData.map((card, i) => {
    if (card.Sub_Category === "Nigiri") {
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
      <h2 className='menuCardTitle1'>A La Carte</h2>
      <h2 className='menuCardTitle2'>Nigiri<br /><span className='menuCardTitleSub'>(Sushi)</span></h2>
      {nigiriItems}
      <h2 className='menuCardTitle2'>Sashimi</h2>
      {sashimiItems}
    </div>
  );
}

export default ALaCarte;