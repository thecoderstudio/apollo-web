var id = 0

function notify(message, severity) {
  return {
    type: 'NOTIFY',
    id: id++,
    message,
    severity
  }
}

function dismiss(notificationId) {
  return {
    type: 'DISMISS',
    id: notificationId
  }
}

export { notify, dismiss };
