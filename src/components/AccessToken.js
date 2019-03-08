import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import GetTasks from './GetTasks';
import CreateTask from './CreateTask';

const GENERATE_ACCESS_TOKEN = gql`
  mutation GenerateToken($apiKey: String!, $userName: String!) {
    generateAccessToken(apiKey: $apiKey, userName: $userName)
  }
`;

const AccessToken = () => {
  let input;
  return (
    <div>
      <Mutation mutation={GENERATE_ACCESS_TOKEN}>
        {(generateAccessToken, { data, loading }) => (
          <div>
            {loading && 'loading....'}
            <div>
              { (data && data.generateAccessToken &&
              <div>
                Token Generated
                <GetTasks token={data.generateAccessToken} />
                <CreateTask token={data.generateAccessToken} />
              </div>)
              || <div>
                <input
                  ref={node => input = node}
                />
                <button
                  onClick={() => {
                    generateAccessToken({ variables: { apiKey: '414176da-5477-444e-8bb0-c32e88135fcf', userName: input.value } });
                    input.value = '';
                  }}
                >Generate Token</button>
              </div>
              }
            </div>
          </div>
        )}
      </Mutation>
    </div>
  );
};

export default AccessToken;
