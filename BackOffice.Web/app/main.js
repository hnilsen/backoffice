/* Author:

 */

$(function() {
    var template = _.template($('#invoices-template').html());
    console.log("DOM lastet");
    $.ajax({
        url : 'http://139.117.56.95/backofficeservice/InvoiceService.svc/Invoices',
        dataType : "json",
        error : function(errorThrown) {
            console.log(errorThrown);
        },
        success : function(response) {
            console.log(response + " " + response.Data.length);
            for(var i = 0; i < response.Data.length; i++) {
                item = response.Data[i];
                $("#invoices tbody").append(template({
                    CreatedByPersonId : response.Data[i].CreatedByPersonId
                }));
            }
        }
    });
});

