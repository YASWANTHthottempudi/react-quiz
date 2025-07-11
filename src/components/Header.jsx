import Imglogo from '../assets/quiz-logo.png';

export default function Header(){
    return (
        <header>
            <img src={Imglogo} alt="React Quiz Logo" className="logo" />
            <h1>React Quiz</h1>
        </header>
    )
}