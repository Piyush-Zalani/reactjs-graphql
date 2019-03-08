import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $isDone: Boolean!, $note: String) {
    createTask(name: $name, isDone: $isDone, note: $note) {
      id
      name
      isDone
      note
    }
  }
`;

class CreateTask extends Component {

  onSubmit = (e, createTask) => {
    e.preventDefault();
    const { target } = e;
    const schema = {};
    Object.keys(target).map((content) => {
      if (target[content].type === 'checkbox') {
        schema[target[content].name] = target[content].checked;
        return schema;
      }
      if (target[content].name) {
        schema[target[content].name] = target[content].value;
        return schema;
      }
      return schema;
    });
    createTask({ variables: { ...schema } });
  };

  render() {
    const { token } = this.props;
    return (
      <div>
        <Mutation mutation={CREATE_TASK} context={{ headers: { Authorization: token } }}>
          {(createTask, { data, loading }) => (
            <div>
              {loading && 'loading....'}
              <form
                onSubmit={e => this.onSubmit(e, createTask)}
              >
                <div>
                  <input
                    name="name"
                  />
                  <input
                    name="note"
                  />
                  <input
                    type="checkbox"
                    name="isDone"
                  />
                  <button type="submit">Create Task</button>
                </div>
              </form>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateTask;
