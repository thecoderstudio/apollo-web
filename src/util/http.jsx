export function downloadResponse(response, filename=null) {
  let newFilename = filename;
  if (!newFilename) {
    newFilename = response.headers['content-disposition'].split('filename=')[1];
  }
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(new Blob([response.data]));
  link.download = newFilename;
  link.click();
}
