import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_TASKS = gql`
  {
     allTasks {
      id 
      isDone 
      name
      note
    }
  }
`;

const GetTasks = ({ token }) => {
  return (
    <Query
      query={GET_TASKS}
      context={{ headers: { Authorization: token } }}
      pollInterval={500}
    >
      {({ error, loading, data: { allTasks } }) => {
        if (loading) {
          return <div> loading.... </div>;
        }
        if (error) {
          return <div>{error.message}</div>;
        }
        if (allTasks.length > 0) {
          return (
            <div>
              {
                allTasks.map(d => (<div>{d.name}<br /></div>))
              }
            </div>
          );
        }
        return <div>No task found</div>;
      }}
    </Query>
  );
};

export default GetTasks;
