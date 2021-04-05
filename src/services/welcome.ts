import request from '@/utils/request';
import moment from 'moment';

export async function fetchCustomerBorrow(): Promise<any> {
  return request(`/api/BorrowBook?IsNewest=true&PageSize=5`);
}
export async function fetchCustomerReturn(): Promise<any> {
  var today = moment().format('YYYY-MM-DD');
  return request(`/api/BorrowBook?ReturnToday=${today}`);
}
