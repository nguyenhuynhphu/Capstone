//http://171.244.5.88:90/api/BookGroup
import request from '@/utils/request';

export async function fetchAllBookShelf(filterName: string, pagination: number): Promise<any> {
  return request(`/api/BookShelf?Name=${filterName}&PageNumber=${pagination}`);
}

export async function insertBookShelf(values: any) {
  return request('/api/BookShelf', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}


export async function deleteBookShelf(bookshelfs: any) {
  return request(`/api/BookShelf?id=` + bookshelfs, {
    method: 'DELETE',
  });
}