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
import { vehicleTypes } from '@/constants/constants';
import ar from '@/locales/ar';
import en from '@/locales/en';
import { addBooking } from '@/services/booking';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const BookACab = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : ar;

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
  return (
    <>
      <NavBar />
      <section className='bg-dark-navy-blue my-2 flex items-center justify-center'>
        <div className='container'>
          <div className='bg-navy-blue mx-auto flex items-center justify-center overflow-y-auto overflow-x-hidden rounded-3xl'>
            <div className='relative max-h-full w-full max-w-md p-4'>
              <div className='bg-dark-navy-blue relative rounded-lg'>
                <div className='flex items-center justify-between rounded-t p-4 md:p-5'>
                  <h3 className='text-xl font-semibold text-white'>
                  {t.bookACab}
                  </h3>
                </div>
                <div className='rounded-lg border border-gray-400 p-4 md:p-5'>
                  <form
                    className='space-y-4'
                    onSubmit={(e) => {
                      e.preventDefault();
                      addOrEditRecord();
                    }}
                  >
                    <label className='mb-2 block text-sm font-medium text-white'>
                    {t.name}
              </label>
              <Input
                type='text'
                name='name'
                className='bg-navy-blue text-black placeholder-gray-400 focus:outline-none focus:border-none'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.name}
                required
              />
              <label className='mb-2 block text-sm font-medium text-white'>
              {t.email}
              </label>
              <Input
                type='email'
                value={email}
                className='bg-navy-blue text-black placeholder-gray-400 focus:border-none focus:outline-none'
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.email}
                required
              />
              <label className='mb-2 block text-sm font-medium text-white'>
              {t.whatsAppWithCC}
              </label>
              <Input
                type='text'
                name='whatsapp'
                id='whatsapp'
                className='bg-navy-blue text-black placeholder-gray-400 focus:border-none focus:outline-none'
                value={whatsAppWithCC}
                onChange={(e) => setWhatsAppWithCC(e.target.value)}
                placeholder={t.whatsAppWithCC}
                required
              />
              <label className='mb-2 block text-sm font-medium text-white'>
              {t.vehicleType}
              </label>
              <Select
                value={vehicleType}
                onValueChange={(newValue) => setVehicleType(newValue)}
              >
                <SelectTrigger>
                  {
                    vehicleTypes.find((op) => op.value === vehicleType)
                      ?.value
                  }
                </SelectTrigger>
                <SelectContent>
                  {vehicleTypes.map((op) => (
                    <SelectItem value={op.value} key={op.value}>
                      {op.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label className='mb-2 block text-sm font-medium text-white'>
              {t.pickUpLocation}
              </label>
              <Input
                type='text'
                name='pickUpLocation'
                id='pickUpLocation'
                className='bg-navy-blue text-black placeholder-gray-400 focus:border-none focus:outline-none'
                value={pickUpLocation}
                onChange={(e) => setPickUpLocation(e.target.value)}
                placeholder={t.pickUpLocation}
                required
              />
              <label className='mb-2 block text-sm font-medium text-white'>
              {t.destination}
              </label>
              <Input
                type='text'
                name='destination'
                id='destination'
                className='bg-navy-blue text-black placeholder-gray-400 focus:border-none focus:outline-none'
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={t.destination}
                required
              />
              <label className='mb-2 block text-sm font-medium text-white'>
              {t.pickADate}
              </label>
              <DatePicker
                date={date}
                setDate={setDate}
                label={t.pickADate}
              />
              <Button
                type='submit'
                isLoading={isPending}
                disabled={isPending}
                className='w-full rounded-lg bg-teal-500 px-5 py-2.5 text-lg font-bold text-white hover:bg-teal-600'
              >
                {t.bookNow}
              </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookACab;
