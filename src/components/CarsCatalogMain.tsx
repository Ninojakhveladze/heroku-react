import React from 'react';
import Buttons from './Buttons';
import CarsList from './CarsList';
import Navbar from './Navbar';
import Banner from './Banner';
import Footer from './Footer';
import '../styles/style.css'
import '../styles/bootstrap.min.css'

interface MainPageState {
    inputValue: string
}

class CarsCatalogMain extends React.Component<{}, MainPageState> {

    state: MainPageState = { inputValue: '' }

    _saveInputValue = (value: string) => {
        this.setState({
            inputValue: value
        })
    }

    render() {
        return (
            <div className='main'>
                <Navbar inputValue = {this._saveInputValue} activeLink="Home" />
                <Banner />
                <CarsList inputValue={this.state.inputValue} />
                <Footer />
            </div>
        )
    }
}

export default CarsCatalogMain;