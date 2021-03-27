import request from '@/utils/request';

export async function fetchLibarians({filterName, pagination}: any): Promise<any> {
  return request(`/api/Staff?Name=${filterName}&PageNumber=${pagination}`);
}
export async function insertLibarian(values: any) {

  return request('/api/Staff', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}


export async function editLibarian(values: any) {
  return request(`/api/Staff?id=${values.id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

export async function deleteLibarian(bookshelfs: any) {
  var tmp = '';
  bookshelfs.forEach((id: any) => {
    tmp += `id=${id}&`;
  });

  return request(`/api/Staff?` + tmp, {
    method: 'DELETE',
  });
}