
import Base from "../components/Base";
import Carousel from "../components/CustomCarousel";
import Person from "../components/Person";
import ServicesBlock from "../components/ServicesBlock";



const Home = () => {

  return (
    <div>
      <Base>
        <Carousel />
        <ServicesBlock />
        <Person />
      </Base>
    </div>
  );
};

export default Home;
