/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Элемент не найден");
    }
   
    this.element = element;
    this.registerEvents();
  
}

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const elmClose = this.element.querySelectorAll('[data-dismiss="modal"]');
    for(let elm of elmClose) {
      elm.addEventListener("click", (event) => {
        event.preventDefault();
        this.onClose();
      })
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    this.close();
  }

  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    const elmClose = this.element.querySelectorAll('[data-dismiss="modal"]');
    for(let elm of elmClose) {
      elm.removeEventListener("click", (event) => {
        event.preventDefault();
        this.onClose();
      })
    }
  }

  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = "block";
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    
    this.element.style.display = "";

  }
}