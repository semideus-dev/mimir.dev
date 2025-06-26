import { pagination } from "@/lib/constants";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const useAgentsFilter = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(pagination.defaultPage)
      .withOptions({ clearOnDefault: true }),
  });
};
