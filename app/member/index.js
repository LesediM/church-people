var $ = require("jquery");
var ipcRenderer = require("electron").ipcRenderer;
var mongo = require("mongodb");
var client = require("mongodb").MongoClient;
var appConfig = require("../app.json");
var grid = require("../utils/grid");

var swal = require("sweetalert2");

const collectionName = "Members";
const mainDivIdentifier = ".container";

var createInput = grid.createInput;
var createTextArea = grid.createTextArea;
var createRow = grid.createRow;
var createSelect = grid.createSelect;
var createEditDiv = grid.createEditDiv;
var createAddDiv = grid.createAddDiv;

var url = appConfig.connectionString;
var title = appConfig.title;
var employmentStatus = appConfig.employmentStatus;
var membershipStatus = appConfig.membershipStatus;
var gender = appConfig.gender;
var maritalStatus = appConfig.maritalStatus;

var createInputs = function(member) {
    var _firstName = member == null ? "" : member.firstName;
    var _title = member == null ? "" : member.title;
    var _lastName = member == null ? "" : member.lastName;
    var _gender = member == null ? "" : member.gender;
    var _maritalStatus = member == null ? "" : member.maritalStatus;
    var _dateOfBirth = member == null ? "" : member.dateOfBirth;
    var _homeNumber = member == null ? "" : member.homeNumber;
    var _cellNumber = member == null ? "" : member.cellNumber;
    var _workNumber = member == null ? "" : member.workNumber;
    var _emailAddress = member == null ? "" : member.emailAddress;
    var _employmentStatus = member == null ? "" : member.employmentStatus;
    var _membershipStatus = member == null ? "" : member.membershipStatus;
    var _address = member == null ? "" : member.address;

    var inputs = {
        left: [
            createSelect("title", title, _title),
            createInput("firstName", "First Name", _firstName, "text"),
            createInput("lastName", "Last Name", _lastName, "text"),
            createSelect("gender", gender, _gender),
            createSelect("maritalStatus", maritalStatus, _maritalStatus),
            createSelect("membershipStatus", membershipStatus, _membershipStatus),
            createSelect("employmentStatus", employmentStatus, _employmentStatus)
        ],
        right: [
            createInput("emailAddress", "Email Address", _emailAddress, "text"),
            createInput("dateOfBirth", "Date Of Birth", _dateOfBirth, "text"),
            createInput("homeNumber", "Home Number", _homeNumber, "text"),
            createInput("cellNumber", "Cell Number", _cellNumber, "text"),
            createInput("workNumber", "Work Number", _workNumber, "text"),
            createTextArea("address", "Physical Address", _address)
        ]
    };
    return inputs;
};

client.connect(url, function(err, db) {
    if (err) {
        swal("Connection Error", `Error:${err}`, "error");
        return;
    };

    var addToDb = function(member) {
        db.collection(collectionName).insertOne(member)
            .then(() => {
                swal("Details", "Member has been added to the database", "success");
                refreshGrid(db);
            })
            .catch(() => {
                swal("Oops", "Something went wrong with the system", "error");
            });
    };

    var updateInDb = function(member) {
        var id = member._id;
        db.collection(collectionName).updateOne({ _id: id }, member)
            .then(() => {
                swal("Details", "Saved", "success");
            })
            .catch(() => {
                swal("Oops", "Something went wrong with the system", "error");
            });
    };

    var deleteFromDb = function(id) {
        // swal("Member",
        //     "Are you sure you want to delete this member?",
        //     "warning").then(() => {
        db.collection(collectionName).deleteOne({ _id: id })
            .then(() => {
                refreshGrid(db);
            });
        // });
    };

    var createInputRow = function() {
        var inputs = createInputs();
        var row = createRow(inputs);
        var addDiv = createAddDiv(addToDb);
        row.append(addDiv);
        $(mainDivIdentifier).append(row);
    };

    var addMemberToGrid = function(member) {
        var id = member._id;
        var inputs = createInputs(member);
        var row = createRow(inputs);
        var editDiv = createEditDiv(id, updateInDb, deleteFromDb);
        row.append(editDiv);
        $(mainDivIdentifier).append(row);
    };

    var loadAllMembers = function(db) {
        var members = db.collection(collectionName).find({});
        members.forEach(addMemberToGrid);
    };

    var refreshGrid = (db) => {
        $(mainDivIdentifier).empty();
        createInputRow();
        loadAllMembers(db);
    };
    refreshGrid(db);
});