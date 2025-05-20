function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}
function createTimeInEvent(employee, dateTimeStr) {
  const [date, hour] = dateTimeStr.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date
  });
  return employee;
}
function createTimeOutEvent(employee, dateTimeStr) {
  const [date, hour] = dateTimeStr.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date
  });
  return employee;
}
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(e => e.date === date);
  const timeOut = employee.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}
function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, e) => {
    return total + wagesEarnedOnDate(employee, e.date);
  }, 0);
}
function calculatePayroll(employees) {
  return employees.reduce((total, emp) => {
    return total + allWagesFor(emp);
  }, 0);
}

