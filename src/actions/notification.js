var id = 0;
const severity = {
  info: 'info',
  warning: 'warning',
  error: 'error'
}

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
