import './footer.styles.scss';

const Footer = () => {
    return (
        <div>
            <h1 className="heading-title ">Music artist search made easy</h1>
            <p className="heading-subtitle">Find your favourite artist with Get Spot!</p>
            <ul>
                <li className='app-feature'>
                    Search for music artist by full name, first name, or last name
                </li>
                <li className='app-feature'>
                    Determine their popularity ranking and total amount of followers
                </li>
                <li className='app-feature'>
                    Music genre based on artist search
                </li>
                <li className='app-feature'>
                    Play preview clips from their top tracks!
                </li>
            </ul>
        </div>
    )
}

export default Footer;