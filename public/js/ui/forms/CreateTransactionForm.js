/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {  
    if(User.current()) {
     Account.list(User.current(), (err, response) => {
        if(response && response.success) {
         const accountsList = response.data;
         const selectBody = this.element.querySelector(".accounts-select");
          selectBody.innerHTML = "";
          for(let account of accountsList) {
            selectBody.insertAdjacentHTML('beforeend', `<option value="${account.id}">${account.name}</option>`);
          }
        }
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, (err, response) => {
      if(response && response.success) {
        this.element.reset();
        App.update();
        if(this.element.id === "new-income-form") {
          App.getModal('newIncome').close();
        } else {
          App.getModal('newExpense').close();
        }
 
      } else {
        alert(`Ошибка создания транзакции`);
      }
      })
  }
}