import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { CACHE } from "./utils/Constants";
import { getGifs } from "./utils/Api";

export const GiphyshContext = createContext();

export const useGiphyshContext = () => useContext(GiphyshContext);

export const GiphyshProvider = ({ children }) => {
  const firstLoad = useRef(true);
  const searchRef = useRef(null);

  const [state, setState] = useState({
    data: [],
    loading: false,
    search: CACHE.getItem("gf_lastSearch") || "",
    lastSearch: {},
  });

  const handleStateChange = useCallback((payload) => {
    setState((state) => ({ ...state, ...payload }));
  }, []);

  const handleSearch = useCallback(
    (query, offset) => {
      handleStateChange({ loading: true });
      getGifs({ query, offset })
        .then((response) => {
          let newData;
          if (response.data.pagination.total_count === 0) {
            newData = [];
          } else if (searchRef.current !== query) {
            CACHE.setItem("gf_lastSearch", query || "");
            newData = response.data.data;
            searchRef.current = query;
          } else {
            CACHE.setItem("gf_lastSearch", query || "");
            newData = [...state.data, ...response.data.data];
          }

          handleStateChange({ lastSearch: response.data, data: newData });
        })
        .catch((error) => console.log(error))
        .finally(() => {
          handleStateChange({ loading: false });
        });
    },
    [handleStateChange, state.data]
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
      value={{ state, setState: handleStateChange, handleSearch }}
    >
      {children}
    </GiphyshContext.Provider>
  );
};
