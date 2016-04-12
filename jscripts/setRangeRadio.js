function setRangeRadio()
{
var formObj = document.getElementById("searchBasic");
var startDate = document.getElementById("fromYear").value;
var endDate = document.getElementById("toYear").value;
if ( ( startDate != "" ) || ( endDate != "" ) )
{
for ( i = 0; i < formObj.yearOption.length; i++ )
{
if ( formObj.yearOption[ i ].value == 'range' )
{
formObj.yearOption[ i ].checked = true;
}
}
}
if ( ( startDate == "" ) && ( endDate == "" ) )
{
for ( i = 0; i < formObj.yearOption.length; i++ )
{
if ( formObj.yearOption[ i ].value == 'range' )
{
formObj.yearOption[ i ].checked = false;
}
}
}
}
