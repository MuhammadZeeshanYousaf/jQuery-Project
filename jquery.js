//Following jQuery code to load after html page is ready
$(function(){
    // create Datatable
    const countryTable = $("#countryTable").DataTable();
    //onlclick of button
    $("#ipSendBtn").click(function(){

        //Get IP address
        const ip = $("input[name='ipAddress']").val();
        //validate ip address
        if(!validateIP(ip)){
            $("#errorMessage").text("Invalid IP Address!");
            return
        }else{
            $("#errorMessage").text("");
        }
        //create url to send GET request
        const url = "http://api.ipstack.com/" + ip + "?access_key=bb9f3cd5b7354870e08d9353e59a334b";

        $.get(url, function(responseData, responseStatus){
            //show  data in data table
            if(responseStatus == "success"){
                showData(responseData.ip, responseData.country_name, responseData.country_code, countryTable);
            }
        });
    });

    //table row selection on click
    $("#countryTable tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            countryTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    
    //Delete button action
    $('#deleteBtn').click(function () {
        countryTable.row('.selected').remove().draw(false);
    });
});

//return boolean value
function validateIP(ipAdd){
    const ipValidate = 
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    
    //Validation    
    return ipValidate.test(ipAdd)
}

function showData(IP, countryName, countryCode, table){
    table.row.add([
        IP, countryName, countryCode
    ]).draw();
}