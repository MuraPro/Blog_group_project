import dayjs from 'dayjs';

type DateType = string | Date;

type DateConversionType = (date: DateType) => string;

const dateConversion: DateConversionType = (date) => dayjs(date).format('DD.MM.YYYY');

export { dateConversion };
