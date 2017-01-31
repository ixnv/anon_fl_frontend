export const DateUtil = {
  formatDate: (date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} в ${d.toLocaleTimeString()}`;
  }
};
