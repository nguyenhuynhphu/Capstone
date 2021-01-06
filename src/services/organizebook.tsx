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
export async function deleteLocation(locationIds: any) {
  var tmp = '';
  locationIds.forEach((id: any) => {
    tmp += `id=${id}&`;
  });
  return request(`/api/Location?` + tmp, {
    method: 'DELETE',
  });
}
//#endregion

export async function fetchBookShelf(params: BookShelfParamsType): Promise<any> {
  return request(`/api/BookShelf?Name=${params.filterName}&PageNumber=${params.pagination}`);
}

export async function insertBookShelf(values: any): Promise<any> {
  console.log(values);
  return request('/api/BookShelf', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}