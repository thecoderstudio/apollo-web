import React from 'react';
import NotFound from '../pages/NotFound';

function withNetworkBoundResource(WrappedComponent, getLocalData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        data: getLocalData()
      }
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
