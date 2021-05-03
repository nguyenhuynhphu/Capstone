//http://171.244.5.88:90/api/BookGroup
import request from '@/utils/request';

export async function fetchAllBook(bookGroupId: number, count: number): Promise<any> {
  return request(`/api/Book?BookGroupId=${bookGroupId}&PageSize=1000`);
}

export async function fetchDeletedBook(): Promise<any> {
  return request(`/api/Book?IsDeleted=true`);
}

export async function fetchBookById(bookId: number): Promise<any> {
  return request(`/api/Book/${bookId}`);
}

export async function insertBook(values: any) {
  console.log(JSON.stringify(values));
  
  return request('/api/Book', {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}
//fetchDisableBook
export async function fetchDisableBook(bookGroupId: number, count: number): Promise<any> {
  return request(`/api/Book?BookGroupId=${bookGroupId}&PageSize=1000&IsDeleted=true`);
}
export async function deleteBook(book: any) {
  console.log(JSON.stringify(book));
  book.isDeleted = true;
  book.note = book.note;
  return request(`/api/Book`, {
    method: 'POST',
    body: JSON.stringify([book]),
  });

}
//