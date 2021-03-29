var row;
var ss = SpreadsheetApp.getActive();
var sheet = ss.getSheetByName("Foglio1");
function doGet() {
    return HtmlService.createHtmlOutputFromFile('Index').setSandboxMode(HtmlService.SandboxMode.IFRAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function createTimeDrivenTriggers() {
   ScriptApp.newTrigger("clearRecord")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .create(); 
}
function clearRecord(){
  sheet.getRange(2,4,sheet.getLastRow(),2).clear();
}
function getResult(){
  
  var d = new Date();
  var  hour = d.getHours();
  var min = d.getMinutes();
  var dividedMin = Math.floor(min/15);
  Logger.log(hour)
  Logger.log(min)
  Logger.log(dividedMin)
  var time = n(hour) + ":" + n(min)
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayName = days[d.getDay()];
var data = [];
if(d.getDay() != 0){
  row = 2 + (d.getDay()-1)*96 + hour*4 + dividedMin
// var data = sheet.getRange(row,1,1,3).getValues();
data.push(sheet.getRange(row,1).getValues())
data.push(time)
data.push(sheet.getRange(row,3).getValues())
data.push(row)
}
else{
  row = sheet.getLastRow()-96 + hour*4 + dividedMin;
  // var data = sheet.getRange(row,1,1,3).getValues();
  data.push(sheet.getRange(row,1).getValues())
data.push(time)
data.push(sheet.getRange(row,3).getValues())
data.push(row)
}
Logger.log(row)
Logger.log(data);
return data
}
function setResult(r){
  Logger.log(r);
sheet.getRange(r,4).setValue("x");
}
function setValue(r){
sheet.getRange(r,5).setValue("x");
}
function n(n){
    return n > 9 ? "" + n: "0" + n;
}
