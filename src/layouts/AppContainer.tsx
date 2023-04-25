import { ChangeEvent, ReactNode } from 'react';
import { useAppTheme } from 'context/AppThemeProvider';
import { useAuth } from 'context/AuthProvider';

interface Props {
  children: ReactNode;
}

function AppContainer({ children }: Props) {
  const { themeMode, changeTheme } = useAppTheme();
  const { isAuthenticated, logout } = useAuth();

  function handleThemeChange(e: ChangeEvent<HTMLInputElement>) {
    changeTheme(e.target.checked ? 'dark' : 'light');
  }

  return (
    <div css="padding: 32px 64px;">
      <header
        css={`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: column;
          `}
        >
          {isAuthenticated ? (
            <button css="margin-bottom: 1rem;" onClick={logout}>
              Logout
            </button>
          ) : null}
          <div
            css={`
              display: flex;
              align-items: center;
            `}
          >
            <input
              id="darkMode"
              type="checkbox"
              onChange={handleThemeChange}
              checked={themeMode === 'dark'}
            />
            <label
              htmlFor="darkMode"
              css={`
                font-size: 1.25rem;
                margin-left: 0.25rem;
              `}
            >
              Dark
            </label>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export default AppContainer;
