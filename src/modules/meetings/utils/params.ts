import { pagination } from "@/lib/constants";
import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";
import { MeetingStatus } from "@/modules/meetings/utils/types";

export const filtersSearchParams = {
    status: parseAsStringEnum(Object.values(MeetingStatus)),
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(pagination.defaultPage)
    .withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = createLoader(filtersSearchParams);
