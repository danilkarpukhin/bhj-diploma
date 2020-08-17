class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const sidebar = document.querySelector(".sidebar-mini");
    const sidebarToggleButton = document.querySelector(".sidebar-toggle");
    sidebarToggleButton.addEventListener("click", (event) => {
      
      event.preventDefault();
      sidebar.classList.toggle("sidebar-open");
      sidebar.classList.toggle("sidebar-collapse");
    })
    

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginButton = document.querySelector('.menu-item_login');
    loginButton.addEventListener('click', ()=>{
      App.getModal('login').open();
    })
 
  const registerButton = document.querySelector('.menu-item_register');
  registerButton.addEventListener('click', ()=>{
    App.getModal('register').open();
  })

  const logoutButton = document.querySelector('.menu-item_logout');
  logoutButton.addEventListener('click', ()=>{
    User.logout({}, (err, response) => { 
      if(response && response.success) {
        User.unsetCurrent();
        App.setState('init');
        TransactionsPage.lastOption = "";
      }
    })

  })
}

}