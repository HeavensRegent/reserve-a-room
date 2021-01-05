const userFormHandler = async (event) => {
  event.preventDefault();

  // Animate button click
  animateCSS('#updateUser','bounce');
  const id = document.querySelector('#user_id').value.trim();
  const name = document.querySelector('#name-user').value.trim();
  const email = document.querySelector('#email-user').value.trim();
  const password = document.querySelector('#password-user').value.trim();
  const confirm = document.querySelector('#password-confirm').value.trim();

  if(password !== confirm){
    alert('Passwords do not match.');
  } else if (name && email && password && confirm) {
    const response = await fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/users/${id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.user-form')
  .addEventListener('submit', userFormHandler);
