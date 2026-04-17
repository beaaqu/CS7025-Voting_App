const activityLogs = [];

function addLog(action, details = null) {
  const newLog = {
    id: activityLogs.length + 1,
    action,
    details,
    createdAt: new Date()
  };

  activityLogs.push(newLog);
  return newLog;
}

function getLogs() {
  return activityLogs;
}

module.exports = {
  addLog,
  getLogs
};
