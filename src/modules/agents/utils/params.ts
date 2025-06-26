import { pagination } from "@/lib/constants";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const filtersSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(pagination.defaultPage)
    .withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(filtersSearchParams);
