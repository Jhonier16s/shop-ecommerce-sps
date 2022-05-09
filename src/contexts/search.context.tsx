import React, { useMemo } from "react";

type State = typeof initialState;

const initialState = {
  searchResultCount: 0
}

type Action =
  | {
  type: "UPDATE_SEARCH_RESULT_COUNT",
  payload: number
}

export const SearchContext = React.createContext<State | any>(initialState);

SearchContext.displayName = "SearchContext";


const searchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_SEARCH_RESULT_COUNT": {
      return {
        ...state,
        searchResultCount: action.payload
      }
    }
  }
}

export const SearchProvider: React.FC = (props) => {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);

  const updateSearchResultCount = (payload: number) => {
    dispatch({ type: "UPDATE_SEARCH_RESULT_COUNT", payload })
  }

  const value = useMemo(
    () => ({
      ...state,
      updateSearchResultCount
    }),
    [state]
  );

  return <SearchContext.Provider value={value} {...props} />;
}

export const useSearch = () => {
  const context = React.useContext(SearchContext);

  if (context === undefined) {
    throw new Error(`useSearch must be used within a SearchProvider`)
  }

  return context;
}
