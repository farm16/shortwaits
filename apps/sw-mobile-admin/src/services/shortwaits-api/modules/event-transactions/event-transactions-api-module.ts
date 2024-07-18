import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { EventTransactionsResponseType, endpoints } from "@shortwaits/shared-lib";

type GetBusinessEventTransactionsRequestType = string;
export const getBusinessEventTransactions = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<EventTransactionsResponseType, GetBusinessEventTransactionsRequestType>({
    query: businessId => {
      return endpoints.getBusinessEventTransactions.getQueryConfig({
        pathVars: [businessId],
      });
    },
  });
