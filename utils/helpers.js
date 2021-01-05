module.exports = {
  isAdministrator: (roleName)=>{
    console.log('Role Name');
    console.log(roleName);
    if(roleName){
      return roleName.toLowerCase() === 'administrator';
    }else{
      return false;
    }
  },
  isManager: (roleName)=>{
    return ((roleName.toLowerCase() === 'manager')||
      (roleName.toLowerCase() === 'administrator'));
  },
  isRole: (checkRole, myRole)=>{
    return checkRole === myRole;
  }
};