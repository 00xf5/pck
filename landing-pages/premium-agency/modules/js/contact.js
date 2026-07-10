function PAContact(form) {
  if (!form) return;
  var status = form.querySelector("[data-pa-form-status]");
  var submit = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (submit) submit.disabled = true;
    if (status) {
      status.hidden = false;
      status.classList.add("is-success");
      status.textContent = "Thank you — we received your enquiry and will reply within two business days.";
    }
    form.reset();
    if (submit) submit.disabled = false;
  });
}

window.PAContact = PAContact;
