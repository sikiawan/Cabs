import { API_CONFIG } from '@/constants/api-config';

// all bookings
export const getBookings = async (
  page: number,
  rowsPerPage: number,
  nameSearch: string,
  sortBy: string,
  sortOrder: string
) => {
  const url = `${API_CONFIG.BASE_URL}api/Booking/GetBookings`;
  const data = {
    page: page,
    pageSize: rowsPerPage,
    sortBy: sortBy,
    sortOrder: sortOrder,
    nameSearch: nameSearch,
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, requestOptions);
  const json = await response.json();

  return json;
};

// single booking
export const getBooking = async (id: string) => {
  debugger;
  const response = await fetch(
    `${API_CONFIG.BASE_URL}api/Booking/GetById?id=${id}`
  );
  const json = await response.json();

  if (json) return json;
  return {};
};

// posting a booking
export async function addBooking(postData: any) {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}api/Booking`, {
  method: 'POST',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(postData)
});
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

// Delete a booking
export async function deleteBooking(id: string) {
  const Options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  const response = await fetch(
    `${API_CONFIG.BASE_URL}api/Booking?id=${id}`,
    Options
  );
  const json = await response.json();
  return json;
}

// contact us
export async function contactUs(postData: any) {
  try {
    debugger;
    const response = await fetch(`${API_CONFIG.BASE_URL}api/Booking/ContactUs`, {
  method: 'POST',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(postData)
});
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}