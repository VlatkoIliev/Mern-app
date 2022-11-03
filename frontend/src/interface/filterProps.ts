export interface FilterProps {
  handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  filterBy?: string;
  term?: string;
}
