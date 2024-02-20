import NavBar from '@/components/header/NavBar';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { vehicleTypes } from '@/constants/constants';
import { addBooking } from '@/services/booking';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'

const BookACab = () => {
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
        id:id,
        tenantId: 0,
        name: name,
        email: email,
        whatsAppWithCC: whatsAppWithCC,
        vehicleType: vehicleType,
        pickUpLocation: pickUpLocation,
        destination: destination,
        bookingDate: date
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
      <section className='my-2 flex items-center justify-center'>
        <div className='container'>
          <div className='flex items-center bg-[#1f32e0] rounded-3xl mx-36 justify-center overflow-y-auto overflow-x-hidden'>
              <div className='relative max-h-full w-full max-w-md p-4'>
                <div className='relative rounded-lg bg-[#2c40f4]'>
                  <div className='flex items-center justify-between rounded-t p-4 md:p-5'>
                    <h3 className='text-xl font-semibold text-secondary-foreground'>
                      Book your cab
                    </h3>
                  </div>
                  <div className='p-4 md:p-5'>
                    <form
                      className='space-y-4'
                      onSubmit={(e) => {
                        e.preventDefault();
                        addOrEditRecord();
                      }}
                    >
                      {' '}
                      <label className='mb-2 block text-sm font-medium text-secondary-foreground'>
                        Name
                      </label>
                      <Input
                        type='text'
                        name='name'
                        className='bg-[#2f5dff] text-white placeholder:text-white focus:outline-none focus:border-none'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='name'
                        required
                      />
                      <label className='mb-2 block text-sm font-medium text-secondary-foreground'>
                        Email
                      </label>
                      <Input
                        type='email'
                        value={email}
                        className='bg-[#2f5dff] text-white placeholder:text-white focus:outline-none focus:border-none'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='email'
                        required
                      />
                      <label className='mb-2 block text-sm font-medium text-secondary-foreground'>
                        WhatsApp With Coutry Code
                      </label>
                      <Input
                        type='text'
                        name='whatsapp'
                        id='whatsapp'
                        className='bg-[#2f5dff] text-white placeholder:text-white focus:outline-none focus:border-none'
                        value={whatsAppWithCC}
                        onChange={(e) => setWhatsAppWithCC(e.target.value)}
                        placeholder='whatsapp'
                        required
                      />
                      <label className='mb-2 block text-sm font-medium text-secondary-foreground'>
                        Vehicle Type
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
                      <label className='mb-2 block text-sm font-medium text-secondary-foreground'>
                        Pick Up Location
                      </label>
                      <Input
                        type='text'
                        name='name'
                        id='name'
                        className='bg-[#2f5dff] text-white placeholder:text-white focus:outline-none focus:border-none'
                        value={pickUpLocation}
                        onChange={(e) => setPickUpLocation(e.target.value)}
                        placeholder='Pick Up Location'
                        required
                      />
                      <label className='mb-2 block text-sm font-medium text-secondary-foreground'>
                        Destination
                      </label>
                      <Input
                        type='text'
                        name='destination'
                        id='destination'
                        className='bg-[#2f5dff] text-white placeholder:text-white focus:outline-none focus:border-none'
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder='destination'
                        required
                      />
                      <label className='mb-2 block text-sm font-medium text-secondary-foreground'>
                        Date
                      </label>
                      <DatePicker date={date} setDate={setDate} />
                      <Button
                        type='submit'
                        isLoading={isPending}
                        disabled={isPending}
                        className='w-full rounded-lg bg-[#3deac2] px-5 py-2.5 h-24 text-center text-lg font-bold text-white hover:opacity-90'
                      >
                        Book Now
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          
        </div>
      </section>
    </>
  )
}

export default BookACab
