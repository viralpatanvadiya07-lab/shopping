import HeroSection from '../components/home/HeroSection';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TrendingProducts from '../components/home/TrendingProducts';
import OffersSection from '../components/home/OffersSection';
import Reviews from '../components/home/Reviews';

const Home = () => {
  return (
    <main className="page-active" id="home-page">
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <OffersSection />
      <TrendingProducts />
      <Reviews />
    </main>
  );
};

export default Home;
