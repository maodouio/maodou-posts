import { browserHistory } from 'react-router';

export default {
  /**** User Actions ****/
  changeCategory(context, event, category) {
    return (dispatch) => {
      event.preventDefault();
      dispatch({ type: 'CHANGE_POSTS_CATEGORY', category })
    }
  },

  /**** Admin Actions ****/
  addPost({ Meteor, swal }, event, coverUrl) {
    return () => {
      event.preventDefault();
      const category = event.target.category.value;
      const title = event.target.title.value;
      const content = $('#editor').summernote('code');
      if (!coverUrl) {
        return alert('need cover image');
      }
      Meteor.call('posts.add', category, coverUrl, title, content, (err) => {
        if (err) {
          swal({
            title: '发布失败',
            text: err.message,
            type: 'error'
          });
        } else {
          swal({
            title: '发布成功',
            type: 'success',
            onClose() {
              browserHistory.push('/admin/posts/list');
            }
          });
        }
      });
    }
  },
  addCover(context, url) {
    return { type: 'ADD_POST_COVER', url };
  },
  deletePost({ Meteor }, post, id) {
    return ()=> {
      event.preventDefault();
      Meteor.call('post.delete', id, (err) => {
        if (err) {
          swal({
            title: '删除失败',
            text: err.message,
            type: 'error'
          });
        }
      });
    }
  },
  changeImgPosition({ Meteor, swal }, event) {
    return () => {
      Meteor.call('posts.imgPosition', event.target.value, (err) => {
        if (err) {
          swal({
            title: '保存失败',
            text: err.message,
            type: 'error'
          });
        } else {
          swal({
            title: '保存成功',
            type: 'success'
          });
        }
      });
    };
  },
  changeTabsPosition({ Meteor, swal }, event) {
    return (dispatch) => {
      Meteor.call('posts.categories.tabsPosition', event.target.value, (err) => {
        if (err) {
          swal({
            title: '保存失败',
            text: err.message,
            type: 'error'
          });
        } else {
          swal({
            title: '保存成功',
            type: 'success'
          });
        }
      });
    };
  },
  changeTabsColor({ Meteor, swal }, event) {
    return (dispatch) => {
      Meteor.call('posts.categories.color', event.target.value, (err) => {
        if (err) {
          swal({
            title: '修改失败',
            text: err.message,
            type: 'error'
          });
        } else {
          swal({
            title: '修改成功',
            type: 'success'
          });
        }
      });
    };
  },
  addCategory({ Meteor }, event) {
    event.preventDefault();
    const category = event.target.category.value;
    Meteor.call('posts.categories.add', category, (err) => {
      if (err) {
        alert(err.message);
      }
    });
  },
  deleteCategory({ Meteor }, event, category) {
    event.preventDefault();
    Meteor.call('posts.categories.delete', category, (err) => {
      if (err) {
        alert(err.message);
      }
    });
  }
};
