import React from 'react';
import axios from 'axios';
import NotFound from '../pages/NotFound';
import { handleHTTPResponse } from '../actions/error';
import { parseSnakeCaseObj } from '../util/parser';

function withNetworkBoundResource(WrappedComponent, getLocalData, getEndpoint, action) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      const { match: { params } } = this.props;
      this.sync = this.sync.bind(this);
      this.state = {
        loading: true,
        data: getLocalData(this.props.localData, params)
      }
      this.sync();
    }

    sync() {
      const { match: { params } } = this.props;
      axios.get(
        getEndpoint(params),
        { withCredentials: true }
      )
      .then(res => {
        this.setState({
          data: parseSnakeCaseObj(res.data)
        });
      })
      .catch(error => {
        handleHTTPResponse(error.response);
      });
    }

    render() {
      const notFound = !this.state.loading && this.state.data === null;
      if (notFound) {
        return <NotFound />
      }

      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  }
}

export default withNetworkBoundResource;
