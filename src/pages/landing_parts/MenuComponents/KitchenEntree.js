
const KitchenEntree = (props) => {
  const noodleItems =
    props.fetchedData.map((card, i) => {
      if (card.Sub_Category ==='Noodles') {
        return (
          <div key={i} className='menuCard'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  
  const fRiceItems =
  props.fetchedData.map((card, i) => {
      if (card.Sub_Category === 'Fried Rice') {
        return (
          <div key={i} className='menuCard'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  
  const bentoItems =
  props.fetchedData.map((card, i) => {
      if (card.Sub_Category === 'Bento') {
        return (
          <div key={i} className='menuCard'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  
  const teriItems =
  props.fetchedData.map((card, i) => {
      if (card.Sub_Category === 'Teriyaki') {
        return (
          <div key={i} className='menuCard'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  
  const katsuItems =
  props.fetchedData.map((card, i) => {
      if (card.Sub_Category === 'Katsu') {
        return (
          <div key={i} className='menuCard'>
            <h3 className='menuCard_name'>{card.name}<span className='menuCard_tags'><br />{card.caption}</span></h3>
            <p className='menuCard_description'>{card.description}</p>
            <p className='menuCard_price'>${card.price}</p>
          </div>
        )
      }
    })
  
  const bowlItems =
  props.fetchedData.map((card, i) => {
      if (card.Sub_Category === 'Rice Bowl') {
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
      <h1 className='menuCardTitle1'>Kitchen Entree</h1>
      <h2 className='menuCardTitle2'>Noodles</h2>
      {noodleItems}
      <h2 className='menuCardTitle2'>Fried Rice<br /><span className='menuCardTitleSub'>Served with miso soup</span></h2>
      {fRiceItems}
      <h2 className='menuCardTitle2'>Bento<br /><span className='menuCardTitleSub'>Served with soup, salad, mixed tempura, california roll</span></h2>
      {bentoItems}
      <h2 className='menuCardTitle2'>Teriyaki<br /><span className='menuCardTitleSub'>Served with soup, salad, vegetable & rice</span></h2>
      {teriItems}
      <h2 className='menuCardTitle2'>Katsu<br /><span className='menuCardTitleSub'>Served with soup, salad, vegetable & rice</span></h2>
      {katsuItems}
      <h2 className='menuCardTitle2'>Rice Bowl</h2>
      {bowlItems}
    </div>
  );
}
export default KitchenEntree;