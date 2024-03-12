import CustomButton from '@/components/CustomButton';
import NavBar from '@/components/header/NavBar';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import {
  allCars,
  startDestination,
  timeLists,
  vehicleTypes,
} from '@/constants/constants';
import { addBooking } from '@/services/booking';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CarCard from '@/components/CarCard';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SearchBar from '@/components/Searchbar';
import { fuels, yearsOfProduction } from '@/constants/constants';
import ar from '@/locales/ar';
import en from '@/locales/en';
import ur from '@/locales/ur';
import { fetchCars } from '@/utils';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const BookACab = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : locale === 'ar' ? ar : ur;

  const [id, setId] = useState<string>('0');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsAppWithCC, setWhatsAppWithCC] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');

  const queryClient = useQueryClient();
  const { mutate: addOrEditRecord, isPending } = useMutation({
    mutationFn: async () => {
      const postData = {
        id: id,
        tenantId: 0,
        name: name,
        email: email,
        whatsAppWithCC: whatsAppWithCC,
        vehicleType: vehicleType,
        pickUpLocation: pickUpLocation,
        destination: destination,
        bookingDate: date,
        time: time,
      };
      const result = await addBooking(postData);
      return result;
    },
    onError: (error) => {
      console.log('Error', error.message);
    },
    onSuccess: (data) => {
      clear();
      toast({
        title: data.management,
        description: data.msg,
      });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  const clear = () => {
    setId('0');
    setName('');
    setEmail('');
    setWhatsAppWithCC('');
    setPickUpLocation('');
    setDestination('');
    setVehicleType('');
    setDate(undefined);
    setTime('');
  };
  //const [allCars, setAllCars] = useState<any>([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const slideshowImages = [
    'makkah-cover.jpg',
    //'kaba.jpg',
    //'nabvi.jpg',
  ];
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleClick = () => {
    const url = 'https://wa.me/+966507565697?text=I%20want%20your%20Cabs%20Services';
    window.location.href = url;
  };
  //const coverRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   try {
  //   //     const cars = await fetchCars({
  //   //       manufacturer: '',
  //   //       year: 2022,
  //   //       fuel: '',
  //   //       limit: 10,
  //   //       model: '',
  //   //     });
  //   //     console.log(cars);
  //   //     setAllCars(cars);
  //   //     setIsDataEmpty(!Array.isArray(cars) || cars.length < 1);
  //   //   } catch (error) {
  //   //     console.error('Error fetching data:', error);
  //   //   }
  //   // };

  //   // fetchData();

  //   let currentIndex = 0;

  //   const changeBackgroundImage = () => {
  //     if (coverRef.current) {
  //       coverRef.current.style.backgroundImage = `url('${slideshowImages[currentIndex]}')`;
  //     }      currentIndex = (currentIndex + 1) % slideshowImages.length;
  //   };

  //   const slideshowInterval = setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds

  //   return () => clearInterval(slideshowInterval);
  // }, [slideshowImages]);

  return (
    <>
      <NavBar />
      <section className='flex items-center justify-center overflow-hidden'>
        <div className='w-full'>
          <div
            id='cover'
            //ref={coverRef}
            className='mt-16 w-full flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-100'
            style={{
              backgroundImage: `url(cover2.jpeg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // Add any other background properties you need
            }}
          >
            <div className='m-4 h-full w-full bg-black bg-opacity-50 p-4 md:m-16 lg:m-32 lg:p-16'>
              <form
                className='w-full space-y-4'
                onSubmit={(e) => {
                  e.preventDefault();
                  addOrEditRecord();
                }}
              >
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  <div>
                    {/* <label className='mb-2 block text-sm font-medium text-white'>
                      {t.name}
                    </label> */}
                    <Input
                      type='text'
                      name='name'
                      className='bg-navy-blue bg-[#5ac1a7] text-black placeholder-black focus:border-none focus:outline-none'
                      id='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.name}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type='text'
                      name='whatsapp'
                      id='whatsapp'
                      className='bg-navy-blue bg-[#5ac1a7] text-black placeholder-black focus:border-none focus:outline-none'
                      value={whatsAppWithCC}
                      onChange={(e) => setWhatsAppWithCC(e.target.value)}
                      placeholder={t.whatsAppWithCC}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type='email'
                      value={email}
                      className='bg-navy-blue bg-[#5ac1a7] text-black placeholder-black focus:border-none focus:outline-none'
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.email}
                      required
                    />
                  </div>
                  <div>
                    <Select
                      value={vehicleType}
                      onValueChange={(newValue) => setVehicleType(newValue)}
                    >
                      <SelectTrigger className='text-black'>
                        {vehicleType
                          ? vehicleTypes.find((op) => op.value === vehicleType)
                            ? locale === 'en'
                              ? vehicleTypes.find(
                                  (op) => op.value === vehicleType
                                )?.value
                              : vehicleTypes.find(
                                  (op) => op.value === vehicleType
                                )?.localizedValue
                            : null
                          : t.selectVehicleType}
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((op) => (
                          <SelectItem
                            className='text-xl text-black'
                            value={op.value}
                            key={op.value}
                          >
                            {locale == 'en' ? op.value : op.localizedValue}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={pickUpLocation}
                      onValueChange={(newValue) => setPickUpLocation(newValue)}
                    >
                      <SelectTrigger className='text-black'>
                        {pickUpLocation
                          ? startDestination.find(
                              (op) => op.value === pickUpLocation
                            )
                            ? locale === 'en'
                              ? startDestination.find(
                                  (op) => op.value === pickUpLocation
                                )?.value
                              : startDestination.find(
                                  (op) => op.value === pickUpLocation
                                )?.localizedValue
                            : null
                          : t.pickUpLocation}
                      </SelectTrigger>
                      <SelectContent>
                        {startDestination.map((op) => (
                          <SelectItem
                            className='text-xl text-black'
                            value={op.value}
                            key={op.value}
                          >
                            {locale == 'en' ? op.value : op.localizedValue}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* <Input
                      type='text'
                      name='pickUpLocation'
                      id='pickUpLocation'
                      className='bg-navy-blue bg-[#4c4d51] text-white placeholder-white focus:border-none focus:outline-none'
                      value={pickUpLocation}
                      onChange={(e) => setPickUpLocation(e.target.value)}
                      placeholder={t.pickUpLocation}
                      required
                    /> */}
                  </div>
                  {/* <div>
                    <Input
                      type='text'
                      name='destination'
                      id='destination'
                      className='bg-navy-blue bg-[#4c4d51] text-white placeholder-white focus:border-none focus:outline-none'
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder={t.destination}
                      required
                    />
                  </div> */}
                  <div>
                    <DatePicker
                      date={date}
                      setDate={setDate}
                      label={t.pickUpDate}
                    />
                  </div>
                  <div className='flex flex-row'>
                    <Select
                      value={time}
                      onValueChange={(newValue) => setTime(newValue)}
                    >
                      <SelectTrigger className='text-black'>
                        {time
                          ? timeLists.find((op) => op.value === time)
                            ? timeLists.find((op) => op.value === time)?.value
                            : null
                          : t.pickUpTime}
                      </SelectTrigger>
                      <SelectContent>
                        {timeLists.map((op) => (
                          <SelectItem
                            className='text-xl text-black'
                            value={op.value}
                            key={op.value}
                          >
                            {op.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  type='submit'
                  isLoading={isPending}
                  disabled={isPending}
                  className='bg-black px-5 py-2.5 text-lg font-bold text-white hover:opacity-90'
                >
                  {t.bookNow}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className='flex items-center justify-center overflow-hidden'>
        <div className='w-full'>
          <div className='flex items-center justify-center overflow-y-auto overflow-x-hidden bg-white'>
            <div className='my-10 h-full w-full p-4 text-center'>
              <div className=' w-52 lg:w-full md:w-full'>
              <h1 className='text-[32px] lg:text-5xl md:text-4xl font-bold text-black'>
                {t.bookYourCab}
              </h1>
              </div>
              <br />
              <div className='mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                <div className='flex flex-col items-center'>
                <img src='step1.svg' alt='01' className='text-white' />
                  <img src='dateandlocation.svg' alt='dateandlocation' className='text-white' />
                  <h2 className='mt-2 text-black'>{t.dateAndLocation}</h2>
                </div>
                <div className='flex flex-col items-center'>
                <img src='step2.svg' alt='02' className='text-white' />
                  <img src='chooseacab.svg' alt='choosacab' className='text-white' />
                  <h2 className='mt-2 text-black'>{t.chooseACab}</h2>
                </div>
                <div className='flex flex-col items-center'>
                <img src='step3.svg' alt='03' className='text-white' />
                  <img src='makeabooking.svg' alt='makeabooking' className='text-white' />
                  <h2 className='mt-2 text-black'>{t.makeABooking}</h2>
                </div>
                <div className='flex flex-col items-center'>
                <img src='step4.svg' alt='04' className='text-white' />
                  <img src='enjoyyourride.svg' alt='enjoyyourride' className='text-white' />
                  <h2 className='mt-2 text-black'>{t.enjoyYourRide}</h2>
                </div>
                
              </div>
              <Button
                  type='submit'
                  isLoading={isPending}
                  disabled={isPending}
                  onClick={handleClick}
                  className='bg-[#5ac1a7] justify-center mt-10 h-16 rounded-2xl px-5 py-2.5 text-lg font-bold text-white hover:opacity-90'
                >
                  {t.instantBooking}
                </Button>
            </div>
          </div>
        </div>
      </section>
      <main className='overflow-hidden'>
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
              {/* <p>{allCars?.message}</p> */}
            </div>
          )}
        </div>
        <section className='flex items-center justify-center overflow-hidden'>
          <div className='w-full'>
            <div
              id='cover'
              className='mt-16 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-100'
              style={{
                backgroundImage: `url(kaba.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // Add any other background properties you need
              }}
            >
              <div className='m-16 h-full w-full bg-black bg-opacity-50 p-4 text-center lg:m-32 lg:p-16'>
                <h1 className='text-3xl text-white'>
                  {t.clientServiceHeading}
                </h1>
                <br />
                <h1 className='text-xl text-white'>
                  {t.clientServiceSubHeading}
                </h1>
                <br />
                <div className='font-bold text-white'>
                  {t.clientServiceBody}
                </div>
                <br />
                <div dir='ltr' className='text-white'>
                  {t.phoneAt}
                </div>
                <br />
                <Button
                  type='submit'
                  onClick={scrollToTop}
                  className='mx-auto mt-4 bg-[#5ac1a7] px-5 py-2.5 text-lg font-bold text-white hover:opacity-90'
                >
                  {t.bookACab}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default BookACab;
