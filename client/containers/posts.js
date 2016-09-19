import { useDeps } from 'react-simple-di';
import { compose, withHandlers, withTracker, withRedux, composeAll } from 'react-komposer-plus';

import Posts from '../components/posts';

const userEvents = {
  deletePost({ context }, id, event)  {
    event.preventDefault();
    context.Meteor.call('posts.delete', id, (err) => {
      if (err) {
        alert(err.message);
      }
    });
  }
};

const subscription = ({ context, category }, onData) => {
  const { Meteor, Collections } = context;
  if (Meteor.subscribe('posts.list', category).ready()) {
    const posts = Collections.Posts.find().fetch();
    onData(null, {
      posts: { status: 'ready', data: posts }
    });
  } else {
    onData(null, {
      posts: { status: 'pending', data: [] }
    });
  }
};

const mapStateToProps = (state) => ({
  category: state.postsCategory
});

const depsToProps = (context, actions) => ({
  context
});

export default composeAll(
  withHandlers(userEvents),
  withTracker(subscription),
  withRedux(mapStateToProps),
  useDeps(depsToProps)
)(Posts);
