import request from '@/utils/request';

export async function fetchCustomers({ filterName, pagination }: any): Promise<any> {
  return request(`/api/Customer?Name=${filterName}&PageNumber=${pagination}`);
}
