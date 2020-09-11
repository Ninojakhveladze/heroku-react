import Teamate from '../classes/Teamates'

function getTeamateList() {
	const teamate1 = new Teamate("ბექა", "React developer", "description", "beqa.jpg");
	const teamate2 = new Teamate("ნემო", "React Giveup", "description", "nemo.jpg");
	const teamate3 = new Teamate("საბა", "React developer", "description", "saba.jpg");
	const teamate4 = new Teamate("ნინო", "Project manager", "description", "nino.jpg");

	return [teamate1, teamate2, teamate3, teamate4];
}

export default getTeamateList;