import moment from "moment/moment";

type DataRequest = {
    [props: string]: any;
}


export const checkResponse = (response: Response) : Promise<DataRequest> => {
    if (!response || (response && !response.ok)) {
       return Promise.reject(response);
    }

    return response.json();
};


export const getCookie = (name: string): string | undefined => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


export const setCookie = (name: string, value: string = '', props: { [key: string]: any; expires?: any; } | undefined = {}) => {
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }

    document.cookie = updatedCookie + ';path=/';
}


export const deleteCookie = (name: string) => {
    setCookie(name, '', { expires: -1 });
}

export const formatDate = (date: Date) => {
    return `${moment(date, true).calendar()} ${moment(date).format(' [i-GMT]Z')}`;
}