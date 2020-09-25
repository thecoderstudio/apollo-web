import React from 'react';
import axios from 'axios';
import NotFound from '../pages/NotFound';
import { handleHTTPResponse } from '../actions/error';
import { parseSnakeCaseObj } from '../util/parser';

function withNetworkBoundResource(WrappedComponent, getFromCache, getEndpoint, updateCache) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      const { match: { params } } = this.props;
      this.sync = this.sync.bind(this);
      this.state = {
        loading: true,
        data: getFromCache(this.props.localData, params)
      }
      this.sync(params);
    }

    sync(params) {
      axios.get(
        getEndpoint(params),
        { withCredentials: true }
      )
      .then(res => {
        updateCache(res.data);
      })
      .catch(error => {
        handleHTTPResponse(error.response);
      });
    }

    componentDidUpdate(prevProps) {
      console.log(this.props.localData);
      if (prevProps.localData !== this.props.localData) {
        this.updateFromCache();
      }
    }

    updateFromCache() {
      const { match: { params } } = this.props;
      this.setState({
        data: getFromCache(this.props.localData, params)
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
