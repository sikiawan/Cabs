import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadRow,
  TableCell,
  TableHead,
  TableFooter,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/header/NavBar';
import { Booking } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addBooking,
  deleteBooking,
  getBooking,
  getBookings,
} from '@/services/booking';
import { useToast } from '@/components/ui/use-toast';
import en from '@/locales/en';
import ar from '@/locales/ar';
import { useRouter } from 'next/router';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Loader2,
  Pencil,
  Trash,
} from 'lucide-react';
import ConfirmationDialog from '@/components/alerts/ConfirmationDialog';
import { PaginationSection } from '@/components/PaginationSection';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { bookingStatuses, vehicleTypes } from '@/constants/constants';
import ur from '@/locales/ur';

const Bookings = () => {
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
  const [bookingStatus, setBookingStatus] = useState('newBooking');
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [localizedName, setLocalizedName] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nameSearch, setNameSearch] = useState('');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string>('');
  const [isModalOpen, setModalOpen] = useState(false);

  const { toast } = useToast();

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
        status: bookingStatus,
      };
      const result = await addBooking(postData);
      return result;
    },
    onError: (error) => {
      console.log('Error', error.message);
    },
    onSuccess: (data) => {
      clear();
      setModalOpen(false);
      toast({
        title: data.management,
        description: data.msg,
      });
      queryClient.invalidateQueries({ queryKey: ['booking'] });
    },
  });

  const { mutate: deleteRecord, isPending: deletePending } = useMutation({
    mutationFn: async () => {
      if (recordToDelete) {
        const result = await deleteBooking(recordToDelete);
        return result;
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
      });
    },
    onSuccess: (data) => {
      setRecordToDelete('');
      setDeleteConfirmationOpen(false);
      toast({
        title: data.management,
        description: data.msg,
      });
      refetch();
      queryClient.invalidateQueries({ queryKey: ['booking'] });
    },
  });
  const { mutate: handleEdit, isPending: editPending } = useMutation({
    mutationFn: async (id: string) => {
      return await getBooking(id);
    },
    onError: (error) => {
      console.log('Error', error.message);
    },
    onSuccess: (data) => {
      setName(data.name);
      setEmail(data.email);
      setWhatsAppWithCC(data.whatsAppWithCC);
      setPickUpLocation(data.pickUpLocation);
      setDestination(data.destination);
      setVehicleType(data.vehicleType);
      setBookingStatus(data.status);
      setDate(data.bookingDate);
      setId(data.id);
      setModalOpen(true);
    },
  });
  const {
    data: bookingData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['booking', page, rowsPerPage, nameSearch, sortBy, sortOrder],
    queryFn: () =>
      getBookings(page, rowsPerPage, nameSearch, sortBy, sortOrder),
  });
  const clear = () => {
    setId('0');
    setName('');
    setEmail('');
    setWhatsAppWithCC('');
    setLocalizedName('');
    setPickUpLocation('');
    setDestination('');
    setVehicleType('');
    setBookingStatus('newBooking');
    setDate(undefined);
  };
  const handleSort = (columnName: string) => {
    const newSortOrder =
      columnName === sortBy && sortOrder === 'asc' ? 'desc' : 'asc';

    setSortBy(columnName);
    setSortOrder(newSortOrder);
    setPage(1);
  };

  const handleDelete = (id: string) => {
    setRecordToDelete(id);
    setDeleteConfirmationOpen(true);
  };
  const handleCancelDelete = () => {
    setRecordToDelete('');
    setDeleteConfirmationOpen(false);
  };

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={8}>
            <div className='flex justify-center'>
              <Loader2 className='mr-2 h-10 w-10 animate-spin' />
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (!bookingData || bookingData.totalRecords === 0) {
      return (
        <TableRow>
          <TableCell colSpan={8} className='text-center'>
            No data found !
          </TableCell>
        </TableRow>
      );
    }

    // Render table rows when data is available
    return bookingData?.clientPreferences?.map((item: Booking) => (
      <TableRow className='rounded-2xl' key={item.id}>
        <TableCell>
          {locale === 'ar' ? item.localizedName : item.name}
        </TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.whatsAppWithCC}</TableCell>
        <TableCell>{item.vehicleType}</TableCell>
        <TableCell>{item.pickUpLocation}</TableCell>
        <TableCell>{item.destination}</TableCell>
        <TableCell>{item.status}</TableCell>

        <TableCell className='flex flex-row'>
          {/* Edit button */}
          <div className='flex items-center'>
            <Pencil
              className='h-5 w-5 cursor-pointer text-blue-500'
              onClick={() => handleEdit(item.id.toString())}
              //title={t.edit}
            />
          </div>

          {/* Delete button */}
          <div className='ml-2 flex items-center'>
            <Trash
              className='h-5 w-5 cursor-pointer text-red-500'
              onClick={() => handleDelete(item.id.toString())}
              //title={t.delete}
            />
          </div>
        </TableCell>
      </TableRow>
    ));
  };
  return (
    <>
      <NavBar />
      <section className='my-2 flex items-center justify-center'>
        <div className='container mt-16'>
          <div className='flex items-end justify-between gap-3'>
            {/* <Input
              className='h-12 w-full sm:max-w-[44%]'
              placeholder='search'
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            /> */}
            <div className='flex gap-3'>
              <Button onClick={() => setModalOpen(true)} color='primary'>
                {t.addNew}
              </Button>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-default-400 text-small'>
              {t.total +
                ' ' +
                (bookingData?.totalRecords ?? 0) +
                ' ' +
                t.records}
            </span>
            <label className='text-default-400 text-small flex items-center'>
              {t.recordsPerPage}
              <select
                className='text-default-400 text-small bg-transparent outline-none'
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(1);
                }}
              >
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='15'>15</option>
              </select>
            </label>
          </div>
          <Table>
            <TableHeader>
              <TableHeadRow>
                <TableHead>
                  <div
                    className='flex items-center'
                    onClick={() => handleSort('name')}
                  >
                    {t.name}
                    {sortBy === 'name' ? (
                      <span className='ml-2'>
                        {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    ) : (
                      <span className='ml-2'>
                        <ChevronDown />
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className='flex items-center'
                    onClick={() => handleSort('email')}
                  >
                    {t.email}
                    {sortBy === 'email' ? (
                      <span className='ml-2'>
                        {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    ) : (
                      <span className='ml-2'>
                        <ChevronDown />
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className='flex items-center'
                    onClick={() => handleSort('whatsapp')}
                  >
                    {t.whatsAppWithCC}
                    {sortBy === 'whatsapp' ? (
                      <span className='ml-2'>
                        {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    ) : (
                      <span className='ml-2'>
                        <ChevronDown />
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className='flex items-center'
                    onClick={() => handleSort('vehicletype')}
                  >
                    {t.vehicleType}
                    {sortBy === 'vehicletype' ? (
                      <span className='ml-2'>
                        {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    ) : (
                      <span className='ml-2'>
                        <ChevronDown />
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className='flex items-center'
                    onClick={() => handleSort('pickuplocation')}
                  >
                    {t.pickUpLocation}
                    {sortBy === 'pickuplocation' ? (
                      <span className='ml-2'>
                        {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    ) : (
                      <span className='ml-2'>
                        <ChevronDown />
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className='flex items-center'
                    onClick={() => handleSort('destination')}
                  >
                    {t.destination}
                    {sortBy === 'destination' ? (
                      <span className='ml-2'>
                        {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    ) : (
                      <span className='ml-2'>
                        <ChevronDown />
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className='flex items-center'
                    onClick={() => handleSort('status')}
                  >
                    {t.status}
                    {sortBy === 'status' ? (
                      <span className='ml-2'>
                        {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    ) : (
                      <span className='ml-2'>
                        <ChevronDown />
                      </span>
                    )}
                  </div>
                </TableHead>
                <TableHead>{t.action}</TableHead>
              </TableHeadRow>
            </TableHeader>
            <TableBody>{renderTableBody()}</TableBody>
            {bookingData?.totalRecords > 0 && (
              <TableFooter>
                <TableCell colSpan={8}>
                  <PaginationSection
                    totalPosts={bookingData?.totalRecords}
                    postsPerPage={rowsPerPage}
                    currentPage={page}
                    setCurrentPage={setPage}
                  />
                </TableCell>
              </TableFooter>
            )}
          </Table>
          {/* Add Or Update Modal */}
          {isModalOpen && (
            <div className='fixed inset-0 mt-10 flex items-center justify-center overflow-y-auto overflow-x-hidden'>
              <div className='relative z-50 max-h-full w-full max-w-md border p-4'>
                <div className='relative rounded-lg bg-white'>
                  <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600'>
                    <h3 className='text-secondary-foreground text-xl font-semibold'>
                      {t.bookACab}
                    </h3>
                    <button
                      type='button'
                      className='end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                      onClick={() => {
                        setModalOpen(false);
                        clear();
                      }}
                    >
                      <svg
                        className='h-3 w-3'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 14'
                      >
                        <path
                          stroke='currentColor'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                        />
                      </svg>
                      <span className='sr-only'>Close modal</span>
                    </button>
                  </div>
                  <div className='h-full w-full bg-black bg-opacity-50 p-4'>
                    <form
                      className='w-full space-y-4'
                      onSubmit={(e) => {
                        e.preventDefault();
                        addOrEditRecord();
                      }}
                    >
                      <div className='grid grid-cols-1 gap-4'>
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
                            onValueChange={(newValue) =>
                              setVehicleType(newValue)
                            }
                            required
                          >
                            <SelectTrigger className='text-white'>
                              {vehicleType
                                ? vehicleTypes.find(
                                    (op) => op.value === vehicleType
                                  )
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
                                  className='text-white'
                                  value={op.value}
                                  key={op.value}
                                >
                                  {locale == 'en'
                                    ? op.value
                                    : op.localizedValue}
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
                            {t.pickUpDate}
                          </label>
                          <DatePicker
                            date={date}
                            setDate={setDate}
                            label={t.pickUpDate}
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
            </div>
          )}
          {/* Confirmation Dialog */}
          <ConfirmationDialog
            onConfirmed={deleteRecord}
            onCancel={handleCancelDelete}
            isOpen={isDeleteConfirmationOpen}
            title={t.confirmationTitle}
            description={t.confirmationDelete}
            isLoading={deletePending}
          />
        </div>
      </section>
    </>
  );
};

export default Bookings;
