const PartyPlatterItems = (props) => {
  const PartyPlatterMenu =
    props.fetchedData.map((card, i) => {
      if (card.category === "Party Platter")
      return (
        <div key={i} className='menuCard_listitems'>
          <h3 className='menuCard_name'>{card.name}</h3>
          <p className='menuCard_description'>{card.description}</p>
          <p className='menuCard_pricelist'>${card.price}</p>
        </div>
      )
    })
  return (
    <div className='menuCardContainer'>
      <h2 className='menuCardTitle1'>Party Platters</h2>
      {PartyPlatterMenu}
    </div>
  );
}
export default PartyPlatterItems;