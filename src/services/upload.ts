import request from '@/utils/request';

export async function findBookShelf(name: string): Promise<any> {
  return request(`/api/BookShelf?Name=${name}&PageSize=99`);
}

export async function fetchDrawer(bookShelfId: number): Promise<any> {
  return request(`/api/Drawer?BookSheflId=${bookShelfId}`);
}

export async function fetchBookInDrawer(drawerId: number): Promise<any> {
  return request(`/api/Book?DrawerId=${drawerId}&PageSize=1000`);
}

export async function checkingPosition(bookBarcode: number): Promise<any> {
  return request(`/api/Book?Barcode=${bookBarcode}`);
}

export async function getRealPosition(bookId: number): Promise<any> {
  return request(`/api/Book/${bookId}`);
}

export async function insertRecord(record: any): Promise<any> {
  // console.log(record);
  // console.log(JSON.stringify(record));

  return request(`/api/Detection`, {
    method: 'POST',
    body: JSON.stringify(record),
  });
}

export async function fetchRecord(payload: any): Promise<any> {
  if (payload.filterRecord != undefined) {
    if (payload.filterRecord[0] != '') {
      return request(
        `/api/Detection?StartTime=${payload.filterRecord[0].format(
          'YYYY-MM-DD',
        )}&EndTime=${payload.filterRecord[1].format('YYYY-MM-DD')}&PageNumber=${
          payload.pagination
        }&PageSize=10`,
      );
    }
  }
  return request(`/api/Detection?StartTime=&EndTime=&PageNumber=${payload.pagination}&PageSize=10`);
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
export async function fetchAllDectection(): Promise<any> {
  return request(`/api/Detection?PageSize=10000`);
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
export async function fetchNewestDetect(): Promise<any> {
  return request(`/api/Detection?PageSize=1`);
}

export async function fetchDetectionByBookShelfName(bookShelfName: string): Promise<any> {
  return request(`/api/Detection?BookShelfName=${bookShelfName}`);
}

export async function fetchAllBookShelf(): Promise<any> {
  return request(`/api/BookShelf`);
}
export async function getBookById(bookId: number): Promise<any> {
  return request(`/api/Book/${bookId}`);
}