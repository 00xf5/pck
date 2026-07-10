function BVContact(form) {
  if (!form) return;

  var status = form.querySelector("[data-contact-status]");
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
      status.classList.remove("is-error");
      status.classList.add("is-success");
      status.textContent = "Thanks — you’re on the list. We’ll be in touch when matching dates open.";
    }

    form.reset();
    if (submit) submit.disabled = false;
  });
}

window.BVContact = BVContact;
