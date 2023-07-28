// import { Link } from 'react-router-dom';

const SignupButton = (props) => {
    return (
        <button
            color={props.color} // teal
            type={props.type} // submit
            className={props.styles}
            onClick={props.onClick}
        >
            {props.name}
        </button>
    );
};

export default SignupButton;
