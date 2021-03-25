//http://171.244.5.88:90/api/BookGroup
import request from '@/utils/request';

export interface BookGroupParamsType {
  filterName: string;
  pagination: number;
}

export async function fetchAllBookGroup(params: BookGroupParamsType): Promise<any> {
  return request(`/api/BookGroup?Name=${params.filterName}&PageNumber=${params.pagination}`);
}

export async function fetchNewestBookGroup(): Promise<any> {
  return request(`/api/BookGroup?IsNewest=true&PageSize=5`);
}

export async function fetchCategories(): Promise<any> {
  return request(`/api/Category`);
}
export async function insertCategory(values: any) {
  return request(`/api/Category`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
export async function deleteCategory(ids: any) {
  return request(`/api/Category?id=${ids[0]}`, {
    method: 'DELETE',
  });
}

export async function fetchComments({ id, page }: any): Promise<any> {
  return request(`/api/Feedback?BookGroupId=${id}&PageSize=10&PageNumber=${page}`);
}

export async function fetchBooks(bookGroupId: number): Promise<any> {
  return request(`/api/Book?BookGroupId=${bookGroupId}`);
}

export async function deleteBookGroup(bookGroupIds: any) {
  var tmp = '';
  bookGroupIds.forEach((id: any) => {
    tmp += `id=${id}&`;
  });
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

export async function editBookGroup(values: any) {
  console.log(values);

  console.log(JSON.stringify(values));

  return request(`/api/BookGroup?id=${values.id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}
