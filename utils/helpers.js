module.exports = {
  isAdministrator: (roleName)=>{
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
  isRole: (myRole, testRole)=>{
    return myRole === testRole;
  }
};