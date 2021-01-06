//http://171.244.5.88:90/api/BookGroup
import request from '@/utils/request';

export interface BookGroupParamsType {
  filterName: string;
  pagination: number;
}

export async function fetchAllBookGroup(params: BookGroupParamsType): Promise<any> {
  return request(`/api/BookGroup?Name=${params.filterName}&PageNumber=${params.pagination}`);
}

export async function fetchCategories(): Promise<any> {
  return request(`/api/Category`);
}

export async function deleteBookGroup(bookGroupIds: any) {
  console.log('asdasdasd', bookGroupIds);
  var tmp = '';
  bookGroupIds.forEach((id: any) => {
    tmp += `id=${id}&`;
  });
  console.log(tmp);
  return request(`/api/BookGroup?` + tmp, {
    method: 'DELETE',
  });
}
export async function insertBookGroup(values: any) {
  return request('/api/BookGroup', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
