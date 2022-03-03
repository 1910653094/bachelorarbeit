import './Input.css';

export const TextArea = props => {
    const {
        title,
        placeholder,
        value,
        onChange,
        errorMessage,
        maxWidth = 320,
    } = props;
    return (
        <div className='custom-input' style={{ maxWidth: maxWidth }} {...props}>
            {
                title &&
                <div className='input-title'>
                    { title }
                </div>
            }
            <textarea
                {...props}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {
                errorMessage &&
                <div className='error'>
                    { errorMessage }
                </div>
            }
        </div>
    );
};
