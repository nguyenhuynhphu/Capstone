import request from '@/utils/request';

export async function fetchManageBorrows({ filterName, pagination }: any): Promise<any> {
  return request(`/api/BorrowBook?CustomerName=${filterName}&PageNumber=${pagination}`);
}

export async function fetchBooks(bookGroupId: number): Promise<any> {
  return request(`/api/BookGroup/${bookGroupId}`);
}

export async function fecthDrawer(bookGroupId: number): Promise<any> {
  return request(`/api/Drawer?BookGroupId=${bookGroupId}`);
}

export async function fetchCustomer(customerId: number): Promise<any> {
  return request(`/api/Customer/${customerId}`);
}

export async function confirmBorrow(value: any): Promise<any> {
  return request('/api/BorrowBook', {
    method: 'POST',
    body: JSON.stringify(value),
  });
}


export async function fetchBorrowDetail(borrowId: number): Promise<any> {
  return request(`/api/BorrowDetail?BorrowId=${borrowId}`);
}

export async function fetchReturnBook({ filterName, pagination }: any): Promise<any> {
  return request(`/api/ReturnBook?CustomerName=${filterName}&PageNumber=${pagination}`);
}