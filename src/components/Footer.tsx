import React, { SyntheticEvent } from "react";

class Footer extends React.Component {
    render() {
        return this.getFooterHtml();
    }

    getFooterHtml = () => {
        return (
            <footer className="footer-area mt-5">
                <div className="container">
                    <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
                        <p className="footer-text">
                            Copyright &copy; All rights reserved | This website is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="#" target="_blank">React Project Team</a>
                        </p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;