var db;
var dbCreated = false;

var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("EmployeeDirectoryDB", "1.0", "PhoneGap Demo", 200000);
    if (dbCreated)
    	db.transaction(getEmployees, transaction_error);
    else
    	db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getEmployees, transaction_error);
}

function getEmployees(tx) {
	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " + 
				"from employee e left join employee r on r.managerId = e.id " +
				"group by e.id order by e.lastName, e.firstName";
	tx.executeSql(sql, [], getEmployees_success);
}

function getEmployees_success(tx, results) {
	$('#busy').hide();
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var employee = results.rows.item(i);
		$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
				'<img src="pics/' + employee.picture + '" class="list-icon"/>' +
				'<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
				'<p class="line2">' + employee.title + '</p>' +
				'</a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},100);
	db = null;
}

function populateDB(tx) {
	$('#busy').show();
	tx.executeSql('DROP TABLE IF EXISTS employee');
	var sql = 
		"CREATE TABLE IF NOT EXISTS employee ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"firstName VARCHAR(50), " +
		"lastName VARCHAR(50), " +
		"title VARCHAR(50), " +
		"department VARCHAR(50), " + 
		"managerId INTEGER, " +
		"city VARCHAR(50), " +
		"officePhone VARCHAR(30), " + 
		"cellPhone VARCHAR(30), " +
		"email VARCHAR(30), " +
		"picture VARCHAR(200))";
    tx.executeSql(sql);

    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (12,'Nikhil','Agrawal',0,'Students General Secretary','Engineering','044 2257 8546','+91 9840666953','sgs@smail.iitm.ac.in','#605 Pampa','gensec.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (11,'A. Praveeen','Surendra ',0,'Hostel Affairs Secretary ','Engineering','9444005783','9444005783','has@smail.iitm.ac.in','#450, Jamuna Hostel ','has.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (10,'Raaj Rohan','Reddy P',0,'Academic Affairs Secretary','Engineering','+91 944 400 5765','+91 944 400 5765','aas@smail.iitm.ac.in','#338 Narmada','acadsec.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (9,'Ishitha','Kumar',0,'Research Affairs Secretary','Research Affairs Secretary','Not Available','NILL','ras@smail.iitm.ac.in','','ras.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (8,'Sohan','Jawale',0,'Co-curricular Affairs Secretary','Co-curricular Affairs Secretary','+91-995293-6437 ','+91-995293-6437 ','cas@smail.iitm.ac.in ','','cocas.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (7,'Snehil','Pandey (BS)',0,'Institute Sports Secretary','Institute Sports Secretary','+91-9444005774','+91-9444005774','ss@smail.iitm.ac.in','#423, Godavari','sportsec.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (5,'Ashwin','S Kalkar',0,'Cultural Affairs Secretary (Literary)','Cultural Affairs Secretary (Literary)','+91 9962266464','+91 9444005769 ','casl@smail.iitm.ac.in','#211 Narmada','cullit.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (6,'Ravi','Chandra M',0,'Cultural Affairs Secretary (Arts)','Cultural Affairs Secretary (Arts)','+91 9444 00 5768','+91 9790 82 1042','casa@smail.iitm.ac.in','#350 Jamuna','cularts.jpg')");
 /*   tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (3,'Eugene','Lee',1,'CFO','Accounting','617-000-0003','781-000-0003','elee@fakemail.com','Boston, MA','eugene_lee.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (4,'John','Williams',1,'VP of Engineering','Engineering','617-000-0004','781-000-0004','jwilliams@fakemail.com','Boston, MA','john_williams.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (2,'Julie','Taylor',1,'VP of Marketing','Marketing','617-000-0002','781-000-0002','jtaylor@fakemail.com','Boston, MA','julie_taylor.jpg')");
    tx.executeSql("INSERT INTO employee (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture) VALUES (1,'James','King',0,'President and CEO','Corporate','617-000-0001','781-000-0001','jking@fakemail.com','Boston, MA','james_king.jpg')");*/
}
