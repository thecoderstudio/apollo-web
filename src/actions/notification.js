let id = 0;
const severity = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success'
};

function notify(message, severity) {
  return {
    type: 'NOTIFY',
    id: id++,
    message,
    severity
  };
}

function dismiss(notificationId) {
  return {
    type: 'DISMISS',
    id: notificationId
  };
}

export { severity, notify, dismiss };
