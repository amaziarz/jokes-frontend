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
const JOKE_LIST_PARAMS_RESET = 'JOKE_LIST_PARAMS_RESET';

interface AppState {
  jokeListParams: UseJokesParams;
}

type AppActions =
  | {
      type: typeof JOKE_LIST_PARAMS_SET;
      payload: Partial<UseJokesParams>;
    }
  | {
      type: typeof JOKE_LIST_PARAMS_RESET;
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

export const resetJokeListParams = (dispatch: AppDispatch) =>
  dispatch({ type: JOKE_LIST_PARAMS_RESET });

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
  if (action.type === JOKE_LIST_PARAMS_RESET) {
    return initialState;
  }
  return state;
}

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
