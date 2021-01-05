const router = require('express').Router();
const { User, Role } = require('../../models');
const { isAdmin } = require('../../utils/auth');
const { withAuth } = require('../../utils/auth');

router.get('/', isAdmin, async (req, res) => {
  try {
    // Get all users
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Role}]
    });

    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('users', {
      users,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
      my_role: req.session.my_role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/:id', withAuth, async (req, res) => {
  try {
    // Check if current user is the id passed in or is administrator
    if ((req.params.id.toString() === req.session.user_id.toString()) || (req.session.my_role.toLowerCase() === 'administrator')) {
      // Get the user to edit
      const userData = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Role }],
      });

      const user = userData.get({ plain: true });

      // Add list of roles if user is administrator, or only user role if not administrator
      let roles;      
      if(req.session.my_role.toLowerCase() === 'administrator'){
        const roleData = await Role.findAll();        
        roles = roleData.map((role)=>role.get({plain:true}));
      }else{
        const roleData = await Role.findAll({
          where: { name: req.session.my_role}
        });
        roles = roleData.map((role)=>role.get({plain:true}));
      }

      res.render('user', {
        ...user,
        all_roles: roles,
        user_role: user.roles[0].name,
        user_id: req.session.user_id,
        logged_in: true,
        my_role: req.session.my_role
      });
    } else {
      res.status(401).json('{"error":"Permission Denied"');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
