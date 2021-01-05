const router = require('express').Router();
const { Role, User, UserRole } = require('../../models');

// Create User
router.post('/', async (req, res) => {
  try {
    // Create User    
    const body = req.body;    
    const createUserData = await User.create(
      {...body}      
    );

    // Get the default "User" role to tie to.
    const roleData = await Role.findAll({
      where: [{name:"User"}]
    });    
    // Tie User to Role
    await UserRole.create(
      {
        roleId: roleData[0].id,
        userId: createUserData.id        
      }
    );

    // Get User with attached role
    const userData = await User.findByPk(createUserData.id,
      {
        attributes: { exclude: ['password'] },
        include: [{ model: Role }],
      }  
    );

    // Set Session & Response
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.my_role = userData.roles[0].name;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Update User
router.put('/:id', async (req, res) => {
  try {
    // Update User
    const updateId = req.params.id;
    const body = req.body;
    // Don't update password if left blank
    if (body.password === ''){
      delete body.password;
    }
    const updateUserData = await User.update(
      {...body},
      { where:[{ id: updateId}]}
    );
   
    // Update Role
    await UserRole.update(
      {
        roleId: body.role_id        
      },
      {
        where:[{user_id: updateId}]
      }
    );

    // Get User with attached new role
    const userData = await User.findByPk(updateId,
      {
        attributes: { exclude: ['password'] },
        include: [{ model: Role }]
      }  
    );

    req.session.save(() => {
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Login/Authenticate User
router.post('/login', async (req, res) => {
  try {
    // Find the user logging in and their role
    const userData = await User.findOne({
      where: { email: req.body.email },
      include: [{ model: Role}]
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.my_role = userData.roles[0].name;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
