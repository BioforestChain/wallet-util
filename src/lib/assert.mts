const assert = (condition: boolean, message?: boolean) => {
  if (condition) {
    return;
  }
  throw message;
};
export default assert;
