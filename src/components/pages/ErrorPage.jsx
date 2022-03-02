import React from 'react';

const errorMessages = {
    404: 'Aradığınız sayfa bulunamadı!',
    unknown: 'Bilinmeyen bir hata ile karşılaşıldı!',
}

const ErrorPage = (props) => {
    {/* Props */}
    const {
        code = 500,
    } = props;

    return (
        <div>
            {code} - {errorMessages[code] || errorMessages.unknown}
        </div>
    );
};

export default ErrorPage;
