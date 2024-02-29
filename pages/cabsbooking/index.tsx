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
  
  const allCars = [
    {
      city_mpg: 16,
      class: 'compact car',
      combination_mpg: 19,
      cylinders: 6,
      displacement: 2.8,
      drive: 'fwd',
      fuel_type: 'gas',
      highway_mpg: 26,
      make: 'audi',
      model: 'a4',
      transmission: 'a',
      year: 1996
    },
    {
      city_mpg: 17,
      class: 'compact car',
      combination_mpg: 20,
      cylinders: 6,
      displacement: 2.8,
      drive: 'fwd',
      fuel_type: 'gas',
      highway_mpg: 25,
      make: 'audi',
      model: 'a4',
      transmission: 'm',
      year: 1996
    },
    {
      city_mpg: 16,
      class: 'compact car',
      combination_mpg: 19,
      cylinders: 6,
      displacement: 2.8,
      drive: 'awd',
      fuel_type: 'gas',
      highway_mpg: 25,
      make: 'audi',
      model: 'a4 quattro',
      transmission: 'a',
      year: 1996
    },
    {
      city_mpg: 17,
      class: 'compact car',
      combination_mpg: 20,
      cylinders: 6,
      displacement: 2.8,
      drive: 'awd',
      fuel_type: 'gas',
      highway_mpg: 24,
      make: 'audi',
      model: 'a4 quattro',
      transmission: 'm',
      year: 1996
    },
    {
      city_mpg: 18,
      class: 'compact car',
      combination_mpg: 21,
      cylinders: 4,
      displacement: 1.8,
      drive: 'fwd',
      fuel_type: 'gas',
      highway_mpg: 27,
      make: 'audi',
      model: 'a4',
      transmission: 'a',
      year: 1997
    },
    {
      city_mpg: 18,
      class: 'compact car',
      combination_mpg: 21,
      cylinders: 4,
      displacement: 1.8,
      drive: 'fwd',
      fuel_type: 'gas',
      highway_mpg: 27,
      make: 'audi',
      model: 'a4',
      transmission: 'a',
      year: 1997
    }
  ];
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
