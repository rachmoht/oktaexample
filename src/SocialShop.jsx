/* eslint-disable */ 
import { useOktaAuth } from '@okta/okta-react';
import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Image, Button, Header } from 'semantic-ui-react';
import products from './secret-products.json';
import './App.css';

const SocialShop = () => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {

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
    <div id="store">
      <div>
        <Header as="h1">Shhh...</Header>
        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p className="welcome">
            Welcome, &nbsp;
            {userInfo.name}, to the <b>super secret bowling social influencer shop</b>!
          </p>
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <p>If you already have an account use the button below to login</p>
          <Button id="login-button" primary onClick={login}>Login</Button>
        </div>
        )}
      </div>
      <div className="container store-container">
        {products.map((product) => {
          return (
            <div key={product.id} >
              <h3>{ product.title }</h3>
              <Image size="small" src={`${process.env.PUBLIC_URL}/shirts/${ product.image }`} />
              <p>{ product.description }</p>
              <p>${ product.price }</p>
              <p>
              <button>Add to Cart</button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SocialShop;
