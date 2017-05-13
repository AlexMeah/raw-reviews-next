const sequelize = require('./server/src/lib/sequelize');
const faker = require('faker');
const moment = require('moment');

const i = 0;

// function inVotes() {
//     const votes = Array.from(Array(1000)).map(a => ({
//         vote: faker.random.arrayElement([1, -1]),
//         editId: faker.random.number({
//             min: 1,
//             max: 999999999999
//         })
//     }));

//     sequelize.temp
//         .bulkCreate(votes)
//         .then(() => {
//             if (++i < 99999) {
//                 inVotes();
//             } else {
//                 process.exit();
//             }
//         })
//         .catch(err => {
//             if (++i < 99999) {
//                 inVotes();
//             } else {
//                 console.error(err);
//                 process.exit();
//             }
//         });
// }

// // inVotes();
// sequelize.temp.sync();

// const users = Array.from(Array(100)).map(a => ({
//     username: faker.random.word() + Math.random(),
//     email: `${faker.random.word() + Math.random()}@${faker.random.word()}${Math.random()}.com`,
//     password: faker.random.word(),
//     validationToken: faker.random.word()
// }));

// sequelize.user.bulkCreate(users).catch(err => {
//     console.error(err);
// });

const edits = Array.from(Array(50000)).map(a => ({
    userId: 'alexmeah',
    before: faker.random.word(),
    after: faker.random.word(),
    raw: faker.random.word(),
    ups: faker.random.number({
        min: 0,
        max: 9999
    }),
    downs: faker.random.number({
        min: 0,
        max: 9999
    }),
    score: 0,
    url: faker.random.word(),
    description: faker.random.word(),
    createdAt: faker.date.past()
}));

sequelize.edit.bulkCreate(edits).catch(err => {
    console.error(err);
});

// sequelize.edit.sync();

const orders = {
    best: [[sequelize.sequelize.col('score'), 'DESC']],
    latest: [sequelize.sequelize.col('createdAt'), 'ASC']
};

const time = {
    all: {},
    day: {
        createdAt: {
            $lt: moment().endOf('day'),
            $gt: moment().startOf('day')
        }
    },
    week: {
        createdAt: {
            $lt: moment().endOf('week'),
            $gt: moment().startOf('week')
        }
    },
    month: {
        createdAt: {
            $lt: moment().endOf('month'),
            $gt: moment().startOf('month')
        }
    },
    year: {
        createdAt: {
            $lt: moment().endOf('year'),
            $gt: moment().startOf('year')
        }
    }
};

// // def ci_lower_bound(pos, n, confidence)
// //     if n == 0
// //         return 0
// //     end
// //     z = Statistics2.pnormaldist(1-(1-confidence)/2)
// //     phat = 1.0*pos/n
// //     (phat + z*z/(2*n) - z * Math.sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n)
// // end

// const z = 1.96;

// function score(votes) {
//     const pos = votes.filter(v => v.dataValues.vote === 1).length;
//     const n = votes.length;

//     if (n === 0) {
//         return 0;
//     }

//     const phat = 1.0 * pos / n;

//     return (
//         (phat +
//             z * z / (2 * n) -
//             z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) /
//         (1 + z * z / n)
//     );
// }

// function DESC(a, b) {
//     return b.score - a.score;
// }

// sequelize.edit
//     .findAll({
//         where: time.day,
//         attributes: ['id', 'before', 'after', 'url'],
//         include: [
//             {
//                 model: sequelize.vote,
//                 attributes: ['vote']
//             },
//             {
//                 model: sequelize.user,
//                 attributes: ['username']
//             }
//         ]
//     })
//     .then(results => results.map(r => r.dataValues))
//     .then(results =>
//         results.map(r =>
//             Object.assign({}, r, {
//                 ups: r.votes.filter(v => v.dataValues.vote === 1).length,
//                 downs: r.votes.filter(v => v.dataValues.vote === -1).length,
//                 score: score(r.votes),
//                 votes: r.votes.length,
//                 username: r.user.dataValues.username,
//                 user: null
//             })
//         )
//     )
//     .then(results => results.sort(DESC))
//     .then(console.log)
//     .catch(console.error);
