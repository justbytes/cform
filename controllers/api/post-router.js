const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../util/withAuth');

router.get('/posts', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({});
    console.log(postData);
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // Pass serialized data and session flag into template
    //  res.render('userpage', {
    //    posts,
    //    logged_in: req.session.logged_in
    //  });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/post', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
