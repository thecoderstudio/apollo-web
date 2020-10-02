export function getFontAwesomeClass(operatingSystem) {
  switch (operatingSystem) {
      case 'darwin':
        return "fab fa-apple";
      case 'linux':
        return "fab fa-linux";
      case 'freebsd':
        return "fab fa-freebsd";
      default:
        return "fas fa-question-circle";
    }
}
