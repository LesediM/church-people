var $ = require("jquery");
var ObjectID = require("mongodb").ObjectID;
const rootOfRowSelector = ".row";

var getBootStrapColumnClass = function(size) {
    return `col-sm-${size} col-md-${size} col-lg-${size} col-xl-${size}`;
};

var fullWidthColumn = getBootStrapColumnClass(12);
var overAllColumnClassName = getBootStrapColumnClass(4);

var addClassWithDefault = (className) => {
    return `${className} full-width`;
};

var createInput = function(name, placeholder, value, type) {
    var input = $("<input></input>");
    input.attr("name", name);
    input.attr("class", addClassWithDefault(name));
    input.attr("placeholder", placeholder);
    input.attr("type", type);
    input.attr("value", value);
    return input;
};

var createTextArea = function(name, placeholder, value) {
    var textArea = $("<textArea></textArea>");
    textArea.attr("name", name);
    textArea.attr("class", addClassWithDefault(name));
    textArea.attr("placeholder", placeholder);
    textArea.text(value);
    return textArea;
};

var createSelect = function(name, items, selectedValue) {
    var select = $("<select></select>");
    select.attr("name", name);
    select.attr("class", addClassWithDefault(name));
    items.forEach((item) => {
        var option = $(`<option>${item}</option>`);
        option.attr("value", item);
        select.append(option);
    });
    select.val(selectedValue);
    return select;
};

var getRowCellValue = function(row, selector) {
    return row.find(selector).first().val();
};

var createButton = function(caption, onclick, saveToDbFunction) {
    var button = $("<button></button>");
    button.attr("type", "button");
    button.text(caption);
    button.click(() => {
        var row = button.parents(rootOfRowSelector).first();
        onclick(row, saveToDbFunction);
    });
    return button;
};

var save = function(row, saveToDbFunction) {
    var member = getMemberModel(row, false);
    saveToDbFunction(member);
};

var createAddButton = function(saveToDbFunction) {
    var caption = "add";
    var button = createButton(caption, save, saveToDbFunction);
    return button;
};

var createAddDiv = function(addToDbFunction) {
    var addButton = createAddButton(addToDbFunction);
    var addDiv = createDiv(overAllColumnClassName);
    addDiv.append(addButton);
    return addDiv;
};

var update = function(row, saveFunction) {
    var member = getMemberModel(row, true);
    saveFunction(member);
};

var createSaveButton = function(saveFunction) {
    var caption = "save";
    var button = createButton(caption, update, saveFunction);
    return button;
};

var remove = function(row, deleteFunction) {
    var id = new ObjectID(
        getRowCellValue(row, ".id")
    );
    deleteFunction(id);
};

var createDeleteButton = function(deleteFunction) {
    var caption = "delete";
    var button = createButton(caption, remove, deleteFunction);
    return button;
};

var createDiv = function(className) {
    var div = $("<div></div>");
    div.attr("class", className);
    return div;
};

var createEditDiv = function(id, updateFunction, deleteFunction) {
    var idInput = createInput("id", "", id, "hidden");
    var saveButton = createSaveButton(updateFunction);
    var deleteButton = createDeleteButton(deleteFunction);
    var EditDiv = createDiv(overAllColumnClassName);
    EditDiv.append(saveButton);
    EditDiv.append(deleteButton);
    EditDiv.append(idInput);
    return EditDiv;
};

var createRow = function(inputs) {
    var row = createDiv("row");
    var leftPart = createDiv(overAllColumnClassName);
    inputs.left.forEach((item) => {
        var div = createDiv(fullWidthColumn);
        div.append(item);
        leftPart.append(div);
    });
    row.append(leftPart);

    var rightPart = createDiv(overAllColumnClassName);
    inputs.right.forEach((item) => {
        var div = createDiv(fullWidthColumn);
        div.append(item);
        rightPart.append(div);
    });
    row.append(rightPart);
    return row;
};

var getMemberModel = function(row, includeId) {
    var member = {
        title: getRowCellValue(row, ".title"),
        firstName: getRowCellValue(row, ".firstName"),
        lastName: getRowCellValue(row, ".lastName"),
        gender: getRowCellValue(row, ".gender"),
        maritalStatus: getRowCellValue(row, ".maritalStatus"),
        dateOfBirth: getRowCellValue(row, ".dateOfBirth"),
        homeNumber: getRowCellValue(row, ".homeNumber"),
        cellNumber: getRowCellValue(row, ".cellNumber"),
        workNumber: getRowCellValue(row, ".workNumber"),
        emailAddress: getRowCellValue(row, ".emailAddress"),
        employmentStatus: getRowCellValue(row, ".employmentStatus"),
        membershipStatus: getRowCellValue(row, ".membershipStatus"),
        address: getRowCellValue(row, ".address")
    };
    if (includeId) {
        var id = getRowCellValue(row, ".id");
        member._id = new ObjectID(id);
    }
    return member;
};

module.exports = {
    createInput,
    createTextArea,
    createRow,
    createSelect,
    createEditDiv,
    createAddDiv
};