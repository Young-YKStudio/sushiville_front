const Appetizer = (props) => {
  const coldItems = 
    props.fetchedData.map((card, i) => {
  
      if (card.Sub_Category ==='Cold') {
        return (
          <div key={i} className='menuCard'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  
  const hotItems = 
    props.fetchedData.map((card, i) => {
  
      if (card.Sub_Category ==='Hot') {
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
      <h1 className='menuCardTitle1'>Appetizer</h1>
      <h2 className='menuCardTitle2'>Cold Appetizer</h2>
      {coldItems}
      <h2 className='menuCardTitle2'>Hot Appetizer</h2>
      {hotItems}
    </div>
  );
}
export default Appetizer;