/* =====================================================
   CONTACT HUB
   CRUD + SEARCH + FAVORITES + EMERGENCY
   LOCAL STORAGE + VALIDATION + SWEET ALERT
===================================================== */


/* =====================================================
   1. GLOBAL VARIABLES
===================================================== */

const STORAGE_KEY = "contactHubContacts";

let contacts =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let editingId = null;


/* =====================================================
   2. SELECT HTML ELEMENTS
===================================================== */

const addContactBtn =
    document.getElementById("addContactBtn");

const contactModal =
    document.getElementById("contactModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const contactForm =
    document.getElementById("contactForm");

const modalTitle =
    document.getElementById("modalTitle");

const saveBtnText =
    document.getElementById("saveBtnText");

const contactName =
    document.getElementById("contactName");

const contactPhone =
    document.getElementById("contactPhone");

const contactEmail =
    document.getElementById("contactEmail");

const contactAddress =
    document.getElementById("contactAddress");

const contactGroup =
    document.getElementById("contactGroup");

const contactNotes =
    document.getElementById("contactNotes");

const contactFavorite =
    document.getElementById("contactFavorite");

const contactEmergency =
    document.getElementById("contactEmergency");

const searchInput =
    document.getElementById("searchInput");

const contactsContainer =
    document.getElementById("contactsContainer");

const favoritesContainer =
    document.getElementById("favoritesContainer");

const emergencyContainer =
    document.getElementById("emergencyContainer");

const totalCount =
    document.getElementById("totalCount");

const favoriteCount =
    document.getElementById("favoriteCount");

const emergencyCount =
    document.getElementById("emergencyCount");

const contactsSubtitle =
    document.getElementById("contactsSubtitle");


/* =====================================================
   3. SAVE CONTACTS IN LOCAL STORAGE
===================================================== */

function saveContacts() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(contacts)
    );

}


/* =====================================================
   4. GET INITIALS
===================================================== */

function getInitials(name) {

    if (!name) {
        return "U";
    }

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();

}


/* =====================================================
   5. ESCAPE HTML
===================================================== */

function escapeHTML(text = "") {

    return String(text).replace(
        /[&<>"']/g,
        function (character) {

            const entities = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            };

            return entities[character];

        }
    );

}


/* =====================================================
   6. OPEN MODAL
===================================================== */

function openModal(contact = null) {

    contactModal.classList.add("show");

    document.body.style.overflow = "hidden";


    if (contact) {

        /* =========================
           EDIT MODE
        ========================= */

        editingId = contact.id;

        modalTitle.textContent =
            "Update Contact";

        saveBtnText.textContent =
            "Update Contact";


        contactName.value =
            contact.name || "";

        contactPhone.value =
            contact.phone || "";

        contactEmail.value =
            contact.email || "";

        contactAddress.value =
            contact.address || "";

        contactGroup.value =
            contact.group || "";

        contactNotes.value =
            contact.notes || "";

        contactFavorite.checked =
            contact.favorite || false;

        contactEmergency.checked =
            contact.emergency || false;

    }

    else {

        /* =========================
           ADD MODE
        ========================= */

        editingId = null;

        contactForm.reset();

        modalTitle.textContent =
            "Add New Contact";

        saveBtnText.textContent =
            "Save Contact";

    }


    clearErrors();


    setTimeout(() => {

        contactName.focus();

    }, 100);

}


/* =====================================================
   7. CLOSE MODAL
===================================================== */

function closeModal() {

    contactModal.classList.remove("show");

    document.body.style.overflow = "";

    contactForm.reset();

    editingId = null;

    clearErrors();

}


/* =====================================================
   8. ADD CONTACT BUTTON
===================================================== */

addContactBtn.addEventListener(
    "click",
    function () {

        openModal();

    }
);


/* =====================================================
   9. CLOSE MODAL BUTTON
===================================================== */

closeModalBtn.addEventListener(
    "click",
    function () {

        closeModal();

    }
);


/* =====================================================
   10. CANCEL BUTTON
===================================================== */

cancelBtn.addEventListener(
    "click",
    function () {

        closeModal();

    }
);


/* =====================================================
   11. CLICK OUTSIDE MODAL
===================================================== */

modalOverlay.addEventListener(
    "click",
    function () {

        closeModal();

    }
);


/* =====================================================
   12. ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            contactModal.classList.contains("show")
        ) {

            closeModal();

        }

    }
);


/* =====================================================
   13. CLEAR VALIDATION ERRORS
===================================================== */

function clearErrors() {

    contactName.classList.remove("invalid");

    contactPhone.classList.remove("invalid");

    contactEmail.classList.remove("invalid");


    document.getElementById("nameError")
        .textContent = "";

    document.getElementById("phoneError")
        .textContent = "";

    document.getElementById("emailError")
        .textContent = "";

}


/* =====================================================
   14. SET ERROR
===================================================== */

function setError(
    input,
    errorElement,
    message
) {

    input.classList.add("invalid");

    errorElement.textContent =
        message;

}


/* =====================================================
   15. VALIDATION
===================================================== */

function validateForm() {

    clearErrors();

    let valid = true;


    /* =========================
       NAME
    ========================= */

    const name =
        contactName.value.trim();


    if (name.length < 2) {

        setError(

            contactName,

            document.getElementById(
                "nameError"
            ),

            "Please enter a valid name."

        );

        valid = false;

    }


    /* =========================
       PHONE
    ========================= */

    const phone =
        contactPhone.value.trim();


    const phonePattern =
        /^[0-9+\-\s]{8,20}$/;


    if (
        phone === "" ||
        !phonePattern.test(phone)
    ) {

        setError(

            contactPhone,

            document.getElementById(
                "phoneError"
            ),

            "Please enter a valid phone number."

        );

        valid = false;

    }


    /* =========================
       EMAIL
    ========================= */

    const email =
        contactEmail.value.trim();


    if (email !== "") {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            setError(

                contactEmail,

                document.getElementById(
                    "emailError"
                ),

                "Please enter a valid email."

            );

            valid = false;

        }

    }


    return valid;

}


/* =====================================================
   16. GET FORM DATA
===================================================== */

function getFormData() {

    return {

        name:
            contactName.value.trim(),

        phone:
            contactPhone.value.trim(),

        email:
            contactEmail.value.trim(),

        address:
            contactAddress.value.trim(),

        group:
            contactGroup.value,

        notes:
            contactNotes.value.trim(),

        favorite:
            contactFavorite.checked,

        emergency:
            contactEmergency.checked

    };

}


/* =====================================================
   17. SUBMIT FORM
===================================================== */

contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* Validate */

        if (!validateForm()) {

            Swal.fire({

                icon: "error",

                title: "Invalid Data",

                text:
                    "Please check the highlighted fields.",

                confirmButtonColor:
                    "#6c4ce8"

            });

            return;

        }


        const formData =
            getFormData();


        /* =================================================
           UPDATE CONTACT
        ================================================= */

        if (editingId !== null) {

            const index =
                contacts.findIndex(
                    contact =>
                        contact.id === editingId
                );


            if (index !== -1) {

                contacts[index] = {

                    ...contacts[index],

                    ...formData

                };

            }


            saveContacts();

            closeModal();

            renderAll();


            Swal.fire({

                icon: "success",

                title: "Contact Updated!",

                text:
                    `${formData.name} has been updated successfully.`,

                timer: 1800,

                showConfirmButton: false

            });

        }


        /* =================================================
           ADD NEW CONTACT
        ================================================= */

        else {

            const newContact = {

                id:
                    Date.now(),

                name:
                    formData.name,

                phone:
                    formData.phone,

                email:
                    formData.email,

                address:
                    formData.address,

                group:
                    formData.group,

                notes:
                    formData.notes,

                favorite:
                    formData.favorite,

                emergency:
                    formData.emergency

            };


            contacts.unshift(
                newContact
            );


            saveContacts();

            closeModal();

            renderAll();


            Swal.fire({

                icon: "success",

                title: "Contact Added!",

                text:
                    `${formData.name} was added successfully.`,

                timer: 1800,

                showConfirmButton: false

            });

        }

    }
);


/* =====================================================
   18. CREATE CONTACT CARD
===================================================== */

function createContactCard(contact) {

    return `

        <article
            class="contact-card"
        >


            <!-- TOP -->

            <div class="contact-card-top">


                <!-- AVATAR -->

                <div class="contact-avatar">

                    ${escapeHTML(
                        getInitials(contact.name)
                    )}

                </div>


                <!-- NAME -->

                <div class="contact-name">

                    <h3>
                        ${escapeHTML(contact.name)}
                    </h3>

                    <span>
                        ${escapeHTML(
                            contact.group || "Other"
                        )}
                    </span>

                </div>


                <!-- FAVORITE -->

                <button
                    type="button"
                    class="favorite-btn
                    ${contact.favorite ? "active" : ""}"
                    data-action="favorite"
                    data-id="${contact.id}"
                >

                    <i
                        class="bi
                        ${
                            contact.favorite
                            ? "bi-star-fill"
                            : "bi-star"
                        }"
                    ></i>

                </button>


            </div>



            <!-- INFORMATION -->

            <div class="contact-details">


                <!-- PHONE -->

                <a
                    href="tel:${escapeHTML(contact.phone)}"
                >

                    <i class="bi bi-telephone-fill"></i>

                    ${escapeHTML(contact.phone)}

                </a>



                <!-- EMAIL -->

                ${
                    contact.email

                    ?

                    `

                    <a
                        href="mailto:${escapeHTML(contact.email)}"
                    >

                        <i class="bi bi-envelope-fill"></i>

                        ${escapeHTML(contact.email)}

                    </a>

                    `

                    :

                    ""

                }



                <!-- ADDRESS -->

                ${
                    contact.address

                    ?

                    `

                    <p>

                        <i class="bi bi-geo-alt-fill"></i>

                        ${escapeHTML(contact.address)}

                    </p>

                    `

                    :

                    ""

                }


            </div>



            <!-- FOOTER -->

            <div class="contact-card-footer">


                ${
                    contact.emergency

                    ?

                    `

                    <span class="emergency-label">

                        <i class="bi bi-heart-pulse-fill"></i>

                        Emergency

                    </span>

                    `

                    :

                    `<span></span>`

                }



                <div class="contact-actions">


                    <!-- CALL -->

                    <a
                        href="tel:${escapeHTML(contact.phone)}"
                        class="action-btn"
                        title="Call"
                    >

                        <i class="bi bi-telephone-fill"></i>

                    </a>



                    <!-- EMAIL -->

                    ${
                        contact.email

                        ?

                        `

                        <a
                            href="mailto:${escapeHTML(contact.email)}"
                            class="action-btn"
                            title="Email"
                        >

                            <i class="bi bi-envelope-fill"></i>

                        </a>

                        `

                        :

                        ""

                    }



                    <!-- EDIT -->

                    <button
                        type="button"
                        class="action-btn"
                        data-action="edit"
                        data-id="${contact.id}"
                        title="Edit"
                    >

                        <i class="bi bi-pencil-fill"></i>

                    </button>



                    <!-- DELETE -->

                    <button
                        type="button"
                        class="action-btn delete-btn"
                        data-action="delete"
                        data-id="${contact.id}"
                        title="Delete"
                    >

                        <i class="bi bi-trash-fill"></i>

                    </button>


                </div>


            </div>


        </article>

    `;

}


/* =====================================================
   19. RENDER CONTACTS
===================================================== */

function renderContacts() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    const filteredContacts =
        contacts.filter(
            function (contact) {

                const name =
                    contact.name
                        .toLowerCase();

                const phone =
                    contact.phone
                        .toLowerCase();

                const email =
                    (contact.email || "")
                        .toLowerCase();


                return (

                    name.includes(searchValue)

                    ||

                    phone.includes(searchValue)

                    ||

                    email.includes(searchValue)

                );

            }
        );


    if (filteredContacts.length === 0) {

        contactsContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">

                    <i class="bi bi-person-plus-fill"></i>

                </div>

                <h3>
                    No contacts found
                </h3>

                <p>
                    Add your first contact to get started.
                </p>

                <button
                    type="button"
                    class="empty-add-btn"
                    id="emptyAddBtn"
                >

                    <i class="bi bi-plus-lg"></i>

                    Add Contact

                </button>

            </div>

        `;


        const emptyAddBtn =
            document.getElementById(
                "emptyAddBtn"
            );


        emptyAddBtn.addEventListener(
            "click",
            function () {

                openModal();

            }
        );

    }

    else {

        contactsContainer.innerHTML =
            filteredContacts
                .map(createContactCard)
                .join("");

    }


    updateStats();

}


/* =====================================================
   20. RENDER FAVORITES
===================================================== */

function renderFavorites() {

    const favorites =
        contacts.filter(
            contact =>
                contact.favorite
        );


    if (favorites.length === 0) {

        favoritesContainer.innerHTML = `

            <div class="empty-side">

                <i class="bi bi-star"></i>

                <p>
                    No favorite contacts yet
                </p>

            </div>

        `;

        return;

    }


    favoritesContainer.innerHTML =
        favorites
            .map(function (contact) {

                return `

                    <div class="mini-contact">


                        <div class="mini-avatar">

                            ${escapeHTML(
                                getInitials(
                                    contact.name
                                )
                            )}

                        </div>


                        <div class="mini-info">

                            <strong>
                                ${escapeHTML(
                                    contact.name
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    contact.phone
                                )}
                            </span>

                        </div>


                        <a
                            href="tel:${escapeHTML(
                                contact.phone
                            )}"
                            class="mini-call"
                        >

                            <i class="bi bi-telephone-fill"></i>

                        </a>


                    </div>

                `;

            })
            .join("");

}


/* =====================================================
   21. RENDER EMERGENCY
===================================================== */

function renderEmergency() {

    const emergencyContacts =
        contacts.filter(
            contact =>
                contact.emergency
        );


    if (emergencyContacts.length === 0) {

        emergencyContainer.innerHTML = `

            <div class="empty-side">

                <i class="bi bi-heart-pulse"></i>

                <p>
                    No emergency contacts
                </p>

            </div>

        `;

        return;

    }


    emergencyContainer.innerHTML =
        emergencyContacts
            .map(function (contact) {

                return `

                    <div class="mini-contact">


                        <div class="mini-avatar emergency-mini">

                            ${escapeHTML(
                                getInitials(
                                    contact.name
                                )
                            )}

                        </div>


                        <div class="mini-info">

                            <strong>
                                ${escapeHTML(
                                    contact.name
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    contact.phone
                                )}
                            </span>

                        </div>


                        <a
                            href="tel:${escapeHTML(
                                contact.phone
                            )}"
                            class="mini-call emergency-call"
                        >

                            <i class="bi bi-telephone-fill"></i>

                        </a>


                    </div>

                `;

            })
            .join("");

}


/* =====================================================
   22. UPDATE STATISTICS
===================================================== */

function updateStats() {

    const favorites =
        contacts.filter(
            contact =>
                contact.favorite
        ).length;


    const emergency =
        contacts.filter(
            contact =>
                contact.emergency
        ).length;


    totalCount.textContent =
        contacts.length;


    favoriteCount.textContent =
        favorites;


    emergencyCount.textContent =
        emergency;


    contactsSubtitle.textContent =
        `Manage and organize your ${contacts.length} contacts`;

}


/* =====================================================
   23. RENDER EVERYTHING
===================================================== */

function renderAll() {

    renderContacts();

    renderFavorites();

    renderEmergency();

}


/* =====================================================
   24. CONTACT CARD ACTIONS
===================================================== */

contactsContainer.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-action]"
            );


        if (!button) {
            return;
        }


        const id =
            Number(button.dataset.id);


        const action =
            button.dataset.action;


        const contact =
            contacts.find(
                item =>
                    item.id === id
            );


        if (!contact) {
            return;
        }


        /* =========================
           FAVORITE
        ========================= */

        if (
            action === "favorite"
        ) {

            contact.favorite =
                !contact.favorite;


            saveContacts();

            renderAll();

        }


        /* =========================
           EDIT
        ========================= */

        else if (
            action === "edit"
        ) {

            openModal(contact);

        }


        /* =========================
           DELETE
        ========================= */

        else if (
            action === "delete"
        ) {

            deleteContact(id);

        }

    }
);


/* =====================================================
   25. DELETE CONTACT
===================================================== */

async function deleteContact(id) {

    const contact =
        contacts.find(
            item =>
                item.id === id
        );


    if (!contact) {
        return;
    }


    const result =
        await Swal.fire({

            icon: "warning",

            title: "Delete Contact?",

            text:
                `Are you sure you want to delete ${contact.name}?`,

            showCancelButton: true,

            confirmButtonText:
                "Yes, Delete",

            cancelButtonText:
                "Cancel",

            confirmButtonColor:
                "#e74c5b",

            cancelButtonColor:
                "#777"

        });


    if (result.isConfirmed) {

        contacts =
            contacts.filter(
                item =>
                    item.id !== id
            );


        saveContacts();

        renderAll();


        Swal.fire({

            icon: "success",

            title: "Deleted!",

            text:
                `${contact.name} has been deleted.`,

            timer: 1500,

            showConfirmButton: false

        });

    }

}


/* =====================================================
   26. SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    function () {

        renderContacts();

    }
);


/* =====================================================
   27. INITIAL RENDER
===================================================== */

renderAll();


/* =====================================================
   28. TEST MESSAGE
===================================================== */

console.log(
    "ContactHub JavaScript loaded successfully!"
);