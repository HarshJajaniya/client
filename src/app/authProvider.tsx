"use client";

import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, TextField, PasswordField } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// 🔐 Amplify config
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ?? "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID ?? "",
    },
  },
});

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <Authenticator
      loginMechanisms={["email"]}
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                {/* Email */}
                <TextField
                  name="email"
                  label="Email"
                  placeholder="Enter your email address"
                  required
                />

                {/* Password */}
                <PasswordField
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  required
                />

                {/* Confirm Password */}
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
      {({ user }) => (user ? <>{children}</> : <></>)}
    </Authenticator>
  );
};

export default AuthProvider;
