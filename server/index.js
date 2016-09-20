import collections from '../lib/collections';
import permissions from './permissions';
import publications from './publications';
import methods from './methods';
import configs from 'lib/configs/posts';
import privateConfigs from 'server/configs/posts';

export default {
  configs,
  privateConfigs,
  collections,
  permissions,
  publications,
  methods,
  init(context) {
    const { Collections } = context;
    if (!Collections.Packages.findOne({ name: 'posts' })) {
      Collections.Packages.insert({
        name: 'posts',
        configs: context.configs.posts || {}
      });
    }
    if (Collections.Posts.find().count() < 4) {
      Collections.Posts.insert({
        title: 'Relay: State of the State',
        category: 'cate1',
        coverUrl: 'http://odhge55gv.bkt.clouddn.com/FvY1XBtXxegqJh2fF-o0GGpksAn5',
        content: 'This month marks a year since we released Relay and we\'d like to share an update on the project and what\'s next.',
      });
      Collections.Posts.insert({
        title: 'A Year In Review',
        category: 'cate1',
        coverUrl: 'http://odhge55gv.bkt.clouddn.com/FvY1XBtXxegqJh2fF-o0GGpksAn5',
        content: 'This month marks a year since we released Relay and we\'d like to share an update on the project and what\'s next.',
      });
      Collections.Posts.insert({
        title: 'Retrospective & Roadmap',
        category: 'cate2',
        coverUrl: 'http://odhge55gv.bkt.clouddn.com/FvY1XBtXxegqJh2fF-o0GGpksAn5',
        content: 'This month marks a year since we released Relay and we\'d like to share an update on the project and what\'s next.',
      });
      Collections.Posts.insert({
        title: 'Empowering the Community',
        category: 'cate3',
        coverUrl: 'http://odhge55gv.bkt.clouddn.com/FvY1XBtXxegqJh2fF-o0GGpksAn5',
        content: 'This month marks a year since we released Relay and we\'d like to share an update on the project and what\'s next.',

      });
    }
  }
};
