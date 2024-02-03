// import Scroller from './components/scroller';
// import DateCarousel from './components/DateCarousel';
// import ScrollBanner from "./components/ScrollBanner";
// import Carousel from './components/Carousel';
import Table from './components/Table'
import data from './components/Table/data'

function App() {
  return (
    <div className='App'>
     {/* <Scroller/>
     <DateCarousel/>
     <ScrollBanner/> */}
     {/* <Carousel/> */}
     <Table data={data}/>
    </div>
  );
}

export default App;
