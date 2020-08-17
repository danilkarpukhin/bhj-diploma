/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = '/user';
  

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if(localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user")).user;
  } 
}

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = (err, response) => {}
    ) {
      if(data) {
        const options = {
          data: data,
          url: `${this.url}/current`,
          method: "GET",
          callback: callback
        }
        createRequest(options);
      } 
 }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = (err, response) => {}
    ) {
      const options = {
        data: data,
        url: `${this.url}/login`,
        method: "POST",
        callback: callback
      }
      createRequest(options);
    }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = (err, response) => {}
  ) {
    const options = {
      data: data,
      url: `${this.url}/register`,
      method: "POST",
      callback: callback
    }
    createRequest(options);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = (err, response) => {}
  ) {
    const options = {
    data: data,
    url: `${this.url}/logout`,
    method: "POST",
    callback: callback
    }
  createRequest(options);  
  }
}