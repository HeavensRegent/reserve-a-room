module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return '<span for="img" aria-label="lightbulb">💡</span>';
    } else if (randomNum > 0.4) {
      return '<span for="img" aria-label="laptop">💻</span>';
    } else {
      return '<span for="img" aria-label="gear">⚙️</span>';
    }
  },
  getFormData: (formID) => {
    let formArray = $('#' + formID).serializeArray();
    let formData = {}; // NOTE: {} creates and object and [] creates an Array.

    for (var i in formArray) {
      var KEY = '';
      var VALUE = '';

      for (var key in formArray[i]) {
        if (key === 'name') {
          KEY = formArray[i][key];
        } else if (key === 'value') {
          VALUE = formArray[i][key];
        }
      }
      formData[KEY] = VALUE.trim();
      if (formData[KEY] === '') {
        delete formData[KEY]; // prevent empty entries into database
      }
    }

    return formData;
  }
};
