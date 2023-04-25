import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { UseJokesParams } from 'services/jokesApi';
import { initialLimit } from 'pages/Jokes/Pagination';

const JOKE_LIST_PARAMS_SET = 'JOKE_LIST_PARAMS_SET';

interface AppState {
  jokeListParams: UseJokesParams;
}

type AppActions = {
  type: typeof JOKE_LIST_PARAMS_SET;
  payload: Partial<UseJokesParams>;
};

type AppDispatch = Dispatch<AppActions>;

type AppStateContextValue = [state: AppState, dispatch: AppDispatch];

const AppStateContext = createContext<AppStateContextValue | undefined>(
  undefined,
);

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}

export const setJokeListParams = (
  dispatch: AppDispatch,
  params: Partial<UseJokesParams>,
) => dispatch({ type: JOKE_LIST_PARAMS_SET, payload: params });

function appReducer(state: AppState, action: AppActions): AppState {
  if (action.type === JOKE_LIST_PARAMS_SET) {
    return {
      ...state,
      jokeListParams: {
        ...state.jokeListParams,
        ...action.payload,
      },
    };
  }
  return state;
}

const initialState: AppState = {
  jokeListParams: {
    page: 1,
    limit: initialLimit,
    sort: undefined,
    order: undefined,
    filters: {
      Views: '',
      CreatedAt: '',
    },
  },
};

interface Props {
  children: ReactNode;
}

function AppStateProvider({ children }: Props) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo<AppStateContextValue>(() => [state, dispatch], [state]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export default AppStateProvider;
