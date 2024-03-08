import CarCard from '@/components/CarCard';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SearchBar from '@/components/Searchbar';
import NavBar from '@/components/header/NavBar';
import { allCars, fuels, yearsOfProduction } from '@/constants/constants';
import ar from '@/locales/ar';
import en from '@/locales/en';
import { HomeProps } from '@/types/intefaces';
import { useRouter } from 'next/router';

function Home({ searchParams }: HomeProps) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ar;
  
  return (
    <main className='overflow-hidden'>
      <NavBar />
      <Hero />

      <div className='padding-x padding-y max-width mt-12' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>{t.cabCatalogue}</h1>
          <p>{t.exploreCabsText}</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            {/* <CustomFilter title='fuel' options={fuels} /> */}
            {/* <CustomFilter title='year' options={yearsOfProduction} /> */}
          </div>
        </div>

        <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car: any) => <CarCard key={car.id} car={car} />)}
            </div>
          </section>
      </div>
      <Footer />
    </main>
  );
}

export default Home;
