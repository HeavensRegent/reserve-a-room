const getFormData = (formID) => {
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
};
const handleSearchFilter = async (event) => {
  if (!event || !event.target) {
    return;
  }
  event.preventDefault();

  let formData = getFormData(event.target.id);
  let filterData = Object.entries(formData).map(([key, value]) => ({
    id: key,
    value: value === 'on' ? true : value === 'off' ? false : value
  }));
  console.log('===========[ handleSearchFilter ] ===================');
  const defaultQueryParams = {
    limit: '1000',
    orderby: 'id',
    order: 'ASC'
  };
  let postData = {
    queryParams: defaultQueryParams,
    filterData
  };

  const rawResponse = await fetch('/api/rooms/filter', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const rooms = await rawResponse.json();
  $('.resultCard').addClass('d-none');
  for (room of rooms){
    $('#'+room.id+'_room').removeClass('d-none');
  }

  return;
};

document
  .querySelector('#searchForm')
  .addEventListener('submit', handleSearchFilter);
