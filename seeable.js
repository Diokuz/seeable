(function($) {
    // Возвращает true если элемент видим пользователем
    $.fn.seeable = function(params) {
        var depth = 5; // Глубина поиска элемента по родителям

        portion = params.portion || 1;
        var element = this[0];

        var offset = this.offset();
        var x0 = offset.left;
        var y0 = offset.top;
        var x1 = x0 + element.offsetWidth;
        var y1 = y0 + element.offsetHeight;

        var corners = [
            [x0, y0],
            [Math.round(x0 + (x1 - x0 - 1) * portion), y0],
            [x0, Math.round(y0 + (y1 - y0 - 1) * portion)],
            [Math.round(x0 + (x1 - x0 - 1) * portion), Math.round(y0 + (y1 - y0 - 1) * portion)]
        ];

        return !_.find(corners, function(corner) { // true - не нашёл промахов, то есть элемент полностью видим
            var efp = document.elementFromPoint(corner[0], corner[1]);

            var is;
            var i = 0;
            while (efp && !is && i < depth) {
                is = efp == element;
                efp = efp.parentNode;
                i++;
            }

            return !is;
        });
    };
})(jQuery);
