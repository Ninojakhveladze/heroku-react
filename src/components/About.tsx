import React from 'react'
import getTeamateList from '../stores/TeamateStore'
import Teamate from '../classes/Teamates'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';

interface AboutState {
	teamates: Teamate[],
}

const arr = getTeamateList();

class About extends React.Component {
	state: AboutState = { teamates: arr }

	render() {
		return (

			this.getAboutHtml());
	}

	getAboutHtml = () => {
		return (
			<div>
				<Navbar inputValue = {() => (console.log("about"))} activeLink="About"/>
				<section className="banner-area organic-breadcrumb">
					<div className="container">
						<div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
							<div className="col-first">
								<h1>About Us</h1>
								<nav className="d-flex align-items-center">
									<Link to={'/'} >Home<span className="lnr lnr-arrow-right"></span> </Link>
									<Link to={'/about'} >About </Link>
								</nav>
							</div>
						</div>
					</div>
				</section>

				<div className="whole-wrap pb-100">
					<div className="container">
						{this.state.teamates.map((teammate, i) =>
							<div key={i} className="section-top-border mt-3">
								<h3 className="mb-30">{teammate.name}</h3>
								<div className="row">
									<div className="col-md-3">
										<img width="255" height="175" src={require('../images/teammates/' + teammate.img)} alt="" className="img-fluid" />
									</div>
									<div className="col-md-9 mt-sm-20">
										<p>{teammate.description}</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<Footer />
			</div>
		)
	}

}

export default About;