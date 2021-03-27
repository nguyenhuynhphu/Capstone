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


export async function fetchEarnByMonth(): Promise<any> {
  return request(`/api/ReturnBook?ByMonth=true`);
}


export async function fetchBookAvailable(isAvailable: boolean): Promise<any> {
  return request(`/api/Book?IsAvailable=${isAvailable}`);
}
///api/ReturnBook?PageSize=1
export async function fetchTotalReturn(): Promise<any> {
  return request(`/api/ReturnBook?PageSize=1`);
}

export async function fetchTotalBorrow(): Promise<any> {
  return request(`/api/BorrowBook?PageSize=1`);
}
//
export async function fetchLateReturn(): Promise<any> {
  return request(`/api/ReturnDetail?IsLate=true&PageSize=1`);
}
///api/Book?Barcode=a
export async function fetchBookByBarcode(barcode: string): Promise<any> {
  return request(`/api/Book?Barcode=${barcode}`);
}