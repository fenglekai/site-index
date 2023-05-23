((function() {
    var callbacks: any[] = [],
        timeLimit = 50,
        open = false;
    setInterval(loop, 1);
    return {
        addListener: function(fn: Function) {
            callbacks.push(fn);
        },
        cancelListener: function(fn: Function) {
            callbacks = callbacks.filter(function(v) {
                return v !== fn;
            });
        }
    }
    function loop() {
        var startTime = new Date().getTime();
        if (import.meta.env.PROD) {
            debugger;
        }
        if (new Date().getTime() - startTime > timeLimit) {
            if (!open) {
                callbacks.forEach(function(fn) {
                    fn.call(null);
                });
            }
            open = true;
            window.stop();
            alert('不要扒我了');
            window.location.reload();
        } else {
            open = false;
        }
    }
})()).addListener(function() {
    window.location.reload();
});