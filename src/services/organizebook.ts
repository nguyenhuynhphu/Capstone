import request from '@/utils/request';
import { insertBookGroup } from './bookgroup';

export interface LocationParamsType {
  filterName: string;
  pagination: number;
}

export interface BookShelfParamsType {
  filterName: string;
  pagination: number;
}

export interface DrawerParamsType {
  bookSheflId: number;
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

export interface TransferBookParamsType {
  bookGroupId: number;
  drawerId: number;
  isInDrawer: number;
  pageNumber: number;
  filterName: string;
}

//#region 
export async function fetchLocation(params: LocationParamsType): Promise<any> {
  return request(`/api/Location?Name=${params.filterName}&PageNumber=${params.pagination}`);
}

export async function insertLocation(values: any): Promise<any> {

  return request('/api/Location', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export async function editLocation(values: any): Promise<any> {
  return request(`/api/Location?id=${values.id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}
export async function deleteLocation(locationId: any) {
  return request(`/api/Location?id=${locationId}`, {
    method: 'DELETE',
  });
}
//#endregion

export async function fetchBookShelf(params: BookShelfParamsType): Promise<any> {
  return request(`/api/BookShelf?Name=${params.filterName}&PageNumber=${params.pagination}`);
}

export async function insertBookShelf(values: any): Promise<any> {

  return request('/api/BookShelf', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}


export async function fetchDrawer(params: DrawerParamsType): Promise<any> {
  return request(`/api/Drawer?BookSheflId=${params.bookSheflId}&RowStart=${params.rowStart}&RowEnd=${params.rowEnd}&ColStart=${params.colStart}&ColEnd=${params.colEnd}`);
}

export async function fetchBookInSystem(params: TransferBookParamsType): Promise<any> {
  return request(`/api/Book?BookName=${params.filterName}&PageSize=20&BookGroupId=${params.bookGroupId}&DrawerId=${params.drawerId}&IsInDrawer=${params.isInDrawer}&PageNumber=${params.pageNumber}`);
}

export async function addBookToDrawer(values: any): Promise<any> {
  console.log(JSON.stringify(values));
  
  return request(`/api/Book`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export async function removeBooksFromDrawer(values: any): Promise<any> {
  console.log(JSON.stringify(values),);
  
  
  return request(`/api/Book`, {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
///api/BookDrawer?id=1&id=2