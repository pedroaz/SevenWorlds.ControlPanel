
var connUrl = "https://localhost:44328/signalr";
var hubProxy = null;

function main() {
    $(function () {
        console.log("Setting up Control Panel")
        setup();
    })
}

function setup() {
    $.connection.hub.url = connUrl;
    hubProxy = $.connection.MainHub;
    
    $.connection.hub.start().done(function () {
        console.log("Connection is ok!");
        refresh();
        setInterval(refresh, 3000);
        //hubProxy.client.OnPing = function (data) {
            
        //}
    });
}

function startServer() {
    console.log("Starting server");
    hubProxy.server.adminStartGameServer(getServerIdFromHtml()).done(function () {
        
    });
}

function getServerIdFromHtml() {
    var value = document.getElementById("server_id_input").value;
    return value;
}

function resetServer() {
    console.log("Reseting server START");
    hubProxy.server.resetUniverseFakeData().done(function () {
        console.log("Reseting server FINISHED");
    });
}

function getUniverseSync() {

    hubProxy.server.requestUniverseSync().done(function (universeData) {

        var tableRef = document.getElementById('universe_data_table').getElementsByTagName('tbody')[0];

        for (var i = tableRef.rows.length - 1; i >= 0; i--) {
            tableRef.deleteRow(i);
        }

        var rowhtml = `
                <tr>
                    <th scope="row">1</th>
                    <td>${universeData.Universe.Id}</td>
                    <td>${universeData.Universe.Name}</td>
                </tr>
                `
        var newRow = tableRef.insertRow(tableRef.rows.length);
        newRow.innerHTML = rowhtml;
    });
}

function getWorldSync() {

    hubProxy.server.requestAllWorlds().done(function (worldsData) {

        var tableRef = document.getElementById('world_data_table').getElementsByTagName('tbody')[0];

        for (var i = tableRef.rows.length - 1; i >= 0; i--) {
            tableRef.deleteRow(i);
        }

        for (var i = 0; i < worldsData.length; i++) {
            var data = worldsData[i];
            var rowhtml = `
                <tr>
                    <th scope="row">${i}</th>
                        <td>${data.Id}</td>
                        <td>${data.Name}</td>
                        <td>${data.WorldIndex}</td>
                        <td>${data.UniverseId}</td>
                    </tr>
                    `
            var newRow = tableRef.insertRow(tableRef.rows.length);
            newRow.innerHTML = rowhtml;
        }
    });

    $(document).ready(function () {
        $('#world_data_table').DataTable();
        $('.dataTables_length').addClass('bs-select');
    });
}

function getCharacterSync() {

    hubProxy.server.requestAllWorlds().done(function (worldsData) {

        var tableRef = document.getElementById('world_data_table').getElementsByTagName('tbody')[0];

        for (var i = tableRef.rows.length - 1; i >= 0; i--) {
            tableRef.deleteRow(i);
        }

        for (var i = 0; i < worldsData.length; i++) {
            var data = worldsData[i];
            var rowhtml = `
                <tr>
                    <th scope="row">${i}</th>
                        <td>${data.Id}</td>
                        <td>${data.Name}</td>
                        <td>${data.WorldIndex}</td>
                        <td>${data.UniverseId}</td>
                    </tr>
                    `
            var newRow = tableRef.insertRow(tableRef.rows.length);
            newRow.innerHTML = rowhtml;
        }
    });

    $(document).ready(function () {
        $('#world_data_table').DataTable();
        $('.dataTables_length').addClass('bs-select');
    });
}


function getAreaSync() {

    hubProxy.server.requestAllAreas().done(function (areasData) {

        var tableRef = document.getElementById('areas_data_table').getElementsByTagName('tbody')[0];

        for (var i = tableRef.rows.length - 1; i >= 0; i--) {
            tableRef.deleteRow(i);
        }

        for (var i = 0; i < areasData.length; i++) {
            var data = areasData[i];
            var rowhtml = `
                <tr>
                    <th scope="row">${i}</th>
                        <td>${data.Id}</td>
                        <td>${data.Name}</td>
                        <td>${data.WorldId}</td>
                    </tr>
                    `
            var newRow = tableRef.insertRow(tableRef.rows.length);
            newRow.innerHTML = rowhtml;
        }
    });
}

function getSectionSync() {

    hubProxy.server.requestAllSections().done(function (sectionData) {

        var tableRef = document.getElementById('sections_data_table').getElementsByTagName('tbody')[0];

        for (var i = tableRef.rows.length - 1; i >= 0; i--) {
            tableRef.deleteRow(i);
        }

        for (var i = 0; i < sectionData.length; i++) {
            var data = sectionData[i];
            var rowhtml = `
                <tr>
                    <th scope="row">${i}</th>
                        <td>${data.Id}</td>
                        <td>${data.Name}</td>
                        <td>${data.AreaId}</td>
                    </tr>
                    `
            var newRow = tableRef.insertRow(tableRef.rows.length);
            newRow.innerHTML = rowhtml;
        }
    });
}

function refresh() {

    var connectionStatus = document.getElementById('server_status');

    if (hubProxy == null) {
        connectionStatus.innerHTML = "Hub Connection: Offline";
        return;
    }

    connectionStatus.innerHTML = "Hub Connection: Online :)";

    // console.log("Refreshing");
    getUniverseSync();
    getWorldSync();
    getAreaSync();
    getSectionSync();
    hubProxy.server.requestPing().done(function (value) {
        // console.log("Value: " + value);
    });

    
}



main()

