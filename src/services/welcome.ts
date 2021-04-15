import request from '@/utils/request';
import moment from 'moment';

export async function fetchPatronBorrow(): Promise<any> {
  return request(`/api/BorrowBook?IsNewest=true&PageSize=5`);
}
export async function fetchPatronReturn(): Promise<any> {
  var today = moment().format('YYYY-MM-DD');
  return request(`/api/BorrowBook?ReturnToday=${today}`);
}
