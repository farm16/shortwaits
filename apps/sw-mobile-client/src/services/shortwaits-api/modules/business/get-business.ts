import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BusinessResponseType } from '@shortwaits/shared-lib';
import { shortwaitsApiEndpoints } from '../../../../configs';

const { getBusiness } = shortwaitsApiEndpoints.BUSINESS;

export default (builder: EndpointBuilder<any, any, any>) =>
  builder.query<BusinessResponseType, string>({
    query: businessId => getBusiness.getPath(businessId),
  });
