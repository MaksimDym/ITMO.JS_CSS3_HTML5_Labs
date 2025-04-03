document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const addButton = document.getElementById('addButton');
    const contactList = document.getElementById('contactList');

    loadContacts();

    addButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name && phone) {
            addContact(name, phone);
            nameInput.value = '';
            phoneInput.value = '';
        } else {
            alert('Пожалуйста, заполните оба поля.');
        }
    });

    function addContact(name, phone) {
        const contacts = getContacts();
        contacts.push({ name, phone });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
    }

    function loadContacts() {
        const contacts = getContacts();
        contactList.innerHTML = '';
        
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');
            li.textContent = ${contact.name}: ${contact.phone};
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.onclick = () => {
                deleteContact(index);
            };
            li.appendChild(deleteButton);
            contactList.appendChild(li);
        });
    }

    function getContacts() {
        const contactsJSON = localStorage.getItem('contacts');
        return contactsJSON ? JSON.parse(contactsJSON) : [];
    }

    function deleteContact(index) {
        const contacts = getContacts();
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
    }
});