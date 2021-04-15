//http://171.244.5.88:90/api/BookGroup
import request from '@/utils/request';

export async function fetchAllBook(bookGroupId: number, count: number): Promise<any> {
  return request(`/api/Book?BookGroupId=${bookGroupId}&PageSize=1000`);
}

export async function insertBook(values: any) {
  console.log(JSON.stringify(values));
  
  return request('/api/Book', {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export async function deleteBook(bookId: number) {
  return request(`/api/Book?id=${bookId}`, {
    method: 'DELETE',
  });
}