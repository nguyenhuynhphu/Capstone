import request from '@/utils/request';

export async function fetchCustomers({ filterName, pagination }: any): Promise<any> {
  return request(`/api/Staff?Name=${filterName}&PageNumber=${pagination}`);
}
