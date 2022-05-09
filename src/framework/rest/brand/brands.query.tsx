import {
  QueryParamsType,
  Type,
  TypeQueryOptionsType,
} from "@framework/types";
import { CoreApi, ParamsType } from "@framework/utils/core-api";
import { API_ENDPOINTS } from "@framework/utils/endpoints";
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
} from "react-query";
import { mapPaginatorData } from "@framework/utils/data-mappers";

const BrandService = new CoreApi(API_ENDPOINTS.TYPE);

type PaginatedTypes = {
  data: Type[];
  paginatorInfo: any;
};

export const fetchBrands = async ({ queryKey, pageParam,}: QueryParamsType): Promise<PaginatedTypes> => {
  const params = queryKey?.[1] ?? {};
  let fetchedData: any = {};

  if (pageParam) {
    const response = await BrandService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await BrandService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

export const useBrandsQuery = (
  params: TypeQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedTypes,
    Error,
    PaginatedTypes,
    PaginatedTypes,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedTypes, Error>(
    [API_ENDPOINTS.TYPE, params],
    fetchBrands,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export const fetchBrand = async (slug: string) => {
  const { data } = await BrandService.findOne(slug);
  return { type: data };
};
export const useBrandQuery = (slug: string) => {
  return useQuery<{ type: Type }, Error>(
    [API_ENDPOINTS.TYPE, slug],
    () => fetchBrand(slug),
    { enabled: Boolean(slug) }
  );
};
