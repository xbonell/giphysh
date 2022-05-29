import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { CACHE, LAST_SEARCH_KEY } from "../utils/Constants";
import { getGifs } from "../utils/Api";

export const GiphyshContext = createContext();

export const useGiphyshContext = () => useContext(GiphyshContext);

export const GiphyshProvider = ({ children }) => {
  const firstLoad = useRef(true);
  const searchRef = useRef(null);

  const [state, setState] = useState({
    data: [],
    loading: false,
    search: CACHE.getItem(LAST_SEARCH_KEY) || "",
    lastSearch: {},
  });

  const handleChange = useCallback((payload) => {
    setState((state) => ({ ...state, ...payload }));
  }, []);

  const handleSearch = useCallback(
    (query, offset) => {
      handleChange({ loading: true });
      getGifs({ query, offset })
        .then((response) => {
          let newData;
          if (response.data.pagination.total_count === 0) {
            newData = [];
          } else if (searchRef.current !== query) {
            CACHE.setItem(LAST_SEARCH_KEY, query || "");
            newData = response.data.data;
            searchRef.current = query;
          } else {
            CACHE.setItem(LAST_SEARCH_KEY, query || "");
            newData = [...state.data, ...response.data.data];
          }

          handleChange({ lastSearch: response.data, data: newData });
        })
        .catch((error) => console.log(error))
        .finally(() => {
          handleChange({ loading: false });
        });
    },
    [handleChange, state.data]
  );

  useEffect(() => {
    if (firstLoad.current) {
      handleSearch(state.search);
      searchRef.current = state.search;
      firstLoad.current = false;
    }
  }, [handleSearch, state.search]);

  return (
    <GiphyshContext.Provider
      value={{ state, setState: handleChange, handleSearch }}
    >
      {children}
    </GiphyshContext.Provider>
  );
};
