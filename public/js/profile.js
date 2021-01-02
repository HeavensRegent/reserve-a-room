const profileFormHandler = async (event) => {
  event.preventDefault();

  // Animate button click
  animateCSS('#updateProfile','bounce');

  const name = document.querySelector('#name-profile').value.trim();
  const email = document.querySelector('#email-profile').value.trim();
  const password = document.querySelector('#password-profile').value.trim();
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
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.profile-form')
  .addEventListener('submit', profileFormHandler);
