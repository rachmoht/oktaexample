/*
 * Copyright (c) 2018-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';

const Home = () => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    history.push('/login');
  };

  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div id="home">
      <div>
        <Header as="h1">PKCE Flow w/ Custom Login Page</Header>

        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p id="welcome">
            Welcome, &nbsp;
            {userInfo.name}
            !
          </p>
          <p>
            Welcome to Holy Shirts!!
            {' '}
            <a href="/profile">My Profile</a>
            {' '}
            page to take a look inside the ID token.
          </p>
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <p>If you&lsquo;re viewing this page then you have successfully started this React application.</p>
          <p>
            <span>This example shows you how to use the </span>
            <a href="https://github.com/okta/okta-react/tree/master">Okta React Library</a>
            <span> to add the </span>
            <a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a>
            <span> to your application.</span>
          </p>
          <p>
            When you click the login button below, you will be presented the login page on the Okta Sign-In Widget hosted within the application.
            After you authenticate, you will be logged in to this application with an ID token and access token. These tokens will be stored in local storage and can be retrieved at a later time.
          </p>
          <Button id="login-button" primary onClick={login}>Login</Button>
        </div>
        )}

      </div>
    </div>
  );
};
export default Home;