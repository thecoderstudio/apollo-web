function getFilenameFromHeaders(headers) {
    try {
      return headers['content-disposition'].split('filename=')[1];
    } catch (error) {
      if (error instanceof TypeError) {
        return null;
      }
      throw error;
    }
}

export function downloadResponse(response, filename=null) {
  let newFilename = filename;
  if (!newFilename) {
    const filenameFromHeader = getFilenameFromHeaders(response.headers);
    newFilename = filenameFromHeader ? filenameFromHeader : 'response';
  }
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(new Blob([response.data]));
  link.download = newFilename;
  link.click();
}
