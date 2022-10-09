const router = require('express').Router();

const { students } = require('../utils/data.js');
const Student = require('../models/Student.js');

router.get('/', async (req, res) => {
  res.send(students);
});

router.get('/:id', (req, res) => {
  const student = students.find((student) => student.id === req.params.id * 1);

  if (student) return res.send(student);
  res.send({ error: 'Student was not found' });
});

router.post('/', (req, res) => {
  const newStudent = {
    id: students[students.length - 1].id + 1,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    picture: 'https://randomuser.me/api/portraits/med/men/60.jpg',
    phone: '1-463-123-4447',
    institute: {
      name: 'BlueCrest College',
      abbreviation: 'BCC',
    },
  };
  students.push(newStudent);
  res.send(students);
});

router.put('/:id', (req, res) => res.send(students));

router.delete('/:id', (req, res) => {
  const newStudents = students.filter((st) => st.id !== req.params.id * 1);
  res.send(newStudents);
});

module.exports = router;
