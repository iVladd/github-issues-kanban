import { useSelector } from "react-redux";
import { selectSearch } from "./issuesSelectors";
import { useAppDispatch } from "../store";
import { setSearch } from "./issuesSlice";

const useSearch = (): [string, (value: string) => void] => {
  const searchValue = useSelector(selectSearch);
  const dispatch = useAppDispatch();

  const setSearchValue = (value: string) => {
    dispatch(setSearch(value));
  };

  return [searchValue, setSearchValue];
};

export default useSearch;
