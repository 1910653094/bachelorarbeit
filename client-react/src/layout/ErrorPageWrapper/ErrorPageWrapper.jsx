import './ErrorPageWrapper.css';

export const ErrorPageWrapper = ({ children }) => {
    return (
        <div className='err-page-wrapper'>
            <div className='content'>{children}</div>
        </div>
    );
};
