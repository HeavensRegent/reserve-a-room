module.exports = {
  isAdministrator: (roleName) => {
    if (roleName) {
      return roleName.toLowerCase() === 'administrator';
    } else {
      return false;
    }
  },
  isManager: (roleName) => {
    if(roleName) {
      return (
        roleName.toLowerCase() === 'manager' ||
        roleName.toLowerCase() === 'administrator'
      );
    } else {
      return false;
    }
  },
  isRole: (myRole, testRole)=>{
    return myRole === testRole;
  },
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    let dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    return dateStr;
  },
  is_pending: (status) => {
    return status === 'Pending Approval';
  },
};