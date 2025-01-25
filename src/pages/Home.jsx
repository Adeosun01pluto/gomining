// pages/Home.jsx
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import RewardsCalculator from '../components/home/RewardsCalculator';
import News from '../components/home/News';
import Partners from '../components/home/Partners';
import WalletSection from '../components/home/WalletSection';
import DataCenterSection from '../components/home/DataCenterSection';

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Partners />
      <div className='mx-auto w-[90%] sm:w-[80%]'>
        <Features />
        <WalletSection />
        <DataCenterSection />
        <RewardsCalculator />
        <News />
      </div>
    </div>
  );
};

export default Home;