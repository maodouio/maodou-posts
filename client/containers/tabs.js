import { useDeps } from 'react-simple-di';
import { compose, withHandlers, withTracker, withRedux, composeAll } from 'react-komposer-plus';

import Tabs from '../components/tabs';

const userEvents = {
  changeCate({ context, changeCategory }, event, category)  {
    event.preventDefault();
    context.dispatch(changeCategory(category))
  }
};

const subscription = ({ context }, onData) => {
  const { Meteor, Collections } = context;
  if (Meteor.subscribe('posts.configs.user').ready()) {
    const configs = Collections.Packages.findOne({ name: 'posts' }).configs;
    onData(null, {
      configs
    });
  } else {
    onData(null, {});
  }
};

const depsToProps = (context, actions) => ({
  context,
  changeCategory: actions.posts.changeCategory
});

export default composeAll(
  withHandlers(userEvents),
  withTracker(subscription),
  useDeps(depsToProps)
)(Tabs);
