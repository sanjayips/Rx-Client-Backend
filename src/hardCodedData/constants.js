
module.exports = {
	selectUsersData: {
		user_name: 1,
		email: 1,
		profile_picture_url: 1,
		online: 1
	},
	platforms: [ 'facebook', 'google', 'email', 'apple'],
	roles: [ 'subscriber', 'superadmin', 'jobapplicant', 'hr', 'interviewer', 'itsales', 'botonist', 'marketing', 'businessdevelopment', 'doctor', 'lawyer', 'chemist', 'pharmacist', 'vendor', 'agriculturescientist', 'customersupport', 'customer', 'individualtasker', 'companytasker'],
	allRolesPermitted: ['_ss', '_a', '_ja', '_hr', '_intrvr', 'itsl', '_btnst', '_mrkt', '_bsndev', '_doc', '_lwr', '_chmst', '_phrmst', '_vndr', '_agr', '_cstsprt', '_cst', '_indvtskr', '_cmpntskr']
}