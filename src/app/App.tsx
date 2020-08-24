import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/styles/theme';
import { GlobalStyle } from 'common/styles/globalStyles';
import { isLoggedInSelector } from 'common/selectors/userSelectors';
import { logout } from 'common/slices/userSlice';
import { LoginPage, DashboardPage, NotFoundPage } from 'pages';
import { Header, Layout } from 'components';
import { ROUTES } from 'common/constants';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = useSelector(isLoggedInSelector);

  const handleClickLogout = () => dispatch(logout());

  if (!isLoggedIn && location.pathname !== ROUTES.LOGIN) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header isLoggedIn={isLoggedIn} onClickLogout={handleClickLogout} />
      <Layout>
        <Switch>
          <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
          <Route exact path={ROUTES.LOGIN} component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
