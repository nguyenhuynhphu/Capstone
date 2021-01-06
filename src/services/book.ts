//http://171.244.5.88:90/api/BookGroup
import request from '@/utils/request';

export async function fetchAllBook(bookGroupId: number, count: number): Promise<any> {
  return request(`/api/Book?BookGroupId=${bookGroupId}&PageNumber=${count}`);
}

