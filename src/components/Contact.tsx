import React, {SyntheticEvent} from 'react'
import emailjs from 'emailjs-com'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';

interface ContactState {
	name : string | undefined,
	email : string,
	subject : string | undefined,
	desc : string | undefined,
}

class Contact extends React.Component {
	state : ContactState = {name : "", email : "", subject : "", desc : ""};

	private _setName = (event : SyntheticEvent) =>{
		let nameInput = (event.target as HTMLInputElement).value;

		this.setState({
			name : nameInput,
		});
	}

	private _setEmail = (event : SyntheticEvent) =>{
		let emailInput = (event.target as HTMLInputElement).value;

		this.setState({
			email : emailInput,
		});
	}

	private _setSubject = (event : SyntheticEvent) =>{
		let subjectInput = (event.target as HTMLInputElement).value;

		this.setState({
			subject : subjectInput,
		});
	}

	private _setDesc = (event : SyntheticEvent) =>{
		let descInput = (event.target as HTMLInputElement).value;

		this.setState({
			desc : descInput,
		});
	}

	private _emailRegex(email : string){
		let emailRegex = /([a-zA-Z]{3,}[0-9]{0,4})(@gmail.com){1}/;
		let isEmailValid = emailRegex.test(email);

		return isEmailValid;
	}

	private _sendInfoToMail = () => {
		let name = this.state.name;
		let email = this.state.email;
		let subject = this.state.subject;
		let desc = this.state.desc;

		let isEmailValid = this._emailRegex(email);

		if(isEmailValid){
			console.log("Email is valid :)");
			if(name !== "" && subject !== "" && desc !== ""){
				console.log("Mail sent!");
				const templateId = 'gmail';

				emailjs.send(
			  		'gmail',
			  		'template_y755u1s',
			  		{message: desc, from_name: name, reply_to: email},
			  		'user_Q1G9lOs4Q6Y6nQBPOzODt'
			  	).then(res => {
			    	console.log('Email successfully sent!')
			  	})
			  	// Handle errors here however you like, or use a React error boundary
			  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err));
			}else{
				console.log("Input fields are empty :(");
			}
		}else{
			console.log("Email is not valid!");
		}
	}

	render() {
		return (
			<div>
				<Navbar inputValue = {() => (console.log("about"))} activeLink="Contact"/>
				<section className="banner-area organic-breadcrumb">
					<div className="container">
						<div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
							<div className="col-first">
								<h1>Contact Us</h1>
								<nav className="d-flex align-items-center">
									<Link to={'/'} >Home<span className="lnr lnr-arrow-right"></span> </Link>
									<Link to={'/contact'} >Contact </Link>
								</nav>
							</div>
						</div>
					</div>
				</section>
				<section className="contact_area section_gap_bottom">
					<div className="container">
						<div className="row">
							<div className="col-lg-3">
								<div className="contact_info mt-5">
									<div className="info_item">
										<i className="lnr lnr-home"></i>
										<h6>Georgia, Tbilisi</h6>
										<p>Alexidze street 16</p>
									</div>
									<div className="info_item">
										<i className="lnr lnr-phone-handset"></i>
										<h6><a href="#">(995) 599-999-999</a></h6>
										<p>Mon to Fri 9am to 6 pm</p>
									</div>
									<div className="info_item">
										<i className="lnr lnr-envelope"></i>
										<h6><a href="#">antiGiveup@giveup.com</a></h6>
										<p>Send us your query anytime!</p>
									</div>
								</div>
							</div>
							<div className="col-lg-9">
								<form className="row contact_form mt-5" id="contactForm">
									<div className="col-md-6">
										<div className="form-group">
											<input type="text" className="form-control" id="name" onInput={(e)=>this._setName(e)} name="name" placeholder="Enter your name" />
										</div>
										<div className="form-group">
											<input type="email" className="form-control" id="email" onInput={(e)=>this._setEmail(e)} name="email" placeholder="Email address" />
										</div>
										<div className="form-group">
											<input type="text" className="form-control" id="subject" onInput={(e)=>this._setSubject(e)} name="subject" placeholder="Subject" />
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<textarea className="form-control" name="message" onInput={(e)=>this._setDesc(e)} id="message" placeholder="Message..." ></textarea>
										</div>
									</div>
									<div className="col-md-12 text-right">
										<button onClick={this._sendInfoToMail} type="button" value="submit" className="primary-btn">Send Message</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>

				<Footer />
			</div>
		)
	}
}

export default Contact;