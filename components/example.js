//Форма профиля
const editForm = new PopupWithForm ({
    popupSelector: '.popup__form-info_type_edit',
    handleFormSubmit: (formData) => {

    }

});
const editFormElement = editForm.generateForm();

const editFormRenderer = new Section({
    items: []
}, '.popup__container_type_form');

editFormRenderer.addItem(editFormElement); 







// инициализация формы

const addFormRenderer = new Section({
    items: [],
}, '.popup__container_type_form');

const addFormElement = addForm.generateForm();

addFormRenderer.addItem(addFormElement); 


const addCardForm = new PopupWithForm ({
    handleFormSubmit: (formData) => {
        const newPicCard = new Card({
            name: formData.name, 
            link: formData.link}, 
            () => {popupImage.open(formData.name, formData.link)});
            const newPicCardElement = newPicCard.generateCard();
            cardsList.prepend(newPicCardElement)

    },
},
    '.popup_type_pic',
    );

    addCardForm.setEventListeners();

     //Открытие формы

    document.querySelector('.profile__add-button').addEventListener("click", function () {
        addCardForm.open();
        addFormValidation.disableSubmit(saveButton);

    });
    


