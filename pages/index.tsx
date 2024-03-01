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
import { allCars, vehicleTypes } from '@/constants/constants';
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
  const t = locale === 'en' ? en : (locale === 'ar' ? ar : ur);

  const [id, setId] = useState<string>('0');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsAppWithCC, setWhatsAppWithCC] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);

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
  };
  //const [allCars, setAllCars] = useState<any>([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const slideshowImages = [
    'makkah-cover.jpg',
    //'kaba.jpg',
    //'nabvi.jpg',
  ];
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
      <section className='flex items-center overflow-hidden justify-center'>
        <div className='w-full'>
        <div
            id='cover'
            //ref={coverRef}
            className='mt-16 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-100'
            style={{
              backgroundImage: `url(makkah-cover.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // Add any other background properties you need
            }}
          >
            <div className='lg:m-32 lg:p-16 m-16 p-4 h-full w-full bg-black bg-opacity-50'>
              <form
                className='w-full space-y-4'
                onSubmit={(e) => {
                  e.preventDefault();
                  addOrEditRecord();
                }}
              >
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-white'>
                      {t.name}
                    </label>
                    <Input
                      type='text'
                      name='name'
                      className='bg-navy-blue bg-[#4c4d51] text-white placeholder-white focus:border-none focus:outline-none'
                      id='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.name}
                      required
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-white'>
                      {t.email}
                    </label>
                    <Input
                      type='email'
                      value={email}
                      className='bg-navy-blue bg-[#4c4d51] text-white placeholder-white focus:border-none focus:outline-none'
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.email}
                      required
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-white'>
                      {t.whatsAppWithCC}
                    </label>
                    <Input
                      type='text'
                      name='whatsapp'
                      id='whatsapp'
                      className='bg-navy-blue bg-[#4c4d51] text-white placeholder-white focus:border-none focus:outline-none'
                      value={whatsAppWithCC}
                      onChange={(e) => setWhatsAppWithCC(e.target.value)}
                      placeholder={t.whatsAppWithCC}
                      required
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-white'>
                      {t.vehicleType}
                    </label>
                    <Select
                      value={vehicleType}
                      onValueChange={(newValue) => setVehicleType(newValue)}
                    >
                      <SelectTrigger className='text-white'>
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
                          <SelectItem className='text-white' value={op.value} key={op.value}>
                            {locale == 'en' ? op.value : op.localizedValue}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-white'>
                      {t.pickUpLocation}
                    </label>
                    <Input
                      type='text'
                      name='pickUpLocation'
                      id='pickUpLocation'
                      className='bg-navy-blue bg-[#4c4d51] text-white placeholder-white focus:border-none focus:outline-none'
                      value={pickUpLocation}
                      onChange={(e) => setPickUpLocation(e.target.value)}
                      placeholder={t.pickUpLocation}
                      required
                    />
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-white'>
                      {t.destination}
                    </label>
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
                  </div>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-white'>
                      {t.pickADate}
                    </label>
                    <DatePicker
                      date={date}
                      setDate={setDate}
                      label={t.pickADate}
                    />
                  </div>
                </div>
                <Button
                  type='submit'
                  isLoading={isPending}
                  disabled={isPending}
                  className='bg-[#d01818] px-5 py-2.5 text-lg font-bold text-white hover:opacity-90'
                >
                  {t.bookNow}
                </Button>
              </form>
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
        <Footer />
      </main>
    </>
  );
};

export default BookACab;
