/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не найден");
    }
  
    this.element = element; 
    this.registerEvents();
  }
  
    static lastOption = "";
  
    update() {
      if(TransactionsPage.lastOption) {
        this.render(TransactionsPage.lastOption);
      } 
    }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {

    this.element.addEventListener("click", (evt) => {
     const target = evt.target;
     const button = target.closest("button");
     if(button && button.classList.contains("transaction__remove")) {
       const id = button.dataset.id;
       this.removeTransaction(id);
     } else if(button && button.classList.contains("remove-account")) {
       this.removeAccount();
     }
   })
 }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if(!this.lastOption) {
      return;
    }
    const removeAccountConfirm = confirm("Вы действительно хотите удалить текущий счет?");
    if(!removeAccountConfirm) {
      return;
    }
    Account.remove(this.lastOption.account_id, {}, (err, response) => {
      if(response && response.success) {
         this.clear();  
         App.update();
       } else {
         alert(err);
       }
     })
}

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    const removeTransactionConfirm = confirm("Вы действительно хотите удалить эту транзакцию?");
    if(removeTransactionConfirm) {
      Transaction.remove(id, {}, (err, response) => {
       if(response && response.success) {
        App.update();
        }
      })
    } 
  }


  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    TransactionsPage.lastOption = options;
    Account.get(options.account_id, User.current(), (err, response)=>{
      this.renderTitle(response.data.name);
    })
    
    Transaction.list(options, (err, response) => {
      const transactionsArray = Array.from(response.data);
      this.renderTransactions(transactionsArray);
    })

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    Transaction.list(this.lastOption, (err, response) => {
      const transactionsArray = Array.from(response.data);
      for(let transaction of transactionsArray) {
        Transaction.remove(this.lastOption.id);
      }
    })
    
    this.renderTitle("Название счета");
    this.renderTransactions([]);
  }
  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    const accountTitle = this.element.querySelector(".content-title");
    accountTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    const dateParsed = new Date(Date.parse(date));
    const formattedDate = `${dateParsed.getDate()} ${getMonthName(dateParsed.getMonth())} ${dateParsed.getFullYear()} г. в 
    ${twoDigits(dateParsed.getHours())}:${twoDigits(dateParsed.getMinutes())}`;

    function getMonthName(monthNumber) {
      const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября",
                      "октября", "ноября", "декабря"];
      return months[monthNumber];
    }

    function twoDigits(digit) {
      if (digit < 10) {
      return `0${digit}`
      } else {
        return digit;
      }
    }

    return formattedDate;
  

  }


  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    return `
      <div class="transaction transaction_${item.type.toLowerCase()} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        ${item.sum}<span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
  </div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const transactionsList = this.element.querySelector(".content");
    transactionsList.textContent = "";
    for(let item of data) {
      transactionsList.insertAdjacentHTML("beforeend", this.getTransactionHTML(item));
    }
  }
}