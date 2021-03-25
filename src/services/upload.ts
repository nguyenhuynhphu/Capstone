import request from '@/utils/request';

export async function findBookShelf(name: string): Promise<any> {
  return request(`/api/BookShelf?Name=${name}`);
}

export async function fetchDrawer(bookShelfId: number): Promise<any> {
  return request(`/api/Drawer?BookSheflId=${bookShelfId}`);
}

export async function fetchBookInDrawer(drawerId: number): Promise<any> {
  return request(`/api/Book?DrawerId=${drawerId}&PageSize=200`);
}

export async function checkingPosition(bookBarcode: number): Promise<any> {
  return request(`/api/Book?Barcode=${bookBarcode}`);
}

export async function getRealPosition(bookId: number): Promise<any> {
  return request(`/api/Book/${bookId}`);
}

export async function insertRecord(record: any): Promise<any> {
  console.log(record);
  console.log(JSON.stringify(record));

  return request(`/api/Detection`, {
    method: 'POST',
    body: JSON.stringify(record),
  });
}

export async function fetchRecord(): Promise<any> {
  return request(`/api/Detection`);
}
export async function fetchTrackingDetail(detectionId: number): Promise<any> {
  return request(`/api/DrawerDetection?DetectionId=${detectionId}`);
}
export async function fetchError(detectionDrawerId: number): Promise<any> {
  return request(`/api/DetectionError?DrawerDetectionId=${detectionDrawerId}`);
}
export async function fetchUndifileError(detectionDrawerId: number): Promise<any> {
  return request(`/api/UndefinedError?DrawerDetectionId=${detectionDrawerId}`);
}

export async function updateError(detectionError: any): Promise<any> {
  return request(`/api/DetectionError?id=${detectionError.id}`, {
    method: 'PUT',
    body: JSON.stringify(detectionError),
  });
}
export async function updateUndefined(undefinedError: any): Promise<any> {
  return request(`/api/UndefinedError?id=${undefinedError.id}`, {
    method: 'PUT',
    body: JSON.stringify(undefinedError),
  });
}

