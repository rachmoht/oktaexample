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

import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Header, Icon } from 'semantic-ui-react';

const SocialShop = () => {
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

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }
  console.log(userInfo.groups);
  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="drivers license" />
          {' '}
          My User Profile (ID Token Claims) - 
          {userInfo.groups}
          {' '}
        </Header>
        {(userInfo.groups.includes('SocialMedia'))
        && <div>This is the SocialMedia shop.</div>}

        {!(userInfo.groups.includes('SocialMedia')) && (
          <p>
            This is not SocialMedia shop.
          </p>
        )}
      </div>
    </div>
  );
};

export default SocialShop;
