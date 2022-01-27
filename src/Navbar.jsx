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
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Image, Menu } from 'semantic-ui-react';

const Navbar = ({ setCorsErrorModalOpen }) => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();

  const isCorsError = (err) => (err.name === 'AuthApiError' && !err.errorCode && err.xhr.message === 'Failed to fetch');

  const login = async () => history.push('/login');

  const logout = async () => {
    const basename = window.location.origin + history.createHref({ pathname: '/' });
    try {
      await oktaAuth.signOut({ postLogoutRedirectUri: basename });
    } catch (err) {
      if (isCorsError(err)) {
        setCorsErrorModalOpen(true);
      } else {
        throw err;
      }
    }
  };

  if (!authState) {
    return null; 
  }
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Link to="/">
              <Image size="mini" src={`${process.env.PUBLIC_URL}/newlogo.png`} />
            &nbsp;
            </Link>
          </Menu.Item>
          <Menu.Item id="store-button">
            <Link to="/store">Store</Link>
          </Menu.Item>
          {authState.isAuthenticated && authState.idToken.claims.groups.includes('SocialMedia') && (
          <Menu.Item id="social-button">
            <Link to="/socialshop">SocialShop</Link>
          </Menu.Item>
          )}
          {authState.isAuthenticated && (
            <Menu.Item id="profile-button">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
          )}
          {authState.isAuthenticated && (
            <Menu.Item id="logout-button" onClick={logout}>Logout</Menu.Item>
          )}
          {!authState.isPending && !authState.isAuthenticated && (
            <Menu.Item onClick={login}>Login</Menu.Item>
          )}
        </Container>
      </Menu>
    </div>
  );
};
export default Navbar;
