"use strict";
const faker = require("faker");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Groups",
			[
				{
					name: "Japanese Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2017/06/14/05/12/japan-2401099__340.jpg",
				},
				{
					name: "French Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2016/01/19/16/57/cheese-1149471__340.jpg",
				},
				{
					name: "Chinese Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2017/05/26/13/59/dim-sum-2346105__340.jpg",
				},
				{
					name: "Italian Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2018/04/18/16/49/food-3330889__340.jpg",
				},
				{
					name: "Mexican Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2019/07/21/01/36/tacos-al-pastor-4351813__340.jpg",
				},
				{
					name: "Modernist Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2019/06/18/10/46/platting-4282024__340.jpg",
				},
				{
					name: "Spanish Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2016/01/29/14/06/paella-1168008__340.jpg",
				},
				{
					name: "Private Japanese Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2017/06/14/05/12/japan-2401099__340.jpg",
				},
				{
					name: "Private French Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2016/01/19/16/57/cheese-1149471__340.jpg",
				},
				{
					name: "Private Chinese Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2017/05/26/13/59/dim-sum-2346105__340.jpg",
				},
				{
					name: "Private Italian Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2018/04/18/16/49/food-3330889__340.jpg",
				},
				{
					name: "Private Mexican Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2019/07/21/01/36/tacos-al-pastor-4351813__340.jpg",
				},
				{
					name: "Private Modernist Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2019/06/18/10/46/platting-4282024__340.jpg",
				},
				{
					name: "Private Spanish Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2016/01/29/14/06/paella-1168008__340.jpg",
				},
				{
					name: "Experimental Japanese Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2017/06/14/05/12/japan-2401099__340.jpg",
				},
				{
					name: "Experimental French Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2016/01/19/16/57/cheese-1149471__340.jpg",
				},
				{
					name: "Experimental Chinese Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2017/05/26/13/59/dim-sum-2346105__340.jpg",
				},
				{
					name: "Experimental Italian Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2018/04/18/16/49/food-3330889__340.jpg",
				},
				{
					name: "Experimental Mexican Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2019/07/21/01/36/tacos-al-pastor-4351813__340.jpg",
				},
				{
					name: "Experimental Modernist Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2019/06/18/10/46/platting-4282024__340.jpg",
				},
				{
					name: "Experimental Spanish Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: "https://cdn.pixabay.com/photo/2016/01/29/14/06/paella-1168008__340.jpg",
				},
				{
					name: "Private Experimental Japanese Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2017/06/14/05/12/japan-2401099__340.jpg",
				},
				{
					name: "Private Experimental French Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2016/01/19/16/57/cheese-1149471__340.jpg",
				},
				{
					name: "Private Experimental Chinese Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2017/05/26/13/59/dim-sum-2346105__340.jpg",
				},
				{
					name: "Private Experimental Italian Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2018/04/18/16/49/food-3330889__340.jpg",
				},
				{
					name: "Private Experimental Mexican Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2019/07/21/01/36/tacos-al-pastor-4351813__340.jpg",
				},
				{
					name: "Private Experimental Modernist Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2019/06/18/10/46/platting-4282024__340.jpg",
				},
				{
					name: "Private Experimental Spanish Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: false,
					imgURL: "https://cdn.pixabay.com/photo/2016/01/29/14/06/paella-1168008__340.jpg",
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */ return queryInterface.bulkDelete(
			"Groups",
			null,
			{}
		);
	},
};
