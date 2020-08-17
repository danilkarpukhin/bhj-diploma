/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {

    User.login(options, (response) => {
        this.element.reset();//При успешной регистрации сбрасывает формe
        
        App.getModal( 'login' ).close();
        
        App.setState('user-logged');
        
    });
  }
}