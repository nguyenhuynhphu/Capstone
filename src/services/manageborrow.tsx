import request from '@/utils/request';

export async function fetchManageBorrows({ filterName, pagination }: any): Promise<any> {
  return request(`/api/BorrowBook?CustomerName=${filterName}&PageNumber=${pagination}`);
}
