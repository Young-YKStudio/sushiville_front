import Maps from './Maps'
import IntroAndOrder from './IntroAndOrder';
import Menu from './MenuComponents/Menu';

const Main = (props) => {
  return (
    <div className="mainContainer">
      <IntroAndOrder />
      <Menu />
      <Maps />
    </div>
  );
}
export default Main;