export interface DataWithPagination<T> {
  data: T[];
  total: number;
  skip: number;
  limit: number;
}
