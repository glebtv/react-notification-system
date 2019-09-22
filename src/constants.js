// Positions
const positions = {
  tl: 'tl',
  tr: 'tr',
  tc: 'tc',
  bl: 'bl',
  br: 'br',
  bc: 'bc'
}

// Levels
const levels = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info'
}

  // Notification defaults
const notification = {
  title: null,
  message: null,
  level: null,
  position: 'tr',
  autoDismiss: 5,
  dismissible: 'both',
  action: null
}

export { positions }
export { levels }
export { notification }
export default { positions, levels, notification }
