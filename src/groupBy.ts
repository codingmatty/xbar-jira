export function groupBy<T>(
  array: T[],
  fn: (o: T) => string
): Record<string, T[]> {
  return array.reduce((result, instance) => {
    const key = fn(instance);
    return {
      ...result,
      [key]: [...(result[key] ?? []), instance],
    };
  }, {} as Record<string, T[]>);
}
