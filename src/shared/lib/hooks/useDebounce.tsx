export const useDebounce = <F extends (...args: any[]) => void>(
  func: F,
  ms: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, ms);
  };
};
