import request from '@/utils/request';

export async function fetchPatrons({ filterName, pagination }: any): Promise<any> {
  return request(`/api/Patron?Name=${filterName}&PageNumber=${pagination}`);
}

export async function fetchAllPatrons(): Promise<any> {
  return request(`/api/Patron`);
}
