class Promise {
     _value = null;
     _isRejected = false;
     _fullFilled = false;
     _handlers = [];
     _errorHandlers = [];
     _error = null;

     constructor(callback) {
          callback(this._resolve.bind(this), this._reject.bind(this))
     }

     _resolve(value) {
          this._value = value;
          this._fullFilled = true;
          this._handlers.forEach(handler => handler(value));
     }

     _reject(error) {
          this._isRejected = true;
          this._error = error;
          this._errorHandlers.forEach(errorHandler => errorHandler(error));
     }

     _errorHandler(resolve, reject, callback){
          const runErrorHandler = () => {
               let error;
               let returnedFromCatchCallback;
               try{
                    returnedFromCatchCallback = callback(this._error);
               }catch(_error){
                    error = _error;
                    reject(error);
               }
               resolve(returnedFromCatchCallback);
          };

          if(this._isRejected){
               runErrorHandler(this._error);
          }

          this._errorHandlers.push(runErrorHandler);
     }

     then(handler, errorHandler) {
          return new Promise((resolve, reject) => {
               const runHandler = (value) => {
                    try{
                         resolve(handler(value));
                    }catch(error){
                         reject(error);
                    }
               };

               this._handlers.push(runHandler);

               if(this._fullFilled) {
                    runHandler(this._value);
               }

               this._errorHandler(resolve, reject, errorHandler);
          })
     }

}

function doSomething() {
     return new Promise((resolve, reject) => {
          console.log("Готово.");
          // Успех в половине случаев.
          setTimeout( () => {
               if (Math.random() > .5) {
                    resolve("Успех")
               } else {
                    reject("Ошибка")
               }
          }, 2000)
     })
}

const promise = doSomething();
promise.then(res => console.log(res), err => console.log(err));