const users = [
  { id: 1, name: 'Alex Rivera', email: 'alex@example.com' },
  { id: 2, name: 'Jordan Lee', email: 'jordan@example.com' }
];

const tasks = [
  { id: 1, title: 'Draft sprint plan', status: 'open', assigneeId: 1 },
  { id: 2, title: 'Update onboarding docs', status: 'in_progress', assigneeId: 2 }
];

let nextUserId = 3;
let nextTaskId = 3;

const getNextUserId = () => {
  const value = nextUserId;
  nextUserId += 1;
  return value;
};

const getNextTaskId = () => {
  const value = nextTaskId;
  nextTaskId += 1;
  return value;
};

module.exports = {
  users,
  tasks,
  getNextUserId,
  getNextTaskId
};
