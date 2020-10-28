export function downloadResponse(response) {
  const filename = response.headers['content-disposition'].split('filename=')[1]
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(new Blob([response.data]));
  link.download = filename;
  link.click();
}
