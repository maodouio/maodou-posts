import { useDeps } from 'react-simple-di';
import { compose, withHandlers, withTracker, withRedux, composeAll } from 'react-komposer-plus';

import PostsCategories from '../../components/admin/postsCategories';

const userEvents = {
  addCategory({ context }, event)  {
    event.preventDefault();
    const category = event.target.category.value;
    context.Meteor.call('posts.categories.add', category, (err) => {
      if (err) {
        alert(err.message);
      }
    });
  },
  deleteCategory({ context }, category, event)  {
    event.preventDefault();
    context.Meteor.call('posts.categories.delete', category, (err) => {
      if (err) {
        alert(err.message);
      }
    });
  },
  changeTabsPosition({ context }, event) {
    context.Meteor.call('posts.categories.position', event.target.value, (err, res) => {
      if (err) {
        swal({
          title: "保存失败",
          text: err.message,
          type: "error"
        });
      } else {
        swal({
          title: "保存成功",
          type: "success"
        });
      }
    });
  },
  changeTabsColor({ context }, event) {
    const { swal, Meteor } =context;
    Meteor.call('posts.categories.color', event.target.value, (err) => {
      if (err) {
        swal({
          title: "修改失败",
          text: err.message,
          type: "error"
        });
      } else {
        swal({
          title: "修改成功",
          type: "success"
        });
      }
    });
  }
};

const data = ({ context }, onData) => {
  const { Collections } = context;
  const pkg = Collections.Packages.findOne({ name: 'posts' }) || {};
  const configs = pkg.configs || { UI: '' };
  onData(null, {
    categories: configs.categories || [],
    position: configs.UI.categoriesPosition || '',
    tabsColor: configs.UI.categoriesTabsColor || 'green'
  });
};

const depsToProps = (context, actions) => ({
  context
});

export default composeAll(
  withHandlers(userEvents),
  withTracker(data),
  useDeps(depsToProps)
)(PostsCategories);
