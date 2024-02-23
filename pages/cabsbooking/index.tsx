import CarCard from '@/components/CarCard';
import CustomFilter from '@/components/CustomFilter';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SearchBar from '@/components/Searchbar';
import NavBar from '@/components/header/NavBar';
import { fuels, yearsOfProduction } from '@/constants/constants';
import ar from '@/locales/ar';
import en from '@/locales/en';
import { HomeProps } from '@/types/intefaces';
import { fetchCars } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Home({ searchParams }: HomeProps) {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ar;
  
  const [allCars, setAllCars] = useState<any>([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cars = await fetchCars({
          manufacturer: '',
          year: 2022,
          fuel: '',
          limit: 10,
          model: '',
        });
        setAllCars(cars);
        setIsDataEmpty(!Array.isArray(cars) || cars.length < 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <main className='overflow-hidden'>
      <NavBar />
      <Hero />

      <div className='padding-x padding-y max-width mt-12' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Cab Catalogue</h1>
          <p>Explore out cabs you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            {/* <CustomFilter title='fuel' options={fuels} /> */}
            {/* <CustomFilter title='year' options={yearsOfProduction} /> */}
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car: any) => <CarCard key={car.id} car={car} />)}
            </div>

            {/* <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            /> */}
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-xl font-bold text-black'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

export default Home;
