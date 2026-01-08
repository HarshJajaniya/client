"use client";

import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, TextField, PasswordField } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

let amplifyConfigured = false;

if (!amplifyConfigured) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? "",
        userPoolClientId:
          process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID ?? "",
      },
    },
  });
  amplifyConfigured = true;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <Authenticator
      loginMechanisms={["email"]}
      signUpAttributes={["email"]}
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                <TextField
                  name="email"
                  label="Email"
                  placeholder="Enter your email address"
                  required
                />
                <PasswordField
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  required
                />
                <PasswordField
                  name="confirm_password"
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  required
                />
              </>
            );
          },
        },
      }}
    >
      {() => <>{children}</>}
    </Authenticator>
  );
};

export default AuthProvider;
