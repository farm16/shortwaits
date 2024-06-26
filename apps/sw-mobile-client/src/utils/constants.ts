import {EventStatusName} from '@shortwaits/shared-lib';
import {ThemeColorName} from '../theme/Colors';

// these are the available/remaining statues for each event status
export const nextEventStatuses: Record<EventStatusName, EventStatusName[]> = {
  PENDING: ['CANCELED', 'REJECTED', 'APPROVED'],
  APPROVED: ['CANCELED', 'COMPLETED'],
  REJECTED: [],
  CANCELED: [],
  COMPLETED: [],
};

export const eventStatusIconNames: Record<EventStatusName, string> = {
  PENDING: 'clock-outline',
  APPROVED: 'thumb-up-outline',
  REJECTED: 'thumb-down-outline',
  CANCELED: 'cancel',
  COMPLETED: 'check-circle-outline',
};

export const eventStatusColors: Record<
  EventStatusName,
  {color: ThemeColorName; backgroundColor: ThemeColorName}
> = {
  PENDING: {color: 'text', backgroundColor: 'lightGray'},
  APPROVED: {color: 'white', backgroundColor: 'success'},
  REJECTED: {color: 'white', backgroundColor: 'failed'},
  CANCELED: {color: 'failed', backgroundColor: 'lightGray'},
  COMPLETED: {color: 'white', backgroundColor: 'success'},
};

export const eventStatusNames: Record<EventStatusName, string> = {
  PENDING: 'pending',
  APPROVED: 'accept',
  REJECTED: 'reject',
  CANCELED: 'cancel',
  COMPLETED: 'complete',
};

export const CALENDAR_EVENT_HEIGHT = 75;
export const EVENT_ITEM_BORDER_RADIUS = 6;

export const STATIC_FORM_USA_STATES = [
  {title: 'Alabama', key: 'AL'},
  {title: 'Alaska', key: 'AK'},
  {title: 'Arizona', key: 'AZ'},
  {title: 'Arkansas', key: 'AR'},
  {title: 'California', key: 'CA'},
  {title: 'Colorado', key: 'CO'},
  {title: 'Connecticut', key: 'CT'},
  {title: 'Delaware', key: 'DE'},
  {title: 'Florida', key: 'FL'},
  {title: 'Georgia', key: 'GA'},
  {title: 'Hawaii', key: 'HI'},
  {title: 'Idaho', key: 'ID'},
  {title: 'Illinois', key: 'IL'},
  {title: 'Indiana', key: 'IN'},
  {title: 'Iowa', key: 'IA'},
  {title: 'Kansas', key: 'KS'},
  {title: 'Kentucky', key: 'KY'},
  {title: 'Louisiana', key: 'LA'},
  {title: 'Maine', key: 'ME'},
  {title: 'Maryland', key: 'MD'},
  {title: 'Massachusetts', key: 'MA'},
  {title: 'Michigan', key: 'MI'},
  {title: 'Minnesota', key: 'MN'},
  {title: 'Mississippi', key: 'MS'},
  {title: 'Missouri', key: 'MO'},
  {title: 'Montana', key: 'MT'},
  {title: 'Nebraska', key: 'NE'},
  {title: 'Nevada', key: 'NV'},
  {title: 'New Hampshire', key: 'NH'},
  {title: 'New Jersey', key: 'NJ'},
  {title: 'New Mexico', key: 'NM'},
  {title: 'New York', key: 'NY'},
  {title: 'North Carolina', key: 'NC'},
  {title: 'North Dakota', key: 'ND'},
  {title: 'Ohio', key: 'OH'},
  {title: 'Oklahoma', key: 'OK'},
  {title: 'Oregon', key: 'OR'},
  {title: 'Pennsylvania', key: 'PA'},
  {title: 'Rhode Island', key: 'RI'},
  {title: 'South Carolina', key: 'SC'},
  {title: 'South Dakota', key: 'SD'},
  {title: 'Tennessee', key: 'TN'},
  {title: 'Texas', key: 'TX'},
  {title: 'Utah', key: 'UT'},
  {title: 'Vermont', key: 'VT'},
  {title: 'Virginia', key: 'VA'},
  {title: 'Washington', key: 'WA'},
  {title: 'West Virginia', key: 'WV'},
  {title: 'Wisconsin', key: 'WI'},
  {title: 'Wyoming', key: 'WY'},
];

export const STATIC_FORM_AMERICAN_COUNTRIES = [
  {title: 'United States', key: 'US'},
  {title: 'Antigua and Barbuda', key: 'AG'},
  {title: 'Argentina', key: 'AR'},
  {title: 'Bahamas', key: 'BS'},
  {title: 'Barbados', key: 'BB'},
  {title: 'Belize', key: 'BZ'},
  {title: 'Bolivia', key: 'BO'},
  {title: 'Brazil', key: 'BR'},
  {title: 'Canada', key: 'CA'},
  {title: 'Chile', key: 'CL'},
  {title: 'Colombia', key: 'CO'},
  {title: 'Costa Rica', key: 'CR'},
  {title: 'Cuba', key: 'CU'},
  {title: 'Dominica', key: 'DM'},
  {title: 'Dominican Republic', key: 'DO'},
  {title: 'Ecuador', key: 'EC'},
  {title: 'El Salvador', key: 'SV'},
  {title: 'Grenada', key: 'GD'},
  {title: 'Guatemala', key: 'GT'},
  {title: 'Guyana', key: 'GY'},
  {title: 'Haiti', key: 'HT'},
  {title: 'Honduras', key: 'HN'},
  {title: 'Jamaica', key: 'JM'},
  {title: 'Mexico', key: 'MX'},
  {title: 'Nicaragua', key: 'NI'},
  {title: 'Panama', key: 'PA'},
  {title: 'Paraguay', key: 'PY'},
  {title: 'Peru', key: 'PE'},
  {title: 'Saint Kitts and Nevis', key: 'KN'},
  {title: 'Saint Lucia', key: 'LC'},
  {title: 'Saint Vincent and the Grenadines', key: 'VC'},
  {title: 'Suriname', key: 'SR'},
  {title: 'Trinidad and Tobago', key: 'TT'},
  {title: 'Uruguay', key: 'UY'},
  {title: 'Venezuela', key: 'VE'},
];
