// pages/Home.jsx
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import RewardsCalculator from '../components/home/RewardsCalculator';
import News from '../components/home/News';
import Partners from '../components/home/Partners';
import WalletSection from '../components/home/WalletSection';
import DataCenterSection from '../components/home/DataCenterSection';
import ApprovedByExchanges from '../components/home/ApprovedByExchanges';
import RecentPayments from '../components/home/RecentPayments';
import FAQ from '../components/home/FAQ';
import Join from '../components/home/Join';

const Home = () => {
  return (
    <div className="bg-white pt-8 md:pt-0">
      <Hero />
      <Partners />
      {/* <div className='mx-auto w-[90%] sm:w-[80%]'> */}
        <Features />
        <WalletSection />
        <DataCenterSection />
        <RewardsCalculator />
        <RecentPayments />
        <FAQ />
        <Join />
        {/* <ApprovedByExchanges /> */}
        <News />
      {/* </div> */}
    </div>
  );
};

export default Home;