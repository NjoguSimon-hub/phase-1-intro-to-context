// Constants
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// 1. Create a single employee record
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

// 2. Create multiple employee records
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

// 3. Create a TimeIn event
function createTimeInEvent(employee, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10)
  });
  return employee;
}

// 4. Create a TimeOut event
function createTimeOutEvent(employee, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10)
  });
  return employee;
}

// 5. Calculate hours worked on a given date
function hoursWorkedOnDate(employee, date) {
  const inEvent = employee.timeInEvents.find(e => e.date === date);
  const outEvent = employee.timeOutEvents.find(e => e.date === date);
  return (outEvent.hour - inEvent.hour) / 100;
}

// 6. Calculate wages earned on a given date
function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// 7. Total wages for all dates for one employee
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, e) => {
    return total + wagesEarnedOnDate(employee, e.date);
  }, 0);
}

// 8. Total payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, emp) => {
    return total + allWagesFor(emp);
  }, 0);
}

// -----------------------------------------------------------------------------
// Helper: Mocks the server response for async features
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

