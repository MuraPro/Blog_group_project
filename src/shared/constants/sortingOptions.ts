export enum OptionsValues {
  DESC = 'desc',
  ASC = 'asc'
}

type SortingOptions = {
  value: OptionsValues;
  label: string;
}[];

export const sortingOptionsAscDesc:SortingOptions = [
  { value: OptionsValues.DESC, label: 'Сначала новые' },
  { value: OptionsValues.ASC, label: 'Сначала старые' },
]
