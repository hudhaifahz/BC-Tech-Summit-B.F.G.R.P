window.puppetURL = 'http://192.168.1.11:8080';

/** Gets code from server and returns the value of the button
 * @param
 * @returns {*}
 */
function getCode() {
    $.ajax({
        url: window.puppetURL + "/" + sessionStorage.getItem("token") + "/token/generate",
        success: function (result) {
            $("#codearea").html(result);
        },
        error: function () {
          $("#codearea").html("Failure");
        }
    });
}

/** Deals with the forms on the login page
 *  sends form input value to server to validate
 *  @param ()
 *  @return {*}
 */
$(document).ready(function () {
    $("#codeform").submit(function (e) {
        var text = $('input#code').val();
        $.ajax({
            url: window.puppetURL + "/token/validate/" + text,
            success: function (result) {
              // content back, was admin code and this is the new code
              if (result !== '') {
                sessionStorage.setItem("token", text);
                window.location.href = 'codegen.html';
              }
              // valid - empty result, but not a HTTP error
              else if (result !== text) {
                sessionStorage.setItem("token", text);
                window.location.href = 'selection.html';
              } else {
                $("#codeerror").html("Invalid Code");
              }
            },
            error: function () {
                $("#codeerror").html("Invalid Code");
            }
        });
        e.preventDefault();
    });
});

// snap to 0; slow down first if > 10 speed
function snapBack(slider) {
    var returnVal  = slider.defaultValue;
    var currentVal = slider.value;

    if (returnVal != currentVal) {
        intReturnVal  = parseInt(returnVal);
        intCurrentVal = parseInt(currentVal);

        while(Math.abs(intCurrentVal - intReturnVal) >= 10) {
            if(intCurrentVal > 0) {
              intCurrentVal = intCurrentVal - 10;
            }
            else if(intCurrentVal < 0) {
              intCurrentVal = intCurrentVal + 10;
            }

            slider.value = intCurrentVal.toString();
            sendVal(slider);
        }

        slider.value = returnVal;
        sendVal(slider);
    }
}

/** Saves the value of a slider as a url
 *  @param slider
 */
function sendVal(slider) {
    var controller = slider.getAttribute('id'), speed = slider.value, token = sessionStorage.getItem("token");
    $.ajax({
        url: window.puppetURL + "/" + token + "/" + controller + "/" + speed,
        success: function (result) {
        },
        error: function () {
            window.location.href = 'ThankYou.html'
        }
    })
}
