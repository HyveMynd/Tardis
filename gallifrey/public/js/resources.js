/**
 * Created by Andres Monroy (HyveMynd) on 9/22/14.
 */
var toastrOptions = {
    "closeButton": false,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

angular.module('gallifrey').value('Toastr', toastr);
angular.module('gallifrey').
    factory('ToasterService', ['Toastr', function (Toastr) {
        return {
            notify: function (msg) {
                Toastr.options = toastrOptions;
                Toastr.success(msg);
            },
            error: function (msg) {
                Toastr.error(msg);
            }
        }
    }])