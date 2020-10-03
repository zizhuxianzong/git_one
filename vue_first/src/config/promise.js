class myPromise {
    //构造器
    constructor(args_func) {
        //传入的参数必须是一个函数
        /* 
          1.初始化的状态,以及初始化的值
          state--pending(等待) fulfilled (成功)rejected(失败)
          value--成功的值
          reason--失败的值
         */
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        //成功是存放的数组
        this.onFulfilledCallBacks = [];
        //失败时存放的数组
        this.onRejectedCallBacks = [];
        //成功的
        let resolve = value => {
            //调用成功状态的方法的时候改变 状态 
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                //把值存储起来
                this.value = value;
                // 一旦resolve执行，调用成功数组的函数
                this.onFulfilledCallBacks.forEach(fn => fn());
            }
        };
        //失败的
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                //把值存储起来
                this.reason = reason;
                // 一旦reject执行，调用失败数组的函数
                this.onRejectedCallBacks.forEach(fn => fn());
            }
        };
        //立即执行

        try {
            args_func(resolve, reject);
        } catch (err) {
            //调用失败,直接走失败方法中 
            reject(err)
        }

    }
    //then 方法接两个参数,一个是成功时候执行的,一个是失败的时候执行
    then(onFulfilled, onRejected) {
        //解决链式调用--返回一个新的promise参数还是上个promise的参数
        let promise2 = new myPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                let x = onFulfilled(this.value);
                // resolvePromise函数，处理自己return的promise和默认的promise2的关系
                resolvePromise(promise2, x, resolve, reject);
            }

            if (this.state === 'rejected') {
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
            }

            // 当状态state为pending时
            if (this.state === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                })
                this.onRejectedCallbacks.push(() => {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }           
        })
        /* 返回promise完成链式调用 */
        return promise2;
    }
}
let data = new myPromise(function (resolve) {
    setTimeout({
        //      resolve(2)
    })
})