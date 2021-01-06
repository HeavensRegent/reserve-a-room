const saveLocationHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#locationId').value.trim();
  const name = document.querySelector('#name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const address = document.querySelector('#address').value.trim();
  //Managed by should only be set when it is created
  const managedBy = document.querySelector('#managedBy').value.trim();

  if (name && description && address) {
    const response = await fetch('/api/locations/' + id || '', {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify({
        name,
        description,
        address,
        id,
        managedBy: id ? null : managedBy
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/user/locations');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.location-form')
  .addEventListener('submit', saveLocationHandler);
